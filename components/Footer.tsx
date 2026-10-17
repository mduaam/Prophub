import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm">
      {/* FTC Disclosure Section */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 py-8 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-slate-950/80 p-5 rounded-xl border border-slate-800">
            <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-white font-semibold text-sm">Official FTC & Affiliate Transparency Disclosure</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                PropEngine Hub is an independent real estate software comparison and deal analysis publication. We test, rate, and underwrite software platforms using objective evaluation criteria. Some of the links on this website are affiliate links, which means that if you click on a partner link and register for a trial or purchase a plan, PropEngine Hub may receive a referral commission at no additional cost to you. This compensation does not dictate our calculation algorithms or rating scores.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-slate-950">
              P
            </div>
            <span className="text-lg font-bold text-white tracking-tight">PropEngine Hub</span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            The definitive real estate operator platform. Programmatic underwriting calculators, unbiased SaaS software reviews, and automated Meta Ads Click-to-WhatsApp funnels for investors, agents, and landlords.
          </p>
          <div className="pt-2 flex items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All Systems Operational</span>
            </div>
            <span>·</span>
            <span>Meta CAPI Server Active</span>
          </div>
        </div>

        <div>
          <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Calculators</h5>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/calculators/brrrr-roi" className="hover:text-emerald-400 transition-colors">
                BRRRR & ROI Estimator
              </Link>
            </li>
            <li>
              <Link href="/calculators/brrrr-roi?type=Rental" className="hover:text-emerald-400 transition-colors">
                Rental Cash Flow & NOI
              </Link>
            </li>
            <li>
              <Link href="/calculators/brrrr-roi?type=Flip" className="hover:text-emerald-400 transition-colors">
                Fix & Flip Margin Calculator
              </Link>
            </li>
            <li>
              <Link href="/calculators/brrrr-roi" className="hover:text-emerald-400 transition-colors">
                DSCR Refinance Sensitivity
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Software Directory</h5>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/tools/dealcheck" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                DealCheck Review <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </Link>
            </li>
            <li>
              <Link href="/tools/carrot" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                Carrot Inbound Sites <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </Link>
            </li>
            <li>
              <Link href="/tools/showcase-idx" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                Showcase IDX WordPress <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </Link>
            </li>
            <li>
              <Link href="/tools/leadsbridge" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                LeadsBridge Meta CAPI <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </Link>
            </li>
            <li>
              <Link href="/tools/propstream" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                PropStream Comps & Lists <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </Link>
            </li>
            <li>
              <Link href="/tools/compare/dealcheck-vs-carrot" className="hover:text-emerald-400 transition-colors">
                Side-by-Side Comparisons
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Compliance & Privacy</h5>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/privacy/request-deletion" className="hover:text-emerald-400 transition-colors">
                GDPR / CCPA Deletion
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/whatsapp-funnel" className="hover:text-emerald-400 transition-colors">
                WhatsApp Opt-In Terms
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-emerald-400 transition-colors">
                Operator Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-900 py-6 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PropEngine Hub. All rights reserved. Built for high-velocity real estate operators.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> partner@propenginehub.internal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
