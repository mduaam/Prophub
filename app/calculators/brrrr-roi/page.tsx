import type { Metadata } from 'next';
import Link from 'next/link';
import DealCalculator from '@/components/calculator/DealCalculator';
import { ShieldCheck, HelpCircle, CheckCircle, Calculator, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'BRRRR Calculator & Deal ROI Estimator (2026) — PropEngine Hub',
  description: 'Free interactive BRRRR real estate calculator. Accurately calculate cash left in deal, all-in project cost, DSCR refinance loan sizing, and infinite return mechanics.',
  keywords: [
    'BRRRR calculator',
    'real estate ROI calculator',
    'cash left in deal formula',
    'DSCR refinance calculator',
    'rental property cash flow',
    'cap rate calculator',
    'DealCheck alternative',
  ],
  openGraph: {
    title: 'BRRRR Calculator & Deal ROI Estimator (2026) — PropEngine Hub',
    description: 'Calculate holding costs, ARV refinance proceeds, and infinite returns without spreadsheet errors.',
  },
};

export default function BrrrrCalculatorPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does Cash Left in Deal mean in a BRRRR project?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cash Left in Deal represents the total capital an investor must leave in the property after closing their cash-out refinance. Formula: Total Project Cost (Purchase + Rehab + Closing + Holding Costs) minus Refinance Loan Amount. If this number is zero or negative, you have achieved an Infinite Return.',
        },
      },
      {
        '@type': 'Question',
        name: 'What minimum DSCR ratio do lenders require for a BRRRR cash-out refinance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most DSCR and conventional portfolio lenders require a minimum Debt Service Coverage Ratio (DSCR) of 1.20 to 1.25. This means your Net Operating Income (NOI) must exceed the monthly principal and interest debt payment by at least 20% to 25%.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do holding costs impact my BRRRR all-in cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Holding costs include hard money interest payments, property taxes, builder risk insurance, utilities, and HOA fees accrued while the home is vacant and undergoing construction. Over a 6-month rehab, holding costs often add $8,000 to $18,000 to the all-in basis.',
        },
      },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Underwrite a BRRRR Deal Step-by-Step',
    description: 'A 5-step institutional underwriting formula for calculating all-in capital and refinance proceeds.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Input Purchase and Rehab Costs',
        text: 'Enter the agreed purchase price and realistic contractor rehab estimate including a 10% contingency buffer.',
      },
      {
        '@type': 'HowToStep',
        name: 'Add Holding Costs and Timeline',
        text: 'Calculate loan interest, insurance, and utilities across the hold period (typically 4 to 8 months).',
      },
      {
        '@type': 'HowToStep',
        name: 'Estimate ARV and Refinance LTV',
        text: 'Determine the After Repair Value based on recent MLS comps and size your cash-out refinance (standard 75% LTV).',
      },
      {
        '@type': 'HowToStep',
        name: 'Check DSCR and Operating Cash Flow',
        text: 'Verify that monthly rent covers operating expenses, taxes, insurance, and new mortgage debt with DSCR >= 1.20.',
      },
    ],
  };

  return (
    <div className="py-12 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Header Container */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5" /> Institutional Real Estate Formula Engine
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            BRRRR Calculator & Deal ROI Estimator
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Eliminate spreadsheet rounding errors. Size your purchase discount, rehab contingencies, cash-out refinance loan, and evaluate whether your deal qualifies for a 100% capital pull-out (Infinite Return).
          </p>
        </div>
      </div>

      {/* Interactive Tool Component */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <DealCalculator />
      </div>

      {/* Educational Underwriting Guides & SEO Cluster */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 border-t border-slate-800 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-8 text-slate-300 text-sm leading-relaxed">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                The Mechanics of an Infinite Return in 2026
              </h2>
              <p>
                The BRRRR method (Buy, Rehab, Rent, Refinance, Repeat) is the most powerful wealth-compounding vehicle in real estate because it recycles the same capital into multiple cash-flowing assets. However, in higher interest rate environments, achieving an <strong>Infinite Return</strong> requires strict underwriting discipline:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
                <li><strong>The 75% Rule:</strong> Your purchase price + total rehab + closing + holding costs must not exceed 75% of the appraised ARV.</li>
                <li><strong>Holding Cost Drag:</strong> Underestimating hold time by just 60 days can add $3,000+ in hard money interest, wiping out your cash-out buffer.</li>
                <li><strong>DSCR Cliff:</strong> Even if your equity is huge, if monthly rents cannot service the refinance debt at 1.20x DSCR, lenders will force you to take a smaller loan, trapping your cash in the deal.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white tracking-tight">
                How DSCR is Evaluated by Private Refinance Lenders
              </h3>
              <p>
                DSCR (Debt Service Coverage Ratio) measures property cash flow adequacy without inspecting personal W-2 tax returns. 
              </p>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400">
                DSCR = Net Operating Income (NOI) / Monthly Principal & Interest (P&I)
              </div>
              <p>
                If your property generates $1,400 in net monthly NOI and your mortgage payment is $1,150, your DSCR is <strong>1.21</strong>. Lenders will gladly fund up to 75% or 80% LTV. If DSCR drops below 1.15, you may face higher origination points or loan amount reductions.
              </p>
            </div>

            {/* FAQs */}
            <div className="space-y-4 pt-6 border-t border-slate-800">
              <h3 className="text-xl font-bold text-white">Frequently Asked Underwriting Questions</h3>

              <div className="space-y-4">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1">
                  <h4 className="font-semibold text-white text-sm flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-400" /> What if my Cash Left in Deal is negative?
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    A negative Cash Left in Deal means your refinance proceeds were larger than your entire out-of-pocket project cost! You not only pulled 100% of your capital out, but also received extra tax-free cash at the closing table.
                  </p>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1">
                  <h4 className="font-semibold text-white text-sm flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-400" /> How do I get an institutional PDF report for my bank?
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Click the &quot;Save &amp; Export Lender-Ready Deal PDF&quot; button in the calculator. Our system formats your numbers with complete amortization schedules, sensitivity tables, and DSCR summaries.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Recommended Software for BRRRR */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                Top Underwriting Software
              </span>
              <h4 className="text-base font-bold text-white">DealCheck Underwriting Suite</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Need to import live MLS property comps, verify county tax assessor bills, and model multi-scenario rehab bids? DealCheck is our top-rated operator tool.
              </p>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Rating:</span>
                  <span className="text-amber-400 font-bold">4.9 / 5.0 (1,840+ reviews)</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Free Trial:</span>
                  <span className="text-emerald-400 font-bold">14 Days (Full Pro Access)</span>
                </div>
              </div>

              <a
                href="/api/affiliate/redirect/dealcheck?source=brrrr_calculator_sidebar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>Visit DealCheck Official</span>
                <TrendingUp className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400 block">
                Free Downloadable Guide
              </span>
              <h4 className="text-sm font-bold text-white">The 2026 BRRRR Refinance Blueprint</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                42-point due diligence checklist to guarantee your appraiser hits target ARV and your lender clears refinance underwriting.
              </p>
              <Link
                href="/lead-magnet/brrrr-mastery-checklist"
                className="inline-block text-xs font-bold text-emerald-400 hover:text-emerald-300 underline"
              >
                Download Free 18-Page PDF →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
