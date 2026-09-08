import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import { getProperties } from '@/lib/site-data';
import { PropertyCard } from '@/components/PropertyCard';
import { StatusFilter } from '@/components/StatusFilter';
import { JsonLd } from '@/components/JsonLd';
import { collectionSchema, webPageSchema } from '@/lib/schema';

export const revalidate = 300;

const DESCRIPTION =
  'Custom-built homes for sale on Cedar Creek Lake, Texas. New construction and move-in ready lakefront residences from Cedar Lux Properties.';

export const metadata: Metadata = {
  title: { absolute: 'Cedar Creek Lake Homes for Sale | Cedar Lux Properties' },
  description: DESCRIPTION,
  alternates: { canonical: '/homes-for-sale' },
};

const STATUSES = ['All', 'Available', 'Under Construction'];

export default async function HomesForSalePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status = 'All' } = await searchParams;
  const properties = await getProperties();
  const homes = properties.filter((p) => (p.propertyType || 'Home') === 'Home' && p.status !== 'Sold');
  const filtered = status === 'All' ? homes : homes.filter((p) => p.status === status);

  return (
    <main className="flex-1 pt-40 pb-32">
      <JsonLd
        data={[
          collectionSchema(homes),
          webPageSchema('Cedar Creek Lake Homes for Sale', '/homes-for-sale', DESCRIPTION, 'Homes for Sale'),
        ]}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <nav className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-8">
          <Link href="/properties" className="hover:text-lake transition-colors">Properties</Link>
          <span className="mx-2">/</span>
          <span className="text-luxury-gold">Homes for Sale</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-medium serif italic mb-6">Cedar Creek Lake Homes for Sale</h1>
            <p className="text-neutral-600 text-lg leading-relaxed mb-4">
              When you buy directly from the builder, you're not guessing what's behind the walls. Every finish,
              material, and structural decision in a Cedar Lux home was made by the same team that answers your
              questions after you move in — not an agent quoting a spec sheet someone else wrote.
            </p>
            <p className="text-neutral-600 text-lg leading-relaxed">
              We're not a production builder running dozens of spec homes at once — what's listed below is
              everything we currently have available, not a filtered sample of something bigger. If a home is
              still under construction, there may be room to weigh in on remaining finish decisions; if it's
              move-in ready, it's ready to walk through this week.
            </p>
          </div>
          <StatusFilter statuses={STATUSES} value={status} />
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            {filtered.map((property) => (
              <PropertyCard key={property.id || property.title} property={property} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center mb-12">
            <Search size={48} className="mx-auto text-neutral-200 mb-6" />
            <h2 className="text-2xl font-bold serif italic">No homes match that status right now</h2>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-neutral-100">
          <p className="text-neutral-500 text-sm flex-1 pt-6">
            Don't see what you're looking for? We also build custom homes from the ground up.
          </p>
          <Link
            href="/cedar-creek-lake"
            className="inline-flex items-center gap-2 px-8 py-4 mt-4 sm:mt-6 border-2 border-lake text-lake rounded-full font-bold uppercase tracking-widest text-xs hover:bg-lake hover:text-white transition-colors self-start"
          >
            See Our Custom Building Process <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
