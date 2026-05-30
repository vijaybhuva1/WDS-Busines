import React from 'react';
import { 
  Building2, Phone, Mail, Globe, Users, Plus, Trash2, Heart, Award, 
  Target, TrendingUp, AlertTriangle, Zap, CheckCircle2, RefreshCw, BarChart2,
  Lock, ArrowRight, Sparkles, HelpCircle, FileBarChart, Chrome, X
} from 'lucide-react';
import { WellonikFormData, Competitor, OfferAndPromotion } from '../types';
import { 
  PriorityRanking, TagInput, MockUpload 
} from './StepFields';
import {
  INDUSTRY_CATEGORIES,
  EMPLOYEE_COUNT_OPTIONS,
  AGE_RANGE_OPTIONS,
  PREFERRED_PLATFORMS_OPTIONS,
  FIND_US_OPTIONS,
  PURCHASE_FREQUENCY_OPTIONS,
  SALES_CYCLE_OPTIONS,
  MARKETING_OBJECTIVES_OPTIONS,
  BRAND_PERSONALITIES,
  CONTENT_TYPES_OPTIONS,
  LANGUAGES_OPTIONS,
  RESPONSE_TIME_OPTIONS,
  CRM_OPTIONS
} from '../constants';

interface OnboardingStepsProps {
  step: number;
  formData: WellonikFormData;
  updateField: (field: keyof WellonikFormData, value: any) => void;
  updateNestedField: (parentField: keyof WellonikFormData, childField: string, value: any) => void;
}

