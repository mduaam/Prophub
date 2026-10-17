import type { Metadata } from 'next';
import DirectoryGrid from '@/components/directory/DirectoryGrid';
import { Layers, ShieldCheck, CheckCircle2, TrendingUp } from 'lucide-react';
import { TOOLS } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Real Estate Software Directory (2026) — PropEngine Hub',
  description: 'Explore and compare top-rated real estate investor and agent software. In-depth pricing, verified ratings, feature matrices, and exclusive free trial discounts.',
  keywords: [
    'real estate software',
    'deal analysis software',
    'best real estate investor tools',
    'real estate CRM comparison',
    'Showcase IDX vs Carrot',
    'DealCheck review',
    'PropStream discount',
  ],
};

export default function ToolsDirectoryPage() {
  return (
    <div className="py-12 space-y-12">
      {/* Directory Header */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" /> Curated Software Intelligence
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Real Estate Operator Software Directory
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Unbiased benchmarking of software platforms across deal analysis, motivated seller websites, IDX map search plugins, CRM automation, and property management.
          </p>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <DirectoryGrid />
      </div>

      {/* Editorial Methodology */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 border-t border-slate-800 pt-16">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-4xl mx-auto space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Our 5-Pillar Software Evaluation Methodology</h3>
              <p className="text-xs text-slate-400">How PropEngine Hub benchmarks and ranks platforms</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-slate-300">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
              <strong className="text-white block mb-1">1. Calculation & Data Accuracy</strong>
              Verification of mathematical formulas, MLS sync latency, and comps consistency.
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
              <strong className="text-white block mb-1">2. Speed to Value & Onboarding</strong>
              How quickly a solo operator or small team can achieve positive ROI without engineering support.
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
              <strong className="text-white block mb-1">3. Integration Compatibility</strong>
              Native support for Webhooks, Zapier, Meta Conversions API (CAPI), and modern CRMs.
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
              <strong className="text-white block mb-1">4. True Cost of Ownership</strong>
              Transparent auditing of monthly subscription tiers, add-on fees, and contract locks.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
