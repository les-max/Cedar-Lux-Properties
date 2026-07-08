'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Instagram, Facebook } from 'lucide-react';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/collection', label: 'Collection' },
  { href: '/contact', label: 'Contact' },
];

export function Nav({ logoImage, companyName }: { logoImage: string; companyName: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed w-full z-50 glass shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoImage} alt={companyName} className="h-20 w-auto object-contain" />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors ${active ? 'text-luxury-gold' : 'text-neutral-600 hover:text-lake'}`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <button className="md:hidden text-lake" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col p-12 pt-32 gap-8 md:hidden mobile-menu-enter">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-3xl font-bold serif text-left"
            >
              {l.label === 'About' ? 'About Us' : l.label === 'Collection' ? 'The Collection' : l.label}
            </Link>
          ))}
          <div className="mt-auto flex gap-6 text-neutral-400">
            <Instagram size={24} /> <Facebook size={24} />
          </div>
        </div>
      )}
    </nav>
  );
}
