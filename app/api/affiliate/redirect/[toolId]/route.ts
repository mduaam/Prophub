import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { db, TOOLS } from '@/lib/db';
import { sendMetaCAPIEvent } from '@/lib/capi';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ toolId: string }> }
) {
  const { toolId } = await params;
  const { searchParams } = new URL(req.url);

  // Look up tool by slug or by id
  const tool = TOOLS.find(
    t => t.slug.toLowerCase() === toolId.toLowerCase() || t.id.toLowerCase() === toolId.toLowerCase()
  );

  if (!tool || !tool.isActive) {
    return NextResponse.json(
      {
        ok: false,
        error: 'TOOL_NOT_FOUND',
        message: 'The requested tool does not exist or is currently inactive.',
      },
      { status: 404 }
    );
  }

  const clickId = crypto.randomUUID();
  const leadId = searchParams.get('lead_id') || undefined;
  const subid = searchParams.get('subid') || clickId;
  const source = searchParams.get('source') || 'affiliate_redirect';
  const utmSource = searchParams.get('utm_source') || 'propengine';
  const utmMedium = searchParams.get('utm_medium') || 'software_directory';
  const utmCampaign = searchParams.get('utm_campaign') || undefined;

  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
  const userAgent = req.headers.get('user-agent') || 'Browser';
  const referrer = req.headers.get('referer') || undefined;

  // Construct destination URL with subid and UTM tracking
  const destination = new URL(tool.affiliateUrl);
  destination.searchParams.set('subid', subid);
  if (utmSource) destination.searchParams.set('utm_source', utmSource);
  if (utmMedium) destination.searchParams.set('utm_medium', utmMedium);
  if (utmCampaign) destination.searchParams.set('utm_campaign', utmCampaign);
  destination.searchParams.set('click_id', clickId);

  // Log in store
  db.logAffiliateClick({
    clickId,
    toolId: tool.id,
    toolSlug: tool.slug,
    toolName: tool.name,
    leadId,
    subid,
    source,
    utmSource,
    utmMedium,
    utmCampaign,
    ip: clientIp,
    userAgent,
    referrer,
    destinationUrl: destination.toString(),
    converted: false,
    payout: 0,
    currency: 'USD',
  });

  // Server-side Meta CAPI event
  await sendMetaCAPIEvent({
    eventName: 'OutboundAffiliateClick',
    eventId: `evt_aff_${clickId}`,
    clientIpAddress: clientIp,
    clientUserAgent: userAgent,
    customData: {
      tool_id: tool.slug,
      tool_name: tool.name,
      click_id: clickId,
      commission_type: tool.commissionType,
      value: 0.0,
      currency: 'USD',
    },
  });

  const response = NextResponse.redirect(destination.toString(), { status: 302 });

  // Set HTTP-only cookie
  const cookieMaxAge = (tool.cookieDays || 30) * 86400;
  response.cookies.set('pe_aff_click', clickId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: cookieMaxAge,
    path: '/',
  });

  return response;
}
