import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Check, 
  X, 
  Star, 
  ExternalLink, 
  ArrowRight, 
  Trophy, 
  Sparkles, 
  ShieldCheck,
  Scale
} from 'lucide-react';
import { TOOLS } from '@/lib/db';

export async function generateStaticParams() {
  const comparisons = [
    { slug: 'dealcheck-vs-carrot' },
    { slug: 'dealcheck-vs-propstream' },
    { slug: 'showcase-idx-vs-carrot' },
    { slug: 'leadsbridge-vs-carrot' },
  ];
  return comparisons;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const parts = slug.split('-vs-');
  if (parts.length !== 2) return { title: 'Software Comparison — PropEngine Hub' };

  const toolA = TOOLS.find((t) => t.slug === parts[0]);
  const toolB = TOOLS.find((t) => t.slug === parts[1]);

  if (!toolA || !toolB) return { title: 'Comparison Not Found — PropEngine Hub' };

  const title = `${toolA.name} vs ${toolB.name} (2026 Comparison): Features, Pricing & Verdict`;
  const description = `Unbiased comparison of ${toolA.name} vs ${toolB.name}. Compare underwriting capabilities, pricing tiers, lead capture speed, and find which software fits your real estate strategy.`;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function ToolComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const parts = slug.split('-vs-');
  if (parts.length !== 2) {
    notFound();
  }

  const toolA = TOOLS.find((t) => t.slug === parts[0]);
  const toolB = TOOLS.find((t) => t.slug === parts[1]);

  if (!toolA || !toolB || !toolA.isActive || !toolB.isActive) {
    notFound();
  }

  // Schema.org FAQPage for comparison queries
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the key difference between ${toolA.name} and ${toolB.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${toolA.name} is primarily tailored for ${toolA.category.toLowerCase()} (${toolA.bestFor}), whereas ${toolB.name} excels at ${toolB.category.toLowerCase()} (${toolB.bestFor}).`,
        },
      },
      {
        '@type': 'Question',
        name: `Which is more affordable: ${toolA.name} or ${toolB.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${toolA.name} starts at ${toolA.pricing.startingPrice} (${toolA.pricing.freeTrial}), while ${toolB.name} starts at ${toolB.pricing.startingPrice} (${toolB.pricing.freeTrial}).`,
        },
      },
    ],
  };

  // Determine winner recommendation based on priority or category
  const higherPriorityTool = toolA.priority >= toolB.priority ? toolA : toolB;

  return (
    <div className="py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-white">Software Directory</Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">{toolA.name} vs {toolB.name}</span>
        </nav>

        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Scale className="w-3.5 h-3.5" /> Side-by-Side Head-to-Head Comparison
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {toolA.name} vs {toolB.name}
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Which software should you run your real estate business on in 2026? We benchmarked features, pricing tiers, integration workflows, and operator reviews.
          </p>
        </div>
      </div>

      {/* Side-by-Side Cards */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Tool A Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  {toolA.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <strong className="text-white">{toolA.rating}</strong>
                  <span>({toolA.reviewCount})</span>
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white">{toolA.name}</h2>
              <p className="text-xs text-slate-300 leading-relaxed">{toolA.tagline}</p>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between text-xs">
                <span className="text-slate-400">Starting Price:</span>
                <span className="font-bold text-white">{toolA.pricing.startingPrice}</span>
              </div>

              <div>
                <span className="text-xs font-bold text-white block mb-2">Key Strengths:</span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {toolA.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              <a
                href={`/api/affiliate/redirect/${toolA.slug}?source=compare_table_cta`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
              >
                <span>Visit {toolA.name} ({toolA.pricing.freeTrial})</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <Link
                href={`/tools/${toolA.slug}`}
                className="block text-center text-xs text-slate-400 hover:text-white"
              >
                Read full {toolA.name} review →
              </Link>
            </div>
          </div>

          {/* Tool B Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-teal-400 font-semibold px-2.5 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">
                  {toolB.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <strong className="text-white">{toolB.rating}</strong>
                  <span>({toolB.reviewCount})</span>
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white">{toolB.name}</h2>
              <p className="text-xs text-slate-300 leading-relaxed">{toolB.tagline}</p>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between text-xs">
                <span className="text-slate-400">Starting Price:</span>
                <span className="font-bold text-white">{toolB.pricing.startingPrice}</span>
              </div>

              <div>
                <span className="text-xs font-bold text-white block mb-2">Key Strengths:</span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {toolB.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              <a
                href={`/api/affiliate/redirect/${toolB.slug}?source=compare_table_cta`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-500/10 cursor-pointer"
              >
                <span>Visit {toolB.name} ({toolB.pricing.freeTrial})</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <Link
                href={`/tools/${toolB.slug}`}
                className="block text-center text-xs text-slate-400 hover:text-white"
              >
                Read full {toolB.name} review →
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Winner Verdict Box */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-teal-950/70 border border-emerald-500/40 rounded-3xl p-8 shadow-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">The Editorial Verdict</span>
              <h3 className="text-xl font-bold text-white">Which One Should You Choose?</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 pt-2 leading-relaxed">
            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
              <strong className="text-white text-sm block">Choose {toolA.name} if:</strong>
              <p>Your primary bottleneck is {toolA.bestFor}. It offers the cleanest workflow for {toolA.category.toLowerCase()}.</p>
              <a
                href={`/api/affiliate/redirect/${toolA.slug}?source=verdict_a`}
                className="inline-flex items-center gap-1 text-emerald-400 hover:underline font-bold pt-1"
              >
                <span>Claim {toolA.name} Free Trial</span> <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
              <strong className="text-white text-sm block">Choose {toolB.name} if:</strong>
              <p>You need {toolB.bestFor}. It excels in {toolB.category.toLowerCase()} across modern multi-channel funnels.</p>
              <a
                href={`/api/affiliate/redirect/${toolB.slug}?source=verdict_b`}
                className="inline-flex items-center gap-1 text-teal-400 hover:underline font-bold pt-1"
              >
                <span>Claim {toolB.name} Free Trial</span> <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
