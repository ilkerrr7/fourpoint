import { createHash } from 'crypto';

function hashData(data: string): string {
  if (!data) return '';
  const normalized = data.trim().toLowerCase();
  return createHash('sha256').update(normalized).digest('hex');
}

export async function sendLeadEvent(params: {
  eventId: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  clientIpAddress: string;
  clientUserAgent: string;
  fbc?: string;
  fbp?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
    const pixelId = process.env.META_PIXEL_ID;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    if (!accessToken || !pixelId) {
      throw new Error('Missing Meta CAPI environment variables');
    }

    const payload = {
      data: [
        {
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          event_id: params.eventId,
          action_source: 'website',
          event_source_url: siteUrl,
          user_data: {
            em: [hashData(params.email)],
            ph: [hashData(params.phone)],
            fn: [hashData(params.firstName)],
            ln: [hashData(params.lastName)],
            client_ip_address: params.clientIpAddress,
            client_user_agent: params.clientUserAgent,
            fbc: params.fbc,
            fbp: params.fbp,
          },
        },
      ],
    };

    const response = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to send Meta CAPI event');
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}
