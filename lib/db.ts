import { Tool, LeadMagnet, Lead, AffiliateClick, WhatsAppConversation, WhatsAppMessage, MetaCAPIEvent } from './types';

export const TOOLS: Tool[] = [
  {
    id: 'tool_dealcheck_01',
    slug: 'dealcheck',
    name: 'DealCheck',
    category: 'Deal Analysis',
    tagline: 'The #1 Real Estate Deal Analysis & Property Underwriting Software',
    description: 'Calculate cash flow, cap rate, ROI, and BRRRR refinance scenarios in seconds. Import MLS data and export PDF reports for lenders.',
    longDescription: 'DealCheck is the industry standard property analysis platform used by over 350,000 investors, brokers, and agents worldwide. It allows you to analyze rentals, BRRRR projects, flips, multi-family, and commercial properties. With native MLS import, automated rent estimates, and institutional lender-ready PDF reporting, it replaces error-prone spreadsheets with verified real-time financial models.',
    logoUrl: 'https://picsum.photos/seed/dealcheck-logo/120/120',
    websiteUrl: 'https://dealcheck.io',
    affiliateUrl: 'https://dealcheck.io/?ref=propengine',
    commissionType: 'recurring',
    commissionValue: 30.00,
    recurring: true,
    recurringRateText: '30% lifetime recurring commission',
    cookieDays: 60,
    priority: 100,
    features: [
      'Instant BRRRR equity & cash-left-in-deal calculator',
      'Automated MLS property & tax data import',
      'Long-term cash flow and 30-year equity forecast charts',
      'Lender-grade downloadable PDF deal packets with custom branding',
      'Side-by-side deal comparison & sensitivity stress tests',
      'Interactive mobile app (iOS & Android) with cloud sync'
    ],
    pros: [
      'Fastest calculation engine for complex BRRRR refinance steps',
      'Clean professional PDF exports that mortgage brokers accept',
      'Affordable pricing compared to legacy desktop software',
      'Generous 14-day full-feature free trial without hassle'
    ],
    cons: [
      'Advanced multi-scenario forecasting requires the Pro tier',
      'Skip tracing is not built-in (focused strictly on underwriting)'
    ],
    bestFor: 'BRRRR investors, rental landlords, and agents presenting deal packets to investor clients.',
    pricing: {
      startingPrice: '$10/mo',
      freeTrial: '14-Day Free Trial',
      tiers: [
        {
          name: 'Starter',
          price: '$10',
          billingPeriod: 'monthly',
          description: 'Essential underwriting for beginner investors',
          features: ['Up to 15 saved properties', 'Full BRRRR & rental calculators', 'Standard PDF exports', 'Web and mobile sync']
        },
        {
          name: 'Plus',
          price: '$20',
          billingPeriod: 'monthly',
          popular: true,
          description: 'For active deal-hunters and portfolio operators',
          features: ['Up to 50 saved properties', 'Sales & rental comps lookups', 'Customizable PDF templates', 'Priority support']
        },
        {
          name: 'Pro',
          price: '$40',
          billingPeriod: 'monthly',
          description: 'For brokerages, funds, and full-time syndicators',
          features: ['Unlimited properties', 'Custom logo branding on PDFs', 'Multi-scenario sensitivity tables', 'API access']
        }
      ]
    },
    rating: 4.9,
    reviewCount: 1840,
    reviews: [
      {
        author: 'Marcus Vance',
        role: 'BRRRR Portfolio Investor (24 Units)',
        rating: 5,
        date: '2 weeks ago',
        comment: 'DealCheck cut my underwriting time from 45 minutes on Excel to under 3 minutes per property. My hard money lender loved the exported packet.',
        verified: true
      },
      {
        author: 'Sarah Chen, CCIM',
        role: 'Commercial & Multi-family Broker',
        rating: 5,
        date: '1 month ago',
        comment: 'The sensitivity analysis and refinance projections are mathematically spot on. Essential tool for any serious real estate operator.',
        verified: true
      }
    ],
    isActive: true,
    seoTitle: 'DealCheck Review 2026: Pricing, Features & BRRRR Deal Calculator Test',
    seoDescription: 'Comprehensive DealCheck software review. How it analyzes BRRRR refinances, cap rate, and cash flow. Compare pricing tiers and get 30% discount.',
    faqs: [
      {
        question: 'Does DealCheck support BRRRR refinance calculations?',
        answer: 'Yes. DealCheck features a dedicated BRRRR engine that calculates holding costs, all-in cost, cash-out refinance proceeds, cash left in deal, and post-refi DSCR.'
      },
      {
        question: 'Can I export reports for private lenders and banks?',
        answer: 'Absolutely. The platform exports comprehensive, professional PDF reports complete with photos, amortization schedules, and investment return projections.'
      },
      {
        question: 'Is there a free trial?',
        answer: 'Yes, DealCheck offers a completely free 14-day trial with no upfront payment required.'
      }
    ]
  },
  {
    id: 'tool_showcase_idx_02',
    slug: 'showcase-idx',
    name: 'Showcase IDX',
    category: 'IDX & Websites',
    tagline: 'The #1 Real Estate Search & IDX WordPress Plugin for Agents',
    description: 'Empower your website with consumer-grade home search, interactive map comps, automated search alerts, and lead capture.',
    longDescription: 'Showcase IDX is the leading real estate search plugin designed specifically for WordPress websites. Used by top teams and independent agents, it delivers lightning-fast map search, instant MLS sync, and intelligent lead capture that converts casual visitors into registered buyers and sellers.',
    logoUrl: 'https://picsum.photos/seed/showcaseidx-logo/120/120',
    websiteUrl: 'https://showcaseidx.com',
    affiliateUrl: 'https://showcaseidx.com/?ref=propengine',
    commissionType: 'recurring',
    commissionValue: 20.00,
    recurring: true,
    recurringRateText: '20% recurring monthly commission',
    cookieDays: 45,
    priority: 90,
    features: [
      'Proprietary sub-second map search with custom polygon boundaries',
      'Automated daily and weekly MLS property match emails',
      'Configurable forced or soft lead capture registration gates',
      'Full CRM webhook integration (Follow Up Boss, LionDesk, HubSpot)',
      'SEO-friendly indexable listing pages for organic Google traffic',
      'Granular search behavior analytics per client profile'
    ],
    pros: [
      'Unmatched UI speed and smooth polygon map drawing',
      'High conversion rate on soft lead capture triggers',
      'Clean SEO architecture that allows Google to crawl listings',
      'Extensive integration support with modern real estate CRMs'
    ],
    cons: [
      'Requires a self-hosted WordPress site (not standalone CMS)',
      'MLS feed approval process takes 2-5 days depending on board'
    ],
    bestFor: 'Real estate agents, broker teams, and investor-agents building high-intent buyer and seller pipelines.',
    pricing: {
      startingPrice: '$74/mo',
      freeTrial: '10-Day Free Trial',
      tiers: [
        {
          name: 'Essentials',
          price: '$74',
          billingPeriod: 'monthly',
          description: 'Core IDX search and lead capture for solo agents',
          features: ['1 MLS feed included', 'Standard map search', 'Basic lead capture forms', 'Email notifications']
        },
        {
          name: 'Premium',
          price: '$119',
          billingPeriod: 'monthly',
          popular: true,
          description: 'Advanced behavioral automation & CRM integrations',
          features: ['All Essentials features', 'Automated search updates', 'CRM webhook integration', 'Polygons & boundaries', 'Priority MLS support']
        }
      ]
    },
    rating: 4.8,
    reviewCount: 920,
    reviews: [
      {
        author: 'Elena Gomez',
        role: 'Managing Broker, Austin TX',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Showcase IDX gave our site Zillow-grade map search. Our bounce rate dropped 38% and organic lead registrations tripled in 60 days.',
        verified: true
      }
    ],
    isActive: true,
    seoTitle: 'Showcase IDX Review 2026: The Best WordPress Real Estate Search Plugin',
    seoDescription: 'In-depth review of Showcase IDX. Learn how it powers agent websites with MLS map search, lead capture, and CRM syncing.',
    faqs: [
      {
        question: 'Does Showcase IDX work with any WordPress theme?',
        answer: 'Yes, it integrates seamlessly into Gutenberg, Elementor, Divi, Astra, and custom WordPress setups.'
      },
      {
        question: 'How quickly does it sync with my local MLS?',
        answer: 'Showcase IDX updates every 15 minutes directly via official RESO Web API and RETS connections.'
      }
    ]
  },
  {
    id: 'tool_carrot_03',
    slug: 'carrot',
    name: 'Carrot',
    category: 'Lead Generation',
    tagline: 'High-Converting Inbound Websites for Wholesalers & Real Estate Investors',
    description: 'Rank #1 on Google for motivated seller keywords, generate inbound seller leads, and convert traffic into closed contracts.',
    longDescription: 'Carrot is the premier website and content marketing platform for real estate investors and top agents. Over 1 million inbound seller leads have been generated on Carrot sites. Featuring pre-optimized SEO keyword clusters, lightning-fast Core Web Vitals, and split-tested lead funnels, Carrot turns searchers looking to "sell house fast for cash" into qualified deal appointments.',
    logoUrl: 'https://picsum.photos/seed/carrot-logo/120/120',
    websiteUrl: 'https://carrot.com',
    affiliateUrl: 'https://carrot.com/?ref=propengine',
    commissionType: 'recurring',
    commissionValue: 25.00,
    recurring: true,
    recurringRateText: '25% recurring lifetime commission',
    cookieDays: 60,
    priority: 95,
    features: [
      'Conversion-tested motivated seller, buyer, and wholesale templates',
      'Automated SEO keyword rank tracking and on-page optimization',
      'Instant SMS notifications on inbound lead submissions',
      'Pre-written real estate authority blog content packs',
      'Two-step lead capture forms with property condition questionnaires',
      'Built-in CRM and Zapier / Webhook forwarding'
    ],
    pros: [
      'Dominates Google rankings for motivated seller keywords nationwide',
      'Highest conversion rate in the wholesale real estate industry',
      'Zero coding required — launch an optimized site in 15 minutes',
      'Outstanding community coaching and weekly strategy calls'
    ],
    cons: [
      'Higher price point than basic WordPress hosting',
      'Custom HTML/CSS customizations are intentionally constrained for speed'
    ],
    bestFor: 'Wholesalers, flippers, creative finance investors, and land buyers seeking organic seller leads.',
    pricing: {
      startingPrice: '$69/mo',
      freeTrial: '30-Day Money-Back Guarantee',
      tiers: [
        {
          name: 'Core',
          price: '$69',
          billingPeriod: 'monthly',
          description: 'Basic lead generation website with standard templates',
          features: ['1 Website', 'Standard lead capture', 'SSL & hosting included', 'Email notifications']
        },
        {
          name: 'Content Pro',
          price: '$99',
          billingPeriod: 'monthly',
          popular: true,
          description: 'Full programmatic SEO content and rank tracking',
          features: ['3 Websites', 'Automated monthly blog posts', 'SEO keyword tracker', 'SMS lead alerts', 'Multi-step forms']
        },
        {
          name: 'Advanced Marketer',
          price: '$199',
          billingPeriod: 'monthly',
          description: 'For high-volume operators dominating multiple markets',
          features: ['5 Websites', 'Quarterly coaching calls', 'Campaign tracking', 'Dedicated account manager', 'Premium CDN']
        }
      ]
    },
    rating: 4.9,
    reviewCount: 2410,
    reviews: [
      {
        author: 'Derrick Robinson',
        role: 'Full-time Wholesaler & Flipper, Atlanta GA',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Carrot ranks #1 in my county for "sell my house as-is". We close 3-4 contracts a month purely off organic Google inbound leads. Unbeatable ROI.',
        verified: true
      }
    ],
    isActive: true,
    seoTitle: 'Carrot Review 2026: Does it Really Generate Motivated Seller Leads?',
    seoDescription: 'Unbiased Carrot real estate review. Pricing, SEO rankings, motivated seller templates, and live case studies.',
    faqs: [
      {
        question: 'How fast can a Carrot site rank on Google?',
        answer: 'With proper local citations and Google Business Profile pairing, Carrot sites often rank for secondary keywords within 30-90 days.'
      },
      {
        question: 'Can I route Carrot leads into my CRM like Podio or REIReply?',
        answer: 'Yes, Carrot provides direct webhook endpoints and native Zapier integrations to push leads instantly into any CRM.'
      }
    ]
  },
  {
    id: 'tool_leadsbridge_04',
    slug: 'leadsbridge',
    name: 'LeadsBridge',
    category: 'CRM & Automation',
    tagline: 'Official Meta & Google Ads Real Estate Lead Sync & CAPI Automation',
    description: 'Sync Meta Ads, Click-to-WhatsApp, and TikTok leads directly into your real estate CRM in real time with server-side CAPI attribution.',
    longDescription: 'LeadsBridge is the premier enterprise bridge connecting advertising networks (Meta Ads, Google Ads, TikTok Ads) directly to real estate CRMs and autoresponders. It specializes in real-time lead forwarding, offline conversion syncing, and Conversions API (CAPI) deduplication so ad algorithms can optimize for closed deals rather than cheap clicks.',
    logoUrl: 'https://picsum.photos/seed/leadsbridge-logo/120/120',
    websiteUrl: 'https://leadsbridge.com',
    affiliateUrl: 'https://leadsbridge.com/?ref=propengine',
    commissionType: 'recurring',
    commissionValue: 20.00,
    recurring: true,
    recurringRateText: '20% recurring monthly commission',
    cookieDays: 45,
    priority: 85,
    features: [
      'Instant Meta Lead Ads to CRM synchronization (< 5 seconds)',
      'Server-side Meta Conversions API (CAPI) gateway',
      'Multi-source lead deduplication and phone number formatting',
      'Over 380+ pre-built native CRM and marketing connectors',
      'Offline conversion tracking for closed-won real estate deals',
      'Custom field mapping, UTM parameter preservation, and consent logging'
    ],
    pros: [
      'Official Meta Business Partner with verified enterprise API limits',
      'Sub-second lead delivery ensures immediate response time',
      'Eliminates lost leads caused by standard browser cookie tracking',
      'Great free tier for small volume campaigns'
    ],
    cons: [
      'Interface can be technical for non-developers',
      'High-volume enterprise tiers require custom sales consultation'
    ],
    bestFor: 'Real estate marketing agencies, brokerages running Meta Ads, and operators syncing Click-to-WhatsApp leads.',
    pricing: {
      startingPrice: '$29/mo',
      freeTrial: '14-Day Free Trial',
      tiers: [
        {
          name: 'Free',
          price: '$0',
          billingPeriod: 'monthly',
          description: 'Basic lead sync for testing small ad campaigns',
          features: ['Up to 50 leads/mo', '1 active bridge', 'Standard sync speed']
        },
        {
          name: 'Starter',
          price: '$29',
          billingPeriod: 'monthly',
          popular: true,
          description: 'Active lead sync and basic CAPI routing',
          features: ['Up to 800 leads/mo', '3 active bridges', 'Instant real-time sync', 'Auto-retry on error']
        },
        {
          name: 'Pro',
          price: '$79',
          billingPeriod: 'monthly',
          description: 'For busy agencies and broker teams',
          features: ['Up to 2,500 leads/mo', 'Unlimited bridges', 'Full Meta CAPI integration', 'Custom mapping', 'Priority phone support']
        }
      ]
    },
    rating: 4.7,
    reviewCount: 650,
    reviews: [
      {
        author: 'Julian Croft',
        role: 'Growth Marketing Director, RE Growth Media',
        rating: 5,
        date: '1 month ago',
        comment: 'LeadsBridge eliminated 100% of lead delay from our Facebook Click-to-WhatsApp and Lead Ad campaigns. Our speed-to-lead went under 30 seconds.',
        verified: true
      }
    ],
    isActive: true,
    seoTitle: 'LeadsBridge Review 2026: Real Estate Lead Sync & Meta CAPI Guide',
    seoDescription: 'Learn how LeadsBridge connects Facebook Lead Ads and WhatsApp directly to your CRM with zero lost leads and CAPI tracking.',
    faqs: [
      {
        question: 'Does LeadsBridge support Meta Conversions API (CAPI)?',
        answer: 'Yes, LeadsBridge is an official Meta partner specializing in server-side CAPI event synchronization and deduplication.'
      },
      {
        question: 'Can it send SMS alerts when a lead is captured?',
        answer: 'Yes, it can trigger instant SMS, email, or Slack notifications to your agents the second a lead opts in.'
      }
    ]
  },
  {
    id: 'tool_propstream_05',
    slug: 'propstream',
    name: 'PropStream',
    category: 'Property Data & Comps',
    tagline: 'Nationwide Property Intelligence, Comps, MLS Records & Skip Tracing',
    description: 'Search over 150 million properties, filter pre-foreclosures, tax liens, vacancies, and export targeted lists with verified phone numbers.',
    longDescription: 'PropStream is the most comprehensive real estate big data platform in North America. Combining county public records, tax assessor files, nationwide MLS comps, and active foreclosure data, it enables investors and agents to find off-market deals before they hit the open market.',
    logoUrl: 'https://picsum.photos/seed/propstream-logo/120/120',
    websiteUrl: 'https://propstream.com',
    affiliateUrl: 'https://propstream.com/?ref=propengine',
    commissionType: 'recurring',
    commissionValue: 30.00,
    recurring: true,
    recurringRateText: '30% recurring monthly commission',
    cookieDays: 60,
    priority: 88,
    features: [
      'Multi-source MLS sales comps and cash-buyer activity',
      'Targeted lead filtering: pre-foreclosure, tax delinquency, tired landlords',
      'Built-in skip tracing with DNC (Do Not Call) registry scrubbing',
      'Automated postcard marketing and email campaigns',
      'Estimated equity, mortgage balance, and loan history tracking',
      'Mobile app with drive-for-dollars route mapping'
    ],
    pros: [
      'Unsurpassed depth of property history and owner equity estimates',
      'High accuracy MLS comps in non-disclosure states',
      'Generous 10,000 property export allowance per month',
      '7-day free trial with 50 free leads included'
    ],
    cons: [
      'Skip tracing costs a nominal fee per contact ($0.12/record)',
      'Data-dense interface requires an hour of onboarding to master'
    ],
    bestFor: 'Wholesalers, fix-and-flip investors, and acquisition teams sourcing discounted off-market deals.',
    pricing: {
      startingPrice: '$99/mo',
      freeTrial: '7-Day Free Trial',
      tiers: [
        {
          name: 'Standard',
          price: '$99',
          billingPeriod: 'monthly',
          popular: true,
          description: 'Full nationwide database access and 10,000 exports/mo',
          features: ['Nationwide property data', '10,000 property downloads/mo', 'MLS comps', 'Rehab estimator tool', 'Free mobile app']
        }
      ]
    },
    rating: 4.8,
    reviewCount: 3100,
    reviews: [
      {
        author: 'Brandon Kelly',
        role: 'Acquisitions Manager, Premier Equity Group',
        rating: 5,
        date: '2 weeks ago',
        comment: 'We pulled a list of high-equity absentee owners in Tampa and closed a $62k wholesale assignment within 30 days. PropStream paid for itself for the next 20 years.',
        verified: true
      }
    ],
    isActive: true,
    seoTitle: 'PropStream Review 2026: Pricing, Data Accuracy & 7-Day Free Trial',
    seoDescription: 'Is PropStream worth $99/mo? Review of property lists, skip tracing accuracy, MLS comps, and deal-finding filters.',
    faqs: [
      {
        question: 'Does PropStream work in non-disclosure states (like Texas)?',
        answer: 'Yes, PropStream provides actual MLS sold comps across both disclosure and non-disclosure states.'
      },
      {
        question: 'How many property records can I export each month?',
        answer: 'The standard subscription includes 10,000 property exports per month at no extra charge.'
      }
    ]
  },
  {
    id: 'tool_buildium_06',
    slug: 'buildium',
    name: 'Buildium',
    category: 'Property Management',
    tagline: 'All-in-One Property Management Software for Growing Portfolios',
    description: 'Online rent collection, automated maintenance workflows, full trust accounting, and tenant screening for landlords with 10 to 5,000 units.',
    longDescription: 'Buildium provides end-to-end operational software for property managers, landlords, and community associations. Streamline rent collection, automate late fee enforcement, balance books with double-entry accounting, and communicate with residents via branded resident portals.',
    logoUrl: 'https://picsum.photos/seed/buildium-logo/120/120',
    websiteUrl: 'https://buildium.com',
    affiliateUrl: 'https://buildium.com/?ref=propengine',
    commissionType: 'recurring',
    commissionValue: 25.00,
    recurring: true,
    recurringRateText: '25% recurring monthly commission',
    cookieDays: 60,
    priority: 80,
    features: [
      'Automated tenant ACH and credit card rent collection',
      'Comprehensive property accounting and 1099 tax filing',
      'Online maintenance ticketing with vendor dispatch',
      'Integrated TransUnion tenant screening reports',
      'Resident and owner mobile apps',
      'Syndicated rental vacancy marketing to Zillow, Trulia, and Realtor.com'
    ],
    pros: [
      'Complete accounting module compliant with state real estate boards',
      'Reliable tenant screening with credit, criminal, and eviction history',
      'Smooth resident portal that encourages automated on-time payments'
    ],
    cons: [
      'Setup process is thorough and takes a few hours to configure bank accounts',
      'Geared towards portfolios of 10+ doors rather than single-unit owners'
    ],
    bestFor: 'Landlords, property management companies, and HOA boards managing 10 to 1,000+ rental doors.',
    pricing: {
      startingPrice: '$55/mo',
      freeTrial: '14-Day Free Trial',
      tiers: [
        {
          name: 'Essential',
          price: '$55',
          billingPeriod: 'monthly',
          description: 'Core property management for growing portfolios',
          features: ['Accounting & reports', 'Resident portal', 'Maintenance tracking', 'Online rent payments']
        },
        {
          name: 'Growth',
          price: '$174',
          billingPeriod: 'monthly',
          popular: true,
          description: 'Unlimited eSignatures and advanced analytics',
          features: ['All Essential features', 'Unlimited eSignatures', 'Performance analytics', 'Live phone support']
        }
      ]
    },
    rating: 4.6,
    reviewCount: 1420,
    reviews: [
      {
        author: 'Claire Montrose',
        role: 'Property Manager (85 Units), Denver CO',
        rating: 5,
        date: '1 month ago',
        comment: 'Buildium automated our entire monthly rent reconciliation and late fee billing. What used to take two days each month now runs on autopilot.',
        verified: true
      }
    ],
    isActive: true,
    seoTitle: 'Buildium Property Management Review 2026: Pricing & Features',
    seoDescription: 'Full review of Buildium property management software. Compare accounting, rent collection, tenant screening, and pricing tiers.',
    faqs: [
      {
        question: 'Does Buildium syndicate my rental listings to Zillow?',
        answer: 'Yes, Buildium automatically syndicates vacant units to Zillow, Trulia, HotPads, and dozens of regional rental sites.'
      },
      {
        question: 'Can tenants pay rent online with ACH and debit cards?',
        answer: 'Yes, tenants can setup recurring auto-pay via bank ACH or credit/debit card directly inside the resident portal.'
      }
    ]
  }
];

