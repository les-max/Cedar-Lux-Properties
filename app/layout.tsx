import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display, Cinzel } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { getSettings } from '@/lib/site-data';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});
const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cedarluxproperties.com'),
  title: {
    default: 'Cedar Lux Properties | Cedar Creek Lake Custom Homes',
    template: '%s | Cedar Lux Properties',
  },
  description:
    'Cedar Lux Properties builds bespoke lakefront custom homes on Cedar Creek Lake, Texas — 60 minutes from Dallas. Luxury waterfront residences and spec builds at Emerald Bay and across Cedar Creek Lake.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://cedarluxproperties.com/',
    title: 'Cedar Lux Properties | Cedar Creek Lake Custom Homes',
    description: 'Bespoke lakefront homes on Cedar Creek Lake, just 60 minutes from Dallas.',
    images: ['/lake-home.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/lake-home.png'],
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

// Render admin "Header Scripts" as real React elements instead of
// dangerouslySetInnerHTML on <head>. Browser extensions inject tags into
// <head> before hydration; with innerHTML replacement React detects the
// mismatch and rebuilds the head with only the script markup, dropping the
// stylesheet (pages render completely unstyled). Parsed elements hydrate
// cleanly while still appearing in the raw server HTML for tag detection.
function headerScriptElements(html: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(html))) {
    const attrs = m[1];
    const body = m[2].trim();
    const src = attrs.match(/src=["']([^"']+)["']/)?.[1];
    if (src) {
      nodes.push(
        <script
          key={i++}
          src={src}
          async={/\basync\b/.test(attrs) || undefined}
          defer={/\bdefer\b/.test(attrs) || undefined}
        />
      );
    } else if (body) {
      nodes.push(<script key={i++} dangerouslySetInnerHTML={{ __html: body }} />);
    }
  }
  return nodes;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable} ${cinzel.variable}`}>
      <head>
        {/* All media (logo, hero, property photos) is served from Supabase
            storage; warming the connection early shaves DNS+TLS off the LCP
            critical path. */}
        <link rel="preconnect" href="https://lwcpnamisjdenfkbpbpt.supabase.co" />
        {headerScriptElements(settings.externalScripts || '')}
      </head>
      <body className="bg-neutral-50 text-neutral-900 overflow-x-hidden">
        <Nav logoImage={settings.logoImage} companyName={settings.companyName} />
        {children}
        <Footer
          logoImage={settings.logoImage}
          companyName={settings.companyName}
          phone={settings.phone}
        />
      </body>
    </html>
  );
}
