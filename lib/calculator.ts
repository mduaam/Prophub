import { DealCalculatorInputs, DealCalculatorOutputs } from './types';

export const DEFAULT_DEAL_INPUTS: DealCalculatorInputs = {
  dealType: 'BRRRR',
  purchasePrice: 250000,
  estimatedRehab: 40000,
  closingCostsPercent: 3,
  holdingCostsMonthly: 1500,
  holdMonths: 6,
  afterRepairValue: 350000,
  monthlyRent: 2500,
  vacancyRate: 5,
  operatingExpenseRate: 35,
  refinanceLTV: 75,
  refinanceInterestRate: 7.5,
  loanTermYears: 30,
  propertyTaxYearly: 3600,
  insuranceYearly: 1800,
  hoaMonthly: 0,
};

export function calculateDealMetrics(inputs: DealCalculatorInputs): DealCalculatorOutputs {
  const purchasePrice = Math.max(0, inputs.purchasePrice || 0);
  const estimatedRehab = Math.max(0, inputs.estimatedRehab || 0);
  const closingCosts = purchasePrice * ((inputs.closingCostsPercent || 0) / 100);
  const holdingCosts = Math.max(0, inputs.holdingCostsMonthly || 0) * Math.max(1, inputs.holdMonths || 1);
  
  const totalProjectCost = purchasePrice + estimatedRehab + closingCosts + holdingCosts;
  const allInCost = totalProjectCost;

  const arv = Math.max(0, inputs.afterRepairValue || 0);
  const refinanceLTV = Math.min(80, Math.max(0, inputs.refinanceLTV || 0));
  const refinanceLoanAmount = arv * (refinanceLTV / 100);

  const cashLeftInDeal = allInCost - refinanceLoanAmount;
  const equityCreated = arv - allInCost;
  const infiniteReturn = cashLeftInDeal <= 0;

  const monthlyGrossRent = Math.max(0, inputs.monthlyRent || 0);
  const vacancyRate = Math.min(100, Math.max(0, inputs.vacancyRate || 0));
  const monthlyEffectiveRent = monthlyGrossRent * (1 - vacancyRate / 100);

  const operatingExpenseRate = Math.min(100, Math.max(0, inputs.operatingExpenseRate || 0));
  const baseOpEx = monthlyEffectiveRent * (operatingExpenseRate / 100);
  const monthlyTax = (inputs.propertyTaxYearly || 0) / 12;
  const monthlyInsurance = (inputs.insuranceYearly || 0) / 12;
  const monthlyHOA = inputs.hoaMonthly || 0;

  const monthlyOperatingExpenses = baseOpEx + monthlyTax + monthlyInsurance + monthlyHOA;
  const monthlyNOI = monthlyEffectiveRent - monthlyOperatingExpenses;
  const capRate = arv > 0 ? ((monthlyNOI * 12) / arv) * 100 : 0;

  // Monthly Debt Service (Amortized loan calculation)
  const annualInterestRate = Math.max(0, inputs.refinanceInterestRate || 0) / 100;
  const monthlyInterestRate = annualInterestRate / 12;
  const totalPayments = Math.max(1, inputs.loanTermYears || 30) * 12;

  let monthlyDebtService = 0;
  if (refinanceLoanAmount > 0 && monthlyInterestRate > 0) {
    const factor = Math.pow(1 + monthlyInterestRate, totalPayments);
    monthlyDebtService = refinanceLoanAmount * ((monthlyInterestRate * factor) / (factor - 1));
  } else if (refinanceLoanAmount > 0 && monthlyInterestRate === 0) {
    monthlyDebtService = refinanceLoanAmount / totalPayments;
  }

  const annualDebtService = monthlyDebtService * 12;
  const monthlyCashFlow = monthlyNOI - monthlyDebtService;
  const annualCashFlow = monthlyCashFlow * 12;

  // Cash on Cash Return
  let cashOnCash = 0;
  if (infiniteReturn) {
    cashOnCash = 100; // Flagged as infinite
  } else if (cashLeftInDeal > 0) {
    cashOnCash = (annualCashFlow / cashLeftInDeal) * 100;
  }

  // DSCR = NOI / Monthly Debt Service
  const dscr = monthlyDebtService > 0 ? monthlyNOI / monthlyDebtService : (monthlyNOI > 0 ? 2.5 : 0);

  // ROI = (Equity Created + Annual Cash Flow) / All-In Cost
  const roi = allInCost > 0 ? ((equityCreated + annualCashFlow) / allInCost) * 100 : 0;

  // Deal Grade
  let dealGrade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' = 'B';
  let dealGradeReason = 'Moderate cash flow with sound collateral coverage.';

  if (infiniteReturn && dscr >= 1.25) {
    dealGrade = 'A+';
    dealGradeReason = 'Perfect BRRRR execution! 100% capital returned with healthy cash flow coverage.';
  } else if (dscr >= 1.25 && cashOnCash >= 12 && equityCreated > 30000) {
    dealGrade = 'A';
    dealGradeReason = 'Excellent deal fundamentals: strong DSCR, robust cash-on-cash return, and immediate equity.';
  } else if (dscr >= 1.15 && cashOnCash >= 7) {
    dealGrade = 'B';
    dealGradeReason = 'Solid operator deal. Safe debt coverage ratio with dependable positive monthly cash flow.';
  } else if (dscr >= 1.0 && monthlyCashFlow >= 0) {
    dealGrade = 'C';
    dealGradeReason = 'Marginal cash flow buffer. Any unexpected vacancy or maintenance will put this into negative territory.';
  } else if (dscr < 1.0 && monthlyCashFlow < 0 && monthlyCashFlow > -300) {
    dealGrade = 'D';
    dealGradeReason = 'Negative monthly cash flow! Rent is insufficient to cover debt service and operating expenses.';
  } else {
    dealGrade = 'F';
    dealGradeReason = 'Unfavorable deal metrics. Substantial negative cash flow and dangerous leverage ratio.';
  }

  // Affiliate Triggers
  const affiliateTriggers: DealCalculatorOutputs['affiliateTriggers'] = [];

  if (dscr < 1.2) {
    affiliateTriggers.push({
      partner: 'DealCheck',
      headline: 'DSCR Below 1.20 — Rent Comps & Sensitivity Check Required',
      subheadline: 'Underwriters require $\\ge$1.20 DSCR for prime refinance terms. Run granular neighborhood rent comps in DealCheck.',
      ctaText: 'Analyze Deal in DealCheck (14-Day Free Trial)',
      toolSlug: 'dealcheck',
      reason: 'DSCR is ' + dscr.toFixed(2) + ' (target $\\ge$ 1.25)',
      urgency: 'high',
    });
  }

  if (inputs.dealType === 'BRRRR' || inputs.dealType === 'Rental') {
    affiliateTriggers.push({
      partner: 'Showcase IDX',
      headline: 'Find Comparable Rental Sales & Off-Market MLS Inventory',
      subheadline: 'Uncover distressed properties and compare historical price-per-square-foot in real time.',
      ctaText: 'Get Showcase IDX Free Demo',
      toolSlug: 'showcase-idx',
      reason: 'Active ' + inputs.dealType + ' strategy requires high-speed comp data',
      urgency: 'recommended',
    });
  }

  if (estimatedRehab >= 40000) {
    affiliateTriggers.push({
      partner: 'PropStream',
      headline: 'Rehab Budget Exceeds $40k — Verify Comps & Permits',
      subheadline: 'Pull comprehensive MLS sales data, tax assessor records, and historic liens before signing contractor bids.',
      ctaText: 'Start 7-Day Free Trial on PropStream',
      toolSlug: 'propstream',
      reason: 'Substantial rehab ($' + estimatedRehab.toLocaleString() + ') creates equity risk without verified comps',
      urgency: 'high',
    });
  }

  if (cashLeftInDeal > 40000) {
    affiliateTriggers.push({
      partner: 'Carrot',
      headline: 'Over $' + Math.round(cashLeftInDeal).toLocaleString() + ' Trapped in Deal? Generate Off-Market Deals',
      subheadline: 'Top investors buy at 60-70% ARV using direct-to-seller websites to achieve 0% cash left in deal.',
      ctaText: 'Build a Motivated Seller Site with Carrot',
      toolSlug: 'carrot',
      reason: 'High cash left in deal ($' + Math.round(cashLeftInDeal).toLocaleString() + ') restricts portfolio velocity',
      urgency: 'medium',
    });
  }

  return {
    totalProjectCost,
    allInCost,
    refinanceLoanAmount,
    cashLeftInDeal,
    equityCreated,
    monthlyGrossRent,
    monthlyEffectiveRent,
    monthlyOperatingExpenses,
    monthlyNOI,
    capRate,
    monthlyDebtService,
    annualDebtService,
    monthlyCashFlow,
    annualCashFlow,
    cashOnCash,
    dscr,
    roi,
    dealGrade,
    dealGradeReason,
    infiniteReturn,
    affiliateTriggers,
  };
}
