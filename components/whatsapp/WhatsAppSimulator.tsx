'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  Send, 
  Smartphone, 
  Sparkles, 
  CheckCheck, 
  ExternalLink, 
  RefreshCw, 
  ShieldCheck, 
  Terminal,
  Zap,
  ArrowRight
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export default function WhatsAppSimulator() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init_1',
      sender: 'bot',
      text: "👋 Welcome to PropEngine Hub Growth Assistant!\n\nTo tailor your real estate growth toolkit and deal templates, which best describes you?\n\n1️⃣ Real Estate Investor (BRRRR, Flips, Wholesaling)\n2️⃣ Licensed Agent or Broker (Buyer/Seller leads)\n3️⃣ Landlord or Property Manager (Rentals & Multi-family)\n\nReply with 1, 2, or 3.",
      timestamp: '10:02 AM',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverLog, setServerLog] = useState<{
    webhookStatus: string;
    conversationState: string;
    leadQualified: boolean;
    capiDispatched: boolean;
    payloadSnippet: string;
  }>({
    webhookStatus: 'LISTENING',
    conversationState: 'new',
    leadQualified: false,
    capiDispatched: false,
    payloadSnippet: 'Ready for inbound WhatsApp webhook payload.',
  });

  const sendUserMessage = async (customText?: string) => {
    const textToSend = customText || inputVal;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setLoading(true);

    try {
      const response = await fetch('/api/whatsapp-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: '+15551234567',
          wa_id: '15551234567',
          name: 'Growth Operator',
          message: textToSend,
        }),
      });

      const data = await response.json();

      if (data.ok && data.reply) {
        const botMsg: ChatMessage = {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);

        setServerLog({
          webhookStatus: '200 OK (Processed)',
          conversationState: data.state || 'active',
          leadQualified: !!data.leadQualified,
          capiDispatched: !!data.leadQualified,
          payloadSnippet: JSON.stringify(data, null, 2),
        });
      }
    } catch {
      setServerLog((prev) => ({
        ...prev,
        webhookStatus: '500 ERROR',
        payloadSnippet: 'Failed to communicate with /api/whatsapp-webhook',
      }));
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'init_1',
        sender: 'bot',
        text: "👋 Welcome to PropEngine Hub Growth Assistant!\n\nTo tailor your real estate growth toolkit and deal templates, which best describes you?\n\n1️⃣ Real Estate Investor (BRRRR, Flips, Wholesaling)\n2️⃣ Licensed Agent or Broker (Buyer/Seller leads)\n3️⃣ Landlord or Property Manager (Rentals & Multi-family)\n\nReply with 1, 2, or 3.",
        timestamp: '10:02 AM',
      },
    ]);
    setServerLog({
      webhookStatus: 'RESET',
      conversationState: 'new',
      leadQualified: false,
      capiDispatched: false,
      payloadSnippet: 'Chat reset. State is new.',
    });
  };

  return (
    <div className="space-y-8">
      {/* Overview header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                <Zap className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">Paid Social → Click-to-WhatsApp Engine</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Test how Meta Ads send traffic directly into an automated WhatsApp bot that qualifies leads, collects criteria, and fires server-side CAPI events.
            </p>
          </div>

          <button
            onClick={resetChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Flow</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Meta Ad Mockup */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> Meta Feed Ad Preview
              </span>
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20 text-[10px]">
                Sponsored
              </span>
            </div>

            {/* Ad Sponsor profile */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-950 text-sm">
                P
              </div>
              <div>
                <p className="text-xs font-bold text-white">PropEngine Hub</p>
                <p className="text-[10px] text-slate-400">Real Estate Growth & Underwriting</p>
              </div>
            </div>

            {/* Ad Copy */}
            <p className="text-xs text-slate-300 leading-relaxed">
              Tired of spreadsheet errors killing your deals? Calculate exact ARV, refinance loan proceeds, and holding costs in 60 seconds. Tap below to chat with our Deal Bot on WhatsApp and unlock the <strong>2026 BRRRR Refinance Blueprint</strong> free! 🏡🚀
            </p>

            {/* Ad Creative Image Placeholder */}
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 p-6 text-center">
              <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                2026 BRRRR Refinance Blueprint
              </div>
              <p className="text-sm font-extrabold text-white">
                How Top Operators Achieve Infinite Returns
              </p>
              <div className="mt-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold border border-emerald-500/30">
                <Sparkles className="w-3 h-3 text-emerald-400" /> Free PDF Checklist Unlocked on WhatsApp
              </div>
            </div>

            {/* Ad Click-to-WhatsApp CTA Button */}
            <button
              onClick={() => sendUserMessage('I want to analyze a BRRRR deal in Austin TX')}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950" />
              <span>Send WhatsApp Message (Click Ad CTA)</span>
            </button>
            <p className="text-[10px] text-slate-500 text-center">
              Simulates a user tapping the Meta Ad button to trigger an inbound webhook.
            </p>
          </div>

          {/* Quick Reply Triggers */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Simulate User Response Shortcuts:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => sendUserMessage('1. Real Estate Investor')}
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 transition-colors"
              >
                1. Investor Role
              </button>
              <button
                onClick={() => sendUserMessage('2. Licensed Agent / Broker')}
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 transition-colors"
              >
                2. Agent Role
              </button>
              <button
                onClick={() => sendUserMessage('Austin, TX')}
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 transition-colors"
              >
                Market: Austin, TX
              </button>
              <button
                onClick={() => sendUserMessage('A) Ready within 0-30 days')}
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 transition-colors"
              >
                Timeline: 0-30 days
              </button>
              <button
                onClick={() => sendUserMessage('YES')}
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-emerald-400 font-bold transition-colors"
              >
                Reply YES (Partner Link)
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live WhatsApp Phone Device Mockup */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border border-slate-800 rounded-3xl bg-[#0b141a] overflow-hidden shadow-2xl max-w-md mx-auto">
            {/* Phone Top Header */}
            <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between text-white border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-sm text-white">
                  P
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight">PropEngine Growth Desk</h4>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Verified Business Account
                  </p>
                </div>
              </div>
              <div className="text-slate-400 text-xs">
                WhatsApp
              </div>
            </div>

            {/* Chat Messages Feed */}
            <div className="p-4 space-y-3 min-h-[380px] max-h-[460px] overflow-y-auto bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-md ${
                      msg.sender === 'user'
                        ? 'bg-[#005c4b] text-white rounded-tr-none'
                        : 'bg-[#202c33] text-slate-100 rounded-tl-none border border-slate-700/50'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400">
                      <span>{msg.timestamp}</span>
                      {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-emerald-300" />}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#202c33] text-slate-400 text-xs px-3 py-2 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"></span>
                    <span>PropEngine Bot is typing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <div className="bg-[#202c33] p-3 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a response (e.g. 1, Austin TX, or YES)..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendUserMessage()}
                className="flex-1 bg-[#2a3942] border-none rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={() => sendUserMessage()}
                disabled={loading || !inputVal.trim()}
                className="p-2.5 bg-[#00a884] hover:bg-[#008f70] disabled:opacity-50 text-slate-950 rounded-xl transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4 fill-slate-950" />
              </button>
            </div>
          </div>

          {/* Webhook & CAPI Telemetry Bar */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono space-y-2">
            <div className="flex items-center justify-between text-slate-300 border-b border-slate-800/80 pb-2">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Terminal className="w-3.5 h-3.5" /> Webhook Telemetry & Meta CAPI
              </span>
              <span className="text-[10px] text-slate-500">Route: /api/whatsapp-webhook</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-500">Webhook Status:</span>{' '}
                <span className="text-emerald-400 font-bold">{serverLog.webhookStatus}</span>
              </div>
              <div>
                <span className="text-slate-500">Bot State:</span>{' '}
                <span className="text-teal-300 font-bold">{serverLog.conversationState}</span>
              </div>
              <div>
                <span className="text-slate-500">Lead Qualified:</span>{' '}
                <span className={serverLog.leadQualified ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                  {serverLog.leadQualified ? 'YES' : 'NO'}
                </span>
              </div>
              <div>
                <span className="text-slate-500">Meta CAPI Event:</span>{' '}
                <span className={serverLog.capiDispatched ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                  {serverLog.capiDispatched ? 'DISPATCHED (Lead)' : 'PENDING'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
