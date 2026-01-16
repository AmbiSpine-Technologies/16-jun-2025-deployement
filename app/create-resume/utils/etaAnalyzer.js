// Simple ETA estimator for resume building
// Inputs: resumeData
// Output: { minutes, score, breakdown }

export function estimateETA(data) {
  const breakdown = [];
  let minutes = 0;
  let score = 0;

  const personal = data.personalInfo || {};
  const hasName = personal.firstName && personal.lastName;
  const hasEmail = personal.email && personal.email.includes("@");
  const hasHeadline = personal.headline && personal.headline.length > 10;

  // Personal info
  if (!hasName) {
    breakdown.push({ item: 'Name', missing: true, est: 2 });
    minutes += 2;
  } else {
    score += 10;
  }
  if (!hasEmail) {
    breakdown.push({ item: 'Email', missing: true, est: 1 });
    minutes += 1;
  } else {
    score += 10;
  }
  if (!hasHeadline) {
    breakdown.push({ item: 'Headline', missing: true, est: 3 });
    minutes += 3;
  } else {
    score += 5;
  }

  // Profile summary
  const summary = data.profileSummary || '';
  if (!summary || summary.trim().length < 50) {
    breakdown.push({ item: 'Profile summary', missing: true, est: 8 });
    minutes += 8;
  } else {
    score += 10;
  }

  // Work experience
  const work = Array.isArray(data.workExperience) ? data.workExperience : [];
  if (work.length === 0) {
    breakdown.push({ item: 'Work experience', missing: true, est: 15 });
    minutes += 15;
  } else {
    // per entry
    work.forEach((w) => {
      const empty = (!w.title || !w.company || (!w.bullets || w.bullets.length === 0));
      if (empty) {
        breakdown.push({ item: `Work: ${w.title || 'Untitled'}`, missing: true, est: 8 });
        minutes += 8;
      } else {
        score += 2;
      }
    });
  }

  // Projects
  const projects = Array.isArray(data.projects) ? data.projects : [];
  if (projects.length === 0) {
    breakdown.push({ item: 'Projects', missing: true, est: 6 });
    minutes += 6;
  } else {
    projects.forEach((p) => {
      if (!p.title || !p.bullets || p.bullets.length === 0) {
        breakdown.push({ item: `Project: ${p.title || 'Untitled'}`, missing: true, est: 4 });
        minutes += 4;
      } else {
        score += 1;
      }
    });
  }

  // Skills
  const skills = Array.isArray(data.skills) ? data.skills : (data.skills && data.skills.technical ? data.skills.technical : []);
  if (!skills || skills.length === 0) {
    breakdown.push({ item: 'Skills', missing: true, est: 5 });
    minutes += 5;
  } else {
    score += Math.min(10, skills.length);
  }

  // normalize score
  score = Math.min(100, Math.round(score));

  // base fudge time for review
  minutes += 5;

  return { minutes, score, breakdown };
}

// Small quick analyzer that returns recommendations and a normalized score.
export function analyzeResume(data) {
  const recommendations = [];
  let score = 0;
  const personal = data.personalInfo || {};

  if (personal.firstName && personal.lastName) score += 15;
  else recommendations.push('Add your full name');

  if (personal.email && personal.email.includes('@')) score += 10;
  else recommendations.push('Add a valid email address');

  if (personal.headline && personal.headline.length > 5) score += 10;
  else recommendations.push('Write a stronger headline / preferred job title');

  const summary = data.profileSummary || '';
  if (summary.trim().length >= 50) score += 15;
  else recommendations.push('Expand your professional summary to ~50+ characters');

  const work = Array.isArray(data.workExperience) ? data.workExperience : [];
  if (work.length === 0) {
    recommendations.push('Add at least one work experience entry');
  } else {
    work.forEach((w) => {
      if (w.title && w.company) score += 3;
      else recommendations.push(`Complete work entry: ${w.title || 'Untitled'}`);
    });
  }

  const projects = Array.isArray(data.projects) ? data.projects : [];
  if (projects.length === 0) recommendations.push('Add relevant projects (if any)');
  else score += Math.min(10, projects.length * 2);

  const skills = Array.isArray(data.skills) ? data.skills : (data.skills && data.skills.technical ? data.skills.technical : []);
  if (!skills || skills.length === 0) recommendations.push('List 5-10 key technical skills');
  else score += Math.min(20, skills.length);

  score = Math.max(0, Math.min(100, Math.round(score)));

  return {
    score,
    recommendations,
    analyzedAt: new Date().toISOString(),
  };
}

// Lightweight plain-text resume parser.
// Attempts to extract name, email, phone, headline, summary, skills, work lines, and projects.
export function parseResumeText(text) {
  if (!text || typeof text !== 'string') return {};
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const resume = {
    personalInfo: { firstName: '', lastName: '', email: '', phone: '', headline: '' },
    profileSummary: '',
    skills: [],
    workExperience: [],
    projects: [],
  };

  // simple regexes
  const emailRe = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
  const phoneRe = /(?:\+?\d{1,3}[\s-]?)?(?:\(\d{2,4}\)[\s-]?|\d{2,4}[\s-])?\d{6,10}/;

  // find email & phone
  for (const line of lines) {
    const e = line.match(emailRe);
    if (e && !resume.personalInfo.email) resume.personalInfo.email = e[0];
    const p = line.match(phoneRe);
    if (p && !resume.personalInfo.phone) resume.personalInfo.phone = p[0];
  }

  // heuristics: first line may be name + headline
  if (lines.length > 0) {
    const first = lines[0];
    const parts = first.split(/\s{2,}| - | — |\|/).map(s => s.trim()).filter(Boolean);
    if (parts.length >= 1) {
      const nameParts = parts[0].split(' ').filter(Boolean);
      resume.personalInfo.firstName = nameParts[0] || '';
      resume.personalInfo.lastName = nameParts.slice(1).join(' ') || '';
    }
    if (parts.length >= 2) resume.personalInfo.headline = parts[1];
  }

  // find skills line (keywords: skills, technical skills)
  for (const line of lines) {
    const low = line.toLowerCase();
    if (low.startsWith('skills') || low.includes('skills:') || low.includes('technical skills')) {
      const after = line.split(/:\s*/).slice(1).join(':').trim();
      const items = after.split(/[ ,;|]+/).map(s => s.trim()).filter(Boolean);
      resume.skills = items.slice(0, 30);
      break;
    }
  }

  // naive project/work detection: lines that start with dates or contain company keywords
  const workCandidates = [];
  for (const line of lines) {
    if (/\b(company|inc|llc|ltd|co\.|corporation|corp)\b/i.test(line) || /\d{4}/.test(line)) {
      workCandidates.push(line);
    }
  }
  resume.workExperience = workCandidates.slice(0, 5).map((l, idx) => ({ id: `w${idx}`, title: l, company: '', bullets: [] }));

  // profile summary: pick the first paragraph longer than 40 chars after header
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].length > 40) {
      resume.profileSummary = lines[i];
      break;
    }
  }

  return resume;
}
