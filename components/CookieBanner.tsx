'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('pe_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('pe_cookie_consent', 'accepted');
    setVisible(false);
  };

  const declineNonEssential = () => {
    localStorage.setItem('pe_cookie_consent', 'essential_only');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-50 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-2xl p-5 text-slate-200 text-xs animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
          <Cookie className="w-4 h-4" />
          <span>Privacy & Cookie Consent</span>
        </div>
        <button
          onClick={declineNonEssential}
          className="text-slate-400 hover:text-white p-1 rounded-md"
          aria-label="Close cookie banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-slate-400 mb-4 leading-relaxed">
        We use essential cookies and server-side event tracking (including Meta Conversions API) to measure calculator performance, attribute affiliate software trials, and optimize lead delivery in compliance with CCPA & GDPR.
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={acceptAll}
          className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold py-2 px-3 rounded-lg text-center transition-colors shadow-sm"
        >
          Accept & Continue
        </button>
        <button
          onClick={declineNonEssential}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 px-3 rounded-lg transition-colors border border-slate-700"
        >
          Essential Only
        </button>
      </div>

      <div className="mt-2 text-center">
        <Link href="/privacy" className="text-[11px] text-slate-500 hover:text-slate-300 underline">
          Read Full Privacy & Cookie Policy
        </Link>
      </div>
    </div>
  );
}
