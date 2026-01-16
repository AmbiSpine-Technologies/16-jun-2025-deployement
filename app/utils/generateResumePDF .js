
// // pdfGenerator.js
// import { formatMonthYear, getLocationText, shouldShowSection } from './resumeUtils';

// // Helper function to strip HTML tags
// const stripHtml = (html) => {
//   if (!html) return '';
//   return String(html).replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
// };

// // Safe text function to handle undefined/null
// const safeText = (text) => {
//   return text ? String(text) : '';
// };

// // Common PDF functions
// const createPDFBase = () => {
//   const { jsPDF } = window.jspdf;
//   const pdf = new jsPDF('p', 'mm', 'a4');
//   const pageWidth = pdf.internal.pageSize.getWidth();
//   const pageHeight = pdf.internal.pageSize.getHeight();
//   const margin = 20;
//   let yPosition = margin;

//   return { pdf, pageWidth, pageHeight, margin, yPosition };
// };

// // Fixed addText function
// const addText = (pdf, text, x, y, fontSize = 12, isBold = false, color = null) => {
//   const safeY = y || 20;
  
//   // Check if we need new page
//   if (safeY > pdf.internal.pageSize.getHeight() - 20) {
//     pdf.addPage();
//     y = 20;
//   } else {
//     y = safeY;
//   }
  
//   pdf.setFontSize(fontSize);
//   pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
  
//   // Handle color safely
//   if (color && Array.isArray(color)) {
//     pdf.setTextColor(color[0], color[1], color[2]);
//   }
  
//   const cleanText = stripHtml(safeText(text));
//   if (cleanText) {
//     pdf.text(cleanText, x, y);
//   }
  
//   // Reset to black
//   pdf.setTextColor(0, 0, 0);
  
//   return y + (fontSize / 2);
// };

// // Fixed multi-line text
// const addMultiLineText = (pdf, text, x, y, maxWidth, fontSize = 11, lineHeight = 5) => {
//   if (!text) return y;
  
//   let currentY = y;
//   pdf.setFontSize(fontSize);
//   pdf.setFont('helvetica', 'normal');
  
//   const cleanText = stripHtml(safeText(text));
//   const lines = pdf.splitTextToSize(cleanText, maxWidth);
  
//   lines.forEach(line => {
//     if (currentY + lineHeight > pdf.internal.pageSize.getHeight() - 20) {
//       pdf.addPage();
//       currentY = 20;
//     }
//     pdf.text(line, x, currentY);
//     currentY += lineHeight;
//   });
  
//   return currentY;
// };

// // Add section divider
// const addSectionDivider = (pdf, y) => {
//   if (y > pdf.internal.pageSize.getHeight() - 30) {
//     pdf.addPage();
//     return 20;
//   }
  
//   pdf.setDrawColor(200, 200, 200);
//   pdf.setLineWidth(0.5);
//   pdf.line(20, y, pdf.internal.pageSize.getWidth() - 20, y);
//   pdf.setDrawColor(0, 0, 0);
  
//   return y + 10;
// };

// // Render all sections for Professional Template
// const renderProfessionalPDF = (pdf, resumeData, pageWidth, margin) => {
//   let y = 20;

//   // Header Section
//   y = addText(pdf, `${safeText(resumeData.personalInfo.firstName)} ${safeText(resumeData.personalInfo.lastName)}`, margin, y, 22, true);
//   y = addText(pdf, safeText(resumeData.personalInfo.headline), margin, y, 14, false);
//   y += 5;

//   // Contact Information
//   const contactInfo = [];
//   if (resumeData.personalInfo.email) contactInfo.push(safeText(resumeData.personalInfo.email));
//   if (resumeData.personalInfo.phone) contactInfo.push(safeText(resumeData.personalInfo.phone));
  
//   const locationText = getLocationText(resumeData.personalInfo);
//   if (locationText) contactInfo.push(locationText);
  
//   if (contactInfo.length > 0) {
//     y = addText(pdf, contactInfo.join(' | '), margin, y, 10, false);
//   }

//   // Social Links
//   if (resumeData.socialLinks?.filter(link => link.url).length > 0) {
//     y += 3;
//     const socialText = resumeData.socialLinks
//       .filter(link => link.url)
//       .map(link => link.platform === "Other" ? (link.customName || "Website") : link.platform)
//       .join(' | ');
//     y = addText(pdf, socialText, margin, y, 9, false);
//   }