export const OnboardingSteps: React.FC<OnboardingStepsProps> = ({
  step,
  formData,
  updateField,
  updateNestedField
}) => {
  
  // Tag input helpers
  const handleAddFeature = (tags: string[]) => updateField('productFeatures', tags);
  const handleAddBenefit = (tags: string[]) => updateField('productBenefits', tags);
  const handleAddCert = (tags: string[]) => updateField('certifications', tags);
  const handleTargetLocations = (tags: string[]) => updateField('targetLocations', tags);
  const handleAudienceInterests = (tags: string[]) => updateField('audienceInterests', tags);
  const handleReferenceBrands = (tags: string[]) => updateField('referenceBrands', tags);
  
  // Pricing helpers
  const handlePricing = (key: 'retail' | 'wholesale' | 'bulk', val: string) => {
    updateField('pricing', { ...formData.pricing, [key]: val });
  };

  // Section USP helpers
  const handleUsp = (key: 'difference' | 'whyChooseUs' | 'strongestAdvantages', val: string) => {
    updateField('usp', { ...formData.usp, [key]: val });
  };

  // Competitor List helpers
  const addCompetitor = () => {
    const newComp: Competitor = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      website: '',
      socialLinks: ''
    };
    updateField('competitors', [...formData.competitors, newComp]);
  };

  const removeCompetitor = (id: string) => {
    updateField('competitors', formData.competitors.filter(c => c.id !== id));
  };

  const updateCompetitor = (id: string, key: keyof Competitor, value: string) => {
    const updated = formData.competitors.map(c => {
      if (c.id === id) {
        return { ...c, [key]: value };
      }
      return c;
    });
    updateField('competitors', updated);
  };

  // Offers list helpers
  const addOffer = () => {
    const newOffer: OfferAndPromotion = {
      id: Math.random().toString(36).substr(2, 9),
      title: '',
      details: ''
    };
    updateField('offersAndPromotions', [...formData.offersAndPromotions, newOffer]);
  };

  const removeOffer = (id: string) => {
    updateField('offersAndPromotions', formData.offersAndPromotions.filter(o => o.id !== id));
  };

  const updateOffer = (id: string, key: keyof OfferAndPromotion, value: string) => {
    const updated = formData.offersAndPromotions.map(o => {
      if (o.id === id) {
        return { ...o, [key]: value };
      }
      return o;
    });
    updateField('offersAndPromotions', updated);
  };

  // SWOT helpers
  const handleSwot = (key: 'strengths' | 'weaknesses' | 'opportunities' | 'threats', val: string) => {
    updateField('swot', { ...formData.swot, [key]: val });
  };

  // Previous marketing experience helper
  const handleAdsExp = (key: 'metaAds' | 'googleAds' | 'linkedInAds', val: string) => {
    updateField('adsExperience', { ...formData.adsExperience, [key]: val });
  };

  // Expansion plan helpers
  const handleExpansion = (key: 'newProducts' | 'newCities' | 'newCountries', val: string) => {
    updateField('expansionPlans', { ...formData.expansionPlans, [key]: val });
  };

  // Multi choice checkbox toggle
  const toggleCheckbox = (field: keyof WellonikFormData, value: string) => {
    const currentList = (formData[field] as string[]) || [];
    if (currentList.includes(value)) {
      updateField(field, currentList.filter(item => item !== value));
    } else {
      updateField(field, [...currentList, value]);
    }
  };

  // Card toggle selection (like Objectives)
  const toggleObjective = (objective: string) => {
    const current = formData.primaryObjectives || [];
    if (current.includes(objective)) {
      updateField('primaryObjectives', current.filter(item => item !== objective));
    } else {
      updateField('primaryObjectives', [...current, objective]);
    }
  };

  // Brand color helpers
  const addBrandColor = (color: string) => {
    if (formData.brandColors.includes(color) || formData.brandColors.length >= 6) return;
    updateField('brandColors', [...formData.brandColors, color]);
  };

  const removeBrandColor = (index: number) => {
    updateField('brandColors', formData.brandColors.filter((_, i) => i !== index));
  };

  switch (step) {
    case 1:
      return (
        <div className="space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#D4A437]" />
              Business Information
            </h2>
            <p className="text-xs text-slate-500 mt-1">Provide contact details, core business identity, and statements of vision/mission.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="businessName" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5 ">Company / Entity Name <span className="text-red-500">*</span></label>
              <input
                id="businessName"
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => updateField('businessName', e.target.value)}
                placeholder="e.g. Wellonik Innovations Private Limited"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm"
              />
            </div>

            <div>
              <label htmlFor="brandName" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Brand / Trade Name <span className="text-red-500">*</span></label>
              <input
                id="brandName"
                type="text"
                required
                value={formData.brandName}
                onChange={(e) => updateField('brandName', e.target.value)}
                placeholder="e.g. Wellonik Studio"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm"
              />
            </div>

            <div>
              <label htmlFor="contactPersonName" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Contact Person Name <span className="text-red-500">*</span></label>
              <input
                id="contactPersonName"
                type="text"
                required
                value={formData.contactPersonName}
                onChange={(e) => updateField('contactPersonName', e.target.value)}
                placeholder="e.g. Priyansh Patel"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm"
              />
            </div>

            <div>
              <label htmlFor="designation" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Designation / Role</label>
              <input
                id="designation"
                type="text"
                value={formData.designation}
                onChange={(e) => updateField('designation', e.target.value)}
                placeholder="e.g. Founder & Creative Director"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm"
              />
            </div>

            <div>
              <label htmlFor="mobileNumber" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
              <input
                id="mobileNumber"
                type="tel"
                required
                value={formData.mobileNumber}
                onChange={(e) => updateField('mobileNumber', e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm"
              />
            </div>

            <div>
              <label htmlFor="whatsAppNumber" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">WhatsApp Number</label>
              <input
                id="whatsAppNumber"
                type="tel"
                value={formData.whatsAppNumber}
                onChange={(e) => updateField('whatsAppNumber', e.target.value)}
                placeholder="If same, leave empty or copy mobile"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm"
              />
            </div>

            <div>
              <label htmlFor="emailAddress" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Email Address <span className="text-red-500">*</span></label>
              <input
                id="emailAddress"
                type="email"
                required
                value={formData.emailAddress}
                onChange={(e) => updateField('emailAddress', e.target.value)}
                placeholder="e.g. growth@wellonik.co"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Website Address</label>
              <input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => updateField('website', e.target.value)}
                placeholder="e.g. https://wellonik.co"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm"
              />
            </div>

            <div>
              <label htmlFor="industryCategory" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Industry Category</label>
              <select
                id="industryCategory"
                value={formData.industryCategory}
                onChange={(e) => updateField('industryCategory', e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm"
              >
                <option value="">Select industry category...</option>
                {INDUSTRY_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="employeeCount" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Number of Employees</label>
              <select
                id="employeeCount"
                value={formData.employeeCount}
                onChange={(e) => updateField('employeeCount', e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm"
              >
                <option value="">Select workforce size...</option>
                {EMPLOYEE_COUNT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="establishmentYear" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Establishment Year</label>
              <input
                id="establishmentYear"
                type="number"
                min="1900"
                max="2027"
                value={formData.establishmentYear}
                onChange={(e) => updateField('establishmentYear', e.target.value)}
                placeholder="e.g. 2018"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm"
              />
            </div>

            <div>
              <label htmlFor="serviceLocations" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Service / Delivery Locations</label>
              <input
                id="serviceLocations"
                type="text"
                value={formData.serviceLocations}
                onChange={(e) => updateField('serviceLocations', e.target.value)}
                placeholder="e.g. Mumbai, Gujarat, UAE, Pan-India"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="businessAddress" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Headquarters Address</label>
              <textarea
                id="businessAddress"
                rows={2}
                value={formData.businessAddress}
                onChange={(e) => updateField('businessAddress', e.target.value)}
                placeholder="e.g. 102 Horizon Corporate Hub, Ahmedabad, Gujarat"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm resize-none"
              />
            </div>

            <div>
              <label htmlFor="manufacturingAddress" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Manufacturing / Storage (if distinct)</label>
              <textarea
                id="manufacturingAddress"
                rows={2}
                value={formData.manufacturingAddress}
                onChange={(e) => updateField('manufacturingAddress', e.target.value)}
                placeholder="Product plant or warehouse address..."
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm resize-none"
              />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/45 p-4 rounded-xl border border-slate-150/80 dark:border-slate-800/80 space-y-3">
            <h3 className="text-xs font-bold text-[#D4A437] uppercase tracking-wider">Social Media Assets (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {Object.keys(formData.socialMedia).map((smKey) => {
                const label = smKey === 'googleProfile' ? 'Google Business Profile' : smKey.charAt(0).toUpperCase() + smKey.slice(1);
                return (
                  <div key={smKey} className="flex flex-col">
                    <label htmlFor={`sm-${smKey}`} className="text-[11px] font-medium text-slate-550 dark:text-slate-400 mb-1 capitalize">{label}</label>
                    <input
                      id={`sm-${smKey}`}
                      type="url"
                      value={(formData.socialMedia as any)[smKey] || ''}
                      onChange={(e) => updateNestedField('socialMedia', smKey, e.target.value)}
                      placeholder={`Paste URL to public ${label}...`}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-slate-200 placeholder-slate-400/80 focus:outline-none focus:ring-1.5 focus:ring-[#D4A437]/60 focus:border-[#D4A437] transition text-xs"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide border-l-2 border-[#D4A437] pl-2">Company Pitch & Core Identity</h3>
            
            <div>
              <label htmlFor="companyDescription" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Business / Venture Summary (Elevator Pitch)</label>
              <textarea
                id="companyDescription"
                rows={2}
                value={formData.companyDescription}
                onChange={(e) => updateField('companyDescription', e.target.value)}
                placeholder="Give a brief summary of what your business does, key products, and standard clients..."
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="whatCompanyDoes" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">What exactly does your company do?</label>
                <textarea
                  id="whatCompanyDoes"
                  rows={2}
                  value={formData.whatCompanyDoes}
                  onChange={(e) => updateField('whatCompanyDoes', e.target.value)}
                  placeholder="Explain your products, solutions, core services, and customer outcomes..."
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1.5 focus:ring-[#D4A437] transition text-xs resize-none"
                />
              </div>

              <div>
                <label htmlFor="whyWasItStarted" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Why was this brand started?</label>
                <textarea
                  id="whyWasItStarted"
                  rows={2}
                  value={formData.whyWasItStarted}
                  onChange={(e) => updateField('whyWasItStarted', e.target.value)}
                  placeholder="What gap did you notice in the market? What is your backstory?"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1.5 focus:ring-[#D4A437] transition text-xs resize-none"
                />
              </div>

              <div>
                <label htmlFor="vision" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Company Vision Statement</label>
                <textarea
                  id="vision"
                  rows={2}
                  value={formData.vision}
                  onChange={(e) => updateField('vision', e.target.value)}
                  placeholder="Where do you see the company in 5-10 years? e.g. 'To make premium branding accessible to local startups...'"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1.5 focus:ring-[#D4A437] transition text-xs resize-none"
                />
              </div>

              <div>
                <label htmlFor="mission" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Company Mission Statement</label>
                <textarea
                  id="mission"
                  rows={2}
                  value={formData.mission}
                  onChange={(e) => updateField('mission', e.target.value)}
                  placeholder="What principles guide your daily work? What value do you assure to deliver?"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1.5 focus:ring-[#D4A437] transition text-xs resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      );

    case 2:
      return (
        <div className="space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-[#D4A437]" />
              Products & Services Information
            </h2>
            <p className="text-xs text-slate-500 mt-1">Specify your key products, categories, wholesale/retail pricing, and core customer benefits.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="primaryProductService" className="block text-xs font-semibold text-slate-655 dark:text-slate-350 mb-1.5">Primary Product or Service <span className="text-red-500">*</span></label>
              <input
                id="primaryProductService"
                type="text"
                required
                value={formData.primaryProductService}
                onChange={(e) => updateField('primaryProductService', e.target.value)}
                placeholder="e.g. Handmade Premium Scented Soy Candles"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm"
              />
            </div>

            <div>
              <label htmlFor="secondaryProducts" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Secondary Products / Add-ons</label>
              <input
                id="secondaryProducts"
                type="text"
                value={formData.secondaryProducts}
                onChange={(e) => updateField('secondaryProducts', e.target.value)}
                placeholder="e.g. Reed diffusers, custom ceramic gift boxes"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm"
              />
            </div>

            <div>
              <label htmlFor="productCategories" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Product Sub-Categories Included</label>
              <input
                id="productCategories"
                type="text"
                value={formData.productCategories}
                onChange={(e) => updateField('productCategories', e.target.value)}
                placeholder="e.g. Lavender, Citrus Wood, Vanilla Rose, Trial Pack"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm"
              />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/45 p-4 rounded-xl border border-slate-150/80 dark:border-slate-800/80 space-y-4">
            <h3 className="text-xs font-bold text-[#D4A437] uppercase tracking-wider">Unique Selling Proposition (USP)</h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="uspDifference" className="block text-xs text-slate-550 dark:text-slate-400 mb-1">What makes your product / service different from competitors?</label>
                <textarea
                  id="uspDifference"
                  rows={2}
                  value={formData.usp.difference}
                  onChange={(e) => handleUsp('difference', e.target.value)}
                  placeholder="e.g. We use 100% natural organic soy wax and hand-pour candles in custom artisanal terracotta pots..."
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-slate-200 placeholder-slate-400/80 focus:outline-none focus:ring-1.5 focus:ring-[#D4A437] transition text-xs resize-none"
                />
              </div>

              <div>
                <label htmlFor="uspWhyChooseUs" className="block text-xs text-slate-550 dark:text-slate-400 mb-1">Why should customers choose you instead of other shops?</label>
                <textarea
                  id="uspWhyChooseUs"
                  rows={2}
                  value={formData.usp.whyChooseUs}
                  onChange={(e) => handleUsp('whyChooseUs', e.target.value)}
                  placeholder="What values are you giving? Customer retention benefits? Warranty?"
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-slate-200 placeholder-slate-400/80 focus:outline-none focus:ring-1.5 focus:ring-[#D4A437] transition text-xs resize-none"
                />
              </div>

              <div>
                <label htmlFor="uspStrongestAdvantages" className="block text-xs text-slate-550 dark:text-slate-400 mb-1">What are your strongest operational or product advantages?</label>
                <textarea
                  id="uspStrongestAdvantages"
                  rows={2}
                  value={formData.usp.strongestAdvantages}
                  onChange={(e) => handleUsp('strongestAdvantages', e.target.value)}
                  placeholder="e.g. Exclusive sourcing of Swiss fragrance oils, cost structure is 30% cheaper..."
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-slate-200 placeholder-slate-400/80 focus:outline-none focus:ring-1.5 focus:ring-[#D4A437] transition text-xs resize-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide border-l-2 border-[#D4A437] pl-2">Pricing Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="pricingRetail" className="block text-xs font-semibold text-slate-650 dark:text-slate-400 mb-1.5">Retail Pricing (B2C)</label>
                <input
                  id="pricingRetail"
                  type="text"
                  value={formData.pricing.retail}
                  onChange={(e) => handlePricing('retail', e.target.value)}
                  placeholder="e.g. ₹499 - ₹1,299 per candle"
                  className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm"
                />
              </div>

              <div>
                <label htmlFor="pricingWholesale" className="block text-xs font-semibold text-slate-650 dark:text-slate-400 mb-1.5">Wholesale Pricing (B2B)</label>
                <input
                  id="pricingWholesale"
                  type="text"
                  value={formData.pricing.wholesale}
                  onChange={(e) => handlePricing('wholesale', e.target.value)}
                  placeholder="e.g. ₹250 per piece (Min Order 100)"
                  className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm"
                />
              </div>

              <div>
                <label htmlFor="pricingBulk" className="block text-xs font-semibold text-slate-650 dark:text-slate-400 mb-1.5">Bulk / Corporate Gifting Discount</label>
                <input
                  id="pricingBulk"
                  type="text"
                  value={formData.pricing.bulk}
                  onChange={(e) => handlePricing('bulk', e.target.value)}
                  placeholder="e.g. Additional 15% off for orders >500 units"
                  className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="tag-features" className="block text-xs font-semibold text-slate-655 dark:text-slate-350 mb-1.5">Key Product Features <span className="text-slate-450 font-normal">(Dynamic Tags List)</span></label>
              <TagInput
                id="tag-features"
                tags={formData.productFeatures}
                onChange={handleAddFeature}
                placeholder="Type feature (e.g. Clean Burning, Eco Scent) and press Enter"
              />
            </div>

            <div>
              <label htmlFor="tag-benefits" className="block text-xs font-semibold text-slate-655 dark:text-slate-350 mb-1.5">Direct Product Benefits <span className="text-slate-450 font-normal">(Dynamic Tags List)</span></label>
              <TagInput
                id="tag-benefits"
                tags={formData.productBenefits}
                onChange={handleAddBenefit}
                placeholder="Type benefit (e.g. Promotes Sleep, Therapeutic) and press Enter"
              />
            </div>

            <div>
              <label htmlFor="tag-certs" className="block text-xs font-semibold text-slate-655 dark:text-slate-350 mb-1.5">Certifications Achieved <span className="text-slate-450 font-normal">(Dynamic Tags List)</span></label>
              <TagInput
                id="tag-certs"
                tags={formData.certifications}
                onChange={handleAddCert}
                placeholder="e.g. ISO, GMP, FSSAI, Organic Certified"
              />
            </div>

            <div>
              <label htmlFor="upload-assets" className="block text-xs font-semibold text-slate-655 dark:text-slate-350 mb-1.5">Product Assets <span className="text-slate-450 font-normal">(Catalog PDF, Images, Videos)</span></label>
              <MockUpload
                id="upload-assets"
                files={formData.productAssets}
                onChange={(files) => updateField('productAssets', files)}
                accept=".pdf,.png,.jpg,.jpeg,.mp4"
                label="Product catalog PDF, high-res photos, or campaign footage"
              />
            </div>
          </div>
        </div>
      );

    case 3:
      return (
        <div className="space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-[#D4A437]" />
              Target Audience Definition
            </h2>
            <p className="text-xs text-slate-500 mt-1">Tell us who typically buys your products. Include demographics, locations, channels, and paint points.</p>
          </div>

          <div>
            <label htmlFor="targetAudienceIdeal" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Describe your absolute Ideal Customer profile</label>
            <textarea
              id="targetAudienceIdeal"
              rows={2}
              required
              value={formData.targetAudienceIdeal}
              onChange={(e) => updateField('targetAudienceIdeal', e.target.value)}
              placeholder="e.g. Modern working women aged 25-45 who invest in premium home fragrance, aromatherapy, and buy aesthetic home decor items..."
              className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <span className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-2">Customer Business Orientation Model</span>
              <div className="grid grid-cols-3 gap-3">
                {(['B2B', 'B2C', 'Both'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => updateField('customerType', type)}
                    className={`p-3 text-sm font-semibold rounded-xl border text-center transition ${
                      formData.customerType === type
                        ? 'border-[#D4A437] bg-amber-500/10 text-amber-800 dark:text-[#D4A437] font-bold shadow-sm'
                        : 'border-slate-200 dark:border-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/40'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="audienceGender" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Gender Focus</label>
              <input
                id="audienceGender"
                type="text"
                value={formData.audienceGender}
                onChange={(e) => updateField('audienceGender', e.target.value)}
                placeholder="e.g. All Genders, Female (Primary 80%), Male (Primary 20%)"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-2">Primary Age Demographics <span className="text-slate-400 font-normal">(Check all that apply)</span></span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-slate-50 dark:bg-slate-950/20 rounded-xl border border-slate-100 dark:border-slate-850">
                {AGE_RANGE_OPTIONS.map((age) => {
                  const isChecked = formData.audienceAgeRange.includes(age);
                  return (
                    <label key={age} className="flex items-center gap-2 cursor-pointer p-0.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCheckbox('audienceAgeRange', age)}
                        className="rounded border-slate-300 text-[#D4A437] focus:ring-[#D4A437] w-4 h-4"
                      />
                      <span className="text-xs text-slate-700 dark:text-slate-300">{age}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <span className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-2">Preferred Media Platforms <span className="text-slate-400 font-normal">(Ad placements target)</span></span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-slate-50 dark:bg-slate-950/20 rounded-xl border border-slate-100 dark:border-slate-850">
                {PREFERRED_PLATFORMS_OPTIONS.map((plat) => {
                  const isChecked = formData.preferredPlatforms.includes(plat);
                  return (
                    <label key={plat} className="flex items-center gap-2 cursor-pointer p-0.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCheckbox('preferredPlatforms', plat)}
                        className="rounded border-slate-300 text-[#D4A437] focus:ring-[#D4A437] w-4 h-4"
                      />
                      <span className="text-xs text-slate-700 dark:text-slate-300">{plat}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="audienceIncomeLevel" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Typical Income Level Focus</label>
              <input
                id="audienceIncomeLevel"
                type="text"
                value={formData.audienceIncomeLevel}
                onChange={(e) => updateField('audienceIncomeLevel', e.target.value)}
                placeholder="e.g. Premium Middle to High-Income, Luxury buyer"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm"
              />
            </div>

            <div>
              <label htmlFor="audienceEducation" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Main Audience Education Background</label>
              <input
                id="audienceEducation"
                type="text"
                value={formData.audienceEducation}
                onChange={(e) => updateField('audienceEducation', e.target.value)}
                placeholder="e.g. College Graduates, Working Professionals, Executives"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm"
              />
            </div>

            <div>
              <label htmlFor="audienceMaritalStatus" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Marital Status Context</label>
              <input
                id="audienceMaritalStatus"
                type="text"
                value={formData.audienceMaritalStatus}
                onChange={(e) => updateField('audienceMaritalStatus', e.target.value)}
                placeholder="e.g. Single, Newly married couples, Parents with kids"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm"
              />
            </div>

            <div>
              <label htmlFor="tag-target-loc" className="block text-xs font-semibold text-slate-655 dark:text-slate-350 mb-1.5">Geographic Locations Target <span className="text-slate-450 font-normal">(Dynamic tags)</span></label>
              <TagInput
                id="tag-target-loc"
                tags={formData.targetLocations}
                onChange={handleTargetLocations}
                placeholder="e.g. Metro Cities, Mumbai West, Gujarat, Bangalore, press enter"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="tag-interests" className="block text-xs font-semibold text-slate-655 dark:text-slate-350 mb-1.5">Audience Interests <span className="text-slate-450 font-normal">(Tag Input System for Ads)</span></label>
              <TagInput
                id="tag-interests"
                tags={formData.audienceInterests}
                onChange={handleAudienceInterests}
                placeholder="Add niche (e.g. Home Decor, Aromatherapy, Yoga, Wellness)"
              />
            </div>

            <div>
              <label htmlFor="tag-occupations" className="block text-xs font-semibold text-slate-655 dark:text-slate-350 mb-1.5">Occupation Demographics <span className="text-slate-450 font-normal">(Dynamic Tags List)</span></label>
              <TagInput
                id="tag-occupations"
                tags={formData.audienceOccupation}
                onChange={(tags) => updateField('audienceOccupation', tags)}
                placeholder="e.g. IT Professionals, Interior Decorators, Doctors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="audiencePainPoints" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Customer Pain Points & Discomforts</label>
              <textarea
                id="audiencePainPoints"
                rows={2}
                value={formData.audiencePainPoints}
                onChange={(e) => updateField('audiencePainPoints', e.target.value)}
                placeholder="What troubles or limits them before choosing you? (e.g. Competitor candles release chemical smoke, triggers headaches, burns out too fast...)"
                  className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm resize-none"
              />
            </div>

            <div>
              <label htmlFor="audienceBuyingMotivations" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Primary Purchase Motivations</label>
              <textarea
                id="audienceBuyingMotivations"
                rows={2}
                value={formData.audienceBuyingMotivations}
                onChange={(e) => updateField('audienceBuyingMotivations', e.target.value)}
                placeholder="What is their mental trigger? (e.g. Desiring highly-scented natural aromatherapy, gift giving, aesthetic home improvement status symbol...)"
                  className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] focus:border-[#D4A437] transition text-sm resize-none"
              />
            </div>
          </div>
        </div>
      );

    case 4:
      return (
        <div className="space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#D4A437]" />
              Customer Behavior Audit
            </h2>
            <p className="text-xs text-slate-500 mt-1">Define how leads navigate to your business and order your services in the sales funnel.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fadeIn">
            <div>
              <span className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-2">How do customers find your business current? <span className="text-slate-400 font-normal">(Checkboxes)</span></span>
              <div className="grid grid-cols-2 gap-2 p-3.5 bg-slate-50 dark:bg-slate-950/20 rounded-xl border border-slate-100 dark:border-slate-850">
                {FIND_US_OPTIONS.map((source) => {
                  const isChecked = formData.howCustomersFindUs.includes(source);
                  return (
                    <label key={source} className="flex items-center gap-2.5 cursor-pointer py-0.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCheckbox('howCustomersFindUs', source)}
                        className="rounded border-slate-300 text-[#D4A437] focus:ring-[#D4A437] w-4 h-4"
                      />
                      <span className="text-xs text-slate-700 dark:text-slate-300">{source}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <span className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1">Interactive Decision Multi-Factor Priority Ranger</span>
              <label htmlFor="priority-ranking-section" className="sr-only">Decision Factor Priority Ranking</label>
              <PriorityRanking
                id="priority-ranking-section"
                items={formData.buyingDecisionRanking}
                onChange={(ranked) => updateField('buyingDecisionRanking', ranked)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-850 pt-4">
            <div>
              <label htmlFor="purchaseFrequency" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5 font-sans">Typical Customer Purchase Frequency</label>
              <select
                id="purchaseFrequency"
                value={formData.purchaseFrequency}
                onChange={(e) => updateField('purchaseFrequency', e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#D4A437] transition text-sm"
              >
                {PURCHASE_FREQUENCY_OPTIONS.map((freq) => (
                  <option key={freq} value={freq}>{freq}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="salesCycle" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Average Sales Cycle Length <span className="text-slate-400 font-normal">(Initial touch to close)</span></label>
              <select
                id="salesCycle"
                value={formData.salesCycle}
                onChange={(e) => updateField('salesCycle', e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#D4A437] transition text-sm"
              >
                {SALES_CYCLE_OPTIONS.map((sc) => (
                  <option key={sc} value={sc}>{sc}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="seasonalSalesTrends" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Seasonal Sales Trends / Surge Peaks</label>
            <textarea
              id="seasonalSalesTrends"
              rows={2}
              value={formData.seasonalSalesTrends}
              onChange={(e) => updateField('seasonalSalesTrends', e.target.value)}
              placeholder="e.g. Sales grow by 400% during Diwali & Christmas Season. Off-season is June-August during monsoons..."
              className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] transition text-sm resize-none"
            />
          </div>
        </div>
      );

    case 5:
      return (
        <div className="space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-[#D4A437]" />
              Marketing Goals & Ad Budget
            </h2>
            <p className="text-xs text-slate-500 mt-1">Define targets for monthly leads, expect ROI, campaign timeline, and promotional configurations.</p>
          </div>

          <div>
            <span className="block text-xs font-bold text-[#D4A437] uppercase tracking-wider mb-2.5">Primary Marketing Objectives <span className="text-red-500">*</span></span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {MARKETING_OBJECTIVES_OPTIONS.map((obj) => {
                const isSelected = formData.primaryObjectives.includes(obj);
                return (
                  <button
                    key={obj}
                    type="button"
                    onClick={() => toggleObjective(obj)}
                    className={`p-3 text-left rounded-xl border transition-all duration-150 duration-200 ${
                      isSelected
                        ? 'border-[#D4A437] bg-amber-500/10 text-slate-900 dark:text-white font-semibold outline-none ring-1 ring-[#D4A437]'
                        : 'border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-950/20 text-slate-705 dark:text-slate-350'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs">{obj}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A437]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="monthlyLeadTarget" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Monthly Ad Lead Target</label>
              <input
                id="monthlyLeadTarget"
                type="text"
                value={formData.monthlyLeadTarget}
                onChange={(e) => updateField('monthlyLeadTarget', e.target.value)}
                placeholder="e.g. 500+ Hot Leads, 50 B2B distributors"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] transition text-sm"
              />
            </div>

            <div>
              <label htmlFor="expectedRevenueTarget" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Monthly Expected Revenue Target</label>
              <input
                id="expectedRevenueTarget"
                type="text"
                value={formData.expectedRevenueTarget}
                onChange={(e) => updateField('expectedRevenueTarget', e.target.value)}
                placeholder="e.g. ₹15,00,000 Sales"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] transition text-sm"
              />
            </div>

            <div>
              <label htmlFor="expectedROI" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Expected ROI Multiple</label>
              <input
                id="expectedROI"
                type="text"
                value={formData.expectedROI}
                onChange={(e) => updateField('expectedROI', e.target.value)}
                placeholder="e.g. 4x ROAS, 30% ROI minimum"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] transition text-sm"
              />
            </div>
          </div>

          <div className="space-y-3 bg-slate-50 dark:bg-slate-950/25 p-4 rounded-xl border border-slate-150 dark:border-slate-850">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Recommended Monthly Advertising Budget</span>
              <span className="text-sm font-bold text-[#D4A437] font-mono select-none">₹{formData.monthlyAdBudget.toLocaleString('en-IN')} / month</span>
            </div>
            
            <input
              type="range"
              min={10000}
              max={500000}
              step={5000}
              value={formData.monthlyAdBudget}
              onChange={(e) => updateField('monthlyAdBudget', parseInt(e.target.value))}
              aria-label="Monthly advertising budget slider"
              className="w-full accent-[#D4A437] cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>₹10,000 (Testing)</span>
              <span>₹1,50,000 (Growth)</span>
              <span>₹3,00,000 (Scale)</span>
              <span>₹5,00,000 (Max Limit)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="campaignTimelineStart" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Campagin Target Start Date</label>
              <input
                id="campaignTimelineStart"
                type="date"
                value={formData.campaignTimelineStart}
                onChange={(e) => updateField('campaignTimelineStart', e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#D4A437] transition text-sm font-sans"
              />
            </div>

            <div>
              <label htmlFor="campaignTimelineEnd" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Campaign Target End Date</label>
              <input
                id="campaignTimelineEnd"
                type="date"
                value={formData.campaignTimelineEnd}
                onChange={(e) => updateField('campaignTimelineEnd', e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#D4A437] transition text-sm font-sans"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide border-l-2 border-[#D4A437] pl-2">Current Active Offers & Promotions</span>
              <button
                type="button"
                onClick={addOffer}
                className="text-xs px-2.5 py-1.5 bg-[#D4A437]/10 text-[#D4A437] hover:bg-[#D4A437]/20 font-bold rounded-lg flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" /> Add Offer Model
              </button>
            </div>

            {formData.offersAndPromotions.length === 0 ? (
              <p className="text-xs text-slate-400 italic p-3 text-center border border-dashed border-slate-150 dark:border-slate-800 rounded-lg">No active campaigns or promo models declared. Wellonik design team will assist on this!</p>
            ) : (
              <div className="space-y-3">
                {formData.offersAndPromotions.map((offer, idx) => (
                  <div key={offer.id} className="flex gap-2 items-start p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-800/80 animate-fadeIn">
                    <span className="flex items-center justify-center w-5 h-5 rounded bg-[#D4A437] text-white text-[10px] font-bold shrink-0 mt-2">
                      {idx + 1}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                      <div>
                        <label htmlFor={`offer-title-${offer.id}`} className="sr-only">Offer Title</label>
                        <input
                          id={`offer-title-${offer.id}`}
                          type="text"
                          required
                          value={offer.title}
                          onChange={(e) => updateOffer(offer.id, 'title', e.target.value)}
                          placeholder="e.g. BUY 1 GET 1 Free (Monsoon Offer)"
                          className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1.5 focus:ring-[#D4A437] text-xs"
                        />
                      </div>
                      <div>
                        <label htmlFor={`offer-details-${offer.id}`} className="sr-only">Offer Details</label>
                        <input
                          id={`offer-details-${offer.id}`}
                          type="text"
                          required
                          value={offer.details}
                          onChange={(e) => updateOffer(offer.id, 'details', e.target.value)}
                          placeholder="Eligible targets, terms of discount..."
                          className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1.5 focus:ring-[#D4A437] text-xs"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeOffer(offer.id)}
                      className="p-1 px-2 text-slate-400 hover:text-red-500 rounded transition shrink-0 mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );

    case 6:
      return (
        <div className="space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#D4A437]" />
              Competitor Research & SWOT Audit
            </h2>
            <p className="text-xs text-slate-500 mt-1">Provide profiles of prominent direct competitors and conduct a strategic SWOT landscape assessment.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide border-l-2 border-[#D4A437] pl-2 animate-pulse">Competitor Profile Links</h3>
              <button
                type="button"
                onClick={addCompetitor}
                className="text-xs px-2.5 py-1.5 bg-[#D4A437]/10 text-[#D4A437] hover:bg-[#D4A437]/20 font-bold rounded-lg flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" /> Add Competitor
              </button>
            </div>

            {formData.competitors.length === 0 ? (
              <p className="text-xs text-slate-400 italic p-4 text-center border border-dashed border-slate-150 dark:border-slate-800 rounded-lg">No competitors declared yet. Add at least 1 competitor to help us pitch effectively.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {formData.competitors.map((comp, idx) => (
                  <div key={comp.id} className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/50 dark:border-slate-800/80 space-y-2 relative">
                    <button
                      type="button"
                      onClick={() => removeCompetitor(comp.id)}
                      className="absolute top-2.5 right-2 text-slate-400 hover:text-red-500 rounded-lg p-1 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-slate-400 dark:bg-slate-700/60 rounded-full">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-slate-650 dark:text-slate-350">Competitor Identity</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <input
                        type="text"
                        required
                        value={comp.name}
                        onChange={(e) => updateCompetitor(comp.id, 'name', e.target.value)}
                        placeholder="Company/Brand Name"
                        className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-[#D4A437]"
                      />
                      <input
                        type="url"
                        value={comp.website}
                        onChange={(e) => updateCompetitor(comp.id, 'website', e.target.value)}
                        placeholder="Website URL"
                        className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-[#D4A437]"
                      />
                      <input
                        type="text"
                        value={comp.socialLinks}
                        onChange={(e) => updateCompetitor(comp.id, 'socialLinks', e.target.value)}
                        placeholder="Instagram or Facebook Links (delimited by comma)"
                        className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-[#D4A437]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-850 pt-4">
            <div>
              <label htmlFor="whatCompetitorsDoWell" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">What do competitors do well?</label>
              <textarea
                id="whatCompetitorsDoWell"
                rows={2}
                value={formData.whatCompetitorsDoWell}
                onChange={(e) => updateField('whatCompetitorsDoWell', e.target.value)}
                placeholder="High-end aesthetic designs, 2-day fast delivery, heavy discount influencer codes..."
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1.5 focus:ring-[#D4A437] text-xs resize-none"
              />
            </div>

            <div>
              <label htmlFor="competitorWeaknesses" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">What are their outstanding weaknesses?</label>
              <textarea
                id="competitorWeaknesses"
                rows={2}
                value={formData.competitorWeaknesses}
                onChange={(e) => updateField('competitorWeaknesses', e.target.value)}
                placeholder="Unsatisfied customer service responses, poor color choices, low quality raw materials..."
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1.5 focus:ring-[#D4A437] text-xs resize-none"
              />
            </div>

            <div>
              <label htmlFor="outperformCompetitors" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">How do you outperform competitors?</label>
              <textarea
                id="outperformCompetitors"
                rows={2}
                value={formData.outperformCompetitors}
                onChange={(e) => updateField('outperformCompetitors', e.target.value)}
                placeholder="Custom terracotta packaging, custom scent blends, dedicated WhatsApp personal concierge..."
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1.5 focus:ring-[#D4A437] text-xs resize-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide border-l-2 border-[#D4A437] pl-2">Venture SWOT Matrix</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="p-3 bg-emerald-500/5 dark:bg-emerald-950/15 border border-emerald-100 dark:border-emerald-950/60 rounded-xl space-y-1.5">
                <label htmlFor="swotStrengths" className="font-bold text-emerald-800 dark:text-emerald-400 text-xs">S - Strengths</label>
                <textarea
                  id="swotStrengths"
                  rows={2}
                  value={formData.swot.strengths}
                  onChange={(e) => handleSwot('strengths', e.target.value)}
                  placeholder="Internal USP, premium raw materials, founder's expert expertise..."
                  className="w-full p-2 bg-white/70 dark:bg-slate-950/50 border border-emerald-100 dark:border-emerald-900 rounded-md text-xs text-slate-800 dark:text-slate-200 resize-none"
                />
              </div>

              <div className="p-3 bg-rose-500/5 dark:bg-rose-950/15 border border-rose-150 dark:border-rose-950/55 rounded-xl space-y-1.5">
                <label htmlFor="swotWeaknesses" className="font-bold text-rose-800 dark:text-rose-400 text-xs">W - Weaknesses</label>
                <textarea
                  id="swotWeaknesses"
                  rows={2}
                  value={formData.swot.weaknesses}
                  onChange={(e) => handleSwot('weaknesses', e.target.value)}
                  placeholder="Low awareness, production capacity constraints, raw material fluctuations..."
                  className="w-full p-2 bg-white/70 dark:bg-slate-950/50 border border-rose-100/80 dark:border-rose-900 rounded-md text-xs text-slate-800 dark:text-slate-200 resize-none"
                />
              </div>

              <div className="p-3 bg-amber-500/5 dark:bg-amber-950/15 border border-amber-150 dark:border-amber-950/55 rounded-xl space-y-1.5">
                <label htmlFor="swotOpportunities" className="font-bold text-amber-800 dark:text-[#D4A437] text-xs">O - Opportunities</label>
                <textarea
                  id="swotOpportunities"
                  rows={2}
                  value={formData.swot.opportunities}
                  onChange={(e) => handleSwot('opportunities', e.target.value)}
                  placeholder="Corporate gifting ties, SEO blog content generation, tier-2 cities expansion..."
                  className="w-full p-2 bg-white/70 dark:bg-slate-950/50 border border-amber-100/80 dark:border-amber-900/50 rounded-md text-xs text-slate-800 dark:text-slate-200 resize-none"
                />
              </div>

              <div className="p-3 bg-slate-500/5 dark:bg-slate-950/15 border border-slate-150 dark:border-slate-850 rounded-xl space-y-1.5">
                <label htmlFor="swotThreats" className="font-bold text-slate-700 dark:text-slate-400 text-xs">T - Threats</label>
                <textarea
                  id="swotThreats"
                  rows={2}
                  value={formData.swot.threats}
                  onChange={(e) => handleSwot('threats', e.target.value)}
                  placeholder="Copycats, massive ad bidding CPM hikes, e-retailers scaling cheaper prices..."
                  className="w-full p-2 bg-white/70 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-md text-xs text-slate-800 dark:text-slate-200 resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      );

    case 7:
      return (
        <div className="space-y-6 animate-fadeIn">
          <div className="border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <FileBarChart className="w-5 h-5 text-[#D4A437]" />
              Previous Marketing Audit
            </h2>
            <p className="text-xs text-slate-500 mt-1">Audit past advertising budgets, achievements, challenges, and lessons to prevent repeat mistakes.</p>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/45 border border-slate-150 dark:border-slate-850 rounded-xl">
            <div>
              <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100">Have you run paid advertisements before?</span>
              <p className="text-xs text-slate-400">Toggle whether your brand has run Meta, Google, or LinkedIn Ad campaigns previously.</p>
            </div>
            
            <button
              type="button"
              onClick={() => updateField('hasRunAdsBefore', !formData.hasRunAdsBefore)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none ${
                formData.hasRunAdsBefore ? 'bg-[#D4A437]' : 'bg-slate-300 dark:bg-slate-800'
              }`}
            >
              <span className="sr-only">Toggle paid ad experience</span>
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-250 ease-in-out ${
                  formData.hasRunAdsBefore ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {formData.hasRunAdsBefore ? (
            <div className="space-y-5 animate-slideDown">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="metaAdsExperience" className="block text-xs font-semibold text-slate-655 dark:text-slate-350 mb-1.5">Meta (FB/Insta) Campaign Experience</label>
                  <textarea
                    id="metaAdsExperience"
                    rows={2}
                    value={formData.adsExperience.metaAds}
                    onChange={(e) => handleAdsExp('metaAds', e.target.value)}
                    placeholder="e.g. Spent ₹50k, got 2.5x ROAS primary via Carousel Ads..."
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1.5 focus:ring-[#D4A437] text-xs resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="googleAdsExperience" className="block text-xs font-semibold text-slate-655 dark:text-slate-350 mb-1.5">Google Search/Pmax Experience</label>
                  <textarea
                    id="googleAdsExperience"
                    rows={2}
                    value={formData.adsExperience.googleAds}
                    onChange={(e) => handleAdsExp('googleAds', e.target.value)}
                    placeholder="e.g. Set up Search Ads for keywords, CPC was too high (₹45 average)..."
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1.5 focus:ring-[#D4A437] text-xs resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="linkedinAdsExperience" className="block text-xs font-semibold text-slate-655 dark:text-slate-350 mb-1.5">LinkedIn/Other B2B Experience</label>
                  <textarea
                    id="linkedinAdsExperience"
                    rows={2}
                    value={formData.adsExperience.linkedInAds}
                    onChange={(e) => handleAdsExp('linkedInAds', e.target.value)}
                    placeholder="e.g. Tried B2B Message Ads targetting HR managers, low conversion..."
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1.5 focus:ring-[#D4A437] text-xs resize-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="previousBudget" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Declared Previous Monthly Spend</label>
                  <input
                    id="previousBudget"
                    type="text"
                    value={formData.previousBudget}
                    onChange={(e) => updateField('previousBudget', e.target.value)}
                    placeholder="e.g. ₹30,000 per month historically"
                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#D4A437] transition text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="bestResultsAchieved" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Best Ad Results Achieved</label>
                  <input
                    id="bestResultsAchieved"
                    type="text"
                    value={formData.bestResultsAchieved}
                    onChange={(e) => updateField('bestResultsAchieved', e.target.value)}
                    placeholder="e.g. 400 Leads for luxury festive jars at ₹120 lead cost"
                    className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#D4A437] transition text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="challengesFaced" className="block text-xs font-semibold text-slate-655 dark:text-slate-350 mb-1.5">Main Barriers & Discomforts</label>
                  <textarea
                    id="challengesFaced"
                    rows={2}
                    value={formData.challengesFaced}
                    onChange={(e) => updateField('challengesFaced', e.target.value)}
                    placeholder="What problems happened? Ad account ban? CPM too high? Low-quality lead spam?"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1.5 focus:ring-[#D4A437] text-xs resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="lessonsLearned" className="block text-xs font-semibold text-slate-655 dark:text-slate-350 mb-1.5">Lessons Learnt & Takeaways</label>
                  <textarea
                    id="lessonsLearned"
                    rows={2}
                    value={formData.lessonsLearned}
                    onChange={(e) => updateField('lessonsLearned', e.target.value)}
                    placeholder="What did you learn? High cost targets perform better? Creative matters more?"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1.5 focus:ring-[#D4A437] text-xs resize-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="upload-reports" className="block text-xs font-semibold text-slate-655 dark:text-slate-350 mb-1.5">Attach Past Campaign Reports <span className="text-slate-450 font-normal">(PDF Format)</span></label>
                <MockUpload
                  id="upload-reports"
                  files={formData.previousReports}
                  onChange={(files) => updateField('previousReports', files)}
                  accept=".pdf"
                  label="Upload old FB Ads report, media deck summaries, etc."
                />
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-850">
              <Users className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs text-slate-500 font-medium font-sans">No previous ad campaigns executed. Excellent! Wellonik will build your first high-converting campaigns from complete scratch.</p>
            </div>
          )}
        </div>
      );

    case 8:
      return (
        <div className="space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D4A437]" />
              Branding & Aesthetic Preferences
            </h2>
            <p className="text-xs text-slate-500 mt-1">Specify brand personalities, pick hex codes, language priorities, and attach style folders.</p>
          </div>

          <div>
            <span className="block text-xs font-bold text-[#D4A437] uppercase tracking-wider mb-2.5">Brand Personality Focus <span className="text-slate-400 font-normal">(Pick up to 3)</span></span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {BRAND_PERSONALITIES.map((personality) => {
                const isSelected = formData.brandPersonality.includes(personality);
                return (
                  <button
                    key={personality}
                    type="button"
                    onClick={() => toggleCheckbox('brandPersonality', personality)}
                    className={`p-2.5 border rounded-lg text-xs text-center transition ${
                      isSelected
                        ? 'border-[#D4A437] bg-amber-500/10 text-slate-900 dark:text-white font-semibold outline-none ring-1 ring-[#D4A437]'
                        : 'border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-950/20 text-slate-650 dark:text-slate-350'
                    }`}
                  >
                    {personality}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-t border-slate-120 dark:border-slate-850 pt-4">
            <div>
              <span className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-2">Primary Brand Colors (Hex Codes)</span>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.brandColors.map((color, index) => (
                  <div key={index} className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1.5 rounded-lg">
                    <div
                      className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600 shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300 uppercase select-none">{color}</span>
                    <button
                      type="button"
                      onClick={() => removeBrandColor(index)}
                      className="p-0.5 text-slate-400 hover:text-red-500 rounded"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {formData.brandColors.length < 5 && (
                  <button
                    type="button"
                    onClick={() => addBrandColor('#F59E0B')}
                    className="px-2.5 py-1.5 text-[10px] font-bold border border-dashed border-slate-300 hover:border-[#D4A437] text-slate-400 hover:text-[#D4A437] rounded-lg transition"
                  >
                    + Add Color
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="color"
                  aria-label="Hex color picker"
                  onChange={(e) => {
                    const color = e.target.value;
                    if (!formData.brandColors.includes(color)) {
                      addBrandColor(color);
                    }
                  }}
                  className="w-10 h-8 rounded-lg cursor-pointer border-0 p-0"
                  defaultValue="#D4A437"
                />
                <span className="text-xs text-slate-400 italic">Tap the color box palette to add hex tones directly!</span>
              </div>
            </div>

            <div>
              <span className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-2">Preferred Media Formats <span className="text-slate-450 font-normal">(Target Content)</span></span>
              <div className="grid grid-cols-2 gap-1.5 p-3.5 bg-slate-50 dark:bg-slate-950/20 rounded-xl border border-slate-100 dark:border-slate-850">
                {CONTENT_TYPES_OPTIONS.map((ct) => {
                  const isChecked = formData.preferredContentTypes.includes(ct);
                  return (
                    <label key={ct} className="flex items-center gap-2 cursor-pointer py-0.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCheckbox('preferredContentTypes', ct)}
                        className="rounded border-slate-300 text-[#D4A437] w-4 h-4"
                      />
                      <span className="text-xs text-slate-700 dark:text-slate-300">{ct}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-2">Campaign Language Preference</span>
              <div className="grid grid-cols-2 p-3 bg-slate-50 dark:bg-slate-950/20 rounded-xl border border-slate-100 dark:border-slate-850 gap-2">
                {LANGUAGES_OPTIONS.map((lang) => {
                  const isChecked = formData.languagePreference.includes(lang);
                  return (
                    <label key={lang} className="flex items-center gap-2 cursor-pointer py-0.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCheckbox('languagePreference', lang)}
                        className="rounded border-slate-300 text-[#D4A437] w-4 h-4"
                      />
                      <span className="text-xs text-slate-705 dark:text-slate-300">{lang}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="tag-ref-brands" className="block text-xs font-semibold text-slate-655 dark:text-slate-350 mb-1.5">Inspirational Reference Brands <span className="text-slate-450 font-normal">(Design inspiration)</span></label>
              <TagInput
                id="tag-ref-brands"
                tags={formData.referenceBrands}
                onChange={handleReferenceBrands}
                placeholder="e.g. Forest Essentials, Kama Ayurveda, Jo Malone. Select and hit Enter"
              />
            </div>
          </div>

          <div>
            <label htmlFor="upload-brand-assets" className="block text-xs font-semibold text-slate-655 dark:text-slate-350 mb-1.5">Existing Brand Kit Assets <span className="text-slate-450 font-normal">(Logo, Typography, Media)</span></label>
            <MockUpload
              id="upload-brand-assets"
              files={formData.brandAssets}
              onChange={(files) => updateField('brandAssets', files)}
              accept=".zip,.ai,.pdf,.png"
              label="Upload active logos vector files, guidelines, or media drafts"
            />
          </div>
        </div>
      );

    case 9:
      return (
        <div className="space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#D4A437]" />
              Lead Pipeline & Sales Flow
            </h2>
            <p className="text-xs text-slate-500 mt-1">Provide data on who executes sales conversations and CRM lead structures.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="whoHandlesLeads" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Who handles incoming Leads?</label>
              <input
                id="whoHandlesLeads"
                type="text"
                value={formData.whoHandlesLeads}
                onChange={(e) => updateField('whoHandlesLeads', e.target.value)}
                placeholder="e.g. Dedicated sales rep, Founder directly"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#D4A437] transition text-sm"
              />
            </div>

            <div>
              <label htmlFor="leadManagerName" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Sales / Lead Manager Name</label>
              <input
                id="leadManagerName"
                type="text"
                value={formData.leadManagerName}
                onChange={(e) => updateField('leadManagerName', e.target.value)}
                placeholder="e.g. Rajesh Shah"
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#D4A437] transition text-sm"
              />
            </div>

            <div>
              <label htmlFor="leadResponseTime" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Expected Lead Response Turn-Around Time</label>
              <select
                id="leadResponseTime"
                value={formData.leadResponseTime}
                onChange={(e) => updateField('leadResponseTime', e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#D4A437] transition text-sm"
              >
                <option value="">Select average speed...</option>
                {RESPONSE_TIME_OPTIONS.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="crmUsed" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Sales CRM Platform Active</label>
              <select
                id="crmUsed"
                value={formData.crmUsed}
                onChange={(e) => updateField('crmUsed', e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#D4A437] transition text-sm"
              >
                <option value="">Select CRM platform in-use...</option>
                {CRM_OPTIONS.map((crm) => (
                  <option key={crm} value={crm}>{crm}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="tag-lead-sources" className="block text-xs font-semibold text-slate-655 dark:text-slate-350 mb-1.5">Primary Lead Sourcing Channels <span className="text-slate-450 font-normal">(Dynamic Tags List)</span></label>
            <TagInput
              id="tag-lead-sources"
              tags={formData.leadSources}
              onChange={(tags) => updateField('leadSources', tags)}
              placeholder="Add source (e.g. Meta Lead Forms, Instagram DMs, Website Contact Page, WhatsApp link)"
            />
          </div>

          <div>
            <label htmlFor="salesProcessDescription" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Describe your Active Sales Hook / Pitch</label>
            <textarea
              id="salesProcessDescription"
              rows={3}
              value={formData.salesProcessDescription}
              onChange={(e) => updateField('salesProcessDescription', e.target.value)}
              placeholder="Step by step once lead comes (e.g. Rajesh calls within 5 mins, shares digital pricing card, schedules demo on Zoom, sends contract...)"
              className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-805 rounded-lg text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] transition text-sm resize-none"
            />
          </div>
        </div>
      );

    case 10:
      return (
        <div className="space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-[#D4A437]" />
              Final Business Goals & Expansion Context
            </h2>
            <p className="text-xs text-slate-500 mt-1">Specify 12-month metrics, pipeline cities/countries, and custom advisory requirements.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="whereBusinessIn12Months" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Where do you want your business to be in 12 months?</label>
              <textarea
                id="whereBusinessIn12Months"
                rows={2}
                required
                value={formData.whereBusinessIn12Months}
                onChange={(e) => updateField('whereBusinessIn12Months', e.target.value)}
                placeholder="Market share, brand awareness, team metrics. e.g. Sell 5000 units monthly, establish luxury offline store presence..."
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-810 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] transition text-sm resize-none"
              />
            </div>

            <div>
              <label htmlFor="revenueGoals12Months" className="block text-xs font-semibold text-slate-655 dark:text-slate-350 mb-1.5">What are your specific revenue goals?</label>
              <textarea
                id="revenueGoals12Months"
                rows={2}
                value={formData.revenueGoals12Months}
                onChange={(e) => updateField('revenueGoals12Months', e.target.value)}
                placeholder="e.g. Cross ₹3 Crore annual revenue run-rate, retain 45% profit margins..."
                className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-810 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] transition text-sm resize-none"
              />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/45 p-4 rounded-xl border border-slate-150 dark:border-slate-850 space-y-3">
            <h3 className="text-xs font-bold text-[#D4A437] uppercase tracking-wider">Geography & Inventory Expansion Roadmap</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label htmlFor="expansionNewProducts" className="block text-[11px] font-medium text-slate-550 dark:text-slate-400 mb-1.5">Upcoming Products Pipeline</label>
                <input
                  id="expansionNewProducts"
                  type="text"
                  value={formData.expansionPlans.newProducts}
                  onChange={(e) => handleExpansion('newProducts', e.target.value)}
                  placeholder="e.g. Scented wax sachets, electric burners"
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-slate-205 placeholder-slate-400 focus:ring-1 focus:ring-[#D4A437] text-xs"
                />
              </div>

              <div>
                <label htmlFor="expansionNewCities" className="block text-[11px] font-medium text-slate-550 dark:text-slate-400 mb-1.5">Target Cities in Next Year</label>
                <input
                  id="expansionNewCities"
                  type="text"
                  value={formData.expansionPlans.newCities}
                  onChange={(e) => handleExpansion('newCities', e.target.value)}
                  placeholder="e.g. Delhi NCR, Bangalore, Pune"
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-slate-205 placeholder-slate-400 focus:ring-1 focus:ring-[#D4A437] text-xs"
                />
              </div>

              <div>
                <label htmlFor="expansionNewCountries" className="block text-[11px] font-medium text-slate-550 dark:text-slate-400 mb-1.5">Target International Markets</label>
                <input
                  id="expansionNewCountries"
                  type="text"
                  value={formData.expansionPlans.newCountries}
                  onChange={(e) => handleExpansion('newCountries', e.target.value)}
                  placeholder="e.g. UAE (Dubai), Singapore"
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-slate-205 placeholder-slate-400 focus:ring-1 focus:ring-[#D4A437] text-xs"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="additionalNotes" className="block text-xs font-semibold text-slate-650 dark:text-slate-350 mb-1.5">Additional Notes / Custom Instructions for Wellonik Agency</label>
            <textarea
              id="additionalNotes"
              rows={3}
              value={formData.additionalNotes}
              onChange={(e) => updateField('additionalNotes', e.target.value)}
              placeholder="Any other specific branding assets, ad formats, timeline queries, or strategic consulting needs..."
              className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4A437] transition text-sm resize-none"
            />
          </div>
        </div>
      );

    default:
      return null;
  }
};
