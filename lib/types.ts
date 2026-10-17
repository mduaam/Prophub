export type UserRole = 'admin' | 'affiliate_manager' | 'agent' | 'investor' | 'landlord';

export type PersonaType = 'investor' | 'agent' | 'landlord' | 'unknown';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'nurturing' | 'converted' | 'disqualified' | 'archived';

export type AffiliateCommissionType = 'recurring' | 'one_time' | 'cpl' | 'hybrid';

export type WADirection = 'inbound' | 'outbound';

export type WAMessageStatus = 'sent' | 'delivered' | 'read' | 'failed' | 'received';

export type DealType = 'Purchase' | 'BRRRR' | 'Flip' | 'Rental';

export interface DealCalculatorInputs {
  dealType: DealType;
  purchasePrice: number;
  estimatedRehab: number;
  closingCostsPercent: number;
  holdingCostsMonthly: number;
  holdMonths: number;
  afterRepairValue: number;
  monthlyRent: number;
  vacancyRate: number;
  operatingExpenseRate: number;
  refinanceLTV: number;
  refinanceInterestRate: number;
  loanTermYears: number;
  propertyTaxYearly: number;
  insuranceYearly: number;
  hoaMonthly: number;
}

export interface DealCalculatorOutputs {
  totalProjectCost: number;
  allInCost: number;
  refinanceLoanAmount: number;
  cashLeftInDeal: number;
  equityCreated: number;
  monthlyGrossRent: number;
  monthlyEffectiveRent: number;
  monthlyOperatingExpenses: number;
  monthlyNOI: number;
  capRate: number;
  monthlyDebtService: number;
  annualDebtService: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  cashOnCash: number;
  dscr: number;
  roi: number;
  dealGrade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  dealGradeReason: string;
  infiniteReturn: boolean;
  affiliateTriggers: {
    partner: string;
    headline: string;
    subheadline: string;
    ctaText: string;
    toolSlug: string;
    reason: string;
    urgency: 'high' | 'medium' | 'recommended';
  }[];
}

export interface ToolPricingTier {
  name: string;
  price: string;
  billingPeriod: 'monthly' | 'yearly' | 'one-time';
  description: string;
  features: string[];
  popular?: boolean;
}

export interface ToolReview {
  author: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Tool {
  id: string;
  slug: string;
  name: string;
  category: 'Deal Analysis' | 'Lead Generation' | 'IDX & Websites' | 'CRM & Automation' | 'Property Management' | 'Property Data & Comps';
  tagline: string;
  description: string;
  longDescription: string;
  logoUrl: string;
  websiteUrl: string;
  affiliateUrl: string;
  commissionType: AffiliateCommissionType;
  commissionValue: number;
  recurring: boolean;
  recurringRateText: string;
  cookieDays: number;
  priority: number;
  features: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
  pricing: {
    startingPrice: string;
    freeTrial: string;
    tiers: ToolPricingTier[];
  };
  rating: number;
  reviewCount: number;
  reviews: ToolReview[];
  isActive: boolean;
  seoTitle: string;
  seoDescription: string;
  faqs: { question: string; answer: string }[];
}

export interface LeadMagnet {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  persona: PersonaType;
  badge: string;
  downloadCount: number;
  pages: number;
  keyTakeaways: string[];
  affiliatePartnerRecommendation: string;
  affiliateToolSlug: string;
  coverGradient: string;
}

export interface Lead {
  id: string;
  userId?: string;
  email: string;
  phone?: string;
  fullName: string;
  persona: PersonaType;
  source: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  fbclid?: string;
  fbc?: string;
  fbp?: string;
  ip?: string;
  userAgent?: string;
  consentMarketing: boolean;
  consentSms: boolean;
  leadScore: number;
  status: LeadStatus;
  assignedAgentId?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AffiliateClick {
  id: string;
  clickId: string;
  toolId: string;
  toolSlug: string;
  toolName: string;
  leadId?: string;
  sessionId?: string;
  subid?: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  ip?: string;
  userAgent?: string;
  referrer?: string;
  destinationUrl: string;
  converted: boolean;
  conversionId?: string;
  payout?: number;
  currency: string;
  createdAt: string;
}

export interface WhatsAppConversation {
  id: string;
  leadId?: string;
  waId: string;
  phone: string;
  profileName: string;
  state: 'new' | 'persona_selected' | 'market_entered' | 'budget_timeline' | 'qualified';
  lastMessageAt: string;
  botEnabled: boolean;
  metadata: {
    persona?: PersonaType;
    market?: string;
    budget?: string;
    timeline?: string;
    dealType?: string;
    leadScore?: number;
    recommendedTool?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface WhatsAppMessage {
  id: string;
  conversationId: string;
  direction: WADirection;
  messageId: string;
  type: 'text' | 'button' | 'interactive' | 'template';
  body: string;
  status: WAMessageStatus;
  payload?: Record<string, unknown>;
  createdAt: string;
}

export interface MetaCAPIEvent {
  eventName: 'Lead' | 'CompleteRegistration' | 'OutboundAffiliateClick' | 'ViewContent';
  eventId: string;
  eventTime: number;
  actionSource: 'website';
  userData: {
    em?: string[];
    ph?: string[];
    fbc?: string;
    fbp?: string;
    clientIpAddress?: string;
    clientUserAgent?: string;
  };
  customData: Record<string, unknown>;
  sentToMeta: boolean;
  response?: Record<string, unknown>;
  createdAt: string;
}