//   y = addSectionDivider(pdf, y + 10);

//   // Profile Summary
//   if (resumeData.profileSummary) {
//     y = addText(pdf, "PROFESSIONAL SUMMARY", margin, y, 16, true);
//     y += 5;
//     y = addMultiLineText(pdf, resumeData.profileSummary, margin, y, pageWidth - 2 * margin, 11, 5);
//     y = addSectionDivider(pdf, y + 5);
//   }

//   // Skills
//   if (resumeData.skills?.length > 0) {
//     y = addText(pdf, "SKILLS", margin, y, 16, true);
//     y += 5;
    
//     resumeData.skills.forEach((category, idx) => {
//       const skillsText = `${safeText(category.categoryName)}: ${category.skills.map(skill => safeText(skill)).join(', ')}`;
//       y = addMultiLineText(pdf, skillsText, margin, y, pageWidth - 2 * margin, 11, 5);
//       y += 2;
//     });
    
//     y = addSectionDivider(pdf, y + 5);
//   }

//   // Work Experience
//   if (resumeData.workExperience && shouldShowSection(resumeData.workExperience)) {
//     y = addText(pdf, "WORK EXPERIENCE", margin, y, 16, true);
//     y += 5;
    
//     resumeData.workExperience.filter(exp => !exp.hidden).forEach(exp => {
//       const dateRange = `${formatMonthYear(exp.startMonth, exp.startYear, 'short')} - ${exp.currentlyWorking ? 'Present' : formatMonthYear(exp.endMonth, exp.endYear, 'short')}`;
      
//       y = addText(pdf, safeText(exp.title), margin, y, 12, true);
//       y = addText(pdf, `${safeText(exp.company)} | ${dateRange}`, margin, y, 11, false);
      
//       if (exp.location) {
//         y = addText(pdf, safeText(exp.location), margin, y, 10, false);
//       }
      
//       if (exp.employmentType) {
//         y = addText(pdf, safeText(exp.employmentType), margin, y, 10, false);
//       }
      
//       if (exp.description) {
//         y = addMultiLineText(pdf, exp.description, margin, y, pageWidth - 2 * margin, 10, 4);
//       }
      
//       if (exp.bullets && exp.bullets.length > 0) {
//         exp.bullets.forEach(bullet => {
//           y = addText(pdf, `• ${safeText(bullet)}`, margin + 5, y, 10, false);
//         });
//       }
      
//       y += 8;
//     });
//     y = addSectionDivider(pdf, y + 5);
//   }

//   // Education
//   if (resumeData.education && shouldShowSection(resumeData.education)) {
//     y = addText(pdf, "EDUCATION", margin, y, 16, true);
//     y += 5;
    
//     resumeData.education.filter(edu => !edu.hidden).forEach(edu => {
//       const dateRange = `${formatMonthYear(edu.startMonth, edu.startYear, 'short')} - ${edu.currentlyStudying ? 'Present' : formatMonthYear(edu.endMonth, edu.endYear, 'short')}`;
      
//       y = addText(pdf, safeText(edu.degree), margin, y, 12, true);
//       y = addText(pdf, `${safeText(edu.college)} | ${dateRange}`, margin, y, 11, false);
      
//       if (edu.specialisation) {
//         y = addText(pdf, `Specialization: ${safeText(edu.specialisation)}`, margin, y, 10, false);
//       }
      
//       if (edu.marks) {
//         y = addText(pdf, `GPA: ${safeText(edu.marks)}`, margin, y, 10, false);
//       }
      
//       y += 8;
//     });
//     y = addSectionDivider(pdf, y + 5);
//   }

//   // Projects
//   if (resumeData.projects && shouldShowSection(resumeData.projects)) {
//     y = addText(pdf, "PROJECTS", margin, y, 16, true);
//     y += 5;
    
//     resumeData.projects.filter(project => !project.hidden).forEach(project => {
//       const dateRange = `${formatMonthYear(project.startMonth, project.startYear, 'short')} - ${project.currentlyWorking ? 'Present' : formatMonthYear(project.endMonth, project.endYear, 'short')}`;
      
//       y = addText(pdf, safeText(project.title), margin, y, 12, true);
//       y = addText(pdf, `${safeText(project.organization || '')} | ${dateRange}`, margin, y, 11, false);
      