export const LEAD_MAGNETS: LeadMagnet[] = [
  {
    id: 'lm_brrrr_01',
    slug: 'brrrr-mastery-checklist',
    title: 'The 2026 BRRRR Deal Analysis & Refinance Blueprint',
    subtitle: 'The 42-point checklist top real estate operators use to achieve infinite returns and pull 100% of capital out on completion.',
    description: 'Avoid holding cost surprises, underwritten rent shortfalls, and appraisal shocks. This comprehensive step-by-step PDF guide walks you through purchase discount formulas, rehab contingency buffers, and DSCR refinance timing.',
    persona: 'investor',
    badge: 'Investor Essential',
    downloadCount: 14890,
    pages: 18,
    keyTakeaways: [
      'The exact 75% LTV refinance formula lenders use to evaluate cash-out eligibility',
      'The 7 holding cost blindspots that silently destroy projected cash flow',
      'How to structure contractor bids to protect ARV appraisals',
      'Pre-refinance checklist to guarantee DSCR remains safely above 1.25'
    ],
    affiliatePartnerRecommendation: 'DealCheck',
    affiliateToolSlug: 'dealcheck',
    coverGradient: 'from-emerald-950 via-teal-900 to-slate-900'
  },
  {
    id: 'lm_rental_02',
    slug: 'rental-property-analyzer-playbook',
    title: '50-Point Rental Cash Flow Due Diligence Checklist',
    subtitle: 'The master underwriting criteria for evaluating long-term rentals, multi-family duplexes, and single-family cash flow.',
    description: 'Never buy a negative cash-flow property again. Master expense ratios, real-world capital expenditure reserves, tenant turnover costs, and property management overhead.',
    persona: 'landlord',
    badge: 'Cash Flow Master',
    downloadCount: 9750,
    pages: 22,
    keyTakeaways: [
      'Accurate operating expense budgeting (why 50% rule fails in 2026)',
      'Cap rate vs Cash-on-Cash Return: which metric actually matters for debt',
      'Tenant lease screening questions that prevent non-payment evictions',
      'How to build an automated rent collection stack'
    ],
    affiliatePartnerRecommendation: 'DealCheck & Buildium',
    affiliateToolSlug: 'dealcheck',
    coverGradient: 'from-blue-950 via-slate-900 to-indigo-950'
  },
  {
    id: 'lm_seller_lead_03',
    slug: 'seller-lead-machine-playbook',
    title: 'Meta Ad to WhatsApp Motivated Seller Lead Playbook',
    subtitle: 'How high-performing real estate investors generate $18 motivated seller leads and qualify them in under 2 minutes.',
    description: 'A complete blueprint detailing ad copy, Click-to-WhatsApp automation scripts, automated qualification bots, and server-side Meta CAPI tracking to eliminate wasted ad spend.',
    persona: 'agent',
    badge: 'Lead Gen Pro',
    downloadCount: 11200,
    pages: 26,
    keyTakeaways: [
      'Top 3 converting Click-to-WhatsApp ad creative angles for distressed properties',
      'The 4-question WhatsApp bot script that weeds out tire-kickers automatically',
      'How to connect Meta CAPI so ad algorithms find actual home sellers',
      'Speed-to-lead workflow that secures contracts before competitors respond'
    ],
    affiliatePartnerRecommendation: 'Carrot & LeadsBridge',
    affiliateToolSlug: 'carrot',
    coverGradient: 'from-amber-950 via-slate-900 to-emerald-950'
  },
  {
    id: 'lm_crm_04',
    slug: 'crm-automation-blueprint',
    title: 'Real Estate Tech Stack & High-Volume CRM Architecture',
    subtitle: 'Connect Facebook Lead Ads, WhatsApp, website forms, and transaction management with zero manual data entry.',
    description: 'Learn how modern brokers and investment funds wire their entire tech stack. Includes webhook schemas, Zapier recipes, and CAPI offline conversion synchronization.',
    persona: 'agent',
    badge: 'Tech Stack',
    downloadCount: 6840,
    pages: 16,
    keyTakeaways: [
      'The ideal software stack for solo agents vs teams vs wholesalers',
      'Preventing lead drop-off between ad click and phone call',
      'Setting up automated multi-touch SMS and email follow-up cascades',
      'Preserving UTM parameters through the entire sales pipeline'
    ],
    affiliatePartnerRecommendation: 'LeadsBridge',
    affiliateToolSlug: 'leadsbridge',
    coverGradient: 'from-purple-950 via-slate-900 to-blue-950'
  }
];

