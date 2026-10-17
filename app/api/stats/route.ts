import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const summary = db.getAnalyticsSummary();
  const recentLeads = db.getLeads().slice(0, 10);
  const recentClicks = db.getAffiliateClicks().slice(0, 10);
  const conversations = db.getAllConversations().slice(0, 10);
  const capiEvents = db.getCapiEvents().slice(0, 10);

  return NextResponse.json({
    summary,
    recentLeads,
    recentClicks,
    conversations,
    capiEvents,
  });
}
