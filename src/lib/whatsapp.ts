import type { ContactFormData } from '@/types';
import { sanitizeHeaderValue } from '@/lib/escape';

/**
 * WhatsApp bildirimi isteğe bağlıdır. Üç değişken de tanımlı değilse çağrı
 * hiç yapılmaz ve loga hata düşmez; değişkenler eklendiği anda (yeniden
 * deploy sonrası) otomatik devreye girer.
 */
export function isWhatsAppConfigured(): boolean {
  return Boolean(
    process.env.WHATSAPP_TOKEN &&
      process.env.WHATSAPP_PHONE_NUMBER_ID &&
      process.env.WHATSAPP_RECIPIENT,
  );
}

export async function sendWhatsAppNotification(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const token = process.env.WHATSAPP_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const recipient = process.env.WHATSAPP_RECIPIENT;

    if (!token || !phoneNumberId || !recipient) {
      throw new Error('Missing WhatsApp environment variables');
    }

    // One field per line, so a value carrying its own newlines must not be
    // able to forge extra lines and misrepresent the lead.
    const line = (value: string) => sanitizeHeaderValue(value, 200);

    const messageText = `*Yeni İletişim Formu Başvurusu*\n\n` +
      `*İşletme:* ${line(data.businessName)}\n` +
      `*İsim:* ${line(`${data.firstName} ${data.lastName}`)}\n` +
      `*Telefon:* ${line(data.phone)}\n` +
      `*Sektör:* ${line(data.sector)}\n` +
      `*Bütçe:* ${line(data.budgetRange)}\n\n` +
      `*Mesaj:* ${sanitizeHeaderValue(data.message || '-', 1000)}`;

    const response = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: recipient,
        type: 'text',
        text: {
          body: messageText,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to send WhatsApp message');
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}
