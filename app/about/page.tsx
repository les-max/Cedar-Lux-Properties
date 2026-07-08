import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: { absolute: 'About Cedar Lux Properties | Cedar Creek Lake Custom Home Builder' },
  description:
    'Gary Payne founded Cedar Lux Properties in 2015 and has built on Cedar Creek Lake since 2011 — from $250K homes to multi-million dollar custom builds. Meet the family business behind the lake’s most meticulous homes.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://media.vrbo.com/lodging/70000000/69560000/69553700/69553620/9b3ca718.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill"
            alt="About Cedar Lux Properties"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.5]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl font-medium serif italic mb-6">Our Story</h1>
          <p className="text-xl font-light tracking-wide uppercase">Building Legacies on Cedar Creek Lake</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold serif italic mb-6 text-lake">About Cedar Lux Properties</h2>
          <p className="text-xl text-neutral-500 leading-relaxed">
            Gary Payne founded Cedar Lux Properties in 2015, but he&apos;s been building on Cedar Creek Lake since 2011. In that time he&apos;s built everything from $250,000 homes to multi-million dollar custom builds — and every one of those projects shaped how Cedar Lux approaches the work today.
          </p>
        </div>

        <div className="space-y-16">
          <div>
            <h3 className="text-2xl font-bold serif mb-4">What a Decade on the Lake Teaches You</h3>
            <p className="text-neutral-500 leading-relaxed">
              Gary evaluates lake communities differently than most. While marketing materials tend to focus on amenities and aesthetics, experienced lake builders pay closer attention to things that don&apos;t always show up on a site plan: water depth, boat access, elevation, and how people actually live day to day. Those are the details that separate a home that works from one that quietly becomes a problem later.
            </p>
            <blockquote className="mt-8 border-l-4 border-luxury-gold pl-6 py-2">
              <p className="text-xl font-serif italic text-lake">&quot;Here at Cedar Creek Lake, a lot of lake homes are primary residences. Custom building your home comes with a lot of decisions. But during the custom build process here, we have a good time. Building your dream home should be exciting.&quot;</p>
              <footer className="text-sm font-bold uppercase tracking-widest text-neutral-400 mt-2">— Gary Payne, Founder</footer>
            </blockquote>
          </div>

          <div className="bg-neutral-50 p-8 md:p-12 rounded-[2.5rem] border border-neutral-100">
            <h3 className="text-2xl font-bold serif mb-4">A Family Business, Built on Detail</h3>
            <p className="text-neutral-500 leading-relaxed">
              Chelsea Payne is half-owner of Cedar Lux and leads the design side of the business, bringing more than 13 years of experience to every finish, fixture, and floor plan. The partnership is straightforward: Gary gets the home to sheetrock — Chelsea takes it from there. The result is a home where the craftsmanship shows in every room: foam encapsulation, hardwood floors, steel stair banisters, illuminated stair treads, slot diffusers in the ceilings, and full smart-home automation throughout.
            </p>
            <blockquote className="my-8 border-l-4 border-luxury-gold pl-6 py-2">
              <p className="text-xl font-serif italic text-lake">&quot;Something I love about Cedar Lux is how meticulous their homes are. They&apos;re extremely clean and extremely detailed.&quot;</p>
              <footer className="text-sm font-bold uppercase tracking-widest text-neutral-400 mt-2">— Donna Smith, Duggan Realty Advisors</footer>
            </blockquote>
            <p className="text-neutral-500 leading-relaxed">
              Gary describes every Cedar Lux home simply: built to the nines. Walk through one and you&apos;ll understand exactly what he means.
            </p>
          </div>

          <div className="text-center pt-8">
            <Link
              href="/contact"
              className="inline-block px-12 py-5 bg-lake text-white font-black rounded-full uppercase tracking-[0.2em] text-xs shadow-xl hover:bg-neutral-800 transition-[background-color,transform] duration-150 ease-out active:scale-[0.97]"
            >
              Start Your Project With Us
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
