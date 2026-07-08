'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  if (images.length === 0) return null;

  const next = () => setActive((p) => (p + 1) % images.length);
  const prev = () => setActive((p) => (p - 1 + images.length) % images.length);

  return (
    <div className="w-full bg-neutral-900 flex flex-col">
      <div className="relative w-full h-[45vh] md:h-[60vh] min-h-[320px] overflow-hidden">
        <Image
          src={images[active]}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {images.length > 1 && (
          <>
            <button onClick={prev} aria-label="Previous photo" className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors">
              <ChevronLeft size={24} />
            </button>
            <button onClick={next} aria-label="Next photo" className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors">
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs font-bold px-3 py-1 rounded-full">
              {active + 1} / {images.length}
            </div>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide bg-neutral-900/80">
          {images.map((url, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              aria-label={`Photo ${idx + 1}`}
              className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${idx === active ? 'border-luxury-gold opacity-100' : 'border-transparent opacity-50 hover:opacity-80'}`}
            >
              <Image src={url} alt={`Photo ${idx + 1}`} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
