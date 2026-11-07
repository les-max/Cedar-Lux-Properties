type GtagEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    // Defined by the gtag.js snippet in the admin "Header Scripts" setting.
    gtag?: (command: 'event', eventName: string, params?: GtagEventParams) => void;
  }
}

/** Sends a GA4 event. No-op on the server or when gtag is blocked or missing. */
export function trackEvent(name: string, params?: GtagEventParams): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', name, params);
  } catch {
    // Analytics must never interrupt the page, especially a lead submission.
  }
}
