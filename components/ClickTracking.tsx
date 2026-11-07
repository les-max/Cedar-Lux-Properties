'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

/** Site-wide click listener that reports tel: and mailto: link clicks to GA4. */
export function ClickTracking() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const href = event.target.closest('a')?.getAttribute('href');
      if (!href) return;

      const page_path = window.location.pathname;
      if (href.startsWith('tel:')) {
        trackEvent('phone_click', { phone_number: href.slice('tel:'.length), page_path });
      } else if (href.startsWith('mailto:')) {
        trackEvent('email_click', { page_path });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
