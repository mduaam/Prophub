import type { Metadata } from 'next';
import WhatsAppSimulator from '@/components/whatsapp/WhatsAppSimulator';
import { MessageSquareCode, ShieldCheck, Zap, Database, Terminal, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Paid Ads to WhatsApp Automation Engine — PropEngine Hub',
  description: 'Test the Click-to-WhatsApp real estate lead funnel. See how Meta Ads route prospects to automated qualification bots and fire server-side Conversions API (CAPI) events.',
  keywords: [
    'Click-to-WhatsApp real estate',
    'Meta CAPI lead generation',
    'WhatsApp real estate bot',
    'ManyChat real estate template',
    'real estate speed to lead',
  ],
};

export default function WhatsAppFunnelPage() {
  return (
    <div className="py-12 space-y-16">
      {/* Page Header */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <MessageSquareCode className="w-3.5 h-3.5" /> High-Velocity Paid Social Pipeline
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Click-to-WhatsApp Real Estate Growth Funnel
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Eliminate landing page drop-off. Send Meta Ads directly into a conversational WhatsApp bot that qualifies investors, agents, or landlords in seconds — integrated with server-side CAPI event deduplication.
          </p>
        </div>
      </div>

      {/* Interactive Simulator */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <WhatsAppSimulator />
      </div>

      {/* Technical Architecture Details */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 border-t border-slate-800 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl w-fit">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Sub-30-Second Speed to Lead</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When a motivated seller or investor taps a Meta Ad, WhatsApp opens with a pre-filled trigger message. The bot engages immediately, before interest cools.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl w-fit">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">State Machine Qualification</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              The conversation progresses through 4 distinct stages (Role → Market → Timeline → Asset). Qualified contacts receive tailored PDF playbooks and priority affiliate trials.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="p-2.5 bg-teal-500/10 text-teal-400 rounded-xl w-fit">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Server-Side Meta CAPI</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upon qualifying, our Next.js backend generates SHA-256 hashed customer parameters (<code className="text-emerald-400">em</code>, <code className="text-emerald-400">ph</code>) and fires a server-side <code className="text-emerald-400">Lead</code> event to train Meta&apos;s ad algorithm.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
