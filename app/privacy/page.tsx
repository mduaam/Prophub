import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, FileText, ArrowRight } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="py-12 space-y-12">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 space-y-8 text-slate-300 text-sm leading-relaxed">
        
        <div className="space-y-3 border-b border-slate-800 pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> Legal, Privacy & Compliance Hub
          </div>
          <h1 className="text-3xl font-extrabold text-white">Privacy Policy & Operator Disclosures</h1>
          <p className="text-xs text-slate-400">Last updated: October 16, 2026 · Compliant with GDPR, CCPA & FTC Regulations</p>
        </div>

        {/* Section 1: FTC Disclosure */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" /> 1. FTC Affiliate Disclosure
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            PropEngine Hub (accessible at propenginehub.com) is an educational real estate underwriting platform and independent software review directory. We maintain commercial affiliate relationships with software providers (including DealCheck, Showcase IDX, Carrot, LeadsBridge, Buildium, and PropStream). When you click an outbound link on our site and register for a trial or paid tier, PropEngine Hub may receive a referral commission or CPL payout. This compensation does NOT affect the mathematical formulas of our calculators, our rating criteria, or our editorial reviews.
          </p>
        </section>

        {/* Section 2: Data Collection & CAPI */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">2. Meta Conversions API (CAPI) & Server-Side Tracking</h2>
          <p>
            To optimize our paid advertising funnels and ensure accurate attribution for software trials, PropEngine Hub utilizes Meta Conversions API (CAPI). When you submit a lead form or request a downloadable PDF playbook:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-400">
            <li>Your email address and phone number are cryptographically hashed using SHA-256 before transmission.</li>
            <li>We transmit browser metadata (client IP, user agent) and unique event identifiers (<code className="text-emerald-400 font-mono">event_id</code>) for deduplication with browser pixels.</li>
            <li>We do not sell raw personal data to third-party ad brokers.</li>
          </ul>
        </section>

        {/* Section 3: WhatsApp Policy */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">3. WhatsApp Messaging & Communication Policy</h2>
          <p>
            When initiating a conversation via our Click-to-WhatsApp Meta Ads or website widget, you consent to receive automated qualification questions and real estate deal playbooks from the PropEngine Hub Growth Assistant. In accordance with WhatsApp Business Policy:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-400">
            <li>Conversations are only initiated upon explicit user opt-in.</li>
            <li>Free-form bot responses occur strictly within Meta&apos;s 24-hour customer service messaging window.</li>
            <li>You may opt out at any time by replying <strong>STOP</strong>.</li>
          </ul>
        </section>

        {/* Section 4: CCPA & GDPR */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white">4. GDPR & CCPA Your Rights: Data Access & Deletion</h2>
          <p className="text-xs text-slate-300">
            Under the California Consumer Privacy Act (CCPA) and European General Data Protection Regulation (GDPR), you have the right to request access to any personal data stored by PropEngine Hub, or request permanent deletion of your contact records.
          </p>
          <div>
            <Link
              href="/privacy/request-deletion"
              className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
            >
              <span>Submit GDPR / CCPA Data Deletion Request</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
