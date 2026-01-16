export class FileParserService {
  static async parseFile(file) {
    try {
      const fileType = this.getFileType(file);
      
      switch (fileType) {
        case 'pdf':
          return await this.parsePDF(file);
        case 'doc':
        case 'docx':
          return await this.parseDoc(file);
        case 'txt':
          return await this.parseText(file);
        default:
          throw new Error('Unsupported file format');
      }
    } catch (error) {
      console.error('File parsing error:', error);
      throw new Error(`Failed to parse file: ${error.message}`);
    }
  }

  static getFileType(file) {
    const fileName = file.name.toLowerCase();
    
    if (fileName.endsWith('.pdf')) return 'pdf';
    if (fileName.endsWith('.doc')) return 'doc';
    if (fileName.endsWith('.docx')) return 'docx';
    if (fileName.endsWith('.txt')) return 'txt';
    
    return file.type.split('/')[1] || 'unknown';
  }

  static async parsePDF(file) {
    try {
      // Use pdfjs-dist instead of pdf-parse for better control
      const pdfjsLib = await import('pdfjs-dist');
      
      // Set worker path for PDF.js
      if (typeof window !== 'undefined') {
        const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.min.js');
        pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
      }

      const arrayBuffer = await file.arrayBuffer();
      
      // Load the PDF document
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      
      let fullText = '';
      
      // Extract text from all pages
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + '\n';
      }
      
      return this.extractStructuredData(fullText);
      
    } catch (error) {
      console.error('PDF parsing error:', error);
      
      // Specific error messages for common issues
      if (error.name === 'PasswordException') {
        throw new Error('PDF is password protected. Please upload an unprotected PDF.');
      } else if (error.message.includes('Invalid PDF')) {
        throw new Error('Invalid PDF file. Please upload a valid PDF document.');
      } else {
        throw new Error('Failed to parse PDF file. Please try another file.');
      }
    }
  }

  static async parseDoc(file) {
    try {
      const mammoth = await import('mammoth');
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      
      return this.extractStructuredData(result.value);
    } catch (error) {
      console.error('DOC parsing error:', error);
      throw new Error('Failed to parse DOC/DOCX file. Please ensure the file is not corrupted.');
    }
  }

  static async parseText(file) {
    try {
      const text = await file.text();
      return this.extractStructuredData(text);
    } catch (error) {
      console.error('Text parsing error:', error);
      throw new Error('Failed to parse text file.');
    }
  }

  static extractStructuredData(text) {
    const lines = text.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    return {
      personalInfo: this.extractPersonalInfo(lines),
      workExperience: this.extractWorkExperience(lines),
      education: this.extractEducation(lines),
      skills: this.extractSkills(lines),
      projects: this.extractProjects(lines),
      certifications: this.extractCertifications(lines),
      rawText: text
    };
  }

  static extractPersonalInfo(lines) {
    const info = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      headline: '',
      city: '',
      country: ''
    };

    // Email extraction
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    // Phone extraction (international format support)
    const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g;

    lines.forEach((line, index) => {
      // Extract email
      const emailMatch = line.match(emailRegex);
      if (emailMatch && !info.email) {
        info.email = emailMatch[0];
      }

      // Extract phone
      const phoneMatch = line.match(phoneRegex);
      if (phoneMatch && !info.phone) {
        info.phone = phoneMatch[0];
      }

      // Name extraction (usually first line)
      if (index === 0 && line.split(' ').length >= 2) {
        const nameParts = line.split(' ');
        info.firstName = nameParts[0];
        info.lastName = nameParts.slice(1).join(' ');
      }

      // Headline extraction (usually second line)
      if (index === 1 && line.length < 100) {
        info.headline = line;
      }

      // Location extraction
      if (line.match(/\b(?:street|st|avenue|ave|road|rd|boulevard|blvd|lane|ln|drive|dr)\b/i)) {
        info.address = line;
      }
    });

    return info;
  }

  static extractWorkExperience(lines) {
    const experiences = [];
    let currentExperience = null;
    let inExperienceSection = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lowerLine = line.toLowerCase();

      // Detect experience section
      if (lowerLine.includes('experience') || lowerLine.includes('work history')) {
        inExperienceSection = true;
        continue;
      }

      // End of experience section
      if (inExperienceSection && (lowerLine.includes('education') || lowerLine.includes('skills'))) {
        break;
      }

      if (inExperienceSection) {
        // Look for job title patterns
        const jobMatch = line.match(/(.+?)\s+(?:at|@|–|-|—)\s+(.+)/i);
        
        if (jobMatch) {
          if (currentExperience) {
            experiences.push(currentExperience);
          }

          currentExperience = {
            id: `exp_${Date.now()}_${i}`,
            title: jobMatch[1].trim(),
            company: jobMatch[2].trim(),
            employmentType: 'Full-time',
            location: '',
            startMonth: '',
            startYear: '',
            endMonth: '',
            endYear: '',
            currentlyWorking: false,
            description: '',
            bullets: [],
            hidden: false
          };
        } else if (currentExperience) {
          // Date range extraction
          const dateMatch = line.match(/([A-Za-z]+)\s+(\d{4})\s*(?:-|–|to)\s*([A-Za-z]+\s+(\d{4})|Present|Current)/i);
          if (dateMatch && !currentExperience.startMonth) {
            currentExperience.startMonth = dateMatch[1];
            currentExperience.startYear = dateMatch[2];
            currentExperience.currentlyWorking = dateMatch[3]?.toLowerCase().includes('present') || 
                                              dateMatch[3]?.toLowerCase().includes('current');
          }

          // Add bullet points
          if (line.length > 10 && line.match(/[•·\-]\s*.+|\d+\.\s*.+/)) {
            currentExperience.bullets.push(line.replace(/[•·\-]\s*|\d+\.\s*/, '').trim());
          }
        }
      }
    }

    if (currentExperience) {
      experiences.push(currentExperience);
    }

    return experiences;
  }

  static extractEducation(lines) {
    const education = [];
    let inEducationSection = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lowerLine = line.toLowerCase();

      if (lowerLine.includes('education') || lowerLine.includes('academic')) {
        inEducationSection = true;
        continue;
      }

      if (inEducationSection && (lowerLine.includes('experience') || lowerLine.includes('skills'))) {
        break;
      }

      if (inEducationSection) {
        // Look for education entries
        if (line.match(/university|college|institute|bachelor|master|phd|diploma|degree/i)) {
          education.push({
            id: `edu_${Date.now()}_${i}`,
            level: this.getEducationLevel(line),
            college: line.trim(),
            degree: this.extractDegree(line),
            specialisation: '',
            marks: '',
            educationType: 'Full-time',
            currentlyStudying: false,
            startMonth: '',
            startYear: '',
            endMonth: '',
            endYear: '',
            hidden: false
          });
        }
      }
    }

    return education;
  }

  static getEducationLevel(line) {
    const lowerLine = line.toLowerCase();
    if (lowerLine.includes('phd') || lowerLine.includes('doctorate')) return 'Post Graduate';
    if (lowerLine.includes('master')) return 'Post Graduate';
    if (lowerLine.includes('bachelor')) return 'Graduate';
    if (lowerLine.includes('diploma')) return 'Diploma';
    if (lowerLine.includes('12th')) return '12th';
    if (lowerLine.includes('10th')) return '10th';
    return 'Graduate';
  }

  static extractDegree(line) {
    const degreeMatch = line.match(/(Bachelor|Master|PhD|Diploma|Certificate)\s+(?:of|in)?\s*(.+)/i);
    return degreeMatch ? degreeMatch[0] : '';
  }

  static extractSkills(lines) {
    const skills = [];
    let inSkillsSection = false;

    lines.forEach(line => {
      const lowerLine = line.toLowerCase();

      if (lowerLine.includes('skills') || lowerLine.includes('technical') || lowerLine.includes('competencies')) {
        inSkillsSection = true;
        return;
      }

      if (inSkillsSection) {
        if (lowerLine.includes('experience') || lowerLine.includes('education') || lowerLine.includes('projects')) {
          inSkillsSection = false;
          return;
        }

        // Extract skills from comma/separated lists
        const skillItems = line.split(/[,•·\-]|\s{2,}/)
          .map(item => item.trim())
          .filter(item => item.length > 1 && item.length < 50);

        skillItems.forEach(skill => {
          if (skill && !skill.match(/^\d/)) {
            skills.push({
              id: `skill_${Date.now()}_${Math.random()}`,
              categoryName: this.categorizeSkill(skill),
              skills: [skill],
              hidden: false
            });
          }
        });
      }
    });

    return skills;
  }

  static categorizeSkill(skill) {
    const lowerSkill = skill.toLowerCase();
    
    if (lowerSkill.match(/javascript|python|java|c\+\+|typescript|go|rust|php|ruby/)) {
      return 'Programming Languages';
    } else if (lowerSkill.match(/react|node|angular|vue|express|django|spring|laravel/)) {
      return 'Frameworks & Libraries';
    } else if (lowerSkill.match(/aws|docker|kubernetes|git|jenkins|mongodb|mysql|postgresql/)) {
      return 'Tools & Technologies';
    } else if (lowerSkill.match(/communication|leadership|teamwork|problem.solving|time.management/)) {
      return 'Soft Skills';
    } else {
      return 'Technical Skills';
    }
  }

  static extractProjects(lines) {
    // Similar implementation for projects
    return [];
  }

  static extractCertifications(lines) {
    // Similar implementation for certifications
    return [];
  }
}