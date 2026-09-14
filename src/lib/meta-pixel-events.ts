'use client';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackLead(eventId: string): void {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {}, { eventID: eventId });
  }
}

export function trackPageView(): void {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
}
