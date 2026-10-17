import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Star, 
  Check, 
  X, 
  ExternalLink, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight, 
  Layers, 
  Sparkles,
  Building,
  DollarSign
} from 'lucide-react';
import { TOOLS } from '@/lib/db';

export async function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) return { title: 'Software Not Found — PropEngine Hub' };

  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
    },
  };
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);

  if (!tool || !tool.isActive) {
    notFound();
  }

  // JSON-LD Schemas: SoftwareApplication, AggregateRating, BreadcrumbList, FAQPage
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    operatingSystem: 'Web, iOS, Android',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: tool.pricing.tiers[0]?.price.replace('$', '') || '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tool.rating.toString(),
      reviewCount: tool.reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://propenginehub.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Software Directory',
        item: 'https://propenginehub.com/tools',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.name,
        item: `https://propenginehub.com/tools/${tool.slug}`,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // Alternatives
  const alternatives = TOOLS.filter((t) => t.id !== tool.id && t.isActive).slice(0, 3);

  return (
    <div className="py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Header */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        {/* Breadcrumb nav */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-white">Software Directory</Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">{tool.name}</span>
        </nav>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold uppercase tracking-wider text-xs border border-emerald-500/20">
                  {tool.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <strong className="text-white text-sm">{tool.rating}</strong>
                  <span>({tool.reviewCount.toLocaleString()} verified operator reviews)</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {tool.name}: Complete 2026 Review & Pricing
              </h1>

              <p className="text-base text-slate-300 leading-relaxed">
                {tool.tagline}
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                <span>Free Trial: <strong className="text-emerald-400">{tool.pricing.freeTrial}</strong></span>
                <span>·</span>
                <span>Starting At: <strong className="text-white">{tool.pricing.startingPrice}</strong></span>
              </div>
            </div>

            {/* Outbound CTA Box */}
            <div className="w-full lg:w-80 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 text-center shrink-0">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Official Offer</span>
                <p className="text-lg font-bold text-white">{tool.pricing.startingPrice}</p>
                <p className="text-xs text-emerald-400 font-medium">{tool.pricing.freeTrial}</p>
              </div>

              <a
                href={`/api/affiliate/redirect/${tool.slug}?source=review_hero_cta`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <span>Visit {tool.name}</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <p className="text-[10px] text-slate-500 leading-tight">
                Tracked outbound link. We may earn a commission with no added cost to you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Review Body */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8 space-y-10">
            {/* Detailed Description */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-white">Platform In-Depth Evaluation</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {tool.longDescription}
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                <strong className="text-emerald-400 block mb-1">Best Suited For:</strong>
                {tool.bestFor}
              </div>
            </section>

            {/* Pros and Cons */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-white">Pros & Cons</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> Advantages
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {tool.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <X className="w-4 h-4" /> Limitations
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {tool.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                        <X className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Pricing Tiers Table */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Pricing & Subscription Tiers</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Transparent breakdown of official plans</p>
                </div>
                <span className="text-xs text-emerald-400 font-semibold">{tool.pricing.freeTrial}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tool.pricing.tiers.map((tier, idx) => (
                  <div
                    key={idx}
                    className={`bg-slate-950 p-5 rounded-xl border ${
                      tier.popular ? 'border-emerald-500 shadow-md shadow-emerald-500/10' : 'border-slate-800'
                    } flex flex-col justify-between space-y-4 relative`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-extrabold text-[10px] uppercase">
                        Most Popular
                      </span>
                    )}

                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-white">{tier.name}</h4>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold text-white">{tier.price}</span>
                        <span className="text-xs text-slate-400">/{tier.billingPeriod}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{tier.description}</p>

                      <ul className="space-y-1.5 text-xs text-slate-300 pt-3 border-t border-slate-800">
                        {tier.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={`/api/affiliate/redirect/${tool.slug}?source=pricing_tier_${tier.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2 px-3 rounded-lg text-xs font-bold text-center transition-colors ${
                        tier.popular
                          ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700'
                      }`}
                    >
                      Choose {tier.name}
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* Verified Reviews */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Verified Operator Reviews</h2>
                <span className="text-xs text-slate-400">{tool.reviewCount} Ratings</span>
              </div>

              <div className="space-y-4">
                {tool.reviews.map((rev, i) => (
                  <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <strong className="text-white text-xs block">{rev.author}</strong>
                        <span className="text-[11px] text-slate-500">{rev.role}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(rev.rating)].map((_, s) => (
                          <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      &quot;{rev.comment}&quot;
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {tool.faqs.map((faq, i) => (
                  <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                    <h3 className="text-xs font-bold text-white flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-emerald-400" /> {faq.question}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Specs */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white">Quick Specifications</h3>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-500">Category:</span>
                  <span className="font-semibold text-white">{tool.category}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-500">Free Trial:</span>
                  <span className="font-semibold text-emerald-400">{tool.pricing.freeTrial}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-500">Platforms:</span>
                  <span className="font-semibold text-white">Web, iOS, Android</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-500">Cookie Window:</span>
                  <span className="font-semibold text-white">{tool.cookieDays} Days</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Official Website:</span>
                  <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                    {tool.websiteUrl.replace('https://', '')}
                  </a>
                </div>
              </div>

              <a
                href={`/api/affiliate/redirect/${tool.slug}?source=sidebar_specs`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all mt-4"
              >
                <span>Unlock {tool.name} Special Offer</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Alternatives */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white">Top Alternatives</h3>
              <div className="space-y-3">
                {alternatives.map((alt) => (
                  <Link
                    key={alt.id}
                    href={`/tools/${alt.slug}`}
                    className="block p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <strong className="text-white">{alt.name}</strong>
                      <span className="text-[11px] text-amber-400 flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400" /> {alt.rating}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{alt.tagline}</p>
                  </Link>
                ))}
              </div>

              <div className="pt-2 text-center">
                <Link
                  href={`/tools/compare/${tool.slug}-vs-carrot`}
                  className="text-xs font-semibold text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Compare {tool.name} vs Carrot</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
