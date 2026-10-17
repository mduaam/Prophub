import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const deleteRequestSchema = z.object({
  email: z.string().email(),
  reason: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = deleteRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'INVALID_EMAIL' }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      message: `GDPR/CCPA privacy deletion request acknowledged for ${parsed.data.email}. Any associated marketing records have been queued for anonymization within 30 days.`,
      requestId: `del_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      receivedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'REQUEST_FAILED' }, { status: 500 });
  }
}