//       if (project.url) {
//         y = addText(pdf, `Project URL: ${safeText(project.url)}`, margin, y, 10, false);
//       }
      
//       if (project.description) {
//         y = addMultiLineText(pdf, project.description, margin, y, pageWidth - 2 * margin, 10, 4);
//       }
      
//       if (project.bullets && project.bullets.length > 0) {
//         project.bullets.forEach(bullet => {
//           y = addText(pdf, `• ${safeText(bullet)}`, margin + 5, y, 10, false);
//         });
//       }
      
//       y += 8;
//     });
//     y = addSectionDivider(pdf, y + 5);
//   }

//   // Certificates
//   if (resumeData.certificates && shouldShowSection(resumeData.certificates)) {
//     y = addText(pdf, "CERTIFICATIONS", margin, y, 16, true);
//     y += 5;
    
//     resumeData.certificates.filter(cert => !cert.hidden).forEach(cert => {
//       y = addText(pdf, safeText(cert.name), margin, y, 12, true);
//       y = addText(pdf, safeText(cert.authority), margin, y, 11, false);
      
//       if (cert.issueDate) {
//         y = addText(pdf, `Issued: ${safeText(cert.issueDate)}`, margin, y, 10, false);
//       }
      
//       if (cert.url) {
//         y = addText(pdf, `URL: ${safeText(cert.url)}`, margin, y, 10, false);
//       }
      
//       y += 6;
//     });
//     y = addSectionDivider(pdf, y + 5);
//   }

//   // Awards
//   if (resumeData.awards && shouldShowSection(resumeData.awards)) {
//     y = addText(pdf, "AWARDS & ACHIEVEMENTS", margin, y, 16, true);
//     y += 5;
    
//     resumeData.awards.filter(award => !award.hidden).forEach(award => {
//       y = addText(pdf, safeText(award.title), margin, y, 12, true);
//       y = addText(pdf, safeText(award.issuer), margin, y, 11, false);
      
//       if (award.description) {
//         y = addMultiLineText(pdf, award.description, margin, y, pageWidth - 2 * margin, 10, 4);
//       }
      
//       if (award.url) {
//         y = addText(pdf, `URL: ${safeText(award.url)}`, margin, y, 10, false);
//       }
      
//       y += 6;
//     });
//     y = addSectionDivider(pdf, y + 5);
//   }

//   // Publications
//   if (resumeData.publications && shouldShowSection(resumeData.publications)) {
//     y = addText(pdf, "PUBLICATIONS", margin, y, 16, true);
//     y += 5;
    
//     resumeData.publications.filter(pub => !pub.hidden).forEach(pub => {
//       y = addText(pdf, safeText(pub.title), margin, y, 12, true);
//       y = addText(pdf, safeText(pub.publisher), margin, y, 11, false);
      
//       if (pub.authors) {
//         y = addText(pdf, `Authors: ${safeText(pub.authors)}`, margin, y, 10, false);
//       }
      
//       if (pub.publicationMonth && pub.publicationYear) {
//         y = addText(pdf, `Published: ${formatMonthYear(pub.publicationMonth, pub.publicationYear, 'long')}`, margin, y, 10, false);
//       }
      
//       if (pub.description) {
//         y = addMultiLineText(pdf, pub.description, margin, y, pageWidth - 2 * margin, 10, 4);
//       }
      
//       if (pub.url) {
//         y = addText(pdf, `URL: ${safeText(pub.url)}`, margin, y, 10, false);
//       }
      
//       y += 6;
//     });
//     y = addSectionDivider(pdf, y + 5);
//   }

//   // Interests
//   if (resumeData.interests?.length > 0) {
//     y = addText(pdf, "PROFESSIONAL INTERESTS", margin, y, 16, true);
//     y += 5;
    
//     const interestsText = resumeData.interests.map(interest => safeText(interest)).join(', ');
//     y = addMultiLineText(pdf, interestsText, margin, y, pageWidth - 2 * margin, 11, 5);
//     y = addSectionDivider(pdf, y + 5);
//   }

//   // Languages
//   if (resumeData.languages?.length > 0) {
//     y = addText(pdf, "LANGUAGES", margin, y, 16, true);
//     y += 5;
    
//     resumeData.languages.forEach(language => {
//       const languageText = `${safeText(language.name)} - ${safeText(language.level)}`;
//       y = addText(pdf, languageText, margin, y, 11, false);
//       y += 4;
//     });
//   }

