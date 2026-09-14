import type { ContactFormData } from '@/types';

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

    const messageText = `*Yeni İletişim Formu Başvurusu*\n\n` +
      `*İşletme:* ${data.businessName}\n` +
      `*İsim:* ${data.firstName} ${data.lastName}\n` +
      `*Telefon:* ${data.phone}\n` +
      `*Sektör:* ${data.sector}\n` +
      `*Bütçe:* ${data.budgetRange}\n\n` +
      `*Mesaj:* ${data.message || '-'}`;

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
