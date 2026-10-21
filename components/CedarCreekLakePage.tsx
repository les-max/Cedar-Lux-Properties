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
    body: 'Start from one of our existing floor plans, adapted to your lot, or from a fully site specific plan designed from scratch. We coordinate architecture, engineering, and permitting for the lake environment, so the design that gets approved is the design that actually gets built.',
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

const SAPPHIRE_WAY_HREF = '/properties/4529-sapphire-way-mlv8';
const AUTUMN_WOOD_HREF = '/properties/217-autumn-wood-trail-xluo';

const PRESS_ITEMS = [
  {
    date: 'February 2026',
    headline: "Emerald Bay's First Spec Home Hits the Market: A Q&A With the Team Behind It",
    desc: "A conversation with Gary Payne and Realtor Donna Smith on Emerald Bay's first spec home at 4529 Sapphire Way.",
    href: 'https://candysdirt.com/2026/02/26/emerald-bays-first-spec-home-hits-the-market-a-qa-with-the-team-behind-it/',
  },
  {
    date: 'December 2025',
    headline: 'Why One Experienced Lake Builder Chose Emerald Bay at Cedar Creek Lake',
    desc: 'How Gary Payne evaluates lake communities, and why Emerald Bay earned a spot as one of the lake\'s preferred builders.',
    href: 'https://candysdirt.com/2025/12/19/why-one-experienced-lake-builder-chose-emerald-bay-at-cedar-creek-lake/',
  },
];

/** Rendered on the page and reused word for word in the FAQPage JSON-LD. */
export const CEDAR_CREEK_LAKE_FAQS = [
  {
    question: 'Do you only build in Emerald Bay?',
    answer:
      'No. Emerald Bay is our featured community and where our spec homes are, but we build across Cedar Creek Lake wherever the right lot meets the right client. If you already own a lot elsewhere on the lake, that is the starting point for the conversation, not a problem.',
  },
  {
    question: 'Can I look at your floor plans?',
    answer:
      'Yes. Cedar Lux has floor plans you can start from, and we will walk you through them in a consultation. Using one is optional: a plan can be adapted to your lot, your layout, and your finishes, or we can design a home from scratch instead. Built examples are on our properties and homes for sale pages.',
  },
  {
    question: 'Do you have homes for sale, or do you only build to order?',
    answer:
      'Both. We build custom homes from scratch and curated spec homes for buyers who want a move in ready property. Current listings are on our homes for sale page, including 4529 Sapphire Way at $1,695,000 and 217 Autumn Wood Trail at $1,589,000.',
  },
  {
    question: 'What does a custom home on Cedar Creek Lake cost?',
    answer:
      'It depends on the lot, the size of the home, and the finish level, which is why budget is discussed in the first consultation, before any design work. For reference, our current finished spec homes are listed between $1,589,000 and $1,695,000.',
  },
  {
    question: 'I already own a lot on Cedar Creek Lake. Can you build on it?',
    answer:
      'Yes. The process starts with a site and design consultation where we walk the lot with you and talk through orientation, elevation, vision, timeline, and budget. From there we manage architecture, engineering, permitting, and construction as one point of contact.',
  },
  {
    question: 'How far is Cedar Creek Lake from Dallas?',
    answer:
      'About 60 minutes. Highway 175 puts you at the lake in under an hour from the 635 corridor, on a lake that covers 32,623 acres.',
  },
];

