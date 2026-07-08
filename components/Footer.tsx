import Link from 'next/link';

const FOOTER_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/collection', label: 'Collection' },
  { href: '/contact', label: 'Contact' },
  { href: '/emerald-bay', label: 'Emerald Bay' },
  { href: '/cedar-creek-lake', label: 'Cedar Creek Lake' },
];

export function Footer({
  logoImage,
  companyName,
  phone,
}: {
  logoImage: string;
  companyName: string;
  phone: string;
}) {
  return (
    <footer className="bg-white border-t border-neutral-100 py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoImage} alt={companyName} className="h-16 w-auto object-contain" />
          </div>
          <p className="text-neutral-400 text-xs font-medium max-w-xs uppercase tracking-wider">
            Unrivaled lakefront masterpieces for the discerning Texan.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-neutral-400 justify-center">
          {FOOTER_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-lake transition-colors text-xs font-bold uppercase tracking-widest"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="text-center md:text-right">
          <p className="text-neutral-400 text-[10px] uppercase font-bold tracking-widest mb-2">Contact</p>
          <p className="font-bold text-lake">{phone}</p>
        </div>
      </div>
    </footer>
  );
}
