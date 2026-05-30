export interface Competitor {
  id: string;
  name: string;
  website: string;
  socialLinks: string;
}

export type CustomerType = 'B2B' | 'B2C' | 'Both';

export type LeadResponseTime = 'Under 15 minutes' | 'Within 1 hour' | 'Within 4 hours' | 'Same day' | 'Within 24 hours' | 'More than 24 hours';

export type CRMType = 'HubSpot' | 'Zoho' | 'Salesforce' | 'None' | 'Other';

export interface OfferAndPromotion {
  id: string;
  title: string;
  details: string;
}

export interface MockFile {
  id: string;
  name: string;
  size: string;
  type: string;
}

export interface WellonikFormData {
  // Step 1: Business Information
  businessName: string;
  brandName: string;
  contactPersonName: string;
  designation: string;
  mobileNumber: string;
  whatsAppNumber: string;
  emailAddress: string;
  website: string;
  businessAddress: string;
  manufacturingAddress: string;
  establishmentYear: string;
  industryCategory: string;
  employeeCount: string;
  serviceLocations: string;
  
  socialMedia: {
    facebook: string;
    instagram: string;
    linkedIn: string;
    youTube: string;
    googleProfile: string;
  };
  
  companyDescription: string;
  whatCompanyDoes: string;
  whyWasItStarted: string;
  vision: string;
  mission: string;

  // Step 2: Product & Service Information
  primaryProductService: string;
  secondaryProducts: string;
  productCategories: string;
  usp: {
    difference: string;
    whyChooseUs: string;
    strongestAdvantages: string;
  };
  pricing: {
    retail: string;
    wholesale: string;
    bulk: string;
  };
  productFeatures: string[];
  productBenefits: string[];
  certifications: string[];  // ISO, IGI, GMP, FSSAI, etc.
  productAssets: MockFile[]; // Product images, videos, catalog PDF metadata

  // Step 3: Target Audience
  targetAudienceIdeal: string;
  customerType: CustomerType;
  audienceAgeRange: string[]; // multi-select/tags
  audienceGender: string;
  audienceIncomeLevel: string;
  audienceOccupation: string[];
  audienceEducation: string;
  audienceMaritalStatus: string;
  targetLocations: string[]; // multi-select/tag list
  audienceInterests: string[]; // tag input
  preferredPlatforms: string[]; // Facebook, Instagram, etc.
  audiencePainPoints: string;
  audienceBuyingMotivations: string;

  // Step 4: Customer Behavior
  howCustomersFindUs: string[]; // checkboxes
  buyingDecisionRanking: string[]; // drag & drop list: Price, Quality, Brand, Trust, Certification, Delivery Speed, Customer Support
  purchaseFrequency: string;
  seasonalSalesTrends: string;
  salesCycle: string;

  // Step 5: Marketing Goals
  primaryObjectives: string[]; // Brand Awareness, Lead Gen, etc.
  monthlyLeadTarget: string;
  expectedRevenueTarget: string;
  monthlyAdBudget: number; // slider ₹10,000 to ₹5,00,000
  expectedROI: string;
  offersAndPromotions: OfferAndPromotion[];
  campaignTimelineStart: string;
  campaignTimelineEnd: string;

  // Step 6: Competitor Research
  competitors: Competitor[];
  whatCompetitorsDoWell: string;
  competitorWeaknesses: string;
  outperformCompetitors: string;
  swot: {
    strengths: string;
    weaknesses: string;
    opportunities: string;
    threats: string;
  };

  // Step 7: Previous Marketing Experience
  hasRunAdsBefore: boolean;
  adsExperience: {
    metaAds: string;
    googleAds: string;
    linkedInAds: string;
  };
  previousBudget: string;
  bestResultsAchieved: string;
  challengesFaced: string;
  lessonsLearned: string;
  previousReports: MockFile[];

  // Step 8: Branding Preferences
  brandPersonality: string[]; // Premium, Luxury, Professional, Innovative, Friendly, Traditional
  brandColors: string[]; // Color list (hex inputs)
  preferredContentTypes: string[]; // Reels, Videos, Educational, Testimonials, Product, Behind scenes
  languagePreference: string[]; // English, Hindi, Gujarati, Multiple
  referenceBrands: string[]; // Multi list
  brandAssets: MockFile[];

  // Step 9: Lead Handling Process
  whoHandlesLeads: string;
  leadManagerName: string;
  leadResponseTime: LeadResponseTime | '';
  leadSources: string[];
  salesProcessDescription: string;
  crmUsed: CRMType | '';

  // Step 10: Final Business Goals
  whereBusinessIn12Months: string;
  revenueGoals12Months: string;
  expansionPlans: {
    newProducts: string;
    newCities: string;
    newCountries: string;
  };
  additionalNotes: string;

  // Metadata
  isSubmitted: boolean;
  lastSavedAt: string;
}

export interface FormStep {
  id: number;
  title: string;
  description: string;
}
