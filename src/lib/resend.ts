import type { ContactFormData } from '@/types';
import { escapeHtml, sanitizeHeaderValue } from '@/lib/escape';

export async function sendContactNotification(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    if (!resendApiKey || !fromEmail || !notificationEmail) {
      throw new Error('Missing Resend environment variables');
    }

    // Every value below is visitor-supplied. Escaping is what keeps a name
    // containing markup from running in whoever opens this notification.
    const htmlBody = `
      <h2>Yeni İletişim Formu Başvurusu</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Ad:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.firstName)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Soyad:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.lastName)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>İşletme Adı:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.businessName)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Telefon:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.phone)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>E-posta:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.email)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Sektör:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.sector)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Bütçe:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.budgetRange)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Mesaj:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.message || '-')}</td>
        </tr>
      </table>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: notificationEmail,
        subject: sanitizeHeaderValue(
          `Yeni İletişim: ${data.businessName} - ${data.firstName} ${data.lastName}`,
        ),
        html: htmlBody,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send email');
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}
