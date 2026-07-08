import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Search, ExternalLink } from 'lucide-react';
import { getProperties } from '@/lib/site-data';
import { PropertyCard } from '@/components/PropertyCard';
import { StatusFilter } from '@/components/StatusFilter';
import { JsonLd } from '@/components/JsonLd';
import { collectionSchema } from '@/lib/schema';
import { propertySlug } from '@/lib/slug';

export const revalidate = 300;

export const metadata: Metadata = {
  title: { absolute: 'The Collection | Cedar Creek Lake Homes & Lots | Cedar Lux Properties' },
  description:
    'Browse available custom homes, lakeside lots, and build-ready floor plans from Cedar Lux Properties on Cedar Creek Lake, Texas.',
  alternates: { canonical: '/collection' },
};

const STATUSES = ['All', 'Available', 'Under Construction', 'Sold'];
const SECTIONS = [
  { type: 'Home', eyebrow: 'Available Homes', heading: 'Homes You Can Buy Today' },
  { type: 'Lot', eyebrow: 'Available Lots', heading: 'Lakeside Lots & Land' },
  { type: 'Floor Plan', eyebrow: 'Available Floor Plans', heading: 'Plans to Build Your Dream' },
];

export default async function CollectionPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status = 'All' } = await searchParams;
  const properties = await getProperties();
  const filtered = status === 'All' ? properties : properties.filter((p) => p.status === status);
  const featured = properties.find((p) => p.isFeatured);

  return (
    <main className="flex-1 pt-40 pb-32">
      <JsonLd data={collectionSchema(properties)} />
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h1 className="text-6xl font-medium serif italic mb-6">The Collection</h1>
            <p className="text-neutral-500 max-w-2xl text-lg">
              Browse our currently available residences and upcoming projects on Cedar Creek Lake.
            </p>
          </div>
          <StatusFilter statuses={STATUSES} value={status} />
        </div>

        {featured && (
          <div className="mb-16 rounded-[2.5rem] overflow-hidden border border-neutral-200 shadow-lg flex flex-col md:flex-row">
            <div className="md:w-1/2 h-72 md:h-auto relative min-h-[300px]">
              <Image src={featured.image} alt={featured.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              <div className="absolute top-6 left-6 z-10">
                <span className="flex items-center gap-2 bg-luxury-gold text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow">
                  <Star size={12} fill="white" /> Featured Home
                </span>
              </div>
            </div>
            <div className="md:w-1/2 bg-white p-10 md:p-14 flex flex-col justify-center">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-luxury-gold mb-3">{featured.neighborhood}</p>
              <h2 className="text-3xl md:text-4xl font-bold serif italic text-lake mb-2">{featured.title}</h2>
              {featured.address && <p className="text-neutral-400 text-sm font-medium mb-6">{featured.address}</p>}
              <FeaturedFacts featured={featured} />
              {(featured.propertyType || 'Home') !== 'Floor Plan' && featured.price > 0 && (
                <p className="text-2xl font-black text-lake mb-8">${featured.price.toLocaleString()}</p>
              )}
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/properties/${propertySlug(featured)}`}
                  className="px-10 py-4 bg-lake text-white font-bold rounded-full hover:bg-neutral-800 transition-[background-color,transform] duration-150 ease-out active:scale-[0.97] uppercase tracking-widest text-xs"
                >
                  View Details
                </Link>
                {featured.listingUrl && (
                  <a
                    href={featured.listingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-4 bg-luxury-gold text-white font-bold rounded-full hover:bg-amber-600 transition-[background-color,transform] duration-150 ease-out active:scale-[0.97] uppercase tracking-widest text-xs flex items-center gap-2"
                  >
                    See the Listing <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {filtered.length > 0 ? (
          SECTIONS.map((section) => {
            const group = filtered.filter((p) => (p.propertyType || 'Home') === section.type);
            if (group.length === 0) return null;
            return (
              <div key={section.type} className="mb-20 last:mb-0">
                <div className="mb-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-luxury-gold mb-2">{section.eyebrow}</p>
                  <h2 className="text-3xl font-bold serif italic text-lake">{section.heading}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {group.map((property) => (
                    <PropertyCard key={property.id || property.title} property={property} />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-40 text-center">
            <Search size={48} className="mx-auto text-neutral-200 mb-6" />
            <h2 className="text-2xl font-bold serif italic">No properties found</h2>
          </div>
        )}
      </div>
    </main>
  );
}

function FeaturedFacts({ featured }: { featured: Awaited<ReturnType<typeof getProperties>>[number] }) {
  const ftype = featured.propertyType || 'Home';
  const facts =
    ftype === 'Lot'
      ? [
          featured.acres && featured.acres > 0 ? `${featured.acres} Acres` : null,
          featured.waterfront ? 'Waterfront' : null,
        ]
      : [
          featured.beds > 0 ? `${featured.beds} Beds` : null,
          featured.baths > 0 ? `${featured.baths} Baths` : null,
          featured.sqft > 0 ? `${featured.sqft.toLocaleString()} SqFt` : null,
        ];
  const shown = facts.filter(Boolean) as string[];
  if (shown.length === 0) return null;
  return (
    <div className="flex gap-6 mb-8 text-sm font-bold text-neutral-600">
      {shown.map((f, i) => (
        <span key={f} className="flex gap-6">
          {i > 0 && <span className="text-neutral-200">|</span>}
          <span>{f}</span>
        </span>
      ))}
    </div>
  );
}
