import React from 'react';
import { WellonikFormData, Competitor, OfferAndPromotion } from '../types';
import { FORM_STEPS } from '../constants';
import { Printer, Download, ArrowLeft, CheckCircle2, ChevronRight, Share2, HelpCircle } from 'lucide-react';

interface PrintSummaryProps {
  formData: WellonikFormData;
  onBack: () => void;
  onDownloadJSON: () => void;
}

export const PrintSummary: React.FC<PrintSummaryProps> = ({
  formData,
  onBack,
  onDownloadJSON
}) => {
  const triggerPrint = () => {
    window.print();
  };

  // Helper check for empty fields
  const showVal = (val: string | number | undefined | null) => {
    if (val === undefined || val === null || String(val).trim() === '') {
      return <span className="text-slate-400 dark:text-slate-600 italic">Not specified</span>;
    }
    return String(val);
  };

  const showArray = (arr: string[] | undefined | null) => {
    if (!arr || arr.length === 0) {
      return <span className="text-slate-400 dark:text-slate-600 italic">None specified</span>;
    }
    return arr.join(', ');
  };

  return (
    <div className="space-y-6">
      {/* Action Bar (hidden during active printing via CSS) */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-4 rounded-xl print:hidden">
        <div>
          <button
            onClick={onBack}
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-[#D4A437] flex items-center gap-1.5 transition font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Editor
          </button>
          <h2 className="text-sm font-bold text-slate-850 dark:text-white mt-1">Review Business Profile Report</h2>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={onDownloadJSON}
            className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-705 dark:text-slate-300 hover:bg-[#D4A437]/15 hover:text-[#D4A437] rounded-lg transition"
            title="Download full structured data in JSON format"
          >
            <Download className="w-3.5 h-3.5 inline mr-1.5" /> Download JSON payload
          </button>
          <button
            onClick={triggerPrint}
            className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold bg-[#D4A437] hover:bg-[#bfa032] text-white rounded-lg transition shadow-sm"
            title="Download full onboarding dossier as PDF"
          >
            <Printer className="w-3.5 h-3.5 inline mr-1.5" /> Save or Download PDF Report
          </button>
        </div>
      </div>

      {/* Styled Printable Resume Document */}
      <div className="bg-white text-slate-900 border border-slate-200 p-6 sm:p-12 rounded-xl shadow-sm max-w-4xl mx-auto dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800 print:bg-white print:text-black print:border-0 print:shadow-none print:p-0">
        
        {/* Header Block */}
        <div className="border-b-4 border-[#D4A437] pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#D4A437] text-2.5xl font-black tracking-wider uppercase font-sans">Wellonik</span>
              <span className="text-xs font-semibold tracking-widest text-slate-400 dark:text-slate-500 uppercase">Design Studio</span>
            </div>
            <h1 className="text-xl sm:text-2.5xl font-extrabold text-slate-850 dark:text-white print:text-black mt-1">Master Client Discovery Profile</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Onboarding Dossier for Strategic Marketing & Creative Operations</p>
          </div>
          
          <div className="text-left md:text-right font-mono text-[11px] text-slate-500">
            <p><strong>Brand Name:</strong> {formData.brandName || 'Not named'}</p>
            <p><strong>Contact Person:</strong> {formData.contactPersonName || 'Not named'}</p>
            <p><strong>Saved Timestamp:</strong> {formData.lastSavedAt || new Date().toLocaleString()}</p>
            <p><strong>Database Record Status:</strong> <span className="text-emerald-600 font-bold dark:text-emerald-450 uppercase">Verified Discovery Complete ✓</span></p>
          </div>
        </div>

        {/* Dynamic Grid Sections containing ALL fields */}
        <div className="mt-8 space-y-10 text-sm">
          
          {/* Chapter 1: Business Profile & Contact Core */}
          <section className="space-y-4 break-after-avoid">
            <h3 className="text-xs font-black text-[#D4A437] uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-1.5 flex items-center justify-between">
              <span>Chapter 1: Corporate Profile & Stakeholder Contacts</span>
              <span className="text-[10px] font-mono font-medium text-slate-400">Section 1.0</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Business Legal Entity Name:</span>
                <span className="font-medium text-slate-900 dark:text-white print:text-black">{showVal(formData.businessName)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Active Brand/Trade Name:</span>
                <span className="font-medium text-slate-900 dark:text-white print:text-black">{showVal(formData.brandName)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Contact Person Name:</span>
                <span className="font-medium text-slate-900 dark:text-white print:text-black">{showVal(formData.contactPersonName)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Corporate Designation/Role:</span>
                <span className="font-medium text-slate-900 dark:text-white print:text-black">{showVal(formData.designation)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Mobile Hot Number:</span>
                <span className="font-mono text-slate-900 dark:text-white print:text-black">{showVal(formData.mobileNumber)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">WhatsApp Contact Number:</span>
                <span className="font-mono text-slate-900 dark:text-white print:text-black">{showVal(formData.whatsAppNumber || formData.mobileNumber)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">E-mail Address:</span>
                <span className="text-slate-950 dark:text-slate-100 print:text-black font-medium">{showVal(formData.emailAddress)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Website URL:</span>
                <span className="text-blue-600 dark:text-blue-400 font-mono text-xs">{showVal(formData.website)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Industry Category / Niche:</span>
                <span className="font-medium text-slate-900 dark:text-white print:text-black">{showVal(formData.industryCategory)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Establishment Year:</span>
                <span className="font-medium text-slate-900 dark:text-white print:text-black">{showVal(formData.establishmentYear)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Employee Size / Headcount:</span>
                <span className="font-medium text-slate-900 dark:text-white print:text-black">{showVal(formData.employeeCount)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Active Service Locations:</span>
                <span className="font-medium text-slate-900 dark:text-white print:text-black">{showVal(formData.serviceLocations)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 rounded-lg">
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Corporate HQ Address</span>
                <p className="text-xs text-slate-880 dark:text-slate-300 mt-1">{showVal(formData.businessAddress)}</p>
              </div>
              {formData.manufacturingAddress && (
                <div className="p-3 bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 rounded-lg">
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Manufacturing Unit/Warehouse Location</span>
                  <p className="text-xs text-slate-880 dark:text-slate-300 mt-1">{showVal(formData.manufacturingAddress)}</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 rounded-lg space-y-2.5">
              <div>
                <span className="block text-[11px] font-bold text-[#D4A437] uppercase tracking-wider">Elevator Pitch & Company Backstory</span>
                <p className="text-xs text-slate-800 dark:text-slate-300 mt-1 leading-relaxed">
                  {showVal(formData.companyDescription)}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200/50 dark:border-slate-800/50">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Core Services Performed</span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">{showVal(formData.whatCompanyDoes)}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Funder Motivation / Why Started</span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">{showVal(formData.whyWasItStarted)}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200/50 dark:border-slate-800/50 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-450">Future Vision</span>
                  <p className="text-slate-700 dark:text-slate-300 mt-0.5">{showVal(formData.vision)}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-450">Mission Statement</span>
                  <p className="text-slate-700 dark:text-slate-300 mt-0.5">{showVal(formData.mission)}</p>
                </div>
              </div>
            </div>

            {/* Social Media profiles section */}
            <div className="border border-slate-100 dark:border-slate-800 rounded-lg p-3 bg-slate-50 dark:bg-slate-950/10">
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Associated Digital Handles</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
                <div>
                  <span className="font-semibold text-slate-500 block text-[10px]">Facebook:</span>
                  <span className="truncate block text-slate-700 dark:text-slate-300">{showVal(formData.socialMedia?.facebook)}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 block text-[10px]">Instagram:</span>
                  <span className="truncate block text-slate-700 dark:text-slate-300">{showVal(formData.socialMedia?.instagram)}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 block text-[10px]">LinkedIn:</span>
                  <span className="truncate block text-slate-700 dark:text-slate-300">{showVal(formData.socialMedia?.linkedIn)}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 block text-[10px]">YouTube Vlog:</span>
                  <span className="truncate block text-slate-700 dark:text-slate-300">{showVal(formData.socialMedia?.youTube)}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 block text-[10px]">Google Map Profile URL:</span>
                  <span className="truncate block text-slate-700 dark:text-slate-300">{showVal(formData.socialMedia?.googleProfile)}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Chapter 2: Product & Service Specifications */}
          <section className="space-y-4 break-after-avoid">
            <h3 className="text-xs font-black text-[#D4A437] uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-1.5 flex items-center justify-between">
              <span>Chapter 2: Products, Services & Unique USP Matrices</span>
              <span className="text-[10px] font-mono font-medium text-slate-400">Section 2.0</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 rounded-lg">
                <span className="font-bold text-[#D4A437] text-xs block uppercase">Primary Offering Product/Service</span>
                <p className="text-sm font-semibold text-slate-850 dark:text-white print:text-black mt-1">
                  {showVal(formData.primaryProductService)}
                </p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 rounded-lg">
                <span className="font-semibold text-slate-550 text-xs block uppercase">Secondary / Allied Offerings</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
                  {showVal(formData.secondaryProducts)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-amber-500/5 dark:bg-amber-950/5 border border-amber-500/10 p-3 rounded-lg text-xs">
              <div>
                <span className="font-bold block text-[#D4A437] uppercase text-[10px]">Retail Pricing Spectrum</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 font-medium">{showVal(formData.pricing?.retail)}</span>
              </div>
              <div>
                <span className="font-bold block text-[#D4A437] uppercase text-[10px]">Wholesale Distribution Cost</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 font-medium">{showVal(formData.pricing?.wholesale)}</span>
              </div>
              <div>
                <span className="font-bold block text-[#D4A437] uppercase text-[10px]">Bulk Tier Discounts</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 font-medium">{showVal(formData.pricing?.bulk)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 text-xs">
              <div className="border border-slate-100 dark:border-slate-800 p-3 rounded-lg">
                <span className="font-semibold text-[#D4A437] uppercase block text-[10px]">Key Market Differentiation</span>
                <p className="text-slate-700 dark:text-slate-300 mt-1 leading-relaxed italic">"{showVal(formData.usp?.difference)}"</p>
              </div>
              <div className="border border-slate-100 dark:border-slate-800 p-3 rounded-lg">
                <span className="font-semibold text-[#D4A437] uppercase block text-[10px]">Why Choose Us (Client Reason)</span>
                <p className="text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">"{showVal(formData.usp?.whyChooseUs)}"</p>
              </div>
              <div className="border border-slate-100 dark:border-slate-800 p-3 rounded-lg">
                <span className="font-semibold text-[#D4A437] uppercase block text-[10px]">Strongest Moat & Advantages</span>
                <p className="text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">"{showVal(formData.usp?.strongestAdvantages)}"</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="font-bold text-slate-400 uppercase text-[10px] block">Premium Product Features</span>
                <p className="text-slate-700 dark:text-slate-300 mt-0.5">{showArray(formData.productFeatures)}</p>
              </div>
              <div>
                <span className="font-bold text-slate-400 uppercase text-[10px] block">Customer Impact Benefits</span>
                <p className="text-slate-700 dark:text-slate-300 mt-0.5">{showArray(formData.productBenefits)}</p>
              </div>
              <div>
                <span className="font-bold text-slate-400 uppercase text-[10px] block">Accredited Certifications</span>
                <p className="text-slate-700 dark:text-slate-300 mt-0.5">{showArray(formData.certifications)}</p>
              </div>
            </div>

            {formData.productAssets && formData.productAssets.length > 0 && (
              <div className="text-xs bg-slate-50 dark:bg-slate-950/20 p-2 border rounded border-slate-100 dark:border-slate-850">
                <span className="font-bold text-slate-400 block mb-1">Attached Catalogs & Video Assets ({formData.productAssets.length})</span>
                <div className="flex flex-wrap gap-2">
                  {formData.productAssets.map((f, i) => (
                    <span key={f.id || i} className="px-2.5 py-1 bg-white dark:bg-slate-850 border rounded-full font-mono text-[10.5px]">
                      📂 {f.name} ({f.size})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Chapter 3: Target Audience Demographics */}
          <section className="space-y-4 break-after-avoid">
            <h3 className="text-xs font-black text-[#D4A437] uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-1.5 flex items-center justify-between">
              <span>Chapter 3: Audience Intelligence & Persona Profiles</span>
              <span className="text-[10px] font-mono font-medium text-slate-400">Section 3.0</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5 text-xs">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Business Model Category:</span>
                <span className="font-medium">{showVal(formData.customerType)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Primary Audience Age Ratios:</span>
                <span className="font-medium">{showArray(formData.audienceAgeRange)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Target Segment Gender Focus:</span>
                <span className="font-medium">{showVal(formData.audienceGender)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Household Income Threshold:</span>
                <span className="font-medium">{showVal(formData.audienceIncomeLevel)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Audience Professional Occupations:</span>
                <span className="font-medium">{showArray(formData.audienceOccupation)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Educational Qualification level:</span>
                <span className="font-medium">{showVal(formData.audienceEducation)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Social Marital Status Core:</span>
                <span className="font-medium">{showVal(formData.audienceMaritalStatus)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Geo Target Locations:</span>
                <span className="font-medium">{showArray(formData.targetLocations)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Preferred Media Networks:</span>
                <span className="font-medium">{showArray(formData.preferredPlatforms)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Target Core Interests:</span>
                <span className="font-medium">{showArray(formData.audienceInterests)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div className="bg-slate-50 dark:bg-slate-950/20 border border-slate-105 rounded-lg p-3">
                <span className="font-bold text-slate-550 block uppercase text-[10px]">Client Persona Archetype Brief</span>
                <p className="text-slate-800 dark:text-slate-350 mt-1 italic">"{showVal(formData.targetAudienceIdeal)}"</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950/20 border border-slate-105 rounded-lg p-3">
                <span className="font-bold text-rose-500 block uppercase text-[10px]">Known Friction, Pain Points & Fears</span>
                <p className="text-slate-800 dark:text-slate-350 mt-1">"{showVal(formData.audiencePainPoints)}"</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/20 border rounded-lg p-3 text-xs">
              <span className="font-bold text-[#D4A437] block uppercase text-[10px]">Underlying Buying Motivations</span>
              <p className="text-slate-800 dark:text-slate-350 mt-1">"{showVal(formData.audienceBuyingMotivations)}"</p>
            </div>
          </section>

          {/* Chapter 4: Customer Behavior & Buying Decisions */}
          <section className="space-y-4 break-after-avoid">
            <h3 className="text-xs font-black text-[#D4A437] uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-1.5 flex items-center justify-between">
              <span>Chapter 4: Customer Discovery Channels & Priorities</span>
              <span className="text-[10px] font-mono font-medium text-slate-400">Section 4.0</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 border border-slate-100 dark:border-slate-850 rounded-lg">
                <span className="font-bold text-slate-450 uppercase text-[10px] block mb-1">How Customers Currently Discover Us</span>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{showArray(formData.howCustomersFindUs)}</p>
              </div>
              
              <div className="p-3 border border-[#D4A437]/10 bg-[#D4A437]/5 rounded-lg">
                <span className="font-bold text-[#D4A437] uppercase text-[10px] block mb-1">Sequential Client Buying Decision Factor (1st to Last)</span>
                <p className="font-black text-slate-900 dark:text-white print:text-black">
                  {formData.buyingDecisionRanking && formData.buyingDecisionRanking.length > 0 
                     ? formData.buyingDecisionRanking.map((factor, index) => `${index + 1}. ${factor}`).join(' ➔ ')
                     : 'Not ranked'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs bg-slate-50 dark:bg-slate-950/20 p-3 rounded-lg">
              <div>
                <span className="text-slate-400 block font-bold text-[10px] uppercase">Client Purchase Frequency</span>
                <p className="text-slate-800 dark:text-slate-300 font-medium mt-0.5">{showVal(formData.purchaseFrequency)}</p>
              </div>
              <div>
                <span className="text-slate-400 block font-bold text-[10px] uppercase">Seasonal Peaks & Tractions</span>
                <p className="text-slate-800 dark:text-slate-300 font-medium mt-0.5">{showVal(formData.seasonalSalesTrends)}</p>
              </div>
              <div>
                <span className="text-slate-400 block font-bold text-[10px] uppercase">Corporate Sales Pipeline Cycle</span>
                <p className="text-slate-800 dark:text-slate-300 font-medium mt-0.5">{showVal(formData.salesCycle)}</p>
              </div>
            </div>
          </section>

          {/* Chapter 5: Strategic Goals & Campaign Budget */}
          <section className="space-y-4 break-after-avoid">
            <h3 className="text-xs font-black text-[#D4A437] uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-1.5 flex items-center justify-between">
              <span>Chapter 5: Advertising Objectives, Promos & Capital Budgets</span>
              <span className="text-[10px] font-mono font-medium text-slate-400">Section 5.0</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-amber-500/10 dark:bg-amber-950/20 border border-[#D4A437]/20 rounded-lg">
                <span className="text-[#D4A437] font-black uppercase tracking-wider block text-[11px]">Monthly Planned Meta/Google Ad Budget</span>
                <p className="text-lg font-black text-slate-900 dark:text-white print:text-black mt-1">
                  ₹{Number(formData.monthlyAdBudget || 0).toLocaleString('en-IN')} / month
                </p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 rounded-lg">
                <span className="text-slate-450 font-bold uppercase block text-[10px]">Primary Campaign Sourcing Objectives</span>
                <p className="font-semibold text-slate-800 dark:text-slate-200 mt-1">
                  {showArray(formData.primaryObjectives)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs bg-slate-50 dark:bg-slate-950/25 p-3 rounded-lg">
              <div>
                <span className="text-slate-550 block font-bold uppercase text-[9px]">Desired Inbound Lead Target:</span>
                <p className="font-bold text-slate-850 dark:text-slate-200 mt-0.5">{showVal(formData.monthlyLeadTarget)}</p>
              </div>
              <div>
                <span className="text-slate-550 block font-bold uppercase text-[9px]">Calculated Goal Revenue:</span>
                <p className="font-bold text-slate-850 dark:text-slate-200 mt-0.5">{showVal(formData.expectedRevenueTarget)}</p>
              </div>
              <div>
                <span className="text-slate-550 block font-bold uppercase text-[9px]">Expected Campaign ROAS:</span>
                <p className="font-bold text-slate-[#D4A437] dark:text-amber-500 mt-0.5">{showVal(formData.expectedROI)}</p>
              </div>
              <div>
                <span className="text-slate-550 block font-bold uppercase text-[9px]">Target Date Span:</span>
                <p className="font-bold text-slate-850 dark:text-slate-200 mt-0.5 font-mono">
                  {formData.campaignTimelineStart ? `${formData.campaignTimelineStart} to ${formData.campaignTimelineEnd || 'Flexible'}` : 'Not scheduled'}
                </p>
              </div>
            </div>

            {formData.offersAndPromotions && formData.offersAndPromotions.length > 0 && (
              <div className="p-3.5 border border-slate-150 dark:border-slate-800 rounded-lg">
                <span className="font-bold text-[#D4A437] text-xs block mb-2 uppercase">Active Promotional Deals & Hook Offers</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {formData.offersAndPromotions.map((offer, idx) => (
                    <div key={offer.id || idx} className="p-2.5 bg-slate-50 dark:bg-slate-950/20 border rounded text-xs">
                      <p className="font-bold text-slate-850 dark:text-white print:text-black">🎁 {offer.title}</p>
                      <p className="text-slate-550 dark:text-slate-400 mt-1 leading-relaxed">{offer.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Chapter 6: Competidor intelligence */}
          <section className="space-y-4 break-after-avoid">
            <h3 className="text-xs font-black text-[#D4A437] uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-1.5 flex items-center justify-between">
              <span>Chapter 6: Competitor Ecosystem & SWOT Audits</span>
              <span className="text-[10px] font-mono font-medium text-slate-400">Section 6.0</span>
            </h3>

            {formData.competitors && formData.competitors.length > 0 ? (
              <div className="space-y-2">
                <span className="font-bold text-slate-450 uppercase text-[10px] block">Identified Direct Competitors</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {formData.competitors.map((comp, idx) => (
                    <div key={comp.id || idx} className="p-2.5 border border-slate-150 dark:border-slate-800 rounded-lg">
                      <p className="font-bold text-slate-850 dark:text-slate-200">{comp.name}</p>
                      <p className="text-[#D4A437] font-mono text-xs mt-0.5">{comp.website}</p>
                      {comp.socialLinks && (
                        <p className="text-slate-400 text-[11px] mt-1">Handles: <span className="font-mono">{comp.socialLinks}</span></p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No direct competitors documented</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs bg-slate-50 dark:bg-slate-950/15 p-3 rounded-lg">
              <div>
                <span className="text-amber-600 dark:text-amber-450 font-bold uppercase text-[9.5px]">What Competitors Execute Well</span>
                <p className="mt-1 text-slate-700 dark:text-slate-350 italic">"{showVal(formData.whatCompetitorsDoWell)}"</p>
              </div>
              <div>
                <span className="text-rose-600 dark:text-rose-455 font-bold uppercase text-[9.5px]">Identified Competitor Vulnerabilities</span>
                <p className="mt-1 text-slate-700 dark:text-slate-350 italic">"{showVal(formData.competitorWeaknesses)}"</p>
              </div>
              <div>
                <span className="text-blue-600 dark:text-blue-450 font-bold uppercase text-[9.5px]">Our Advantage Strategy to Dominate</span>
                <p className="mt-1 text-slate-700 dark:text-slate-350 italic">"{showVal(formData.outperformCompetitors)}"</p>
              </div>
            </div>

            {/* SWOT Matrix Card layout */}
            <div className="border border-slate-150 dark:border-slate-800 rounded-lg p-4">
              <span className="font-bold text-[#D4A437] uppercase text-[10px] block mb-3 text-center tracking-widest">Enterprise SWOT Analysis Strategy Blueprint</span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-emerald-500/10 dark:bg-emerald-950/20 border border-emerald-500/20 rounded-lg">
                  <span className="font-bold text-emerald-600 block text-[10.5px]">🌟 S - Strengths (Internal Core)</span>
                  <p className="text-slate-800 dark:text-slate-300 mt-1.5 leading-relaxed">{showVal(formData.swot?.strengths)}</p>
                </div>
                <div className="p-3 bg-red-500/10 dark:bg-red-950/20 border border-red-500/20 rounded-lg">
                  <span className="font-bold text-red-650 block text-[10.5px]">⚠️ W - Weaknesses (Internal Constraints)</span>
                  <p className="text-slate-800 dark:text-slate-300 mt-1.5 leading-relaxed">{showVal(formData.swot?.weaknesses)}</p>
                </div>
                <div className="p-3 bg-blue-500/10 dark:bg-blue-950/20 border border-blue-500/20 rounded-lg">
                  <span className="font-bold text-blue-605 block text-[10.5px]">🎯 O - Opportunities (External Expansion)</span>
                  <p className="text-slate-800 dark:text-slate-300 mt-1.5 leading-relaxed">{showVal(formData.swot?.opportunities)}</p>
                </div>
                <div className="p-3 bg-slate-100 dark:bg-slate-950/45 border border-slate-250 dark:border-slate-800 rounded-lg">
                  <span className="font-bold text-slate-550 block text-[10.5px]">🛑 T - Threats (External Threats)</span>
                  <p className="text-slate-800 dark:text-slate-300 mt-1.5 leading-relaxed">{showVal(formData.swot?.threats)}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Chapter 7: Previous Experience */}
          <section className="space-y-4 break-after-avoid">
            <h3 className="text-xs font-black text-[#D4A437] uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-1.5 flex items-center justify-between">
              <span>Chapter 7: Prior Brand Ad Experience & Historical Audits</span>
              <span className="text-[10px] font-mono font-medium text-slate-400">Section 7.0</span>
            </h3>

            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950/20 p-3.5 rounded-lg text-xs">
              <span className="font-bold text-slate-500">Has Run Paid Digital Advertisement Before:</span>
              <span className={`px-2.5 py-0.5 rounded font-black ${formData.hasRunAdsBefore ? 'bg-[#D4A437]/25 text-[#D4A440]' : 'bg-slate-205 text-slate-500'}`}>
                {formData.hasRunAdsBefore ? 'YES' : 'NO'}
              </span>
            </div>

            {formData.hasRunAdsBefore ? (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-2.5 border rounded">
                    <span className="font-bold text-slate-500">Meta/Facebook Ads Experience:</span>
                    <p className="mt-1">{showVal(formData.adsExperience?.metaAds)}</p>
                  </div>
                  <div className="p-2.5 border rounded">
                    <span className="font-bold text-slate-500">Google Search Ads Experience:</span>
                    <p className="mt-1">{showVal(formData.adsExperience?.googleAds)}</p>
                  </div>
                  <div className="p-2.5 border rounded">
                    <span className="font-bold text-slate-500">LinkedIn/Other Ad Networks:</span>
                    <p className="mt-1">{showVal(formData.adsExperience?.linkedInAds)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-3 bg-slate-50 dark:bg-slate-950/15 rounded-lg">
                    <span className="font-bold block text-slate-450 uppercase text-[9.5px]">Prior Month Capital Investment:</span>
                    <p className="mt-1 font-medium text-slate-800 dark:text-slate-300">{showVal(formData.previousBudget)}</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-950/15 rounded-lg">
                    <span className="font-bold block text-slate-450 uppercase text-[9.5px]">Strongest Organic/Paid Results Achieved:</span>
                    <p className="mt-1 font-medium text-slate-800 dark:text-slate-300">{showVal(formData.bestResultsAchieved)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 border rounded-lg">
                    <span className="font-bold block text-slate-450 uppercase text-[9.5px]">Critical Hurdles & Friction Faced:</span>
                    <p className="mt-1 text-slate-700 dark:text-slate-350">{showVal(formData.challengesFaced)}</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <span className="font-bold block text-slate-450 uppercase text-[9.5px]">Lessons Mastered & Key Adjustments:</span>
                    <p className="mt-1 text-slate-700 dark:text-slate-350">{showVal(formData.lessonsLearned)}</p>
                  </div>
                </div>

                {formData.previousReports && formData.previousReports.length > 0 && (
                  <div className="p-3 bg-slate-55 border border-slate-100 rounded text-xs">
                    <span className="font-bold text-slate-450 block mb-1">Uploaded Historical Lead Audits & PDF Metrics</span>
                    <div className="flex flex-wrap gap-2">
                      {formData.previousReports.map((r, i) => (
                        <span key={r.id || i} className="px-2.5 py-0.5 bg-white border font-mono text-[10.5px]">
                          📊 {r.name} ({r.size})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No prior marketing history recorded. Launching brand-new campaigns for parent entity.</p>
            )}
          </section>

          {/* Chapter 8: Branding & Visual Voice */}
          <section className="space-y-4 break-after-avoid">
            <h3 className="text-xs font-black text-[#D4A437] uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-1.5 flex items-center justify-between">
              <span>Chapter 8: Creative Kits, Aesthetic Moods & Asset Guidelines</span>
              <span className="text-[10px] font-mono font-medium text-slate-400">Section 8.0</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Target Persona Style Tone:</span>
                <p className="font-semibold text-slate-800 dark:text-slate-250">{showArray(formData.brandPersonality)}</p>
              </div>

              <div>
                <span className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Primary Color Palette Hex Codes:</span>
                <div className="flex flex-wrap gap-2.5 mt-1">
                  {formData.brandColors && formData.brandColors.length > 0 ? (
                    formData.brandColors.map((color, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950/20 border px-1.5 py-0.5 rounded">
                        <div className="w-3.5 h-3.5 rounded" style={{ backgroundColor: color }} />
                        <span className="font-mono text-[10px] select-all uppercase">{color}</span>
                      </div>
                    ))
                  ) : (
                    <span className="italic text-slate-400">None defined</span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-950/15 p-3 rounded-lg text-xs">
              <div>
                <span className="text-slate-500 block font-bold text-[9px] uppercase">Preferred Content Templates:</span>
                <p className="font-medium text-slate-850 dark:text-slate-250 mt-0.5">{showArray(formData.preferredContentTypes)}</p>
              </div>
              <div>
                <span className="text-slate-500 block font-bold text-[9px] uppercase">Linguistic/Language Priorities:</span>
                <p className="font-medium text-slate-850 dark:text-slate-250 mt-0.5">{showArray(formData.languagePreference)}</p>
              </div>
              <div>
                <span className="text-slate-500 block font-bold text-[9px] uppercase">Aged Benchmark Reference Brands:</span>
                <p className="font-medium text-slate-850 dark:text-slate-250 mt-0.5">{showArray(formData.referenceBrands)}</p>
              </div>
            </div>

            {formData.brandAssets && formData.brandAssets.length > 0 && (
              <div className="text-xs bg-slate-50 dark:bg-slate-950/20 p-2 border rounded border-slate-100 dark:border-slate-850">
                <span className="font-bold text-slate-400 block mb-1">Uploaded Vector Logos, Brand Kits ({formData.brandAssets.length})</span>
                <div className="flex flex-wrap gap-2">
                  {formData.brandAssets.map((f, i) => (
                    <span key={f.id || i} className="px-2.5 py-1 bg-white dark:bg-slate-850 border rounded-full font-mono text-[10.5px]">
                      🎨 {f.name} ({f.size})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Chapter 9: Lead Sourcing Pipeline */}
          <section className="space-y-4 break-after-avoid">
            <h3 className="text-xs font-black text-[#D4A437] uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-1.5 flex items-center justify-between">
              <span>Chapter 9: Customer Support Pipeline & CRM Handling</span>
              <span className="text-[10px] font-mono font-medium text-slate-400">Section 9.0</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5 text-xs">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Lead Sourcing Responder Model:</span>
                <span className="font-medium">{showVal(formData.whoHandlesLeads)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Key Designated Lead Manager:</span>
                <span className="font-medium">{showVal(formData.leadManagerName)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Target Response Speed SLA:</span>
                <span className="font-medium text-amber-700 dark:text-[#D4A437] font-semibold">{showVal(formData.leadResponseTime)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Preferred Lead Hot Sources:</span>
                <span className="font-medium">{showArray(formData.leadSources)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 py-1.5">
                <span className="font-semibold text-slate-500">Integrated CRM System:</span>
                <span className="font-medium font-mono text-emerald-600 dark:text-emerald-400">{showVal(formData.crmUsed)}</span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 rounded-lg p-3 text-xs leading-relaxed">
              <span className="font-bold text-slate-400 uppercase text-[10px] block mb-1">Corporate Sales Calling & Closing Sequence</span>
              <p className="text-slate-700 dark:text-slate-300">"{showVal(formData.salesProcessDescription)}"</p>
            </div>
          </section>

          {/* Chapter 10: 12M Horizon Roadmap */}
          <section className="space-y-4 break-after-avoid">
            <h3 className="text-xs font-black text-[#D4A437] uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-1.5 flex items-center justify-between">
              <span>Chapter 10: 12-Month Vision Statement & Strategic Roadmap</span>
              <span className="text-[10px] font-mono font-medium text-slate-400">Section 10.0</span>
            </h3>

            <div className="p-4 bg-[#D4A437]/5 dark:bg-[#D4A437]/5 border border-[#D4A437]/25 rounded-xl space-y-3">
              <div>
                <span className="block text-xs font-bold text-[#D4A437] uppercase tracking-wider">Vision: Location of Brand in 12 Months</span>
                <p className="text-sm italic font-medium mt-1 leading-relaxed text-slate-850 dark:text-white print:text-black">
                  "{showVal(formData.whereBusinessIn12Months)}"
                </p>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 pt-2.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Planned Target Annual Outperform Value:</span>
                  <p className="font-bold text-slate-800 dark:text-slate-250 mt-0.5">{showVal(formData.revenueGoals12Months)}</p>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-3 text-xs">
              <span className="font-bold text-slate-450 uppercase text-[10px] block mb-1">Post onboarding Expansion Blueprint</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4.5">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Planned Product Portfolios</span>
                  <p className="text-slate-800 dark:text-slate-350 mt-1">{showVal(formData.expansionPlans?.newProducts)}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Expansion Target Cities</span>
                  <p className="text-slate-800 dark:text-slate-350 mt-1">{showVal(formData.expansionPlans?.newCities)}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Expansion Internationals Countries</span>
                  <p className="text-slate-800 dark:text-slate-350 mt-1">{showVal(formData.expansionPlans?.newCountries)}</p>
                </div>
              </div>
            </div>

            {formData.additionalNotes && (
              <div className="p-3 bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 rounded-lg text-xs leading-relaxed">
                <span className="font-semibold text-slate-500 block text-[10px] uppercase mb-1">Additional Advisory / Client Remarks</span>
                <p className="text-slate-700 dark:text-slate-350 italic">"{formData.additionalNotes}"</p>
              </div>
            )}
          </section>

        </div>

        {/* Agency Footer Block */}
        <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-6 text-center text-xs text-slate-400">
          <div className="flex items-center justify-center gap-1 mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <p className="font-semibold text-slate-700 dark:text-slate-300">Onboarding Discovery Completed & Certified</p>
          </div>
          <p>Wellonik Design Studio © 2026. Handcrafted for Elite Business Performance.</p>
        </div>

      </div>
    </div>
  );
};
