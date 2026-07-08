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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable} ${cinzel.variable}`}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GLBNKTWFKN" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-GLBNKTWFKN');`,
          }}
        />
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
