'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  Percent, 
  Building2, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  FileDown, 
  Send, 
  Flame, 
  RefreshCw,
  Info,
  ExternalLink
} from 'lucide-react';
import { DealCalculatorInputs, DealType, PersonaType } from '@/lib/types';
import { calculateDealMetrics, DEFAULT_DEAL_INPUTS } from '@/lib/calculator';

export default function DealCalculator({ initialType }: { initialType?: DealType }) {
  const [inputs, setInputs] = useState<DealCalculatorInputs>({
    ...DEFAULT_DEAL_INPUTS,
    dealType: initialType || DEFAULT_DEAL_INPUTS.dealType,
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [leadForm, setLeadForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    persona: 'investor' as PersonaType,
    consentMarketing: true,
    consentSms: false,
  });
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState<{
    downloadUrl: string;
    leadId: string;
    eventId: string;
  } | null>(null);
  const [leadError, setLeadError] = useState<string | null>(null);

  // Field change handler
  const handleInputChange = (field: keyof DealCalculatorInputs, value: unknown) => {
    const updated = { ...inputs, [field]: value };
    
    // Inline validation check
    const errors: Record<string, string> = { ...validationErrors };
    if (field === 'purchasePrice') {
      const num = Number(value);
      if (isNaN(num) || num <= 0) {
        errors.purchasePrice = 'Purchase price must be greater than $0';
      } else {
        delete errors.purchasePrice;
      }
    }
    if (field === 'afterRepairValue') {
      const num = Number(value);
      if (isNaN(num) || num <= 0) {
        errors.afterRepairValue = 'After Repair Value (ARV) must be greater than $0';
      } else {
        delete errors.afterRepairValue;
      }
    }
    setValidationErrors(errors);
    setInputs(updated);
  };

  // Real-time calculation
  const metrics = useMemo(() => {
    return calculateDealMetrics(inputs);
  }, [inputs]);

  const isFormValid = !validationErrors.purchasePrice && !validationErrors.afterRepairValue && inputs.purchasePrice > 0;

  const handleSaveLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadError(null);
    setLeadSubmitting(true);

    try {
      const res = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: leadForm.email,
          fullName: leadForm.fullName,
          phone: leadForm.phone || undefined,
          persona: leadForm.persona,
          source: 'brrrr_calculator_save',
          leadMagnetId: 'brrrr-mastery-checklist',
          consentMarketing: leadForm.consentMarketing,
          consentSms: leadForm.consentSms,
          metadata: {
            dealType: inputs.dealType,
            purchasePrice: inputs.purchasePrice,
            estimatedRehab: inputs.estimatedRehab,
            arv: inputs.afterRepairValue,
            cashLeftInDeal: metrics.cashLeftInDeal,
            infiniteReturn: metrics.infiniteReturn,
            dscr: Number(metrics.dscr.toFixed(2)),
            monthlyCashFlow: Math.round(metrics.monthlyCashFlow),
            dealGrade: metrics.dealGrade,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.message || 'Failed to generate deal report');
      }

      setLeadSuccess({
        downloadUrl: data.pdfUrl,
        leadId: data.leadId,
        eventId: data.eventId,
      });
    } catch (err: unknown) {
      setLeadError(err instanceof Error ? err.message : 'Error submitting lead form');
    } finally {
      setLeadSubmitting(false);
    }
  };

  const gradeColors: Record<string, { bg: string; text: string; border: string }> = {
    'A+': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
    'A': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
    'B': { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/30' },
    'C': { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
    'D': { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
    'F': { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' },
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Strategy Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                <Calculator className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">Interactive Deal Underwriting Engine</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Real-time cash-on-cash, refinance proceed sizing, debt service coverage (DSCR), and cash-left-in-deal.
            </p>
          </div>

          {/* Deal Type Switcher */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
            {(['BRRRR', 'Rental', 'Purchase', 'Flip'] as DealType[]).map((type) => (
              <button
                key={type}
                onClick={() => handleInputChange('dealType', type)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  inputs.dealType === type
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Grid: Inputs on Left, Real-Time Financial Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          
          {/* Inputs Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Acquisition & Rehab */}
            <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800/80 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Building2 className="w-4 h-4" /> 1. Acquisition & Rehab Assumptions
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Purchase Price ($) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500 text-xs">$</span>
                    <input
                      type="number"
                      value={inputs.purchasePrice || ''}
                      onChange={(e) => handleInputChange('purchasePrice', Number(e.target.value))}
                      className={`w-full bg-slate-900 border ${
                        validationErrors.purchasePrice ? 'border-rose-500' : 'border-slate-700'
                      } rounded-lg pl-7 pr-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500`}
                    />
                  </div>
                  {validationErrors.purchasePrice && (
                    <p className="text-[11px] text-rose-400 mt-1">{validationErrors.purchasePrice}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Estimated Rehab ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500 text-xs">$</span>
                    <input
                      type="number"
                      value={inputs.estimatedRehab || ''}
                      onChange={(e) => handleInputChange('estimatedRehab', Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-7 pr-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Closing Costs (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.5"
                      value={inputs.closingCostsPercent}
                      onChange={(e) => handleInputChange('closingCostsPercent', Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                    <span className="absolute right-3 top-2.5 text-slate-500 text-xs">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Holding Costs / Month ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500 text-xs">$</span>
                    <input
                      type="number"
                      value={inputs.holdingCostsMonthly}
                      onChange={(e) => handleInputChange('holdingCostsMonthly', Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-7 pr-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Rehab & Hold Duration</span>
                    <span className="text-white font-semibold">{inputs.holdMonths} Months</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="24"
                    value={inputs.holdMonths}
                    onChange={(e) => handleInputChange('holdMonths', Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: After Repair Value & Refinance */}
            <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800/80 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" /> 2. ARV & Cash-Out Refinance
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    After Repair Value (ARV) ($) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500 text-xs">$</span>
                    <input
                      type="number"
                      value={inputs.afterRepairValue || ''}
                      onChange={(e) => handleInputChange('afterRepairValue', Number(e.target.value))}
                      className={`w-full bg-slate-900 border ${
                        validationErrors.afterRepairValue ? 'border-rose-500' : 'border-slate-700'
                      } rounded-lg pl-7 pr-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500`}
                    />
                  </div>
                  {validationErrors.afterRepairValue && (
                    <p className="text-[11px] text-rose-400 mt-1">{validationErrors.afterRepairValue}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Refinance LTV (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="80"
                      value={inputs.refinanceLTV}
                      onChange={(e) => handleInputChange('refinanceLTV', Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500"
                    />
                    <span className="absolute right-3 top-2.5 text-slate-500 text-xs">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Interest Rate (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.125"
                      value={inputs.refinanceInterestRate}
                      onChange={(e) => handleInputChange('refinanceInterestRate', Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500"
                    />
                    <span className="absolute right-3 top-2.5 text-slate-500 text-xs">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Loan Term
                  </label>
                  <select
                    value={inputs.loanTermYears}
                    onChange={(e) => handleInputChange('loanTermYears', Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value={30}>30 Years (Fixed)</option>
                    <option value={20}>20 Years (Fixed)</option>
                    <option value={15}>15 Years (Fixed)</option>
                    <option value={10}>10 Years</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Rental Operations & Expenses */}
            <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800/80 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4" /> 3. Rental Income & Operating Expenses
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Monthly Rent ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500 text-xs">$</span>
                    <input
                      type="number"
                      value={inputs.monthlyRent}
                      onChange={(e) => handleInputChange('monthlyRent', Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-7 pr-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Vacancy Rate (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={inputs.vacancyRate}
                      onChange={(e) => handleInputChange('vacancyRate', Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                    <span className="absolute right-3 top-2.5 text-slate-500 text-xs">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    OpEx Rate (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={inputs.operatingExpenseRate}
                      onChange={(e) => handleInputChange('operatingExpenseRate', Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                    <span className="absolute right-3 top-2.5 text-slate-500 text-xs">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Taxes / Year ($)
                  </label>
                  <input
                    type="number"
                    value={inputs.propertyTaxYearly}
                    onChange={(e) => handleInputChange('propertyTaxYearly', Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Insurance / Year ($)
                  </label>
                  <input
                    type="number"
                    value={inputs.insuranceYearly}
                    onChange={(e) => handleInputChange('insuranceYearly', Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    HOA / Month ($)
                  </label>
                  <input
                    type="number"
                    value={inputs.hoaMonthly}
                    onChange={(e) => handleInputChange('hoaMonthly', Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <button
                onClick={() => setInputs(DEFAULT_DEAL_INPUTS)}
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset to Benchmark BRRRR Inputs
              </button>
              <span>Instant client-side formula execution (sub-10ms)</span>
            </div>
          </div>

          {/* Outputs Column */}
          <div className="lg:col-span-5 space-y-6">

            {/* Deal Grade Card */}
            <div className={`p-5 rounded-2xl border ${gradeColors[metrics.dealGrade]?.border || 'border-slate-800'} ${gradeColors[metrics.dealGrade]?.bg || 'bg-slate-950'} transition-all`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Underwriting Rating</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className={`text-3xl font-extrabold ${gradeColors[metrics.dealGrade]?.text || 'text-white'}`}>
                      Grade {metrics.dealGrade}
                    </span>
                    <span className="text-xs text-slate-400">
                      DSCR: <strong className="text-white">{metrics.dscr.toFixed(2)}</strong>
                    </span>
                  </div>
                </div>

                {/* Infinite return badge */}
                {metrics.infiniteReturn ? (
                  <div className="bg-emerald-500/20 border border-emerald-500/40 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-emerald-400 text-xs font-bold animate-pulse">
                    <Flame className="w-4 h-4 text-emerald-400" />
                    <span>Infinite Return!</span>
                  </div>
                ) : (
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400">Cash-on-Cash</span>
                    <p className="text-base font-bold text-white">{metrics.cashOnCash.toFixed(1)}%</p>
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-300 mt-3 pt-3 border-t border-slate-800/80 leading-relaxed">
                {metrics.dealGradeReason}
              </p>
            </div>

            {/* Primary Financial Metric Grid */}
            <div className="grid grid-cols-2 gap-3">
              
              {/* Cash Left in Deal */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-0.5">Cash Left in Deal</span>
                <p className={`text-xl font-extrabold ${metrics.cashLeftInDeal <= 0 ? 'text-emerald-400' : 'text-white'}`}>
                  ${Math.round(metrics.cashLeftInDeal).toLocaleString()}
                </p>
                <span className="text-[10px] text-slate-500">
                  {metrics.cashLeftInDeal <= 0 ? '100% capital extracted' : 'Net equity invested'}
                </span>
              </div>

              {/* Equity Created */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-0.5">Equity Created</span>
                <p className="text-xl font-extrabold text-teal-400">
                  +${Math.round(metrics.equityCreated).toLocaleString()}
                </p>
                <span className="text-[10px] text-slate-500">ARV minus all-in cost</span>
              </div>

              {/* Monthly Cash Flow */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-0.5">Monthly Net Cash Flow</span>
                <p className={`text-xl font-extrabold ${metrics.monthlyCashFlow >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  ${Math.round(metrics.monthlyCashFlow).toLocaleString()}/mo
                </p>
                <span className="text-[10px] text-slate-500">
                  ${Math.round(metrics.annualCashFlow).toLocaleString()}/yr
                </span>
              </div>

              {/* Cap Rate */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-0.5">Cap Rate</span>
                <p className="text-xl font-extrabold text-white">
                  {metrics.capRate.toFixed(2)}%
                </p>
                <span className="text-[10px] text-slate-500">
                  NOI / Purchase + Rehab
                </span>
              </div>
            </div>

            {/* Detailed Pro Forma Breakdown */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
              <h4 className="font-semibold text-slate-300 pb-1 border-b border-slate-800 flex items-center justify-between">
                <span>Underwriting Waterfall</span>
                <span className="text-[11px] text-slate-400 font-normal">All-in: ${Math.round(metrics.allInCost).toLocaleString()}</span>
              </h4>
              <div className="flex justify-between text-slate-400">
                <span>Purchase Price:</span>
                <span className="text-white font-medium">${inputs.purchasePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Rehab & Holding Costs:</span>
                <span className="text-white font-medium">
                  ${(inputs.estimatedRehab + (inputs.holdingCostsMonthly * inputs.holdMonths)).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Refinance Loan ({inputs.refinanceLTV}% LTV):</span>
                <span className="text-emerald-400 font-medium">${Math.round(metrics.refinanceLoanAmount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Monthly Debt Service:</span>
                <span className="text-slate-200 font-medium">${Math.round(metrics.monthlyDebtService).toLocaleString()}/mo</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Monthly Net Operating Income (NOI):</span>
                <span className="text-teal-400 font-medium">${Math.round(metrics.monthlyNOI).toLocaleString()}/mo</span>
              </div>
            </div>

            {/* Save & Email Packet Action */}
            <button
              onClick={() => setShowSaveModal(true)}
              disabled={!isFormValid}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-slate-950 font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-slate-950" />
              <span>Save & Export Lender-Ready Deal PDF</span>
            </button>

            {/* Contextual Affiliate Recommendation Triggers */}
            {metrics.affiliateTriggers.length > 0 && (
              <div className="space-y-3 pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Operator Optimization Triggers
                </span>

                {metrics.affiliateTriggers.slice(0, 2).map((trigger, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 hover:border-emerald-500/60 transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-emerald-300">{trigger.partner} Recommendation</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                        {trigger.urgency === 'high' ? 'High Impact' : 'Recommended'}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-white">{trigger.headline}</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{trigger.subheadline}</p>

                    <div className="pt-1 flex items-center justify-between">
                      <a
                        href={`/api/affiliate/redirect/${trigger.toolSlug}?source=calculator_trigger&utm_campaign=deal_analysis`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:underline"
                      >
                        <span>{trigger.ctaText}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <span className="text-[10px] text-slate-500">Sponsored link</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Save & Download Deal Packet Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 max-w-lg w-full rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => {
                setShowSaveModal(false);
                setLeadSuccess(null);
              }}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            {!leadSuccess ? (
              <form onSubmit={handleSaveLeadSubmit} className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                    <FileDown className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Save & Email Lender Deal Packet</h3>
                    <p className="text-xs text-slate-400">Receive a complete branded PDF with amortization and DSCR tables.</p>
                  </div>
                </div>

                {leadError && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-lg text-xs">
                    {leadError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={leadForm.fullName}
                    onChange={(e) => setLeadForm({ ...leadForm, fullName: e.target.value })}
                    placeholder="e.g. Jordan Hunter"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    placeholder="jordan@equitygrowth.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number (Optional for SMS Alerts)</label>
                  <input
                    type="tel"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your Operator Role</label>
                  <select
                    value={leadForm.persona}
                    onChange={(e) => setLeadForm({ ...leadForm, persona: e.target.value as PersonaType })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="investor">Real Estate Investor (BRRRR / Flipping)</option>
                    <option value="agent">Licensed Agent or Broker</option>
                    <option value="landlord">Landlord / Portfolio Manager</option>
                  </select>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                  <label className="flex items-start gap-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={leadForm.consentMarketing}
                      onChange={(e) => setLeadForm({ ...leadForm, consentMarketing: e.target.checked })}
                      className="mt-0.5 accent-emerald-500"
                    />
                    <span>I agree to receive the deal underwriting PDF and free real estate growth updates via email.</span>
                  </label>

                  <label className="flex items-start gap-2 text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={leadForm.consentSms}
                      onChange={(e) => setLeadForm({ ...leadForm, consentSms: e.target.checked })}
                      className="mt-0.5 accent-emerald-500"
                    />
                    <span>Opt-in to SMS updates for critical interest rate and lender refinance changes.</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={leadSubmitting}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {leadSubmitting ? (
                    <span>Processing CAPI & Generating PDF...</span>
                  ) : (
                    <>
                      <span>Generate My Instant Report</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Deal Packet Ready!</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Your analysis for <strong className="text-emerald-400">${inputs.purchasePrice.toLocaleString()}</strong> has been generated and dispatched.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-left space-y-1">
                  <div className="text-slate-400">Lead ID: <span className="text-slate-200 font-mono">{leadSuccess.leadId}</span></div>
                  <div className="text-slate-400">Meta CAPI Event: <span className="text-emerald-400 font-mono">{leadSuccess.eventId}</span></div>
                  <div className="text-slate-400">Status: <span className="text-emerald-400 font-semibold">Attributed & Verified</span></div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <Link
                    href={leadSuccess.downloadUrl}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-lg text-sm flex items-center justify-center gap-2"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Download Deal Report PDF</span>
                  </Link>

                  <button
                    onClick={() => setShowSaveModal(false)}
                    className="text-xs text-slate-400 hover:text-white py-1"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
