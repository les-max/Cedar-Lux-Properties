import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Clock, TreePine, Anchor, Compass, Ruler, Hammer, ClipboardCheck } from 'lucide-react';

interface CedarCreekLakePageProps {
  phone: string;
  companyName: string;
  heroImage: string;
}

const PROCESS_STEPS = [
  {
    icon: <Compass size={22} />,
    step: '01',
    title: 'Site & Design Consultation',
    body: 'We walk the lot with you — orientation, elevation, tree line, cove position — and talk through vision, timeline, and budget before a single line is drawn. This is where the site tells us what the home should be, not the other way around.',
  },
  {
    icon: <Ruler size={22} />,
    step: '02',
    title: 'Architecture & Planning',
    body: 'A site-specific plan, not a catalog floor plan turned sideways. We coordinate architecture, engineering, and permitting for the lake environment, so the design that gets approved is the design that actually gets built.',
  },
  {
    icon: <Hammer size={22} />,
    step: '03',
    title: 'Construction',
    body: 'One point of contact manages the build — scheduling, trades, and quality control — from foundation through final finish. You get regular updates, not radio silence between framing and drywall.',
  },
  {
    icon: <ClipboardCheck size={22} />,
    step: '04',
    title: 'Walkthrough & Handoff',
    body: 'A final walkthrough, a punch list closed out before you move a box, and a home that\'s ready to live in — not one you\'re still finishing yourself six months after closing.',
  },
];