//   return y;
// };

// // Professional Template PDF
// const generateProfessionalPDF = async (resumeData) => {
//   const { pdf, pageWidth, margin } = createPDFBase();
  
//   renderProfessionalPDF(pdf, resumeData, pageWidth, margin);

//   // Add page numbers
//   const pageCount = pdf.internal.getNumberOfPages();
//   for (let i = 1; i <= pageCount; i++) {
//     pdf.setPage(i);
//     pdf.setFontSize(8);
//     pdf.setTextColor(128, 128, 128);
//     pdf.text(`Page ${i} of ${pageCount}`, pageWidth - 25, pdf.internal.pageSize.getHeight() - 10);
//   }

//   return pdf;
// };

// // Modern Template PDF
// const generateModernPDF = async (resumeData) => {
//   const { pdf, pageWidth, margin } = createPDFBase();
  
//   // Modern template uses same content structure but different styling
//   // For now, we'll use professional layout for PDF
//   renderProfessionalPDF(pdf, resumeData, pageWidth, margin);

//   // Add page numbers
//   const pageCount = pdf.internal.getNumberOfPages();
//   for (let i = 1; i <= pageCount; i++) {
//     pdf.setPage(i);
//     pdf.setFontSize(8);
//     pdf.setTextColor(128, 128, 128);
//     pdf.text(`Page ${i} of ${pageCount}`, pageWidth - 25, pdf.internal.pageSize.getHeight() - 10);
//   }

//   return pdf;
// };

// // Executive Template PDF
// const generateExecutivePDF = async (resumeData) => {
//   const { pdf, pageWidth, margin } = createPDFBase();
  
//   // Executive template uses same content structure
//   renderProfessionalPDF(pdf, resumeData, pageWidth, margin);

//   // Add page numbers
//   const pageCount = pdf.internal.getNumberOfPages();
//   for (let i = 1; i <= pageCount; i++) {
//     pdf.setPage(i);
//     pdf.setFontSize(8);
//     pdf.setTextColor(128, 128, 128);
//     pdf.text(`Page ${i} of ${pageCount}`, pageWidth - 25, pdf.internal.pageSize.getHeight() - 10);
//   }

//   return pdf;
// };

// // Creative Template PDF
// const generateCreativePDF = async (resumeData) => {
//   const { pdf, pageWidth, margin } = createPDFBase();
  
//   // Creative template uses same content structure
//   renderProfessionalPDF(pdf, resumeData, pageWidth, margin);

//   // Add page numbers
//   const pageCount = pdf.internal.getNumberOfPages();
//   for (let i = 1; i <= pageCount; i++) {
//     pdf.setPage(i);
//     pdf.setFontSize(8);
//     pdf.setTextColor(128, 128, 128);
//     pdf.text(`Page ${i} of ${pageCount}`, pageWidth - 25, pdf.internal.pageSize.getHeight() - 10);
//   }

//   return pdf;
// };

// // Main function with proper error handling
// export const generateResumePDF = async (resumeData, template = 'professional') => {
//   try {
//     // Import jsPDF dynamically
//     if (!window.jspdf) {
//       const jsPDFModule = await import('jspdf');
//       window.jspdf = jsPDFModule;
//     }

//     const templateGenerators = {
//       professional: generateProfessionalPDF,
//       modern: generateModernPDF,
//       executive: generateExecutivePDF,
//       creative: generateCreativePDF
//     };

//     const generator = templateGenerators[template] || templateGenerators.professional;
//     const pdf = await generator(resumeData);
    
//     return pdf;
    
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//     throw new Error('PDF generation failed: ' + error.message);
//   }
// };




// pdfGenerator.js
import { formatMonthYear, getLocationText, shouldShowSection } from './resumeUtils';

// Helper function to strip HTML tags
const stripHtml = (html) => {
  if (!html) return '';
  return String(html).replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
};

// Safe text function to handle undefined/null
const safeText = (text) => {
  return text ? String(text) : '';
};

// Common PDF functions
const createPDFBase = () => {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  return { pdf, pageWidth, pageHeight, margin, yPosition };
};

