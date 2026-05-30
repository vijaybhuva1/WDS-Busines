import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, CheckCircle2, ChevronRight, ChevronLeft, Save, 
  Download, Moon, Sun, Search, RefreshCw, Printer, AlertCircle, 
  FileJson, Trash2, Heart, ExternalLink, Menu, X, CheckSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WellonikFormData } from './types';
import { INITIAL_FORM_DATA, FORM_STEPS } from './constants';
import { OnboardingSteps } from './components/OnboardingSteps';
import { PrintSummary } from './components/PrintSummary';

export default function App() {
  const [formData, setFormData] = useState<WellonikFormData>(() => {
    const saved = localStorage.getItem('wellonik_onboarding_draft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_FORM_DATA, ...parsed, isSubmitted: false };
      } catch (e) {
        return INITIAL_FORM_DATA;
      }
    }
    return INITIAL_FORM_DATA;
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [autoSaveToast, setAutoSaveToast] = useState(false);
  const [manualSaveToast, setManualSaveToast] = useState(false);
  const [draftDetected, setDraftDetected] = useState(false);
  const [viewingReport, setViewingReport] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Trigger search jump targets
  const [searchResults, setSearchResults] = useState<{ label: string; step: number; targetId: string }[]>([]);

  // Monitor document theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Check draft existence on load
  useEffect(() => {
    const saved = localStorage.getItem('wellonik_onboarding_draft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Only notify if some actual name exists
        if (parsed.brandName || parsed.businessName || parsed.contactPersonName) {
          setDraftDetected(true);
        }
      } catch (e) {}
    }
  }, []);

  // 30-Second Auto Save logic
  useEffect(() => {
    const timer = setInterval(() => {
      saveDraftToLocalStorage(true);
    }, 30000);

    return () => clearInterval(timer);
  }, [formData]);

  const saveDraftToLocalStorage = (isAuto: boolean = false) => {
    const payload = {
      ...formData,
      lastSavedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    localStorage.setItem('wellonik_onboarding_draft', JSON.stringify(payload));
    setFormData(payload);
    
    if (isAuto) {
      setAutoSaveToast(true);
      setTimeout(() => setAutoSaveToast(false), 3000);
    } else {
      setManualSaveToast(true);
      setTimeout(() => setManualSaveToast(false), 3000);
    }
  };

  const clearDraftValues = () => {
    if (window.confirm('Are you sure you want to clear your onboarding progress? This will reset all form values.')) {
      localStorage.removeItem('wellonik_onboarding_draft');
      setFormData(INITIAL_FORM_DATA);
      setCurrentStep(1);
      setViewingReport(false);
    }
  };

  const handleRestoreDraft = () => {
    setDraftDetected(false);
    // Already set in state initializer, so send a friendly confirm message
  };

  const updateField = (field: keyof WellonikFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedField = (parentField: keyof WellonikFormData, childField: string, value: any) => {
    setFormData((prev) => {
      const parentVal = { ...(prev[parentField] as object), [childField]: value };
      return {
        ...prev,
        [parentField]: parentVal
      };
    });
  };

  // Search Jump Target dictionary
  const searchDictionary = [
    { keys: ['business name', 'company', 'legal entity', 'incorporation'], step: 1, label: 'Company Entity Profile', id: 'businessName' },
    { keys: ['brand name', 'trade name', 'logo font'], step: 1, label: 'Brand & Slogan Name', id: 'brandName' },
    { keys: ['email', 'mobile', 'whatsapp', 'phone', 'contact person'], step: 1, label: 'Contact Coordinates', id: 'contactPersonName' },
    { keys: ['vision', 'statement', 'mission', 'backstory', 'purpose'], step: 1, label: 'Company Vision & Statements', id: 'vision' },
    { keys: ['website', 'site url', 'domain'], step: 1, label: 'Website Address Link', id: 'website' },
    { keys: ['facebook', 'instagram', 'linkedin', 'youtube', 'social media', 'google map'], step: 1, label: 'Social Media Profiles', id: 'sm-facebook' },

    { keys: ['primary product', 'key service', 'offerings', 'pricing range'], step: 2, label: 'Core Products & Packages', id: 'primaryProductService' },
    { keys: ['usp', 'different', 'why choose us', 'strongest advantage'], step: 2, label: 'Unique Selling Propositions (USP)', id: 'uspDifference' },
    { keys: ['retail price', 'wholesale price', 'bulk discounts'], step: 2, label: 'Pricing Criteria Matrix', id: 'pricingRetail' },
    { keys: ['certifications', 'iso', 'fssai', 'igi', 'gmp', 'credentials'], step: 2, label: 'Credentials & Certifications', id: 'tag-certs' },
    { keys: ['upload images', 'video catalog', 'brochure pdf'], step: 2, label: 'Media and Brochure Assets', id: 'upload-assets' },

    { keys: ['ideal customer', 'avatar', 'demographics'], step: 3, label: 'Audience Persona Profile', id: 'targetAudienceIdeal' },
    { keys: ['locations', 'cities', 'states', 'countries targeting'], step: 3, label: 'Geographic Target Areas', id: 'tag-target-loc' },
    { keys: ['interests', 'tags', 'hobbies'], step: 3, label: 'Target Audience Interests', id: 'tag-interests' },
    { keys: ['pain points', 'discomforts', 'friction'], step: 3, label: 'Target Pain Points & Fears', id: 'audiencePainPoints' },

    { keys: ['acquisition', 'find us', 'google search', 'referral'], step: 4, label: 'Conversion Discovery Channels', id: 'how-find-us' },
    { keys: ['buying priority', 'price', 'quality', 'trust ranking'], step: 4, label: 'Interactive Decision Priorities', id: 'priority-ranking-section' },
    { keys: ['frequency', 'seasonal trends', 'sales cycle peak'], step: 4, label: 'Customer Buying Cycles', id: 'purchaseFrequency' },

    { keys: ['objectives', 'awareness', 'lead generation', 'store visits', 'traffic'], step: 5, label: 'Primary Sourcing Objectives', id: 'objectives-grid' },
    { keys: ['budget', 'price range', 'ad budget', 'investment scale'], step: 5, label: 'Monthly Advertising Budget', id: 'budget-slider' },
    { keys: ['roi', 'timeline', 'campaign dates'], step: 5, label: 'Timeline & Multiple Target ROAS', id: 'campaignTimelineStart' },
    { keys: ['offers', 'coupons', 'promotional deals'], step: 5, label: 'Promotional Offer Models', id: 'offers-list' },

    { keys: ['competitor url', 'competitors names', 'competitor link'], step: 6, label: 'Competitor Digital Profiles', id: 'competitors-profiles' },
    { keys: ['swot matrix', 'strengths', 'weaknesses', 'opportunities', 'threats'], step: 6, label: 'Venture SWOT Audit', id: 'swotStrengths' },

    { keys: ['past ads', 'budget history', 'meta google linkedIn experience'], step: 7, label: 'Ad Campaign History Audit', id: 'metaAdsExperience' },
    { keys: ['previous reports', 'barriers', 'spent history'], step: 7, label: 'Past Campaign PDFs & Lessons', id: 'upload-reports' },

    { keys: ['personality', 'premium luxury', 'traditional', 'innovative styling'], step: 8, label: 'Brand Persona & Visual Voice', id: 'brand-personality-grid' },
    { keys: ['color picker', 'hex color palette', 'hex code'], step: 8, label: 'Primary Brand Color Palette', id: 'brand-colors-palette' },
    { keys: ['reels', 'testimonials', 'format videos', 'educational posts'], step: 8, label: 'Creative Media Formats', id: 'content-types-checkboxes' },

    { keys: ['lead managers', 'who handles', 'sales callers'], step: 9, label: 'Lead Sourcing Responders', id: 'whoHandlesLeads' },
    { keys: ['crm', 'hubspot', 'zoho', 'salesforce'], step: 9, label: 'Core Sales CRM Platform', id: 'crmUsed' },

    { keys: ['12 months', 'future outlook', 'expansion cities', 'advisory notes'], step: 10, label: '12-Month Expansion Roadmap', id: 'whereBusinessIn12Months' }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (!query) {
      setSearchResults([]);
      return;
    }

    const matches = searchDictionary.filter(item => 
      item.keys.some(key => key.includes(query)) || item.label.toLowerCase().includes(query)
    );
    setSearchResults(matches);
  };

  const executeJump = (step: number, targetId: string) => {
    setCurrentStep(step);
    setSearchQuery('');
    setSearchResults([]);
    setSidebarOpen(false);
    
    // Smooth scroll attention target focus
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.focus?.();
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('ring-2', 'ring-amber-500', 'animate-pulse');
        setTimeout(() => {
          element.classList.remove('ring-2', 'ring-amber-500', 'animate-pulse');
        }, 2000);
      }
    }, 350);
  };

  // Completion scoring engine
  const calculateScore = () => {
    const weights: { key: keyof WellonikFormData; label: string }[] = [
      { key: 'businessName', label: 'Company Name' },
      { key: 'brandName', label: 'Brand Name' },
      { key: 'contactPersonName', label: 'Contact Person' },
      { key: 'mobileNumber', label: 'Mobile Number' },
      { key: 'emailAddress', label: 'Email Address' },
      { key: 'primaryProductService', label: 'Primary Product' },
      { key: 'targetAudienceIdeal', label: 'Ideal Target Audience' },
      { key: 'companyDescription', label: 'Elevator Business Pitch' },
      { key: 'whereBusinessIn12Months', label: '12-Month Vision Statement' }
    ];

    let filled = 0;
    weights.forEach(w => {
      if (formData[w.key] && String(formData[w.key]).trim().length > 0) {
        filled++;
      }
    });

    const scorePercent = Math.round((filled / weights.length) * 100);
    return {
      score: scorePercent,
      filledCount: filled,
      totalWeight: weights.length,
      motivation: scorePercent === 100 
        ? 'Perfect! Complete details acquired.'
        : scorePercent >= 70
        ? 'Looking fantastic, just a few fields remain!'
        : scorePercent >= 40
        ? 'Excellent progress. Help Wellonik grasp your goals!'
        : 'Begin by filling basic contact details.'
    };
  };

  const stats = calculateScore();

  // Validate current step before advancing
  const isStepValid = () => {
    if (currentStep === 1) {
      return (
        formData.businessName.trim().length > 0 &&
        formData.brandName.trim().length > 0 &&
        formData.contactPersonName.trim().length > 0 &&
        formData.mobileNumber.trim().length > 0 &&
        formData.emailAddress.trim().length > 0
      );
    }
    if (currentStep === 2) {
      return formData.primaryProductService.trim().length > 0;
    }
    if (currentStep === 3) {
      return formData.targetAudienceIdeal.trim().length > 0;
    }
    if (currentStep === 10) {
      return formData.whereBusinessIn12Months.trim().length > 0;
    }
    return true;
  };

  const handleNext = () => {
    if (!isStepValid()) {
      alert('Kindly complete all required fields (indicated by red asterisks) before proceeding.');
      return;
    }
    if (currentStep < 10) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final wizard submit
      setViewingReport(true);
      updateField('isSubmitted', true);
      saveDraftToLocalStorage(false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const downloadJSONData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", `wellonik_onboarding_${formData.brandName || 'draft'}.json`);
    dlAnchorElem.click();
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-250 ${theme === 'dark' ? 'dark' : ''} selection:bg-[#D4A437]/20`}>
      
      {/* Draft Found Modal Overlay */}
      {draftDetected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-xl relative animate-scaleUp">
            <div className="p-3 bg-amber-500/15 rounded-full text-[#D4A437] w-fit mb-4">
              <RefreshCw className="w-6 h-6 animate-spin-slow" />
            </div>
            <h3 className="text-base font-bold text-slate-850 dark:text-white">Continuous Draft Detected</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              We parsed an active onboarding draft for <strong className="text-slate-800 dark:text-white">"{formData.brandName || formData.businessName || 'Your Brand'}"</strong> compiled from your previous session.
            </p>
            <div className="flex gap-2.5 mt-5">
              <button
                onClick={() => {
                  setFormData(INITIAL_FORM_DATA);
                  localStorage.removeItem('wellonik_onboarding_draft');
                  setDraftDetected(false);
                }}
                className="flex-1 px-4 py-2 text-xs font-semibold text-red-650 hover:bg-red-500/10 dark:text-red-400 border border-transparent rounded-lg transition"
              >
                Clear, Start New
              </button>
              <button
                onClick={handleRestoreDraft}
                className="flex-1 px-4 py-2 text-xs font-semibold bg-[#D4A437] hover:bg-[#bfa032] text-white rounded-lg transition shadow-sm"
              >
                Restore Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Auto-save Banners */}
      <div className="fixed bottom-4 right-4 z-40 space-y-2 pointer-events-none print:hidden">
        <AnimatePresence>
          {autoSaveToast && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-900/95 dark:bg-slate-800 text-slate-100 rounded-xl shadow-lg border border-slate-800 dark:border-slate-700 text-xs font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#D4A437] animate-spin" />
              <span>Autosaved draft progress securely</span>
            </motion.div>
          )}

          {manualSaveToast && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-emerald-950/95 text-emerald-300 rounded-xl shadow-lg border border-emerald-900 text-xs font-medium"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Session draft saved successfully</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Core Top Nav */}
      <header className="sticky top-0 z-30 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-100 dark:border-slate-850/80 px-4 sm:px-6 py-3.5 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-2.5">
          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 text-slate-500 hover:text-slate-850 rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-slate-900 dark:text-white font-extrabold text-base tracking-wider uppercase font-sans">Wellonik</span>
              <span className="text-[9px] font-bold text-[#D4A437] tracking-widest uppercase">Design Studio</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">B2B client Discovery Portal</p>
          </div>
        </div>

        {/* Global Toolbar and Search Jumper */}
        <div className="flex items-center gap-2">
          
          {/* Search bar widget */}
          <div className="relative hidden sm:block w-52 md:w-64 max-w-xs select-none">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search or jump to fields..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-slate-205 placeholder-slate-400 focus:outline-none focus:ring-1.5 focus:ring-[#D4A437] transition font-sans"
            />
            
            {/* Search Dropdown matches */}
            {searchResults.length > 0 && (
              <div className="absolute right-0 top-11 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg w-72 max-h-60 overflow-y-auto p-1.5 z-50 text-xs">
                <span className="block text-[10px] font-bold text-slate-400 uppercase p-2 tracking-wider">Search Jump Targets</span>
                {searchResults.map((match) => (
                  <button
                    key={`${match.step}-${match.targetId}`}
                    onClick={() => executeJump(match.step, match.targetId)}
                    className="w-full text-left p-2 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-lg transition flex justify-between items-center"
                  >
                    <span className="font-medium text-slate-800 dark:text-slate-200">{match.label}</span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/10 text-amber-700 dark:text-[#D4A437] rounded font-bold uppercase shrink-0">Step {match.step}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white rounded-lg transition-colors"
            title="Toggle theme (Light / Dark)"
            aria-label="Toggle visual theme preference"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Download Draft button */}
          <button
            type="button"
            onClick={() => saveDraftToLocalStorage(false)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-705 dark:bg-slate-950/40 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg text-xs font-semibold transition border border-slate-200 dark:border-slate-800"
            title="Saves a snapshot of raw data back home"
          >
            <Save className="w-3.5 h-3.5 text-[#D4A437]" />
            <span>Save Draft</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Toggle Report Panel */}
        {viewingReport ? (
          <div className="animate-fadeIn">
            
            {/* Submission Successful Card Header */}
            {formData.isSubmitted && (
              <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent border border-emerald-500/20 p-5 rounded-2xl mb-6 text-center select-none">
                <div className="inline-flex p-3 bg-emerald-500/15 rounded-full text-emerald-600 mb-3 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-lg font-black text-slate-850 dark:text-white">Submission Complete!</h2>
                <p className="text-xs text-slate-500 dark:text-slate-300 mt-1 max-w-xl mx-auto">
                  Thank you for completing your **Wellonik Business Discovery Form**. Your marketing profiles are registered. You may now print a beautiful PDF summary file or download the structured JSON schema for validation.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setViewingReport(false);
                    updateField('isSubmitted', false);
                  }}
                  className="mt-4 px-4 py-2 bg-slate-850 text-white hover:bg-slate-900 dark:bg-slate-800 text-xs font-bold rounded-xl transition duration-150"
                >
                  Edit Submissions
                </button>
              </div>
            )}

            <PrintSummary
              formData={formData}
              onBack={() => setViewingReport(false)}
              onDownloadJSON={downloadJSONData}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            
            {/* Sidebar Navigator */}
            <aside className={`lg:col-span-1 border border-slate-200/60 dark:border-slate-850/60 rounded-2xl bg-white/70 dark:bg-slate-900/40 p-4 space-y-4 backdrop-blur-md sticky top-20 select-none ${
              sidebarOpen ? 'fixed inset-0 z-40 bg-white dark:bg-slate-950 max-w-sm border-r flex flex-col justify-start overflow-y-auto' : 'hidden lg:block'
            }`}>
              
              {/* Sidebar Header for Mobile */}
              <div className="flex items-center justify-between lg:hidden border-b pb-3 mb-2">
                <div className="font-bold text-slate-850 dark:text-white">Form Chapters</div>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Dial Panel */}
              <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 dark:bg-slate-950/20 dark:border-slate-850 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-500 dark:text-slate-400">Campaign Profile Score</span>
                  <span className="font-mono font-black text-[#D4A437]">{stats.score}%</span>
                </div>
                
                {/* Horizontal Progress Bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#D4A437] h-full rounded-full transition-all duration-300"
                    style={{ width: `${stats.score}%` }}
                  />
                </div>
                
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">"{stats.motivation}"</p>
              </div>

              {/* Search jumper for mobile drawer */}
              <div className="relative sm:hidden block w-full select-none">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Type field name..."
                  className="w-full pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-slate-950/40 border border-[#D4A437]/20 rounded-lg text-xs text-slate-800 dark:text-slate-205 placeholder-slate-400 focus:outline-none focus:ring-1.5 focus:ring-[#D4A437] transition font-sans"
                />
                
                {searchResults.length > 0 && (
                  <div className="absolute left-0 top-11 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg w-full max-h-60 overflow-y-auto p-1.5 z-50 text-xs">
                    {searchResults.map((match) => (
                      <button
                        key={`${match.step}-${match.targetId}`}
                        onClick={() => executeJump(match.step, match.targetId)}
                        className="w-full text-left p-2 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-lg transition flex justify-between items-center"
                      >
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{match.label}</span>
                        <span className="text-[10px] px-1 bg-amber-500/10 text-[#D4A437] rounded font-bold shrink-0">Step {match.step}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Step Navigation Cards */}
              <nav aria-label="Step navigation channels" className="space-y-1">
                {FORM_STEPS.map((stepItem) => {
                  const isActive = currentStep === stepItem.id;
                  const isFinished = currentStep > stepItem.id || (stats.score > 70 && stepItem.id < currentStep);
                  return (
                    <button
                      key={stepItem.id}
                      onClick={() => {
                        setCurrentStep(stepItem.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl transition flex items-start gap-2.5 group ${
                        isActive
                          ? 'bg-[#D4A437]/10 border border-[#D4A437]/20 text-slate-900 dark:text-white font-semibold'
                          : 'hover:bg-slate-100/60 dark:hover:bg-slate-900/60 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold mt-0.5 shrink-0 ${
                        isActive
                          ? 'bg-[#D4A437] text-white'
                          : isFinished
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-[#D4A437]/20 group-hover:text-[#D4A437] transition'
                      }`}>
                        {isFinished ? '✓' : stepItem.id}
                      </div>

                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-semibold truncate transition-colors group-hover:text-slate-850 dark:group-hover:text-white">{stepItem.title}</span>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 truncate mt-0.5">{stepItem.description}</span>
                      </div>
                    </button>
                  );
                })}
              </nav>

              {/* Danger actions */}
              <div className="border-t border-slate-100 dark:border-slate-850 pt-3">
                <button
                  type="button"
                  onClick={clearDraftValues}
                  className="w-full p-2 hover:bg-red-500/10 text-red-650 hover:text-red-700 dark:text-red-400 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset & Erase Draft</span>
                </button>
              </div>

            </aside>

            {/* Main Form Canvas Card */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Header Step Label Block */}
              <div className="bg-white/80 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 dark:text-white backdrop-blur-md">
                <div>
                  <span className="inline-block px-2.5 py-1 bg-amber-500/10 text-[#D4A437] rounded-md text-[10px] font-bold uppercase tracking-widest font-sans">Chapter {currentStep} of 10</span>
                  <h3 className="text-lg font-black text-slate-850 dark:text-white mt-1.5">{FORM_STEPS[currentStep - 1].title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{FORM_STEPS[currentStep - 1].description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setViewingReport(true)}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 dark:bg-slate-950/20 dark:text-slate-300 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Live Preview Report</span>
                  </button>
                </div>
              </div>

              {/* Dynamic steps body */}
              <div className="bg-white dark:bg-slate-900/50 border border-slate-150 dark:border-slate-800 p-6 rounded-2xl shadow-sm backdrop-blur-md min-h-[400px]">
                <OnboardingSteps
                  step={currentStep}
                  formData={formData}
                  updateField={updateField}
                  updateNestedField={updateNestedField}
                />
              </div>

              {/* Wizard Bottom navigation */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  disabled={currentStep === 1}
                  onClick={handlePrev}
                  className={`px-4 py-2.5 text-xs font-semibold border rounded-xl flex items-center gap-1 transition ${
                    currentStep === 1
                      ? 'border-slate-200 text-slate-300 dark:border-slate-850 dark:text-slate-700 cursor-not-allowed'
                      : 'border-slate-300 text-slate-705 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-350 dark:hover:bg-slate-850 hover:border-slate-400'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" /> Prior Step
                </button>

                <div className="flex items-center gap-2">
                  {/* Status Indicator */}
                  <span className="hidden sm:inline text-[10px] text-slate-400 font-mono">Auto-saved hourly locally</span>
                  
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-5 py-2.5 bg-[#D4A437] hover:bg-[#bfa032] text-white font-bold rounded-xl text-xs flex items-center gap-1 transition shadow-sm hover:shadow active:scale-95"
                  >
                    {currentStep === 10 ? (
                      <>
                        <Sparkles className="w-4 h-4" /> Compile & Submit Discoveries
                      </>
                    ) : (
                      <>
                        Following Step <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

    </div>
  );
}
