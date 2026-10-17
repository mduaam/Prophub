'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Calculator, 
  Layers, 
  MessageSquareCode, 
  FileText, 
  BarChart3, 
  ShieldCheck, 
  Menu, 
  X,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/calculators/brrrr-roi', label: 'BRRRR Calculator', icon: Calculator },
    { href: '/tools', label: 'Software Directory', icon: Layers },
    { href: '/tools/compare/dealcheck-vs-carrot', label: 'Compare Tools', icon: TrendingUp },
    { href: '/lead-magnet/brrrr-mastery-checklist', label: 'Playbooks & Guides', icon: FileText },
    { href: '/whatsapp-funnel', label: 'WhatsApp Bot Demo', icon: MessageSquareCode },
    { href: '/admin', label: 'Operator Stats', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      {/* Top Banner: FTC Affiliate Disclosure Bar */}
      <div className="bg-emerald-950/70 border-b border-emerald-800/40 px-4 py-1 text-xs text-emerald-300/90 flex items-center justify-between">
        <div className="container mx-auto flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2">
            <span className="font-semibold flex items-center gap-1 text-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> FTC Transparency:
            </span>
            <span>We independently test real estate tools. Outbound links may earn affiliate commission.</span>
          </div>
          <Link 
            href="/privacy" 
            className="hidden sm:inline-flex text-emerald-300 underline hover:text-emerald-100 transition-colors"
          >
            Review Policy
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <TrendingUp className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white">PropEngine</span>
              <span className="text-xs uppercase tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">Hub</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Real Estate Operator Growth & Tooling</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/calculators/brrrr-roi"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-semibold text-sm px-4 py-2 rounded-lg shadow-md shadow-emerald-500/20 transition-all hover:shadow-emerald-500/30"
          >
            <span>Analyze Deal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium ${
                  isActive
                    ? 'bg-slate-800 text-emerald-400'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 text-emerald-400" />
                {item.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <Link
              href="/calculators/brrrr-roi"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold py-2.5 rounded-lg text-sm"
            >
              Launch BRRRR Estimator
            </Link>
            <Link
              href="/whatsapp-funnel"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2.5 rounded-lg text-sm"
            >
              Test WhatsApp Ad Bot
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