// Fixed addText function
const addText = (pdf, text, x, y, fontSize = 12, isBold = false, color = [0, 0, 0]) => {
  const safeY = y || 20;
  
  // Check if we need new page
  if (safeY > pdf.internal.pageSize.getHeight() - 20) {
    pdf.addPage();
    y = 20;
  } else {
    y = safeY;
  }
  
  pdf.setFontSize(fontSize);
  pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
  
  // Handle color safely
  if (color && Array.isArray(color)) {
    pdf.setTextColor(color[0], color[1], color[2]);
  }
  
  const cleanText = stripHtml(safeText(text));
  if (cleanText) {
    pdf.text(cleanText, x, y);
  }
  
  // Reset to black
  pdf.setTextColor(0, 0, 0);
  
  return y + (fontSize / 2);
};

// Fixed multi-line text
const addMultiLineText = (pdf, text, x, y, maxWidth, fontSize = 11, lineHeight = 5, isBold = false) => {
  if (!text) return y;
  
  let currentY = y;
  pdf.setFontSize(fontSize);
  pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
  
  const cleanText = stripHtml(safeText(text));
  const lines = pdf.splitTextToSize(cleanText, maxWidth);
  
  lines.forEach(line => {
    if (currentY + lineHeight > pdf.internal.pageSize.getHeight() - 20) {
      pdf.addPage();
      currentY = 20;
    }
    pdf.text(line, x, currentY);
    currentY += lineHeight;
  });
  
  return currentY;
};

// Add section header
const addSectionHeader = (pdf, title, x, y) => {
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(57, 57, 57); // Dark gray similar to your template
  
  // Add underline
  const textWidth = pdf.getTextWidth(title);
  pdf.text(title, x, y);
  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(0.5);
  pdf.line(x, y + 1, x + textWidth, y + 1);
  
  // Reset color
  pdf.setTextColor(0, 0, 0);
  
  return y + 10;
};

// Add section divider
const addSectionDivider = (pdf, y) => {
  if (y > pdf.internal.pageSize.getHeight() - 30) {
    pdf.addPage();
    return 20;
  }
  
  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(0.5);
  pdf.line(20, y, pdf.internal.pageSize.getWidth() - 20, y);
  pdf.setDrawColor(0, 0, 0);
  
  return y + 10;
};

// Render language level dots for PDF
const renderLanguageLevelPDF = (pdf, level, x, y) => {
  const levelDots = {
    beginner: 1,
    intermediate: 3,
    advanced: 4,
    native: 5,
  }[level?.toLowerCase()] || 0;

  const dotSize = 2;
  const dotSpacing = 3;
  
  for (let i = 0; i < 5; i++) {
    if (i < levelDots) {
      pdf.setFillColor(59, 130, 246); // Blue color
    } else {
      pdf.setFillColor(209, 213, 219); // Gray color
    }
    pdf.circle(x + (i * (dotSize + dotSpacing)), y, dotSize, 'F');
  }
  
  return x + (5 * (dotSize + dotSpacing));
};

