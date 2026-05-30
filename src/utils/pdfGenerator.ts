import { jsPDF } from 'jspdf';
import { WellonikFormData, Competitor, OfferAndPromotion, MockFile } from '../types';

/**
 * Generates a comprehensive, highly styled vector PDF report of all 10 chapters
 * of the Wellonik Client Discovery Profile and downloads it directly to the browser.
 */
export const generateBusinessProfilePDF = (formData: WellonikFormData) => {
  // Create jsPDF in portrait A4 mode, dimensions in millimeters (210 x 297)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 15;
  const printWidth = pageWidth - (marginX * 2); // 180mm
  let currentY = 20;

  // Helper check for empty fields
  const getVal = (val: string | number | undefined | null): string => {
    if (val === undefined || val === null || String(val).trim() === '') {
      return 'Not specified';
    }
    return String(val);
  };

  const getArrayVal = (arr: string[] | undefined | null): string => {
    if (!arr || arr.length === 0) {
      return 'None specified';
    }
    return arr.join(', ');
  };

  // Safe page transition tracking
  const ensureSpace = (heightNeeded: number) => {
    if (currentY + heightNeeded > pageHeight - 25) {
      doc.addPage();
      currentY = 20; // reset with padding from top margin
      drawPageBorder();
    }
  };

  const drawPageBorder = () => {
    // Subtle framing for elegant PDF presentation
    doc.setDrawColor(212, 164, 55); // Wellonik Gold #D4A437
    doc.setLineWidth(0.4);
    doc.rect(marginX - 5, 10, printWidth + 10, pageHeight - 20);
  };

  // Draw initial cover page border
  drawPageBorder();

  // COVER PAGE BRAND ELEMENT
  doc.setFillColor(212, 164, 55); // Golden background header accent
  doc.rect(marginX - 5, 10, printWidth + 10, 35, 'F');

  // Title Text inside Golden Header Bar
  doc.setTextColor(255, 255, 255);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('WELLONIK DESIGN STUDIO', marginX, 23);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('MASTER CLIENT ONBOARDING & DISCOVERY PROFILE', marginX, 33);

  doc.setTextColor(30, 41, 59); // Slate secondary text color
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(15);
  currentY = 60;
  
  doc.text('Dossier: Business Profile Report', marginX, currentY);
  currentY += 8;

  doc.setFontSize(10);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('A comprehensive strategic operational blueprint and brand evaluation dossier.', marginX, currentY);
  currentY += 12;

  // Key Quick Facts Box
  ensureSpace(45);
  doc.setFillColor(248, 250, 252); // Light background grey slate-50
  doc.rect(marginX, currentY, printWidth, 38, 'F');
  doc.setDrawColor(226, 232, 240); // Soft grey border
  doc.setLineWidth(0.3);
  doc.rect(marginX, currentY, printWidth, 38);

  // Quick Facts Title
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(212, 164, 55); // Gold
  doc.setFontSize(9);
  doc.text('REPORT IDENTIFIERS & METADATA', marginX + 5, currentY + 6);

  // Quick Facts Fields
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);

  const brandName = getVal(formData.brandName || formData.businessName);
  const contactName = getVal(formData.contactPersonName);
  const updatedDate = formData.lastSavedAt || new Date().toLocaleString();

  doc.text(`Active Brand Name: ${brandName}`, marginX + 5, currentY + 14);
  doc.text(`Contact Representative: ${contactName}`, marginX + 5, currentY + 20);
  doc.text(`Entity Legality: ${getVal(formData.businessName)}`, marginX + 5, currentY + 26);
  doc.text(`Dossier Status: VERIFIED DISCOVERY COMPLETED`, marginX + 5, currentY + 32);

  // Right alignment metadata inside the facts box
  doc.text(`Industry Category: ${getVal(formData.industryCategory)}`, marginX + 90, currentY + 14);
  doc.text(`Service Locations: ${getVal(formData.serviceLocations)}`, marginX + 90, currentY + 20);
  doc.text(`Generated Date: ${updatedDate}`, marginX + 90, currentY + 26);
  doc.text(`Database System: Local & Remote Sync`, marginX + 90, currentY + 32);

  currentY += 48;

  // Multi-line paragraph writer helper
  const drawSectionParagraph = (title: string, value: string) => {
    const lines = doc.splitTextToSize(value, printWidth - 8);
    const boxHeight = (lines.length * 5) + 12;
    ensureSpace(boxHeight);

    doc.setFillColor(252, 251, 247); // Light gold tint background
    doc.rect(marginX, currentY, printWidth, boxHeight, 'F');
    doc.setDrawColor(212, 164, 55, 0.2); // Soft gold boundary
    doc.setLineWidth(0.25);
    doc.rect(marginX, currentY, printWidth, boxHeight);

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(212, 164, 55);
    doc.text(title.toUpperCase(), marginX + 4, currentY + 6);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    doc.text(lines, marginX + 4, currentY + 12);
    
    currentY += boxHeight + 4;
  };

  // Single Chapter Label helper
  const drawChapterHeader = (num: number, title: string) => {
    ensureSpace(20);
    // Draw horizontal separator line
    doc.setDrawColor(212, 164, 55);
    doc.setLineWidth(0.6);
    doc.line(marginX, currentY, marginX + printWidth, currentY);

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(212, 164, 55);
    doc.text(`CHAPTER ${num}: ${title.toUpperCase()}`, marginX, currentY + 5);

    currentY += 10;
  };

  // Two-column fields standard key/value grid helper
  const drawKeyValueGrid = (fields: { label: string; val: string }[]) => {
    ensureSpace(fields.length * 6 + 6);

    const halfLength = Math.ceil(fields.length / 2);
    const leftCol = fields.slice(0, halfLength);
    const rightCol = fields.slice(halfLength);

    const gridStartY = currentY;
    let localYLeft = gridStartY;
    let localYRight = gridStartY;

    doc.setFontSize(8.5);
    
    // Draw Left Column
    leftCol.forEach((item) => {
      doc.setFont('Helvetica', 'bold');
      doc.setTextColor(100, 116, 139);
      doc.text(item.label, marginX, localYLeft);
      
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(30, 41, 59);
      const wrappedVal = doc.splitTextToSize(item.val, 55);
      doc.text(wrappedVal, marginX + 30, localYLeft);
      
      localYLeft += (wrappedVal.length * 4) + 1.5;
    });

    // Draw Right Column
    rightCol.forEach((item) => {
      doc.setFont('Helvetica', 'bold');
      doc.setTextColor(100, 116, 139);
      doc.text(item.label, marginX + 90, localYRight);
      
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(30, 41, 59);
      const wrappedVal = doc.splitTextToSize(item.val, 55);
      doc.text(wrappedVal, marginX + 120, localYRight);
      
      localYRight += (wrappedVal.length * 4) + 1.5;
    });

    const highestY = Math.max(localYLeft, localYRight);
    currentY = highestY + 4;
  };


  // ==================== CHAPTER 1 ====================
  drawChapterHeader(1, 'Corporate Profile & Stakeholder Contacts');
  
  drawKeyValueGrid([
    { label: 'Business Name', val: getVal(formData.businessName) },
    { label: 'Brand Name', val: getVal(formData.brandName) },
    { label: 'Contact Person', val: getVal(formData.contactPersonName) },
    { label: 'Designation', val: getVal(formData.designation) },
    { label: 'Mobile Number', val: getVal(formData.mobileNumber) },
    { label: 'WhatsApp', val: getVal(formData.whatsAppNumber || formData.mobileNumber) },
    { label: 'Email Address', val: getVal(formData.emailAddress) },
    { label: 'Website URL', val: getVal(formData.website) },
    { label: 'Industry Class', val: getVal(formData.industryCategory) },
    { label: 'Established', val: getVal(formData.establishmentYear) },
    { label: 'Employee Count', val: getVal(formData.employeeCount) },
    { label: 'Service Areas', val: getVal(formData.serviceLocations) },
  ]);

  if (formData.socialMedia) {
    ensureSpace(12);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(212, 164, 55);
    doc.text('SOCIAL CHANNELS & PROFILES', marginX, currentY);
    currentY += 4;
    
    drawKeyValueGrid([
      { label: 'Facebook URL', val: getVal(formData.socialMedia.facebook) },
      { label: 'Instagram handle', val: getVal(formData.socialMedia.instagram) },
      { label: 'LinkedIn profile', val: getVal(formData.socialMedia.linkedIn) },
      { label: 'YouTube channel', val: getVal(formData.socialMedia.youTube) },
      { label: 'Google Business', val: getVal(formData.socialMedia.googleProfile) },
    ]);
  }

  if (formData.businessAddress) {
    drawSectionParagraph('Corporate Registered Headquarters Address', formData.businessAddress);
  }
  if (formData.manufacturingAddress) {
    drawSectionParagraph('Manufacturing/Warehousing Unit Address', formData.manufacturingAddress);
  }
  if (formData.companyDescription) {
    drawSectionParagraph('Corporate Narrative & Summary', formData.companyDescription);
  }
  if (formData.whatCompanyDoes) {
    drawSectionParagraph('Value Creation Matrix (What We Do)', formData.whatCompanyDoes);
  }
  if (formData.whyWasItStarted) {
    drawSectionParagraph('Genesis Model (Why It Was Started)', formData.whyWasItStarted);
  }
  if (formData.vision) {
    drawSectionParagraph('Corporate Long-term Vision Target', formData.vision);
  }
  if (formData.mission) {
    drawSectionParagraph('Corporate Mission Objective Statement', formData.mission);
  }


  // ==================== CHAPTER 2 ====================
  drawChapterHeader(2, 'Products, Services & Unique USP Matrices');
  
  drawKeyValueGrid([
    { label: 'Primary Offer', val: getVal(formData.primaryProductService) },
    { label: 'Secondary Offers', val: getVal(formData.secondaryProducts) },
    { label: 'Category Niches', val: getVal(formData.productCategories) },
    { label: 'Retail Pricing', val: getVal(formData.pricing?.retail) },
    { label: 'Wholesale Unit', val: getVal(formData.pricing?.wholesale) },
    { label: 'Bulk Discounting', val: getVal(formData.pricing?.bulk) },
  ]);

  if (formData.usp) {
    if (formData.usp.difference) {
      drawSectionParagraph('Niche Differentiation Matrix', formData.usp.difference);
    }
    if (formData.usp.whyChooseUs) {
      drawSectionParagraph('Core Selection Trigger (Why Customers Select Us)', formData.usp.whyChooseUs);
    }
    if (formData.usp.strongestAdvantages) {
      drawSectionParagraph('Structural Leverage Advantages', formData.usp.strongestAdvantages);
    }
  }

  if (formData.productFeatures && formData.productFeatures.length > 0) {
    drawSectionParagraph('Exclusive Product/Service Features', getArrayVal(formData.productFeatures));
  }
  if (formData.productBenefits && formData.productBenefits.length > 0) {
    drawSectionParagraph('Direct Core Consumer Benefits', getArrayVal(formData.productBenefits));
  }
  if (formData.certifications && formData.certifications.length > 0) {
    drawSectionParagraph('Accredited Institutional Certifications (ISO/IGI/GMP)', getArrayVal(formData.certifications));
  }


  // ==================== CHAPTER 3 ====================
  drawChapterHeader(3, 'Audience Intelligence & Persona Profiles');
  
  drawKeyValueGrid([
    { label: 'Audience Strategy', val: getVal(formData.targetAudienceIdeal) },
    { label: 'Transaction Model', val: getVal(formData.customerType) },
    { label: 'Gender Audience', val: getVal(formData.audienceGender) },
    { label: 'Household Income', val: getVal(formData.audienceIncomeLevel) },
    { label: 'Highest Education', val: getVal(formData.audienceEducation) },
    { label: 'Marital Profile', val: getVal(formData.audienceMaritalStatus) },
    { label: 'Consumer Age bracket', val: getArrayVal(formData.audienceAgeRange) },
    { label: 'Designated Occupations', val: getArrayVal(formData.audienceOccupation) },
    { label: 'Territorial Locations', val: getArrayVal(formData.targetLocations) },
    { label: 'Interests & Hobbies', val: getArrayVal(formData.audienceInterests) },
    { label: 'Social Engagement', val: getArrayVal(formData.preferredPlatforms) },
  ]);

  if (formData.audiencePainPoints) {
    drawSectionParagraph('Consumer Pain Points & Core Friction', formData.audiencePainPoints);
  }
  if (formData.audienceBuyingMotivations) {
    drawSectionParagraph('Psychological Purchase Triggers & Motivations', formData.audienceBuyingMotivations);
  }


  // ==================== CHAPTER 4 ====================
  drawChapterHeader(4, 'Customer Discovery Channels & Priorities');
  
  drawKeyValueGrid([
    { label: 'Client Finder Channels', val: getArrayVal(formData.howCustomersFindUs) },
    { label: 'Purchase Recurrence', val: getVal(formData.purchaseFrequency) },
    { label: 'Seasonal Variations', val: getVal(formData.seasonalSalesTrends) },
    { label: 'Closing Cycle Length', val: getVal(formData.salesCycle) },
  ]);

  if (formData.buyingDecisionRanking && formData.buyingDecisionRanking.length > 0) {
    drawSectionParagraph('Customer Decision Ranking Vectors (In Order of Leverage)', getArrayVal(formData.buyingDecisionRanking));
  }


  // ==================== CHAPTER 5 ====================
  drawChapterHeader(5, 'Advertising Objectives, Promos & Capital Budgets');
  
  drawKeyValueGrid([
    { label: 'Strategic Objectives', val: getArrayVal(formData.primaryObjectives) },
    { label: 'Monthly Lead Target', val: getVal(formData.monthlyLeadTarget) },
    { label: 'Expected Revenue Run', val: getVal(formData.expectedRevenueTarget) },
    { label: 'Target Ads Budget', val: formData.monthlyAdBudget ? `INR ${formData.monthlyAdBudget.toLocaleString()}/month` : 'Not configured' },
    { label: 'Anticipated Return/ROI', val: getVal(formData.expectedROI) },
    { label: 'Launch Horizon Start', val: getVal(formData.campaignTimelineStart) },
    { label: 'Launch Horizon End', val: getVal(formData.campaignTimelineEnd) },
  ]);

  if (formData.offersAndPromotions && formData.offersAndPromotions.length > 0) {
    ensureSpace(20);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(212, 164, 55);
    doc.text('CLIENT SIGNATURE CAMPAIGN OFFERS & PROMOTIONS', marginX, currentY);
    currentY += 4;
    
    formData.offersAndPromotions.forEach((offer, idx) => {
      drawSectionParagraph(`Offer #${idx + 1}: ${getVal(offer.title)}`, getVal(offer.details));
    });
  }


  // ==================== CHAPTER 6 ====================
  drawChapterHeader(6, 'Competitor Ecosystem & SWOT Audits');
  
  drawKeyValueGrid([
    { label: 'Competitor Strengths', val: getVal(formData.whatCompetitorsDoWell) },
    { label: 'Competitor Weakness', val: getVal(formData.competitorWeaknesses) },
    { label: 'Strategic Playbook', val: getVal(formData.outperformCompetitors) },
  ]);

  if (formData.swot) {
    ensureSpace(12);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(212, 164, 55);
    doc.text('SWOT ADVANTAGE MATRIX REPORT', marginX, currentY);
    currentY += 4;

    drawKeyValueGrid([
      { label: 'Internal Strengths', val: getVal(formData.swot.strengths) },
      { label: 'Internal Weaknesses', val: getVal(formData.swot.weaknesses) },
      { label: 'Uncapped Opportunities', val: getVal(formData.swot.opportunities) },
      { label: 'External Market Threats', val: getVal(formData.swot.threats) },
    ]);
  }

  if (formData.competitors && formData.competitors.length > 0) {
    ensureSpace(12);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(212, 164, 55);
    doc.text('CATEGORIZED TOP INDUSTRY COMPETITORS', marginX, currentY);
    currentY += 4;
    
    formData.competitors.forEach((c, idx) => {
      drawKeyValueGrid([
        { label: `#${idx + 1} Competitor`, val: getVal(c.name) },
        { label: 'Digital Web', val: getVal(c.website) },
        { label: 'Social Audit Link', val: getVal(c.socialLinks) },
      ]);
    });
  }


  // ==================== CHAPTER 7 ====================
  drawChapterHeader(7, 'Prior Brand Ad Experience & Historical Audits');
  
  drawKeyValueGrid([
    { label: 'Ads Run Previously?', val: formData.hasRunAdsBefore ? 'YES, Active Audited History' : 'NO History' },
    { label: 'Historical Ad Spend', val: getVal(formData.previousBudget) },
    { label: 'Best Recorded Success', val: getVal(formData.bestResultsAchieved) },
  ]);

  if (formData.hasRunAdsBefore && formData.adsExperience) {
    drawKeyValueGrid([
      { label: 'Meta Ads Experience', val: getVal(formData.adsExperience.metaAds) },
      { label: 'Google Search Ads', val: getVal(formData.adsExperience.googleAds) },
      { label: 'LinkedIn Network Ads', val: getVal(formData.adsExperience.linkedInAds) },
    ]);
  }

  if (formData.challengesFaced) {
    drawSectionParagraph('Critical Challenges Faced Historically', formData.challengesFaced);
  }
  if (formData.lessonsLearned) {
    drawSectionParagraph('Documented Strategic Lessons Learned', formData.lessonsLearned);
  }


  // ==================== CHAPTER 8 ====================
  drawChapterHeader(8, 'Creative Kits, Aesthetic Moods & Asset Guidelines');
  
  drawKeyValueGrid([
    { label: 'Personality Trait Markers', val: getArrayVal(formData.brandPersonality) },
    { label: 'Selected Color Palette', val: getArrayVal(formData.brandColors) },
    { label: 'Preferred Assets Content', val: getArrayVal(formData.preferredContentTypes) },
    { label: 'Primary Language preferences', val: getArrayVal(formData.languagePreference) },
    { label: 'Aesthetic Reference Brands', val: getArrayVal(formData.referenceBrands) },
  ]);

  if (formData.brandAssets && formData.brandAssets.length > 0) {
    const listAssets = formData.brandAssets.map(f => `${f.name} (${f.size})`).join(', ');
    drawSectionParagraph('Dispatched Digital Vector Assets & Brand Kits', listAssets);
  }


  // ==================== CHAPTER 9 ====================
  drawChapterHeader(9, 'Customer Support Pipeline & CRM Handling');
  
  drawKeyValueGrid([
    { label: 'Lead Handling Model', val: getVal(formData.whoHandlesLeads) },
    { label: 'Lead Contact Manager', val: getVal(formData.leadManagerName) },
    { label: 'SLA Response Speed', val: getVal(formData.leadResponseTime) },
    { label: 'Inbound Lead Portals', val: getArrayVal(formData.leadSources) },
    { label: 'Corporate CRM Installed', val: getVal(formData.crmUsed) },
  ]);

  if (formData.salesProcessDescription) {
    drawSectionParagraph('Inbound Closing Sequence Description', formData.salesProcessDescription);
  }


  // ==================== CHAPTER 10 ====================
  drawChapterHeader(10, '12-Month Vision Statement & Strategic Roadmap');
  
  if (formData.whereBusinessIn12Months) {
    drawSectionParagraph('Horizontal Vision Statement (Next 12 Months)', formData.whereBusinessIn12Months);
  }

  drawKeyValueGrid([
    { label: '12M Target Margin/Rev', val: getVal(formData.revenueGoals12Months) },
  ]);

  if (formData.expansionPlans) {
    drawKeyValueGrid([
      { label: 'Aspirational Products', val: getVal(formData.expansionPlans.newProducts) },
      { label: 'Expansion Territory Domestic', val: getVal(formData.expansionPlans.newCities) },
      { label: 'Expansion Territory Global', val: getVal(formData.expansionPlans.newCountries) },
    ]);
  }

  if (formData.additionalNotes) {
    drawSectionParagraph('Advisory Consultation Remarks', formData.additionalNotes);
  }


  // ==================== POST-EXECUTION PROCESS: PAGE NUMBERS + FOOTERS ====================
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    
    // Draw continuous background border for margins on every single page
    doc.setDrawColor(212, 164, 55); 
    doc.setLineWidth(0.4);
    doc.rect(marginX - 5, 10, printWidth + 10, pageHeight - 20);

    // Minor decorative golden squares in margins
    doc.setFillColor(212, 164, 55);
    doc.rect(marginX - 4.8, 10.2, 5, 5, 'F');
    doc.rect(marginX + printWidth + 4.2 - 4, pageHeight - 15.2, 5, 5, 'F');

    // Soft header layout boundary line (except on cover banner page)
    if (i > 1) {
      doc.setDrawColor(241, 245, 249);
      doc.setLineWidth(0.2);
      doc.line(marginX, 15, marginX + printWidth, 15);
      
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(148, 163, 184);
      doc.text('WELLONIK DESIGN STUDIO  |  CLIENT DISCOVERY REPORT', marginX, 13);
    }

    // Footers boundary line
    doc.setDrawColor(241, 245, 249);
    doc.setLineWidth(0.25);
    doc.line(marginX, pageHeight - 15, marginX + printWidth, pageHeight - 15);

    // Footer Text labels
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text('Certified Operational Discovery Profile', marginX, pageHeight - 11);
    doc.text(`Page ${i} of ${totalPages}`, marginX + printWidth - 15, pageHeight - 11);
  }

  // Trigger real Blob download (works beautifully in sandboxed environment)
  try {
    const pdfBlob = doc.output('blob');
    const blobURL = URL.createObjectURL(pdfBlob);
    
    const clickTarget = document.createElement('a');
    clickTarget.href = blobURL;
    
    const formattedBrand = (formData.brandName || formData.businessName || 'wellonik')
      .trim()
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase();
    
    clickTarget.download = `wellonik_discovery_${formattedBrand}_profile.pdf`;
    document.body.appendChild(clickTarget);
    clickTarget.click();
    
    document.body.removeChild(clickTarget);
    setTimeout(() => {
      URL.revokeObjectURL(blobURL);
    }, 200);
  } catch (err) {
    console.error('Vector PDF Client-side Generator failed, trying fallback raw save:', err);
    doc.save(`wellonik_discovery_profile.pdf`);
  }
};
