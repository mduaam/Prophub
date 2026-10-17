'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound, useSearchParams } from 'next/navigation';
import { 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  Star,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { LEAD_MAGNETS, TOOLS } from '@/lib/db';
import { PersonaType } from '@/lib/types';

export default function LeadMagnetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const downloadToken = searchParams.get('download_token');
  const isDirectSuccess = searchParams.get('success') === '1';

  const guide = LEAD_MAGNETS.find((g) => g.slug === slug);
  if (!guide) notFound();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    persona: guide.persona,
    consentMarketing: true,
    consentSms: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [downloadReady, setDownloadReady] = useState(isDirectSuccess && !!downloadToken);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recommendedTool = TOOLS.find((t) => t.slug === guide.affiliateToolSlug) || TOOLS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          fullName: form.fullName,
          phone: form.phone || undefined,
          persona: form.persona,
          source: `lead_magnet_${guide.slug}`,
          leadMagnetId: guide.slug,
          consentMarketing: form.consentMarketing,
          consentSms: form.consentSms,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.message || 'Error processing request');
      }

      setDownloadReady(true);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to unlock download');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 space-y-16">
      {/* Header & Hero */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Prop & Key Takeaways */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Complimentarily Unlocked by PropEngine Hub
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {guide.title}
            </h1>

            <p className="text-base text-slate-300 leading-relaxed">
              {guide.subtitle}
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-400 border-y border-slate-800 py-3">
              <span>Pages: <strong className="text-white">{guide.pages} pages (PDF)</strong></span>
              <span>·</span>
              <span>Format: <strong className="text-emerald-400">Instant Digital Download</strong></span>
              <span>·</span>
              <span>Downloads: <strong className="text-white">{guide.downloadCount.toLocaleString()}</strong></span>
            </div>

            {/* Key Takeaways Checklist */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Inside This Operator Playbook:
              </h3>
              <div className="space-y-2.5">
                {guide.keyTakeaways.map((takeaway, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Download Form / Unlocked Reader */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              
              {!downloadReady ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                      <Download className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Instant Playbook Download</h3>
                      <p className="text-xs text-slate-400">Zero cost. Direct PDF access sent to your inbox.</p>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-lg text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Taylor Ross"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Work or Primary Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="taylor@portfolio-capital.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Your Persona</label>
                    <select
                      value={form.persona}
                      onChange={(e) => setForm({ ...form, persona: e.target.value as PersonaType })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="investor">Real Estate Investor (BRRRR / Flipping)</option>
                      <option value="agent">Licensed Agent or Team Lead</option>
                      <option value="landlord">Landlord / Property Manager</option>
                    </select>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                    <label className="flex items-start gap-2 text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={form.consentMarketing}
                        onChange={(e) => setForm({ ...form, consentMarketing: e.target.checked })}
                        className="mt-0.5 accent-emerald-500"
                      />
                      <span>I agree to receive the playbook PDF and real estate software updates via email.</span>
                    </label>

                    <label className="flex items-start gap-2 text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.consentSms}
                        onChange={(e) => setForm({ ...form, consentSms: e.target.checked })}
                        className="mt-0.5 accent-emerald-500"
                      />
                      <span>Receive SMS notifications for updated deal formulas and rate cuts.</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-slate-950 font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
                  >
                    {submitting ? (
                      <span>Dispatching Meta CAPI & Unlocking...</span>
                    ) : (
                      <>
                        <span>Get Instant Free PDF Access</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                    <Lock className="w-3 h-3" />
                    <span>256-bit SSL encrypted. No spam guaranteed.</span>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-5">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase text-emerald-400 tracking-wider">Access Unlocked</span>
                    <h3 className="text-xl font-bold text-white mt-1">Your Blueprint is Ready!</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      A copy has been sent to your email. You can also download or view the PDF guide right now below.
                    </p>
                  </div>

                  {/* Interactive PDF Reader Preview Box */}
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-left space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-white">{guide.title}.pdf</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">
                        VERIFIED
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      Includes the 42-point due diligence audit checklist, LTV sensitivity matrix, and DSCR stress-testing formulas.
                    </p>

                    <button
                      onClick={() => alert(`Simulating PDF download for "${guide.title}". Document verified and delivered!`)}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF ({guide.pages} Pages)</span>
                    </button>
                  </div>

                  {/* Contextual Affiliate Partner Recommendation */}
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-emerald-500/30 text-left space-y-2">
                    <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider block">
                      Recommended Software Pairing
                    </span>
                    <h4 className="text-xs font-bold text-white">
                      Automate these calculations with {recommendedTool.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {recommendedTool.description}
                    </p>
                    <a
                      href={`/api/affiliate/redirect/${recommendedTool.slug}?source=lead_magnet_unlocked`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:underline pt-1"
                    >
                      <span>Claim {recommendedTool.name} Free Trial ({recommendedTool.pricing.freeTrial})</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
