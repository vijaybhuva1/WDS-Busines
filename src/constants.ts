import { WellonikFormData, FormStep } from './types';

export const FORM_STEPS: FormStep[] = [
  { id: 1, title: 'Business Profile', description: 'Company essentials, contacts & vision' },
  { id: 2, title: 'Pitch & Products', description: 'Offerings, pricing, USPs & credentials' },
  { id: 3, title: 'Target Audience', description: 'Customer demographics & preferred channels' },
  { id: 4, title: 'Customer Path', description: 'Buying behaviors & priority decision factors' },
  { id: 5, title: 'Growth Targets', description: 'Marketing objectives, budget & expectations' },
  { id: 6, title: 'Competitor Intel', description: 'Competitor links, SWOT audit & comparison' },
  { id: 7, title: 'Previous Marketing', description: 'Past advertising budgets, performance & lessons' },
  { id: 8, title: 'Brand styling', description: 'Color scheme, content style & voice preferences' },
  { id: 9, title: 'Lead Pipeline', description: 'CRM systems, responders & follow-up processes' },
  { id: 10, title: '12-Month Vision', description: 'Revenue targets, product expansions & notes' },
];

export const BUYING_DECISION_ITEMS = [
  'Price',
  'Quality',
  'Brand',
  'Trust',
  'Certification',
  'Delivery Speed',
  'Customer Support'
];

export const INITIAL_FORM_DATA: WellonikFormData = {
  // Step 1: Business Information
  businessName: '',
  brandName: '',
  contactPersonName: '',
  designation: '',
  mobileNumber: '',
  whatsAppNumber: '',
  emailAddress: '',
  website: '',
  businessAddress: '',
  manufacturingAddress: '',
  establishmentYear: '',
  industryCategory: '',
  employeeCount: '',
  serviceLocations: '',
  socialMedia: {
    facebook: '',
    instagram: '',
    linkedIn: '',
    youTube: '',
    googleProfile: '',
  },
  companyDescription: '',
  whatCompanyDoes: '',
  whyWasItStarted: '',
  vision: '',
  mission: '',

  // Step 2: Product & Service Information
  primaryProductService: '',
  secondaryProducts: '',
  productCategories: '',
  usp: {
    difference: '',
    whyChooseUs: '',
    strongestAdvantages: '',
  },
  pricing: {
    retail: '',
    wholesale: '',
    bulk: '',
  },
  productFeatures: [],
  productBenefits: [],
  certifications: [],
  productAssets: [],

  // Step 3: Target Audience
  targetAudienceIdeal: '',
  customerType: 'Both',
  audienceAgeRange: ['25-34', '35-44'],
  audienceGender: 'All Genders',
  audienceIncomeLevel: 'Middle to High Income',
  audienceOccupation: ['Professionals', 'Business Owners'],
  audienceEducation: '',
  audienceMaritalStatus: '',
  targetLocations: [],
  audienceInterests: [],
  preferredPlatforms: ['Facebook', 'Instagram', 'WhatsApp'],
  audiencePainPoints: '',
  audienceBuyingMotivations: '',

  // Step 4: Customer Behavior
  howCustomersFindUs: [],
  buyingDecisionRanking: [...BUYING_DECISION_ITEMS],
  purchaseFrequency: 'Monthly',
  seasonalSalesTrends: '',
  salesCycle: '1 to 2 weeks',

  // Step 5: Marketing Goals
  primaryObjectives: ['Lead Generation'],
  monthlyLeadTarget: '',
  expectedRevenueTarget: '',
  monthlyAdBudget: 50000,
  expectedROI: '',
  offersAndPromotions: [],
  campaignTimelineStart: '',
  campaignTimelineEnd: '',

  // Step 6: Competitor Research
  competitors: [],
  whatCompetitorsDoWell: '',
  competitorWeaknesses: '',
  outperformCompetitors: '',
  swot: {
    strengths: '',
    weaknesses: '',
    opportunities: '',
    threats: '',
  },

  // Step 7: Previous Marketing Experience
  hasRunAdsBefore: false,
  adsExperience: {
    metaAds: '',
    googleAds: '',
    linkedInAds: '',
  },
  previousBudget: '',
  bestResultsAchieved: '',
  challengesFaced: '',
  lessonsLearned: '',
  previousReports: [],

  // Step 8: Branding Preferences
  brandPersonality: ['Premium', 'Professional'],
  brandColors: ['#D4A437', '#111827'],
  preferredContentTypes: ['Reels', 'Product Posts', 'Testimonials'],
  languagePreference: ['English'],
  referenceBrands: [],
  brandAssets: [],

  // Step 9: Lead Handling Process
  whoHandlesLeads: 'In-house sales team',
  leadManagerName: '',
  leadResponseTime: 'Within 1 hour',
  leadSources: [],
  salesProcessDescription: '',
  crmUsed: 'None',

  // Step 10: Final Business Goals
  whereBusinessIn12Months: '',
  revenueGoals12Months: '',
  expansionPlans: {
    newProducts: '',
    newCities: '',
    newCountries: '',
  },
  additionalNotes: '',

  isSubmitted: false,
  lastSavedAt: '',
};

