import React from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  Layers, 
  MessageSquareCode, 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  Zap, 
  DollarSign, 
  FileText,
  Building2,
  Users,
  Compass
} from 'lucide-react';
import DealCalculator from '@/components/calculator/DealCalculator';
import DirectoryGrid from '@/components/directory/DirectoryGrid';
import { TOOLS, LEAD_MAGNETS } from '@/lib/db';

export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 border-b border-slate-800/80 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/40 via-slate-950 to-slate-950">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Persona Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Programmatic Real Estate Growth Engine v1.0</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Underwrite Deals Faster. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Scale Investor & Agent Pipelines.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              PropEngine Hub combines instant sub-100ms BRRRR deal underwriting, unbiased real estate software comparisons, and automated Meta Ads Click-to-WhatsApp funnels with server-side CAPI attribution.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/calculators/brrrr-roi"
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-slate-950" />
                <span>Launch Deal Estimator</span>
              </Link>
              <Link
                href="/tools"
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold px-6 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Layers className="w-4 h-4 text-slate-400" />
                <span>Browse Software Directory</span>
              </Link>
              <Link
                href="/whatsapp-funnel"
                className="w-full sm:w-auto bg-slate-900/60 hover:bg-slate-800/80 text-emerald-400 border border-emerald-500/30 font-medium px-4 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquareCode className="w-4 h-4 text-emerald-400" />
                <span>Test WhatsApp Bot</span>
              </Link>
            </div>

            {/* Live Metrics Ticker */}
            <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-slate-800/80 text-left">
              <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/50">
                <span className="text-xs text-slate-400 block">Deals Underwritten</span>
                <span className="text-2xl font-bold text-white">$14.2M+</span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">Sub-100ms client math</span>
              </div>
              <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/50">
                <span className="text-xs text-slate-400 block">Verified Software</span>
                <span className="text-2xl font-bold text-emerald-400">{TOOLS.length} Reviewed</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Unbiased benchmarks</span>
              </div>
              <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/50">
                <span className="text-xs text-slate-400 block">WhatsApp Qualification</span>
                <span className="text-2xl font-bold text-teal-300">88.4%</span>
                <span className="text-[10px] text-teal-400 block mt-0.5">Automated bot completion</span>
              </div>
              <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/50">
                <span className="text-xs text-slate-400 block">Meta CAPI Tracking</span>
                <span className="text-2xl font-bold text-cyan-300">100%</span>
                <span className="text-[10px] text-cyan-400 block mt-0.5">SHA-256 server events</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Flagship Feature Section: Interactive BRRRR Deal Estimator */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="space-y-4 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5" /> Engine 1: Deal Underwriting & Refinance Mechanics
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Calculate Cash Left in Deal & DSCR Refinance Limits
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            Standard calculators hide holding costs and DSCR constraints. Test any property assumption below with live pro forma updates.
          </p>
        </div>

        <DealCalculator />
      </section>

      {/* Feature 2: Software Directory & Comparison Showcase */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-teal-500/10 text-teal-400 text-xs font-semibold mb-2">
              <Layers className="w-3.5 h-3.5" /> Engine 2: Unbiased Real Estate Software Directory
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Compare Top Real Estate Operator SaaS
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mt-1 leading-relaxed">
              We test deal analysis tools, IDX search plugins, motivated seller websites, and CRM lead sync platforms.
            </p>
          </div>

          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
          >
            <span>View All {TOOLS.length} Software Reviews</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <DirectoryGrid />
      </section>

      {/* Feature 3: Paid Social to WhatsApp Funnel Architecture */}
      <section className="bg-slate-900/60 border-y border-slate-800 py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                <MessageSquareCode className="w-3.5 h-3.5" /> Engine 3: Paid Ads → WhatsApp Automation
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                Stop Losing 60% of Ad Leads to Slow Web Forms
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Traditional real estate ad funnels force buyers and sellers to fill out cumbersome multi-step landing page forms where drop-off exceeds 65%. 
              </p>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3 p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Sub-30-Second Speed-to-Lead:</strong> Automated WhatsApp chatbot immediately greets inbound prospects and asks 3 qualification questions.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Server-Side Meta CAPI Attribution:</strong> Eliminates iOS ad-blocking losses by firing hashed phone and email events server-side with matching event_id.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">High-Intent Routing:</strong> High-budget investors receive DealCheck trial links, while licensed agents receive Carrot seller sites.
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/whatsapp-funnel"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  <span>Launch Live WhatsApp Simulator</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
                <span className="font-semibold text-white">Funnel Architecture Flow</span>
                <span className="text-emerald-400 font-mono text-[11px]">Next.js + CAPI + ManyChat</span>
              </div>

              {/* Step By Step Visual Flow */}
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">1</span>
                    <div>
                      <span className="text-white font-semibold">Meta Paid Ad Impression</span>
                      <p className="text-[11px] text-slate-400">Click-to-WhatsApp pre-filled message hook</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Meta Graph</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">2</span>
                    <div>
                      <span className="text-white font-semibold">/api/whatsapp-webhook</span>
                      <p className="text-[11px] text-slate-400">Signature verification + lead upsert in Supabase</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono">200 OK</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xs">3</span>
                    <div>
                      <span className="text-white font-semibold">Automated Qualification Bot</span>
                      <p className="text-[11px] text-slate-400">Filters persona, market, timeline & budget</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-teal-400 font-mono">State Machine</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">4</span>
                    <div>
                      <span className="text-white font-semibold">Server-Side Meta CAPI Event</span>
                      <p className="text-[11px] text-slate-400">SHA-256 hashed phone/email with event_id</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-mono">Lead Event</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 4: Lead Magnets & Playbooks */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5" /> High-Converting Playbooks & Guides
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Download Free Institutional Underwriting Playbooks
          </h2>
          <p className="text-sm text-slate-400">
            Field-tested PDF blueprints designed for active investors, licensed brokers, and landlords.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LEAD_MAGNETS.map((guide) => (
            <div
              key={guide.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between hover:border-emerald-500/40 transition-colors"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                  {guide.badge}
                </span>

                <h3 className="text-base font-bold text-white leading-snug">
                  {guide.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {guide.subtitle}
                </p>

                <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800/80">
                  <span>{guide.pages} Pages (PDF)</span>
                  <span className="text-emerald-400">{guide.downloadCount.toLocaleString()} downloads</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80">
                <Link
                  href={`/lead-magnet/${guide.slug}`}
                  className="w-full bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Download Free Blueprint</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Operator Testimonials & Social Proof */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 border-t border-slate-800/80 pt-16">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">Verified Real Estate Operator Reviews</span>
          <h2 className="text-2xl font-bold text-white">Trusted by Top Producers & Acquirers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              &quot;The BRRRR calculator on PropEngine Hub saved us from making a $40,000 mistake on a Dallas duplex. The DSCR sensitivity table showed our refi would fail at 7.5% rates.&quot;
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-xs">
              <strong className="text-white block">Jason Carmichael</strong>
              <span className="text-slate-500 text-[11px]">Managing Partner, Apex Capital Partners (38 doors)</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              &quot;Switching our Meta Ads to Click-to-WhatsApp using their playbook dropped our CPL from $42 to $16.50. The leads are pre-qualified before my agents pick up the phone.&quot;
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-xs">
              <strong className="text-white block">Melissa Ruiz</strong>
              <span className="text-slate-500 text-[11px]">Team Leader, Keller Williams Premier ($32M volume)</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              &quot;The software reviews are completely transparent. Rather than generic lists, they break down exact pricing tiers and feature tradeoffs between DealCheck and Carrot.&quot;
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-xs">
              <strong className="text-white block">Tariq Al-Mansoor</strong>
              <span className="text-slate-500 text-[11px]">Independent Wholesaler & Syndicator, Phoenix AZ</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