// Persistent state store (In-memory singleton with initial seeds)
class PropEngineStore {
  private leads: Lead[] = [];
  private affiliateClicks: AffiliateClick[] = [];
  private whatsappConversations: Map<string, WhatsAppConversation> = new Map();
  private whatsappMessages: WhatsAppMessage[] = [];
  private capiEvents: MetaCAPIEvent[] = [];

  constructor() {
    this.seedInitialData();
  }

  private seedInitialData() {
    // Seed sample leads for analytics demonstration
    this.leads = [
      {
        id: 'lead_seed_01',
        fullName: 'Alexander Wright',
        email: 'alex.wright@equityinvest.io',
        phone: '+15125550182',
        persona: 'investor',
        source: 'brrrr_calculator',
        utmSource: 'google',
        utmMedium: 'organic',
        utmCampaign: 'brrrr-roi-keyword',
        consentMarketing: true,
        consentSms: true,
        leadScore: 92,
        status: 'qualified',
        metadata: { dealType: 'BRRRR', calculatedPrice: 320000, projectedEquity: 68000 },
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
      {
        id: 'lead_seed_02',
        fullName: 'Samantha Miller',
        email: 'smiller@realtypros.com',
        phone: '+14045550199',
        persona: 'agent',
        source: 'whatsapp_bot',
        utmSource: 'meta_ads',
        utmMedium: 'cpc',
        utmCampaign: 'click-to-whatsapp-seller-blueprint',
        fbclid: 'fb.1.1760000000.IwARtest01',
        fbc: 'fb.1.1760000000.IwARtest01',
        fbp: 'fb.1.1760000000.987654321',
        consentMarketing: true,
        consentSms: true,
        leadScore: 88,
        status: 'contacted',
        metadata: { market: 'Atlanta GA', goal: 'Motivated seller leads', timeline: '0-30 days' },
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      },
      {
        id: 'lead_seed_03',
        fullName: 'Daniel Ortiz',
        email: 'daniel.ortiz@crestviewmgmt.com',
        phone: '+13055550134',
        persona: 'landlord',
        source: 'lead_magnet_rental',
        utmSource: 'direct',
        utmMedium: 'referral',
        consentMarketing: true,
        consentSms: false,
        leadScore: 78,
        status: 'nurturing',
        metadata: { portfolioDoors: 14, primaryIssue: 'Tenant screening & accounting' },
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      }
    ];

    // Seed sample affiliate clicks
    this.affiliateClicks = [
      {
        id: 'click_01',
        clickId: '550e8400-e29b-41d4-a716-446655440001',
        toolId: 'tool_dealcheck_01',
        toolSlug: 'dealcheck',
        toolName: 'DealCheck',
        source: 'calculator_trigger',
        utmSource: 'organic',
        utmMedium: 'brrrr_tool',
        destinationUrl: 'https://dealcheck.io/?ref=propengine&subid=550e8400-e29b-41d4-a716-446655440001',
        converted: true,
        conversionId: 'sub_dealcheck_9941',
        payout: 12.00,
        currency: 'USD',
        createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
      },
      {
        id: 'click_02',
        clickId: '550e8400-e29b-41d4-a716-446655440002',
        toolId: 'tool_carrot_03',
        toolSlug: 'carrot',
        toolName: 'Carrot',
        source: 'comparison_page',
        utmSource: 'google_seo',
        utmMedium: 'review',
        destinationUrl: 'https://carrot.com/?ref=propengine&subid=550e8400-e29b-41d4-a716-446655440002',
        converted: false,
        payout: 0,
        currency: 'USD',
        createdAt: new Date(Date.now() - 3600000 * 14).toISOString(),
      },
      {
        id: 'click_03',
        clickId: '550e8400-e29b-41d4-a716-446655440003',
        toolId: 'tool_showcase_idx_02',
        toolSlug: 'showcase-idx',
        toolName: 'Showcase IDX',
        source: 'directory_grid',
        utmSource: 'meta_retargeting',
        utmMedium: 'cpc',
        destinationUrl: 'https://showcaseidx.com/?ref=propengine&subid=550e8400-e29b-41d4-a716-446655440003',
        converted: true,
        conversionId: 'sub_idx_7712',
        payout: 23.80,
        currency: 'USD',
        createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
      }
    ];

    // Seed sample WhatsApp conversation
    const waId = '14045550199';
    const convId = 'wa_conv_01';
    this.whatsappConversations.set(waId, {
      id: convId,
      waId: waId,
      phone: '+14045550199',
      profileName: 'Samantha M.',
      state: 'qualified',
      lastMessageAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      botEnabled: true,
      metadata: {
        persona: 'agent',
        market: 'Atlanta GA',
        budget: '$1,000/mo ad spend',
        timeline: '0-30 days',
        leadScore: 88,
        recommendedTool: 'Carrot'
      },
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    });

    this.whatsappMessages = [
      {
        id: 'msg_01',
        conversationId: convId,
        direction: 'inbound',
        messageId: 'wamid_in_01',
        type: 'text',
        body: 'I want to analyze motivated seller leads for Atlanta.',
        status: 'read',
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      },
      {
        id: 'msg_02',
        conversationId: convId,
        direction: 'outbound',
        messageId: 'wamid_out_01',
        type: 'text',
        body: 'Welcome to PropEngine Hub Growth Bot! 🏡 Which role describes you best?\n1. Real Estate Investor (BRRRR / Flip)\n2. Licensed Agent / Broker\n3. Landlord / Property Manager',
        status: 'delivered',
        createdAt: new Date(Date.now() - 3600000 * 12 + 1000).toISOString(),
      },
      {
        id: 'msg_03',
        conversationId: convId,
        direction: 'inbound',
        messageId: 'wamid_in_02',
        type: 'text',
        body: '2. Licensed Agent / Broker',
        status: 'read',
        createdAt: new Date(Date.now() - 3600000 * 12 + 30000).toISOString(),
      },
      {
        id: 'msg_04',
        conversationId: convId,
        direction: 'outbound',
        messageId: 'wamid_out_02',
        type: 'text',
        body: 'Great to meet you Samantha! For agent lead gen in Atlanta, Carrot websites + LeadsBridge Meta Ads integration converts at 2.4x standard landing pages. Here is your free Seller Lead Playbook: https://propenginehub.com/lead-magnet/seller-lead-machine-playbook',
        status: 'read',
        createdAt: new Date(Date.now() - 3600000 * 12 + 32000).toISOString(),
      }
    ];

    // Seed sample CAPI events
    this.capiEvents = [
      {
        eventName: 'Lead',
        eventId: 'evt_lead_550e8400_seed1',
        eventTime: Math.floor((Date.now() - 3600000 * 5) / 1000),
        actionSource: 'website',
        userData: {
          em: ['a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'],
          ph: ['0123456789abcdef0123456789abcdef01234567'],
          clientIpAddress: '73.189.44.12',
          clientUserAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
        },
        customData: {
          contentName: 'BRRRR Deal Estimator Calculation',
          persona: 'investor',
          leadScore: 92,
          value: 5.00,
          currency: 'USD'
        },
        sentToMeta: true,
        response: { events_received: 1, fbtrace_id: 'E7X3_mock_trace' },
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      }
    ];
  }

  // Leads
  public getLeads(): Lead[] {
    return [...this.leads].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public findLeadByEmailOrPhone(email?: string, phone?: string): Lead | undefined {
    const normEmail = email?.trim().toLowerCase();
    const normPhone = phone?.replace(/[^0-9+]/g, '');
    return this.leads.find(l => 
      (normEmail && l.email.toLowerCase() === normEmail) ||
      (normPhone && l.phone && l.phone.replace(/[^0-9+]/g, '') === normPhone)
    );
  }

  public upsertLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): Lead {
    const existing = this.findLeadByEmailOrPhone(leadData.email, leadData.phone);
    const now = new Date().toISOString();

    if (existing) {
      existing.fullName = leadData.fullName || existing.fullName;
      existing.persona = leadData.persona || existing.persona;
      existing.phone = leadData.phone || existing.phone;
      existing.leadScore = Math.max(existing.leadScore, leadData.leadScore || 0);
      existing.status = leadData.status || existing.status;
      existing.consentMarketing = leadData.consentMarketing || existing.consentMarketing;
      existing.consentSms = leadData.consentSms || existing.consentSms;
      existing.metadata = { ...existing.metadata, ...leadData.metadata };
      existing.updatedAt = now;
      return existing;
    }

    const newLead: Lead = {
      id: leadData.id || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email: leadData.email.trim().toLowerCase(),
      fullName: leadData.fullName,
      phone: leadData.phone,
      persona: leadData.persona,
      source: leadData.source,
      utmSource: leadData.utmSource,
      utmMedium: leadData.utmMedium,
      utmCampaign: leadData.utmCampaign,
      utmContent: leadData.utmContent,
      utmTerm: leadData.utmTerm,
      fbclid: leadData.fbclid,
      fbc: leadData.fbc,
      fbp: leadData.fbp,
      ip: leadData.ip,
      userAgent: leadData.userAgent,
      consentMarketing: leadData.consentMarketing,
      consentSms: leadData.consentSms,
      leadScore: leadData.leadScore || 50,
      status: leadData.status || 'new',
      metadata: leadData.metadata || {},
      createdAt: now,
      updatedAt: now,
    };

    this.leads.unshift(newLead);
    return newLead;
  }

  // Affiliate Clicks
  public logAffiliateClick(click: Omit<AffiliateClick, 'id' | 'createdAt'>): AffiliateClick {
    const fullClick: AffiliateClick = {
      ...click,
      id: `aff_click_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
    };
    this.affiliateClicks.unshift(fullClick);
    return fullClick;
  }

  public getAffiliateClicks(): AffiliateClick[] {
    return [...this.affiliateClicks];
  }

  // WhatsApp
  public getConversationByWaId(waId: string): WhatsAppConversation | undefined {
    return this.whatsappConversations.get(waId);
  }

  public getAllConversations(): WhatsAppConversation[] {
    return Array.from(this.whatsappConversations.values()).sort(
      (a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
    );
  }

  public upsertConversation(conv: Partial<WhatsAppConversation> & { waId: string; phone: string }): WhatsAppConversation {
    const existing = this.whatsappConversations.get(conv.waId);
    const now = new Date().toISOString();

    if (existing) {
      const updated: WhatsAppConversation = {
        ...existing,
        ...conv,
        metadata: { ...existing.metadata, ...(conv.metadata || {}) },
        lastMessageAt: now,
        updatedAt: now,
      };
      this.whatsappConversations.set(conv.waId, updated);
      return updated;
    }

    const created: WhatsAppConversation = {
      id: conv.id || `wa_conv_${Date.now()}`,
      waId: conv.waId,
      phone: conv.phone,
      profileName: conv.profileName || 'WhatsApp User',
      state: conv.state || 'new',
      lastMessageAt: now,
      botEnabled: conv.botEnabled ?? true,
      metadata: conv.metadata || {},
      createdAt: now,
      updatedAt: now,
    };
    this.whatsappConversations.set(conv.waId, created);
    return created;
  }

  public addWhatsAppMessage(msg: Omit<WhatsAppMessage, 'id' | 'createdAt'>): WhatsAppMessage {
    const fullMsg: WhatsAppMessage = {
      ...msg,
      id: `wa_msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
    };
    this.whatsappMessages.push(fullMsg);
    return fullMsg;
  }

  public getMessagesForConversation(convId: string): WhatsAppMessage[] {
    return this.whatsappMessages.filter(m => m.conversationId === convId);
  }

  // Meta CAPI
  public logCapiEvent(evt: MetaCAPIEvent) {
    this.capiEvents.unshift(evt);
  }

  public getCapiEvents(): MetaCAPIEvent[] {
    return [...this.capiEvents];
  }

  // Analytics Aggregation
  public getAnalyticsSummary() {
    const totalLeads = this.leads.length;
    const qualifiedLeads = this.leads.filter(l => l.status === 'qualified' || l.leadScore >= 80).length;
    const totalClicks = this.affiliateClicks.length;
    const conversions = this.affiliateClicks.filter(c => c.converted).length;
    const totalPayout = this.affiliateClicks.reduce((sum, c) => sum + (c.payout || 0), 0);
    const epc = totalClicks > 0 ? totalPayout / totalClicks : 0;
    const conversationsCount = this.whatsappConversations.size;

    return {
      totalLeads,
      qualifiedLeads,
      qualificationRate: totalLeads > 0 ? (qualifiedLeads / totalLeads) * 100 : 0,
      totalClicks,
      conversions,
      conversionRate: totalClicks > 0 ? (conversions / totalClicks) * 100 : 0,
      totalPayout,
      epc,
      conversationsCount,
      activeToolsCount: TOOLS.filter(t => t.isActive).length,
      leadMagnetsCount: LEAD_MAGNETS.length,
      capiEventsCount: this.capiEvents.length,
    };
  }
}

// Global singleton instance
declare global {
  var __propEngineStore: PropEngineStore | undefined;
}

export const db = global.__propEngineStore || (global.__propEngineStore = new PropEngineStore());