// Render all sections for Professional Template
const renderProfessionalPDF = (pdf, resumeData, pageWidth, margin) => {
  let y = 20;

  // Header Section
  y = addText(pdf, `${safeText(resumeData.personalInfo.firstName)} ${safeText(resumeData.personalInfo.lastName)}`, margin, y, 24, true);
  
  if (resumeData.personalInfo.headline) {
    y = addText(pdf, safeText(resumeData.personalInfo.headline), margin, y, 14, false, [75, 85, 99]);
  }
  
  y += 8;

  // Contact Information - centered like in template
  const contactInfo = [];
  if (resumeData.personalInfo.email) contactInfo.push(safeText(resumeData.personalInfo.email));
  if (resumeData.personalInfo.phone) contactInfo.push(safeText(resumeData.personalInfo.phone));
  
  const locationText = getLocationText(resumeData.personalInfo);
  if (locationText) contactInfo.push(locationText);
  
  if (contactInfo.length > 0) {
    const contactText = contactInfo.join(' | ');
    const textWidth = pdf.getTextWidth(contactText);
    const centerX = (pageWidth - textWidth) / 2;
    y = addText(pdf, contactText, centerX, y, 10, false, [75, 85, 99]);
  }

  // Social Links - centered
  if (resumeData.socialLinks?.filter(link => link.url).length > 0) {
    y += 4;
    const socialText = resumeData.socialLinks
      .filter(link => link.url)
      .map(link => link.platform === "Other" ? (link.customName || "Website") : link.platform)
      .join(' | ');
    
    const socialWidth = pdf.getTextWidth(socialText);
    const centerX = (pageWidth - socialWidth) / 2;
    y = addText(pdf, socialText, centerX, y, 9, false, [75, 85, 99]);
  }

  y = addSectionDivider(pdf, y + 12);

  // Profile Summary
  if (resumeData.profileSummary) {
    y = addSectionHeader(pdf, "PROFESSIONAL SUMMARY", margin, y);
    y += 2;
    y = addMultiLineText(pdf, resumeData.profileSummary, margin, y, pageWidth - 2 * margin, 11, 5);
    y = addSectionDivider(pdf, y + 8);
  }

  // Skills
  if (resumeData.skills?.length > 0) {
    y = addSectionHeader(pdf, "SKILLS", margin, y);
    y += 2;
    
    resumeData.skills.forEach((category, idx) => {
      const categoryText = `${safeText(category.categoryName)}:`;
      const skillsText = category.skills.map(skill => safeText(skill)).join(', ');
      
      // Category name in bold
      y = addText(pdf, categoryText, margin, y, 11, true);
      
      // Skills in normal weight
      y = addMultiLineText(pdf, skillsText, margin + pdf.getTextWidth(categoryText) + 5, y - 3, pageWidth - 2 * margin - pdf.getTextWidth(categoryText) - 5, 11, 5);
      y += 2;
    });
    
    y = addSectionDivider(pdf, y + 8);
  }

  // Work Experience
  if (resumeData.workExperience && shouldShowSection(resumeData.workExperience)) {
    y = addSectionHeader(pdf, "WORK EXPERIENCE", margin, y);
    y += 2;
    
    resumeData.workExperience.filter(exp => !exp.hidden).forEach(exp => {
      const dateRange = `${formatMonthYear(exp.startMonth, exp.startYear, 'long')} – ${exp.currentlyWorking ? "Present" : formatMonthYear(exp.endMonth, exp.endYear, 'long')}`;
      
      // Company and title
      y = addText(pdf, safeText(exp.company), margin, y, 16, true);
      y = addText(pdf, safeText(exp.title), margin, y, 12, false, [55, 65, 81]);
      
      // Employment details
      const employmentDetails = [];
      if (exp.field) employmentDetails.push(safeText(exp.field));
      if (exp.employmentType) employmentDetails.push(safeText(exp.employmentType));
      
      if (employmentDetails.length > 0) {
        y = addText(pdf, employmentDetails.join(' | '), margin, y, 10, false, [75, 85, 99]);
      }
      
      // Date and location on the right
      const dateX = pageWidth - margin - pdf.getTextWidth(dateRange);
      y = addText(pdf, dateRange, dateX, y - 15, 10, false, [75, 85, 99]);
      
      if (exp.location) {
        const locationX = pageWidth - margin - pdf.getTextWidth(exp.location);
        y = addText(pdf, safeText(exp.location), locationX, y - 10, 9, false, [107, 114, 128]);
      }
      
      // Description
      if (exp.description) {
        y = addMultiLineText(pdf, exp.description, margin, y, pageWidth - 2 * margin, 10, 4.5);
      }
      
      // Bullet points
      if (exp.bullets && exp.bullets.length > 0) {
        exp.bullets.forEach(bullet => {
          y = addText(pdf, '•', margin, y, 10, false);
          y = addMultiLineText(pdf, bullet, margin + 8, y - 3, pageWidth - 2 * margin - 8, 10, 4.5);
          y += 1;
        });
      }
      
      y += 8;
    });
    
    y = addSectionDivider(pdf, y + 8);
  }

  // Education
  if (resumeData.education && shouldShowSection(resumeData.education)) {
    y = addSectionHeader(pdf, "EDUCATION", margin, y);
    y += 2;
    
    resumeData.education.filter(edu => !edu.hidden).forEach(edu => {
      const dateRange = `${formatMonthYear(edu.startMonth, edu.startYear, 'long')} – ${edu.currentlyStudying ? "Present" : formatMonthYear(edu.endMonth, edu.endYear, 'long')}`;
      
      // Degree and college
      y = addText(pdf, safeText(edu.degree), margin, y, 14, true);
      y = addText(pdf, safeText(edu.college), margin, y, 11, false, [55, 65, 81]);
      
      // Specialization
      if (edu.specialisation) {
        y = addText(pdf, `Specialization: ${safeText(edu.specialisation)}`, margin, y, 10, false, [75, 85, 99]);
      }
      
      // Date and marks on the right
      const dateX = pageWidth - margin - pdf.getTextWidth(dateRange);
      y = addText(pdf, dateRange, dateX, y - 15, 10, false, [75, 85, 99]);
      
      if (edu.marks) {
        const marksX = pageWidth - margin - pdf.getTextWidth(`GPA: ${edu.marks}`);
        y = addText(pdf, `GPA: ${safeText(edu.marks)}`, marksX, y - 10, 9, false, [107, 114, 128]);
      }
      
      y += 8;
    });
    
    y = addSectionDivider(pdf, y + 8);
  }

  // Projects
  if (resumeData.projects && shouldShowSection(resumeData.projects)) {
    y = addSectionHeader(pdf, "PROJECTS", margin, y);
    y += 2;
    
    resumeData.projects.filter(project => !project.hidden).forEach(project => {
      const dateRange = `${formatMonthYear(project.startMonth, project.startYear, 'long')} – ${project.currentlyWorking ? "Present" : formatMonthYear(project.endMonth, project.endYear, 'long')}`;
      
      // Project title and organization
      y = addText(pdf, safeText(project.title), margin, y, 14, true);
      
      if (project.organization) {
        y = addText(pdf, safeText(project.organization), margin, y, 11, false, [55, 65, 81]);
      }
      
      // Date on the right
      const dateX = pageWidth - margin - pdf.getTextWidth(dateRange);
      y = addText(pdf, dateRange, dateX, y - 15, 10, false, [75, 85, 99]);
      
      // Project URL
      if (project.url) {
        y = addText(pdf, `View Project: ${safeText(project.url)}`, margin, y, 10, false, [59, 130, 246]);
      }
      
      // Description
      if (project.description) {
        y = addMultiLineText(pdf, project.description, margin, y, pageWidth - 2 * margin, 10, 4.5);
      }
      
      // Bullet points
      if (project.bullets && project.bullets.length > 0) {
        project.bullets.forEach(bullet => {
          y = addText(pdf, '•', margin, y, 10, false);
          y = addMultiLineText(pdf, bullet, margin + 8, y - 3, pageWidth - 2 * margin - 8, 10, 4.5);
          y += 1;
        });
      }
      
      y += 8;
    });
    
    y = addSectionDivider(pdf, y + 8);
  }

  // Certificates
  if (resumeData.certificates && shouldShowSection(resumeData.certificates)) {
    y = addSectionHeader(pdf, "CERTIFICATIONS", margin, y);
    y += 2;
    
    resumeData.certificates.filter(cert => !cert.hidden).forEach(cert => {
      // Certificate name and authority
      y = addText(pdf, safeText(cert.name), margin, y, 12, true);
      y = addText(pdf, safeText(cert.authority), margin, y, 10, false, [55, 65, 81]);
      
      // Certificate URL
      if (cert.url) {
        y = addText(pdf, `View Certificate: ${safeText(cert.url)}`, margin, y, 9, false, [59, 130, 246]);
      }
      
      // Issue date on the right
      if (cert.issueDate) {
        const dateX = pageWidth - margin - pdf.getTextWidth(`Issued: ${cert.issueDate}`);
        y = addText(pdf, `Issued: ${safeText(cert.issueDate)}`, dateX, y - 15, 9, false, [107, 114, 128]);
      }
      
      y += 6;
    });
    
    y = addSectionDivider(pdf, y + 8);
  }

  // Awards & Achievements
  const allAwards = [...(resumeData.awards || []), ...(resumeData.achievements || [])];
  if (shouldShowSection(allAwards)) {
    y = addSectionHeader(pdf, "AWARDS & ACHIEVEMENTS", margin, y);
    y += 2;
    
    allAwards.filter(item => !item.hidden).forEach(item => {
      y = addText(pdf, safeText(item.title || item.name), margin, y, 12, true);
      y = addText(pdf, `Issued by: ${safeText(item.issuer)}`, margin, y, 10, false, [55, 65, 81]);
      
      // Media link
      if (item.media) {
        const mediaUrl = typeof item.media === "string" ? item.media : "Linked Media";
        y = addText(pdf, `View Link: ${mediaUrl}`, margin, y, 9, false, [59, 130, 246]);
      }
      
      // Description
      if (item.description) {
        y = addMultiLineText(pdf, item.description, margin, y, pageWidth - 2 * margin, 10, 4.5);
      }
      
      y += 6;
    });
    
    y = addSectionDivider(pdf, y + 8);
  }

  // Publications
  if (resumeData.publications && shouldShowSection(resumeData.publications)) {
    y = addSectionHeader(pdf, "PUBLICATIONS", margin, y);
    y += 2;
    
    resumeData.publications.filter(pub => !pub.hidden).forEach(pub => {
      // Title and publisher
      y = addText(pdf, safeText(pub.title), margin, y, 12, true);
      y = addText(pdf, `Published by: ${safeText(pub.publisher)}`, margin, y, 10, false, [55, 65, 81]);
      
      // Authors
      if (pub.authors) {
        y = addText(pdf, `Authors: ${safeText(pub.authors)}`, margin, y, 9, false, [75, 85, 99]);
      }
      
      // Publication URL
      if (pub.url) {
        y = addText(pdf, `View Link: ${safeText(pub.url)}`, margin, y, 9, false, [59, 130, 246]);
      }
      
      // Publication date on the right
      if (pub.publicationMonth && pub.publicationYear) {
        const pubDate = formatMonthYear(pub.publicationMonth, pub.publicationYear, 'long');
        const dateX = pageWidth - margin - pdf.getTextWidth(`Published: ${pubDate}`);
        y = addText(pdf, `Published: ${pubDate}`, dateX, y - 25, 9, false, [107, 114, 128]);
      }
      
      // Description
      if (pub.description) {
        y = addMultiLineText(pdf, pub.description, margin, y, pageWidth - 2 * margin, 10, 4.5);
      }
      
      y += 6;
    });
    
    y = addSectionDivider(pdf, y + 8);
  }

  // Interests
  if (resumeData.interests?.length > 0) {
    y = addSectionHeader(pdf, "PROFESSIONAL INTERESTS", margin, y);
    y += 2;
    
    const interestsText = resumeData.interests.map(interest => safeText(interest)).join(', ');
    y = addMultiLineText(pdf, interestsText, margin, y, pageWidth - 2 * margin, 11, 5);
    y = addSectionDivider(pdf, y + 8);
  }

  // Languages
  if (resumeData.languages?.length > 0) {
    y = addSectionHeader(pdf, "LANGUAGES", margin, y);
    y += 2;
    
    resumeData.languages.forEach(language => {
      const langName = safeText(language.name || language);
      const langLevel = safeText(language.level);
      
      // Language name
      y = addText(pdf, langName, margin, y, 11, true);
      
      // Language level dots
      const dotsX = pageWidth - margin - 40;
      renderLanguageLevelPDF(pdf, langLevel, dotsX, y - 2);
      
      y += 6;
    });
  }

  return y;
};

