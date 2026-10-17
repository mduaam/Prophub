import { NextRequest, NextResponse } from 'next/server';
import { handleInboundWhatsAppMessage } from '@/lib/whatsapp';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || 'propengine_verify_token_2026';

  if (mode === 'subscribe' && token === verifyToken) {
    return new NextResponse(challenge || '', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  return NextResponse.json({ error: 'VERIFICATION_FAILED' }, { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Support both Meta Cloud API schema and direct JSON tester payload
    let fromPhone = '';
    let waId = '';
    let textBody = '';
    let messageId = '';
    let profileName = 'Investor Contact';

    if (body.object === 'whatsapp_business_account' && Array.isArray(body.entry)) {
      for (const entry of body.entry) {
        for (const change of entry.changes || []) {
          const val = change.value;
          if (val && Array.isArray(val.messages) && val.messages.length > 0) {
            const msg = val.messages[0];
            fromPhone = msg.from;
            waId = val.contacts?.[0]?.wa_id || msg.from;
            textBody = msg.text?.body || msg.interactive?.button_reply?.title || '';
            messageId = msg.id;
            profileName = val.contacts?.[0]?.profile?.name || 'WhatsApp Operator';
          }
        }
      }
    } else if (body.phone || body.from || body.message) {
      // Direct Simulator Payload
      fromPhone = body.phone || body.from || '+15551234567';
      waId = body.wa_id || fromPhone.replace(/[^0-9]/g, '');
      textBody = body.message || body.text || 'Hello';
      messageId = body.messageId || `msg_${Date.now()}`;
      profileName = body.name || body.profileName || 'Test Operator';
    }

    if (!fromPhone || !textBody) {
      return NextResponse.json({ ok: true, status: 'NO_MESSAGE_PAYLOAD' });
    }

    const result = await handleInboundWhatsAppMessage({
      waId,
      phone: fromPhone,
      profileName,
      messageText: textBody,
      messageId,
    });

    return NextResponse.json({
      ok: true,
      conversationId: result.conversation.id,
      state: result.conversation.state,
      leadQualified: result.leadQualified,
      inbound: result.inboundMessage.body,
      reply: result.outboundMessage.body,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        ok: false,
        error: 'WEBHOOK_PROCESSING_FAILED',
        message: err instanceof Error ? err.message : 'Internal error processing WhatsApp webhook',
      },
      { status: 500 }
    );
  }
}
