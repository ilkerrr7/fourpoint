"use server";

import { headers, cookies } from "next/headers";
import { contactFormSchema } from "@/lib/validations";
import { sendContactNotification } from "@/lib/resend";
import { sendWhatsAppNotification } from "@/lib/whatsapp";
import { sendLeadEvent } from "@/lib/meta-capi";
import { rateLimiter } from "@/lib/rate-limit";
import type { ContactFormData, FormActionResult } from "@/types";

export async function submitContactForm(
  _prevState: FormActionResult | null,
  formData: FormData
): Promise<FormActionResult> {
  // --- 1. Rate limit check ---
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  const rateCheck = rateLimiter.check(ip);
  if (!rateCheck.allowed) {
    return {
      success: false,
      message: `Çok fazla istek gönderildi. Lütfen ${rateCheck.retryAfter} saniye sonra tekrar deneyin.`,
    };
  }

  // --- 2. Extract form data ---
  const rawData: ContactFormData = {
    firstName: (formData.get("firstName") as string) || "",
    lastName: (formData.get("lastName") as string) || "",
    businessName: (formData.get("businessName") as string) || "",
    phone: (formData.get("phone") as string) || "",
    email: (formData.get("email") as string) || "",
    sector: (formData.get("sector") as string) || "",
    budgetRange: (formData.get("budgetRange") as string) || "",
    message: (formData.get("message") as string) || "",
    kvkkConsent: formData.get("kvkkConsent") === "on",
    _honey: (formData.get("_honey") as string) || "",
  };

  // --- 3. Honeypot check ---
  if (rawData._honey) {
    // Silently reject bot submissions — don't reveal honeypot
    return {
      success: true,
      message: "Mesajınız başarıyla gönderildi. En kısa sürede dönüş yapacağız.",
    };
  }

  // --- 4. Validation ---
  const result = contactFormSchema.safeParse(rawData);
  if (!result.success) {
    const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof ContactFormData;
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return {
      success: false,
      message: "Lütfen formu kontrol edin.",
      errors: fieldErrors,
    };
  }

  const validData = result.data as ContactFormData;

  // --- 5. Generate event_id for deduplication ---
  const eventId = crypto.randomUUID();

  // --- 6. Get cookies for CAPI ---
  const cookieStore = await cookies();
  const fbc = cookieStore.get("_fbc")?.value;
  const fbp = cookieStore.get("_fbp")?.value;
  const userAgent = headersList.get("user-agent") || "";

  // --- 7. Send notifications & CAPI event in parallel ---
  const [emailResult, whatsappResult, capiResult] = await Promise.allSettled([
    sendContactNotification(validData),
    sendWhatsAppNotification(validData),
    sendLeadEvent({
      eventId,
      email: validData.email,
      phone: validData.phone,
      firstName: validData.firstName,
      lastName: validData.lastName,
      clientIpAddress: ip,
      clientUserAgent: userAgent,
      fbc,
      fbp,
    }),
  ]);

  // Log failures (don't block user response)
  if (emailResult.status === "rejected" || (emailResult.status === "fulfilled" && !emailResult.value.success)) {
    console.error("[ContactForm] Email notification failed:", emailResult);
  }
  if (whatsappResult.status === "rejected" || (whatsappResult.status === "fulfilled" && !whatsappResult.value.success)) {
    console.error("[ContactForm] WhatsApp notification failed:", whatsappResult);
  }
  if (capiResult.status === "rejected" || (capiResult.status === "fulfilled" && !capiResult.value.success)) {
    console.error("[ContactForm] Meta CAPI failed:", capiResult);
  }

  // --- 8. Return success with event_id for client-side pixel ---
  return {
    success: true,
    message: `__eventId:${eventId}`,
  };
}