const textLink = 'text-lake font-bold underline underline-offset-2 hover:text-luxury-gold transition-colors';

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
            {companyName} designs and builds custom homes on Cedar Creek Lake — from modern lake houses to luxury waterfront residences, each one sited to its lot, whether it starts from an existing Cedar Lux plan or from a blank page.
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
                Big Water, Close to Dallas
              </h2>
              <p className="text-neutral-600 text-lg leading-relaxed mb-6">
                Cedar Creek Lake spans 32,623 acres, just 60 miles southeast of Dallas. Deep water, protected coves, and a growing base of luxury development have made it a serious destination for custom home construction, not just a weekend lake.
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
                { icon: <Anchor size={24} />, label: '32,623 Acres', desc: 'Plenty of open water and protected coves.' },
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

      {/* Homes for Sale */}
      <section className="py-28 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-luxury-gold mb-4">Available Homes</p>
            <h2 className="text-4xl md:text-5xl font-bold serif italic mb-6">Homes for Sale on Cedar Creek Lake</h2>
            <p className="text-neutral-500 text-lg leading-relaxed">
              Some buyers want to build from scratch. Others want a Cedar Lux home that is already underway or ready now. We build both custom homes and curated spec homes, to the same standard either way.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white rounded-3xl p-10">
              <p className="text-luxury-gold text-[10px] font-black uppercase tracking-widest mb-3">Emerald Bay</p>
              <h3 className="text-2xl font-bold serif italic mb-2">
                <Link href={SAPPHIRE_WAY_HREF} className="hover:text-luxury-gold transition-colors">4529 Sapphire Way</Link>
              </h3>
              <p className="text-3xl font-bold text-luxury-gold mb-3">$1,695,000</p>
              <p className="text-neutral-400 text-xs font-bold uppercase tracking-widest mb-4">4 bedrooms, 5 baths, 3,318 sq ft</p>
              <p className="text-neutral-500 leading-relaxed">
                A modern lake estate in the gated Emerald Bay community, with a protected water view from an 834 sq ft second floor terrace. Price includes one boat slip in the community shared marina.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-10">
              <h3 className="text-2xl font-bold serif italic mb-2">
                <Link href={AUTUMN_WOOD_HREF} className="hover:text-luxury-gold transition-colors">217 Autumn Wood Trail</Link>
              </h3>
              <p className="text-3xl font-bold text-luxury-gold mb-3">$1,589,000</p>
              <p className="text-neutral-400 text-xs font-bold uppercase tracking-widest">5 bedrooms, 4 baths, 3,467 sq ft</p>
            </div>
          </div>
          <p className="text-neutral-500">
            See all of our <Link href="/homes-for-sale" className={textLink}>current homes for sale</Link>.
          </p>
        </div>
      </section>

      {/* Floor Plans */}
      <section className="py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-luxury-gold mb-4">Floor Plans</p>
          <h2 className="text-4xl md:text-5xl font-bold serif italic mb-8">Floor Plans: Start From a Plan, or Start From Scratch</h2>
          <p className="text-neutral-500 text-lg leading-relaxed mb-6">
            You do not have to start with a blank page. Cedar Lux has floor plans you can use as a starting point. Choose a plan that fits how you want to live, and we adapt it to your lot: cove position, elevation, tree line, and sun path. Room layouts, sizes, and finishes can be adjusted from there.
          </p>
          <p className="text-neutral-500 text-lg leading-relaxed mb-6">
            Starting from a plan is optional, not required. If you would rather design from scratch, the architecture and planning stage produces a fully site specific plan instead. Either way, the plan that gets approved is the plan that gets built.
          </p>
          <p className="text-neutral-500 text-lg leading-relaxed mb-6">
            The homes on this site show what a starting point can become. <Link href={SAPPHIRE_WAY_HREF} className={textLink}>4529 Sapphire Way</Link> uses an open main level with the primary suite on the main floor, a flex space that works as a fifth bedroom, a dual staircase with floor to ceiling windows, and a second level loft and terrace oriented to the water.
          </p>
          <p className="text-neutral-500 text-lg leading-relaxed">
            Talk to us about building and we will walk you through the plans that fit your lot and your budget.
          </p>
        </div>
      </section>

      {/* Cost */}
      <section className="py-28 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-luxury-gold mb-4">Cost</p>
          <h2 className="text-4xl md:text-5xl font-bold serif italic mb-8">What a Cedar Creek Lake Custom Home Costs</h2>
          <p className="text-neutral-500 text-lg leading-relaxed mb-6">
            There is no honest single price for a custom home on Cedar Creek Lake, and any builder who publishes one without seeing your lot is guessing. Cost is driven by the lot itself (elevation, water orientation, and site work), the size and layout of the home, and the finish level you choose.
          </p>
          <p className="text-neutral-500 text-lg leading-relaxed mb-6">
            What we can tell you is where our finished homes sit. Our current spec homes are listed at $1,589,000 and $1,695,000, built to our standard finish level, which includes natural stone, quartz surfaces, engineered hardwoods, and a premium Thermador appliance package at Sapphire Way.
          </p>
          <p className="text-neutral-500 text-lg leading-relaxed">
            Budget is part of the first conversation, not the last one. In the site and design consultation we talk through vision, timeline, and budget before a single line is drawn, and we will tell you honestly what is possible at your number. Call <a href="tel:972-764-8687" className={textLink}>972-764-8687</a>.
          </p>
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

      {/* In the Press */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-luxury-gold mb-4">As Seen In</p>
            <h2 className="text-4xl md:text-5xl font-bold serif italic mb-6">In the Press</h2>
            <p className="text-neutral-500 text-lg leading-relaxed">Cedar Lux Properties has been featured in CandysDirt:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRESS_ITEMS.map(({ date, headline, desc, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-neutral-50 rounded-3xl p-10 hover:bg-neutral-100 transition-colors group"
              >
                <p className="text-luxury-gold text-[10px] font-black uppercase tracking-widest mb-3">CandysDirt · {date}</p>
                <p className="font-bold serif italic text-xl mb-3 leading-snug">"{headline}"</p>
                <p className="text-neutral-500 text-sm leading-relaxed mb-6">{desc}</p>
                <span className="inline-flex items-center gap-2 text-lake text-xs font-bold uppercase tracking-widest group-hover:gap-3 transition-all">
                  Read the Article <ArrowRight size={14} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <div className="mb-12">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-luxury-gold mb-4">FAQ</p>
            <h2 className="text-4xl md:text-5xl font-bold serif italic">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {CEDAR_CREEK_LAKE_FAQS.map(({ question, answer }) => (
              <div key={question} className="bg-white rounded-3xl p-8 md:p-10">
                <h3 className="text-xl font-bold mb-3">{question}</h3>
                <p className="text-neutral-500 leading-relaxed">{answer}</p>
              </div>
            ))}
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
