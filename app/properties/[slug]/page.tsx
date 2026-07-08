import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Bed, Bath, Move, LandPlot, Waves, MessageSquare, ExternalLink, Check } from 'lucide-react';
import { getProperties } from '@/lib/site-data';
import { findBySlug, propertySlug } from '@/lib/slug';
import { JsonLd } from '@/components/JsonLd';
import { PropertyGallery } from '@/components/PropertyGallery';
import { propertySchema } from '@/lib/schema';

export const revalidate = 300;

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((p) => ({ slug: propertySlug(p) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const properties = await getProperties();
  const p = findBySlug(properties, slug);
  if (!p) return {};
  const description = (p.description || '').replace(/\s+/g, ' ').trim().slice(0, 155);
  const place = p.neighborhood || 'Cedar Creek Lake';
  return {
    title: { absolute: `${p.title} | ${place} | Cedar Lux Properties` },
    description,
    alternates: { canonical: `/properties/${slug}` },
    openGraph: {
      title: p.title,
      description,
      images: p.image ? [p.image] : [],
      type: 'website',
    },
  };
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const properties = await getProperties();
  const property = findBySlug(properties, slug);
  if (!property) notFound();

  const type = property.propertyType || 'Home';
  const images = [property.image, ...(property.gallery || [])].filter(Boolean) as string[];
  const hasPrice = type !== 'Floor Plan' && property.price > 0;

  const stats =
    type === 'Lot'
      ? [
          property.acres && property.acres > 0
            ? { icon: <LandPlot size={24} />, value: `${property.acres}`, label: 'Acres' }
            : null,
          property.waterfront ? { icon: <Waves size={24} />, value: 'Yes', label: 'Waterfront' } : null,
        ]
      : [
          property.beds > 0 ? { icon: <Bed size={24} />, value: `${property.beds}`, label: 'Beds' } : null,
          property.baths > 0 ? { icon: <Bath size={24} />, value: `${property.baths}`, label: 'Baths' } : null,
          property.sqft > 0
            ? { icon: <Move size={24} />, value: property.sqft.toLocaleString(), label: 'SqFt' }
            : null,
        ];
  const shownStats = stats.filter(Boolean) as { icon: React.ReactNode; value: string; label: string }[];
  const gridCols = shownStats.length >= 3 ? 'grid-cols-3' : shownStats.length === 2 ? 'grid-cols-2' : 'grid-cols-1';

  return (
    <main className="flex-1 pt-24">
      <JsonLd data={propertySchema(property)} />

      <PropertyGallery images={images} title={property.title} />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <nav className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">
          <Link href="/collection" className="hover:text-lake transition-colors">
            The Collection
          </Link>
          <span className="mx-2">/</span>
          <span className="text-luxury-gold">{property.neighborhood || 'Cedar Creek Lake'}</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold serif italic text-lake mb-3">{property.title}</h1>
        {property.address && <p className="text-neutral-400 font-medium mb-4">{property.address}</p>}
        {hasPrice && <p className="text-3xl font-bold text-luxury-gold mb-8">{formatter.format(property.price)}</p>}

        {shownStats.length > 0 && (
          <div className={`grid ${gridCols} gap-6 py-8 border-y border-neutral-100 mb-8`}>
            {shownStats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="mx-auto mb-2 text-neutral-400 flex justify-center">{s.icon}</div>
                <span className="font-bold text-lg">{s.value}</span>
                <p className="text-[10px] uppercase tracking-widest text-neutral-400">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-8">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-3">Description</h2>
            <p className="text-neutral-600 leading-relaxed text-lg font-light whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {property.features && property.features.length > 0 && (
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-3">Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-neutral-600">
                    <Check size={18} className="text-luxury-gold flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/contact"
              className="flex-1 py-5 bg-lake text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-3"
            >
              Inquire About This Property <MessageSquare size={16} />
            </Link>
            {property.listingUrl && (
              <a
                href={property.listingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-5 bg-luxury-gold text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-lg hover:bg-amber-600 transition-colors flex items-center justify-center gap-3"
              >
                See the Listing <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