export const INDUSTRY_CATEGORIES = [
  'E-commerce & Retail',
  'Fashion & Apparel',
  'Real Estate',
  'Health & Wellness',
  'Beauty & Cosmetics',
  'Food & Beverages',
  'Education & EdTech',
  'B2B Manufacturing & Industrial',
  'Finance & Insurance',
  'Travel & Hospitality',
  'Technology & Software (SaaS)',
  'Professional Services (Legal, Consulting)',
  'Jewelry & Luxury Goods',
  'Healthcare & Medical Devices',
  'Automotive',
  'Other'
];

export const EMPLOYEE_COUNT_OPTIONS = [
  '1-5 (Micro Team)',
  '6-20 (Small Team)',
  '21-50 (Growing Enterprise)',
  '51-200 (Medium Enterprise)',
  '201+ (Large Enterprise)'
];

export const AGE_RANGE_OPTIONS = [
  'Under 18',
  '18-24',
  '25-34',
  '35-44',
  '45-54',
  '55-64',
  '65+'
];

export const PREFERRED_PLATFORMS_OPTIONS = [
  'Facebook',
  'Instagram',
  'LinkedIn',
  'YouTube',
  'Google',
  'WhatsApp',
  'Pinterest',
  'X (formerly Twitter)',
  'Threads'
];

export const FIND_US_OPTIONS = [
  'Google Search',
  'Facebook',
  'Instagram',
  'WhatsApp',
  'Referral',
  'Exhibition',
  'Trade Show',
  'Offline Marketing',
  'Offline Store walk-ins'
];

export const PURCHASE_FREQUENCY_OPTIONS = [
  'Daily',
  'Weekly',
  'Monthly',
  'Quarterly',
  'A few times a year',
  'One-time purchase'
];

export const SALES_CYCLE_OPTIONS = [
  'Immediate (Impulse buy)',
  '1 to 3 days',
  '1 to 2 weeks',
  '2 to 4 weeks',
  '1 to 3 months',
  '3 to 6 months',
  '6+ months'
];

export const MARKETING_OBJECTIVES_OPTIONS = [
  'Brand Awareness',
  'Lead Generation',
  'Website Traffic',
  'WhatsApp Leads',
  'Sales',
  'Store Visits',
  'App Installs',
  'Community Building'
];

export const BRAND_PERSONALITIES = [
  'Premium',
  'Luxury',
  'Professional',
  'Innovative',
  'Friendly',
  'Traditional',
  'Bold & Edgy',
  'Playful & Fun',
  'Eco-Friendly & Sustainable',
  'Minimalist & Modern'
];

export const CONTENT_TYPES_OPTIONS = [
  'Reels',
  'Videos',
  'Educational Posts',
  'Testimonials',
  'Product Posts',
  'Behind The Scenes',
  'Carousels & Infographics',
  'Memes & Humorous Posts',
  'Live Sessions'
];

export const LANGUAGES_OPTIONS = [
  'English',
  'Hindi',
  'Gujarati',
  'Marathi',
  'Tamil',
  'Telugu',
  'Bengali',
  'Multiple Languages'
];

export const RESPONSE_TIME_OPTIONS = [
  'Under 15 minutes',
  'Within 1 hour',
  'Within 4 hours',
  'Same day',
  'Within 24 hours',
  'More than 24 hours'
];

export const CRM_OPTIONS = [
  'HubSpot',
  'Zoho',
  'Salesforce',
  'Bitrix24',
  'LeadSquared',
  'None',
  'Other'
];