export const CedarCreekLakePage: React.FC<CedarCreekLakePageProps> = ({ phone, companyName, heroImage }) => {
  return (
    <main className="flex-1 pt-24">

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.55]"
            alt="Cedar Creek Lake Texas luxury custom home builder"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-lake/80 via-lake/20 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 pb-20 text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/30 bg-white/10 backdrop-blur-md rounded-full mb-6">
            <MapPin size={12} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Henderson County, Texas</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold serif italic leading-tight max-w-3xl mb-6">
            Cedar Creek Lake Custom Home Builder
          </h1>
          <p className="text-xl text-neutral-200 max-w-2xl font-light">
            {companyName} designs and builds custom homes on Cedar Creek Lake — from modern lake houses to luxury waterfront residences, sited to their lot rather than dropped from a plan book.
          </p>
        </div>
      </section>

      {/* Why Cedar Creek Lake */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-luxury-gold mb-4">The Lake</p>
              <h2 className="text-4xl md:text-5xl font-bold serif italic mb-8 leading-tight">
                Building at Texas' Largest Inland Lake
              </h2>
              <p className="text-neutral-600 text-lg leading-relaxed mb-6">
                Cedar Creek Lake spans over 37,000 acres — the largest inland lake in Texas — just 60 miles southeast of Dallas. Deep water, protected coves, and a growing base of luxury development have made it a serious destination for custom home construction, not just a weekend lake.
              </p>
              <p className="text-neutral-600 text-lg leading-relaxed mb-6">
                That proximity matters for a build: closer means more site visits, faster decisions, and a builder who can actually be on the lot when it counts — not a once-a-month drive from three hours away.
              </p>
              <p className="text-neutral-600 text-lg leading-relaxed mb-10">
                It also means the lake has real infrastructure behind it — established communities, working trades and suppliers, and a base of homeowners who've already proven out waterfront construction here. You're not building somewhere untested.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-4 bg-lake text-white rounded-full font-bold uppercase tracking-[0.15em] text-xs hover:bg-neutral-800 transition-colors"
              >
                Talk to Us About Building <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <Clock size={24} />, label: '60 Min from Dallas', desc: 'Highway 175 puts you at the lake in under an hour from the 635 corridor.' },
                { icon: <Anchor size={24} />, label: '37,000 Acres', desc: 'Largest inland lake in Texas — plenty of open water and protected coves.' },
                { icon: <TreePine size={24} />, label: 'East Texas Setting', desc: 'Piney woods, rolling hills, and clear water you won\'t find in Central Texas.' },
                { icon: <MapPin size={24} />, label: 'Established Communities', desc: 'Half a dozen-plus gated and lakefront communities ring the shoreline, Emerald Bay among them.' },
              ].map(({ icon, label, desc }) => (
                <div key={label} className="bg-neutral-50 rounded-3xl p-6">
                  <div className="text-luxury-gold mb-3">{icon}</div>
                  <p className="font-bold text-lake text-sm mb-2">{label}</p>
                  <p className="text-neutral-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cedar Lux as Builder */}
      <section className="py-28 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-luxury-gold mb-4">{companyName}</p>
            <h2 className="text-4xl md:text-5xl font-bold serif italic mb-6">
              Custom Home Construction Built for Cedar Creek Lake
            </h2>
            <p className="text-neutral-500 text-lg leading-relaxed">
              Whether it's a modern custom home on a quiet cove or a legacy luxury build on open water, we don't build generic lake houses. Every Cedar Lux home is designed for its specific site — the cove, the water orientation, the lot topology — and built to a standard that holds value for generations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Spec & Custom Builds',
                body: 'We build both custom homes from scratch and curated spec homes for buyers who want a move-in ready property without compromise. Either way, the same team and the same standard carry through — a spec home isn\'t a lesser build, just a faster one.',
              },
              {
                title: 'Water-Oriented Siting',
                body: 'Every lot sits differently — cove position, elevation, tree line, sun path. We design each home around its site: view lines toward open water, outdoor living spaces oriented to catch the evening light, and elevation choices that keep the water close without exposing the home.',
              },
              {
                title: 'Full-Service Process',
                body: 'From site selection and architecture through the final finish-out, we manage the entire residential construction process. One point of contact, start to finish — see how below.',
              },
              {
                title: 'Built for the Lake Environment',
                body: 'Waterfront homes take more weather than inland ones — humidity, sun exposure, seasonal storms. We choose materials and construction methods with that in mind, not just for how a home looks on move-in day.',
              },
            ].map(({ title, body }) => (
              <div key={title} className="bg-white rounded-3xl p-10">
                <h3 className="text-xl font-bold mb-4">{title}</h3>
                <p className="text-neutral-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-luxury-gold mb-4">How We Build</p>
            <h2 className="text-4xl md:text-5xl font-bold serif italic mb-6">Our Home Construction Process</h2>
            <p className="text-neutral-500 text-lg leading-relaxed">
              Four stages, one point of contact throughout. No handoffs between a design team and a construction team who've never met your lot.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map(({ icon, step, title, body }) => (
              <div key={step} className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-lake text-white flex items-center justify-center">
                    {icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-300">Step {step}</span>
                </div>
                <h3 className="text-lg font-bold text-lake mb-2">{title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Communities — link to Emerald Bay */}
      <section className="py-28 bg-lake text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-luxury-gold mb-4">Where We Build</p>
            <h2 className="text-4xl font-bold serif italic">Cedar Creek Lake Communities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link
              href="/emerald-bay"
              className="block text-left border border-white/10 rounded-3xl p-10 hover:border-luxury-gold transition-colors group"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-luxury-gold" />
                <p className="text-luxury-gold text-[10px] font-black uppercase tracking-widest">Featured Community</p>
              </div>
              <h3 className="text-2xl font-bold serif italic mb-3">Emerald Bay</h3>
              <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                One of the Cedar Creek Lake communities where we've built — protected coves and deep-water access, with lots that suit both custom and spec builds.
              </p>
              <span className="inline-flex items-center gap-2 text-luxury-gold text-xs font-bold uppercase tracking-widest group-hover:gap-3 transition-all">
                Learn More <ArrowRight size={14} />
              </span>
            </Link>
            <div className="border border-white/10 rounded-3xl p-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-white/40" />
                <p className="text-neutral-400 text-[10px] font-black uppercase tracking-widest">Beyond Emerald Bay</p>
              </div>
              <h3 className="text-2xl font-bold serif italic mb-3">The Lake at Large</h3>
              <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                We build across Cedar Creek Lake wherever the right lot meets the right client — not exclusively in one community. If you already own a lot elsewhere on the lake, that doesn't rule us out; it's the starting point for the conversation.
              </p>
              <p className="text-neutral-400 text-xs">Have a specific lot or neighborhood in mind? We'd love to hear about it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold serif italic mb-6">
            Let's Build Your Cedar Creek Home
          </h2>
          <p className="text-neutral-500 text-lg mb-10 leading-relaxed">
            Whether you have a lot, a neighborhood in mind, or just a vision — we'll tell you honestly what's possible and what it takes to make it happen on Cedar Creek Lake.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/contact"
              className="px-12 py-5 bg-lake text-white rounded-full font-bold uppercase tracking-[0.15em] text-xs hover:bg-neutral-800 transition-colors"
            >
              Start a Conversation
            </Link>
            <a
              href={`tel:${phone}`}
              className="px-12 py-5 border-2 border-lake text-lake rounded-full font-bold uppercase tracking-[0.15em] text-xs hover:bg-lake hover:text-white transition-colors"
            >
              Call {phone}
            </a>
          </div>
          <p className="text-neutral-400 text-sm">
            Prefer to buy something already built?{' '}
            <Link href="/homes-for-sale" className="text-lake font-bold underline underline-offset-2 hover:text-luxury-gold transition-colors">
              See our current homes for sale
            </Link>
            .
          </p>
        </div>
      </section>

    </main>
  );
};
