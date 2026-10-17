import { db } from './db';
import { sendMetaCAPIEvent } from './capi';
import { PersonaType, WhatsAppConversation, WhatsAppMessage } from './types';

export interface ProcessInboundWhatsAppParams {
  waId: string;
  phone: string;
  profileName?: string;
  messageText: string;
  messageId?: string;
}

export interface BotReplyResult {
  replyText: string;
  nextState: WhatsAppConversation['state'];
  leadQualified: boolean;
  recommendedTool?: string;
  leadMagnetSlug?: string;
}

export function processBotState(
  currentState: WhatsAppConversation['state'],
  userText: string,
  metadata: WhatsAppConversation['metadata']
): BotReplyResult {
  const text = userText.trim().toLowerCase();

  switch (currentState) {
    case 'new': {
      // Determine persona from response or prompt them
      let detectedPersona: PersonaType = 'unknown';
      if (text.includes('1') || text.includes('invest') || text.includes('brrrr') || text.includes('flip')) {
        detectedPersona = 'investor';
      } else if (text.includes('2') || text.includes('agent') || text.includes('broker') || text.includes('realtor')) {
        detectedPersona = 'agent';
      } else if (text.includes('3') || text.includes('landlord') || text.includes('rental') || text.includes('tenant') || text.includes('property manager')) {
        detectedPersona = 'landlord';
      }

      if (detectedPersona !== 'unknown') {
        metadata.persona = detectedPersona;
        return {
          replyText: `Got it! As a ${detectedPersona.toUpperCase()}, which primary city or market are you acquiring deals or generating leads in? (e.g. Austin, TX or Atlanta, GA)`,
          nextState: 'persona_selected',
          leadQualified: false,
        };
      }

      return {
        replyText: `👋 Welcome to PropEngine Hub Growth Assistant!\n\nTo tailor your real estate growth toolkit and deal templates, which best describes you?\n\n1️⃣ Real Estate Investor (BRRRR, Flips, Wholesaling)\n2️⃣ Licensed Agent or Broker (Buyer/Seller leads)\n3️⃣ Landlord or Property Manager (Rentals & Multi-family)\n\nReply with 1, 2, or 3.`,
        nextState: 'new',
        leadQualified: false,
      };
    }

    case 'persona_selected': {
      metadata.market = userText.trim();
      return {
        replyText: `Market set: ${metadata.market}. 🎯\n\nWhat is your acquisition or lead generation timeline?\n\nA) Actively looking / ready within 0–30 days\nB) 1 to 3 months\nC) 3+ months (Researching tools & comps)\n\nReply with A, B, or C.`,
        nextState: 'market_entered',
        leadQualified: false,
      };
    }

    case 'market_entered': {
      let timeline = '1-3 months';
      let leadScore = 75;
      if (text.includes('a') || text.includes('30') || text.includes('active') || text.includes('ready')) {
        timeline = '0-30 days (High Intent)';
        leadScore = 95;
      } else if (text.includes('b') || text.includes('1') || text.includes('3')) {
        timeline = '1-3 months';
        leadScore = 80;
      } else {
        timeline = '3+ months';
        leadScore = 65;
      }

      metadata.timeline = timeline;
      metadata.leadScore = leadScore;

      const persona = metadata.persona || 'investor';
      let recommendedTool = 'DealCheck';
      let leadMagnetSlug = 'brrrr-mastery-checklist';
      let resourceTitle = 'The 2026 BRRRR Deal Analysis & Refinance Blueprint';

      if (persona === 'agent') {
        recommendedTool = 'Carrot & LeadsBridge';
        leadMagnetSlug = 'seller-lead-machine-playbook';
        resourceTitle = 'Meta Ad to WhatsApp Seller Lead Automation Playbook';
      } else if (persona === 'landlord') {
        recommendedTool = 'Buildium & DealCheck';
        leadMagnetSlug = 'rental-property-analyzer-playbook';
        resourceTitle = '50-Point Rental Cash Flow Due Diligence Checklist';
      }

      metadata.recommendedTool = recommendedTool;

      const reply = `🎉 Congratulations! Your deal profile is qualified for ${metadata.market}.\n\n` +
        `📦 We've unlocked your complimentary operator package:\n` +
        `📄 Playbook: ${resourceTitle}\n` +
        `🔗 Instant Access: https://propenginehub.com/lead-magnet/${leadMagnetSlug}?wa_id=${metadata.persona}\n\n` +
        `💡 Top Recommended Growth Tool for your profile: ${recommendedTool}.\n` +
        `Would you like an introduction or private trial link for ${recommendedTool}? Reply YES to connect with our partner desk.`;

      return {
        replyText: reply,
        nextState: 'qualified',
        leadQualified: true,
        recommendedTool,
        leadMagnetSlug,
      };
    }

    case 'qualified': {
      if (text.includes('yes') || text.includes('sure') || text.includes('please') || text.includes('trial')) {
        return {
          replyText: `🚀 Here is your exclusive priority partner link: https://propenginehub.com/tools/${metadata.persona === 'agent' ? 'carrot' : 'dealcheck'}\n\nA growth specialist will also reach out to assist with your pipeline. Feel free to message here anytime!`,
          nextState: 'qualified',
          leadQualified: true,
        };
      }
      return {
        replyText: `Thank you for choosing PropEngine Hub! Explore our interactive BRRRR ROI calculator anytime at: https://propenginehub.com/calculators/brrrr-roi`,
        nextState: 'qualified',
        leadQualified: true,
      };
    }

    default:
      return {
        replyText: `Thank you! Reply MENU to restart or ASK for support.`,
        nextState: 'new',
        leadQualified: false,
      };
  }
}

