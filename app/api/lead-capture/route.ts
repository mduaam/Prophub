import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { sendMetaCAPIEvent } from '@/lib/capi';

const leadCaptureSchema = z.object({
  email: z.string().email('Please enter a valid business or personal email address.'),
  fullName: z.string().min(2, 'Name must be at least 2 characters.'),
  phone: z.string().optional().or(z.literal('')),
  persona: z.enum(['investor', 'agent', 'landlord', 'unknown']).default('investor'),
  source: z.string().default('calculator'),
  leadMagnetId: z.string().optional(),
  consentMarketing: z.boolean().refine(val => val === true, {
    message: 'Marketing consent is required to deliver the analysis and guides.',
  }),
  consentSms: z.boolean().optional().default(false),
  utm: z.object({
    source: z.string().optional(),
    medium: z.string().optional(),
    campaign: z.string().optional(),
    content: z.string().optional(),
    term: z.string().optional(),
  }).optional(),
  fbclid: z.string().optional(),
  fbc: z.string().optional(),
  fbp: z.string().optional(),
  eventId: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = leadCaptureSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: 'INVALID_INPUT',
          message: parsed.error.issues[0]?.message || 'Validation failed',
          issues: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'Browser';

    // Calculate lead score based on completeness & intent
    let score = 55;
    if (data.phone && data.phone.length >= 7) score += 20;
    if (data.consentSms) score += 10;
    if (data.metadata?.dealType) score += 10;
    if (data.metadata?.calculatedEquity && Number(data.metadata.calculatedEquity) > 30000) score += 10;

    // Upsert Lead
    const lead = db.upsertLead({
      email: data.email,
      fullName: data.fullName,
      phone: data.phone || undefined,
      persona: data.persona,
      source: data.source,
      utmSource: data.utm?.source,
      utmMedium: data.utm?.medium,
      utmCampaign: data.utm?.campaign,
      utmContent: data.utm?.content,
      utmTerm: data.utm?.term,
      fbclid: data.fbclid,
      fbc: data.fbc,
      fbp: data.fbp,
      ip: clientIp,
      userAgent: userAgent,
      consentMarketing: data.consentMarketing,
      consentSms: data.consentSms,
      leadScore: score,
      status: score >= 80 ? 'qualified' : 'new',
      metadata: {
        ...(data.metadata || {}),
        leadMagnetId: data.leadMagnetId,
      },
    });

    const eventId = data.eventId || `evt_lead_${lead.id}_${Date.now()}`;

    // Meta CAPI Server-side dispatch
    const capiResult = await sendMetaCAPIEvent({
      eventName: 'Lead',
      eventId,
      email: data.email,
      phone: data.phone || undefined,
      fbc: data.fbc,
      fbp: data.fbp,
      clientIpAddress: clientIp,
      clientUserAgent: userAgent,
      customData: {
        contentName: data.leadMagnetId || 'Real Estate Analysis Download',
        contentCategory: 'lead_magnet',
        persona: data.persona,
        leadScore: score,
        value: 5.00,
        currency: 'USD',
        dealType: data.metadata?.dealType,
      },
    });

    // Generate signed download link (simulated secure token)
    const downloadToken = Buffer.from(`${lead.id}:${Date.now()}:${data.leadMagnetId || 'brrrr'}`).toString('base64url');
    const pdfUrl = `/lead-magnet/${data.leadMagnetId || 'brrrr-mastery-checklist'}?download_token=${downloadToken}&success=1`;

    return NextResponse.json(
      {
        ok: true,
        leadId: lead.id,
        eventId,
        pdfUrl,
        leadScore: score,
        status: lead.status,
        capi: {
          sent: capiResult.sentToMeta,
          status: capiResult.status,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        ok: false,
        error: 'SERVER_ERROR',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
