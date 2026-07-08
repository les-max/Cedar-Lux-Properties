import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getSettings, getProperties } from '@/lib/site-data';
import { PropertyCard } from '@/components/PropertyCard';
import { JsonLd } from '@/components/JsonLd';
import { businessSchema } from '@/lib/schema';

export const revalidate = 300;

export const metadata: Metadata = {
  title: { absolute: 'Cedar Lux Properties | Cedar Creek Lake Custom Homes' },
  description:
    'Bespoke lakefront custom homes on Cedar Creek Lake, Texas. Just 60 minutes from Dallas.',
  alternates: { canonical: '/' },
};

export default async function HomePage() {
  const [settings, properties] = await Promise.all([getSettings(), getProperties()]);

  // Featured: admin-starred (max 3); fall back to the 3 newest so it's never blank.
  const starred = properties.filter((p) => p.isFeatured).slice(0, 3);
  const homeFeatured = starred.length > 0 ? starred : properties.slice(0, 3);

  return (
    <main className="flex-1">
      <JsonLd data={businessSchema(settings)} />

      {/* Hero */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={settings.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.65]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-lake/60 via-transparent to-black/30" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-24 text-white">
          <div className="hero-item hero-item-1 inline-block px-4 py-2 border border-white/30 bg-white/10 backdrop-blur-md rounded-full mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Exclusively Cedar Creek Lake</span>
          </div>
          <h1 className="hero-item hero-item-2 text-6xl md:text-[5.5rem] font-medium leading-[1.05] mb-8 max-w-4xl">
            {settings.heroHeadline}
          </h1>
          <p className="hero-item hero-item-3 text-xl md:text-2xl text-neutral-200 max-w-2xl mb-12 font-light">
            {settings.heroSubheadline}
          </p>
          <Link
            href="/collection"
            className="hero-item hero-item-4 px-12 py-5 bg-luxury-gold text-white font-bold rounded-full hover:bg-white hover:text-lake transition-[background-color,color,transform,box-shadow] duration-150 ease-out active:scale-[0.97] shadow-2xl text-lg inline-flex items-center gap-3"
          >
            Explore The Collection <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold italic serif">Featured Properties</h2>
              <p className="text-neutral-500 mt-4 max-w-xl">
                A selection of our most prestigious properties currently overlooking Cedar Creek Lake.
              </p>
            </div>
            <Link
              href="/collection"
              className="hidden md:flex text-luxury-gold font-bold items-center gap-2 transition-colors pb-2 border-b-2 border-luxury-gold"
            >
              View Full Collection <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {homeFeatured.map((property) => (
              <PropertyCard key={property.id || property.title} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle */}
      <section className="py-32 bg-lake text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-5xl font-medium serif italic mb-8">{settings.lifestyleHeadline}</h2>
            <p className="text-neutral-400 text-xl font-light mb-12 leading-relaxed">{settings.lifestyleSubheadline}</p>
          </div>
          <div className="flex-1 relative w-full">
            <div className="relative h-[500px] w-full">
              <Image
                src={settings.lifestyleImage}
                alt="Cedar Creek Lake"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-3xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* In the Press */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-bold italic serif text-lake">In the Press</h2>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>
          <div className="flex flex-col gap-4">
            <a
              href="https://candysdirt.com/2026/02/26/emerald-bays-first-spec-home-hits-the-market-a-qa-with-the-team-behind-it/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-neutral-200 rounded-[2rem] p-8 hover:border-luxury-gold hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-lake rounded-2xl flex items-center justify-center">
                  <span className="text-luxury-gold font-black text-xs uppercase tracking-widest text-center leading-tight px-2">Candy&apos;s Dirt</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-luxury-gold mb-2">CandysDirt.com — February 2026</p>
                  <h3 className="text-lg font-bold serif text-lake mb-2 group-hover:text-luxury-gold transition-colors">Emerald Bay&apos;s First Spec Home Hits the Market: A Q&amp;A With the Team Behind It</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">A conversation with Gary Payne and Realtor Donna Smith on Emerald Bay&apos;s first spec home — 3,318 sq ft at 4529 Sapphire Way, priced at $1.695M with a protected water view from an 834 sq ft second-floor terrace.</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mt-4 group-hover:text-luxury-gold transition-colors">Read the article &rarr;</p>
                </div>
              </div>
            </a>
            <a
              href="https://candysdirt.com/2025/12/19/why-one-experienced-lake-builder-chose-emerald-bay-at-cedar-creek-lake/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-neutral-200 rounded-[2rem] p-8 hover:border-luxury-gold hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-lake rounded-2xl flex items-center justify-center">
                  <span className="text-luxury-gold font-black text-xs uppercase tracking-widest text-center leading-tight px-2">Candy&apos;s Dirt</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-luxury-gold mb-2">CandysDirt.com — December 2025</p>
                  <h3 className="text-lg font-bold serif text-lake mb-2 group-hover:text-luxury-gold transition-colors">Why One Experienced Lake Builder Chose Emerald Bay at Cedar Creek Lake</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">A deep dive into how Gary Payne evaluates lake communities, what sets Cedar Lux apart as a builder, and why Emerald Bay earned a spot as one of the lake&apos;s preferred builders.</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mt-4 group-hover:text-luxury-gold transition-colors">Read the article &rarr;</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
