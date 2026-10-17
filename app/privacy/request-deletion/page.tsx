'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, ArrowRight, Lock } from 'lucide-react';

export default function RequestDeletionPage() {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    requestId: string;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/privacy/request-deletion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, reason }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      alert('Error submitting deletion request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12">
      <div className="container mx-auto max-w-xl px-4 sm:px-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">GDPR / CCPA Data Deletion Request</h1>
              <p className="text-xs text-slate-400">Request permanent purge or anonymization of your data.</p>
            </div>
          </div>

          {!result ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Enter the email address you previously used to download a playbook or analyze a deal on PropEngine Hub. We will delete any associated lead records and unsubscribe you from all marketing sequences within 30 days.
              </p>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Reason for Deletion (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Unsubscribe and purge all marketing profiles."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer"
              >
                {submitting ? 'Submitting Request...' : 'Submit Deletion Request'}
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Deletion Request Acknowledged</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {result.message}
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400">
                Ticket: {result.requestId}
              </div>
              <Link href="/" className="inline-block text-xs text-slate-400 hover:text-white underline pt-2">
                Return to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