// Professional Template PDF - Exact match to your template
const generateProfessionalPDF = async (resumeData) => {
  const { pdf, pageWidth, margin } = createPDFBase();
  
  // Set default font
  pdf.setFont('helvetica');
  
  renderProfessionalPDF(pdf, resumeData, pageWidth, margin);

  // Add page numbers
  const pageCount = pdf.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(128, 128, 128);
    pdf.text(`Page ${i} of ${pageCount}`, pageWidth - 25, pdf.internal.pageSize.getHeight() - 10);
  }

  return pdf;
};

// All templates use the same professional layout for PDF
const generateModernPDF = async (resumeData) => {
  return generateProfessionalPDF(resumeData);
};

const generateExecutivePDF = async (resumeData) => {
  return generateProfessionalPDF(resumeData);
};

const generateCreativePDF = async (resumeData) => {
  return generateProfessionalPDF(resumeData);
};

// Main function with proper error handling
export const generateResumePDF = async (resumeData, template = 'professional') => {
  try {
    // Import jsPDF dynamically
    if (!window.jspdf) {
      const jsPDFModule = await import('jspdf');
      window.jspdf = jsPDFModule;
    }

    const templateGenerators = {
      professional: generateProfessionalPDF,
      modern: generateModernPDF,
      executive: generateExecutivePDF,
      creative: generateCreativePDF
    };

    const generator = templateGenerators[template] || templateGenerators.professional;
    const pdf = await generator(resumeData);
    
    return pdf;
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('PDF generation failed: ' + error.message);
  }
};