export async function handleInboundWhatsAppMessage(params: ProcessInboundWhatsAppParams): Promise<{
  conversation: WhatsAppConversation;
  inboundMessage: WhatsAppMessage;
  outboundMessage: WhatsAppMessage;
  leadQualified: boolean;
}> {
  const normPhone = params.phone.startsWith('+') ? params.phone : `+${params.phone}`;
  const waId = params.waId || normPhone.replace(/[^0-9]/g, '');

  // 1. Upsert or find conversation
  let conv = db.getConversationByWaId(waId);
  if (!conv) {
    conv = db.upsertConversation({
      waId,
      phone: normPhone,
      profileName: params.profileName || 'WhatsApp Contact',
      state: 'new',
      metadata: {},
    });
  }

  // 2. Insert inbound message
  const inMsg = db.addWhatsAppMessage({
    conversationId: conv.id,
    direction: 'inbound',
    messageId: params.messageId || `wamid_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    type: 'text',
    body: params.messageText,
    status: 'read',
  });

  // 3. Run Bot State Machine
  const botResult = processBotState(conv.state, params.messageText, conv.metadata);

  // 4. Update Conversation state
  conv = db.upsertConversation({
    waId,
    phone: normPhone,
    state: botResult.nextState,
    metadata: conv.metadata,
  });

  // 5. Upsert lead in database
  const leadScore = conv.metadata.leadScore || (botResult.leadQualified ? 90 : 50);
  const lead = db.upsertLead({
    phone: normPhone,
    fullName: conv.profileName || 'WhatsApp Lead',
    email: `${waId}@whatsapp.propengine.internal`,
    persona: conv.metadata.persona || 'unknown',
    source: 'whatsapp_webhook',
    leadScore,
    status: botResult.leadQualified ? 'qualified' : 'contacted',
    consentMarketing: true,
    consentSms: true,
    metadata: {
      waId,
      ...conv.metadata,
    },
  });

  // 6. If newly qualified, trigger server-side Meta CAPI Lead Event
  if (botResult.leadQualified) {
    await sendMetaCAPIEvent({
      eventName: 'Lead',
      phone: normPhone,
      customData: {
        contentName: 'WhatsApp Qualified Lead',
        persona: conv.metadata.persona,
        market: conv.metadata.market,
        timeline: conv.metadata.timeline,
        leadScore,
        source: 'whatsapp_bot_automation',
      },
    });
  }

  // 7. Insert outbound reply
  const outMsg = db.addWhatsAppMessage({
    conversationId: conv.id,
    direction: 'outbound',
    messageId: `wamid_out_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    type: 'text',
    body: botResult.replyText,
    status: 'delivered',
  });

  return {
    conversation: conv,
    inboundMessage: inMsg,
    outboundMessage: outMsg,
    leadQualified: botResult.leadQualified,
  };
}
