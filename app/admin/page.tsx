'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Users, 
  MousePointerClick, 
  DollarSign, 
  MessageSquare, 
  ShieldCheck, 
  RefreshCw, 
  ArrowUpRight,
  TrendingUp,
  Terminal,
  Activity
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [data, setData] = useState<{
    summary: {
      totalLeads: number;
      qualifiedLeads: number;
      qualificationRate: number;
      totalClicks: number;
      conversions: number;
      conversionRate: number;
      totalPayout: number;
      epc: number;
      conversationsCount: number;
      activeToolsCount: number;
      capiEventsCount: number;
    };
    recentLeads: Array<{
      id: string;
      fullName: string;
      email: string;
      phone?: string;
      persona: string;
      source: string;
      leadScore: number;
      status: string;
      consentMarketing: boolean;
      createdAt: string;
    }>;
    recentClicks: Array<{
      id: string;
      clickId: string;
      toolName: string;
      source?: string;
      destinationUrl: string;
      converted: boolean;
      payout?: number;
      createdAt: string;
    }>;
    conversations: Array<{
      id: string;
      waId: string;
      phone: string;
      profileName: string;
      state: string;
      lastMessageAt: string;
    }>;
    capiEvents: Array<{
      eventName: string;
      eventId: string;
      sentToMeta: boolean;
      createdAt: string;
    }>;
  } | null>(null);

  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/stats');
      const json = await res.json();
      setData(json);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    fetch('/api/stats')
      .then((res) => res.json())
      .then((json) => {
        if (active) setData(json);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="py-12 space-y-10">
      {/* Dashboard Top Header */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                <BarChart3 className="w-5 h-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Operator Growth & Monetization Engine
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Live server-side attribution, Meta CAPI event delivery, and affiliate click reconciliation.
            </p>
          </div>

          <button
            onClick={fetchStats}
            disabled={loading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Telemetry</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      {data && (
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total Leads Captured</span>
                <Users className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-bold text-white">{data.summary.totalLeads}</p>
              <div className="text-[11px] text-emerald-400">
                {data.summary.qualificationRate.toFixed(1)}% Qualified Rate
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Tracked Affiliate Clicks</span>
                <MousePointerClick className="w-4 h-4 text-teal-400" />
              </div>
              <p className="text-2xl font-bold text-white">{data.summary.totalClicks}</p>
              <div className="text-[11px] text-teal-400">
                {data.summary.conversionRate.toFixed(1)}% Trial Conversion
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Earned Commissions</span>
                <DollarSign className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl font-bold text-white">${data.summary.totalPayout.toFixed(2)}</p>
              <div className="text-[11px] text-slate-400">
                EPC: <strong className="text-white">${data.summary.epc.toFixed(2)}</strong>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>CAPI Server Dispatches</span>
                <Activity className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-2xl font-bold text-white">{data.summary.capiEventsCount}</p>
              <div className="text-[11px] text-cyan-400">
                100% SHA-256 Hashed
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tables: Recent Leads & Affiliate Clicks */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-8">
        
        {/* Recent Ingested Leads */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" /> Live Ingested Leads & Compliance Consents
            </h3>
            <span className="text-xs text-slate-400">Auto-scored in database</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-3">Lead Name & Email</th>
                  <th className="py-3 px-3">Persona</th>
                  <th className="py-3 px-3">Source</th>
                  <th className="py-3 px-3">Score</th>
                  <th className="py-3 px-3">Consent</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {data?.recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/40">
                    <td className="py-3 px-3">
                      <strong className="text-white block">{lead.fullName}</strong>
                      <span className="text-[11px] text-slate-500 font-mono">{lead.email}</span>
                    </td>
                    <td className="py-3 px-3 capitalize">{lead.persona}</td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-400">{lead.source}</td>
                    <td className="py-3 px-3 font-bold text-emerald-400">{lead.leadScore}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${lead.consentMarketing ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                        {lead.consentMarketing ? 'Marketing OK' : 'Transactional'}
                      </span>
                    </td>
                    <td className="py-3 px-3 capitalize font-semibold">{lead.status}</td>
                    <td className="py-3 px-3 text-slate-500 text-[10px] whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Affiliate Outbound Clicks */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MousePointerClick className="w-4 h-4 text-teal-400" /> Outbound Affiliate Clicks & SubID Attribution
            </h3>
            <span className="text-xs text-slate-400">Logged via /api/affiliate/redirect</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-3">Software Tool</th>
                  <th className="py-3 px-3">Click ID (UUID)</th>
                  <th className="py-3 px-3">Source Channel</th>
                  <th className="py-3 px-3">Conversion Status</th>
                  <th className="py-3 px-3">Payout</th>
                  <th className="py-3 px-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {data?.recentClicks.map((click) => (
                  <tr key={click.id} className="hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-semibold text-white">{click.toolName}</td>
                    <td className="py-3 px-3 font-mono text-[10px] text-slate-400">{click.clickId.substring(0, 18)}...</td>
                    <td className="py-3 px-3 text-slate-300">{click.source || 'directory'}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${click.converted ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'}`}>
                        {click.converted ? 'Converted Sale' : 'Outbound Click'}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-white">${(click.payout || 0).toFixed(2)}</td>
                    <td className="py-3 px-3 text-slate-500 text-[10px] whitespace-nowrap">
                      {new Date(click.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
