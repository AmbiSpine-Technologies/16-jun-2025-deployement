"use client";
import React from "react";
import { CheckCircle2, XCircle, AlertCircle, Zap, ExternalLink } from "lucide-react";
import Modal from "../components/Modal";
import Button from "../components/button/Button2";
import { Buttonborder } from "../components/Button";
import { BookOpen, Award, Layers, GitPullRequest } from "lucide-react";

// --- Mock User Profile (In real app, fetch from Context/API) ---
const currentUserProfile = {
  role: "Senior MERN Stack Developer",
  experience: 5,
  skills: [
    "React", "Node.js", "Express.js", "MongoDB", "JavaScript", 
    "TypeScript", "Tailwind CSS", "AWS", "Docker", "Next.js", 
    "Redux", "GraphQL"
  ],
  projects: [
    { name: "E-commerce Platform", description: "Full-stack MERN app with payment integration." },
    { name: "Personal Portfolio", description: "Built with HTML and CSS." },
  ],
  certifications: [ "AWS Certified Developer", "React Advanced Course" ],
  education: "Bachelor's in Computer Science",
};

export default function JobMatchModal({ isOpen, onClose, job,  }) {
  if (!job) return null;

  // --- 1. ANALYSIS LOGIC ---

  // Skills
  const matchedSkills = job.skills.filter((skill) =>
    currentUserProfile.skills.some((s) => s.toLowerCase() === skill.toLowerCase())
  );
  const missingSkills = job.skills.filter((skill) =>
    !currentUserProfile.skills.some((s) => s.toLowerCase() === skill.toLowerCase())
  );

  // Experience
  const minExp = parseInt(job.experience) || 0;
  const expGap = minExp - currentUserProfile.experience;
  const isExpMatch = expGap <= 0;

  // Role
  const isRoleMatch =
    job.title.toLowerCase().includes(currentUserProfile.role.toLowerCase()) ||
    currentUserProfile.role.toLowerCase().includes(job.title.toLowerCase());


  const projectKeywords = ["Dashboard", "Fintech", "AI", "Mobile", "SaaS"];
  const suggestedProjects = projectKeywords.filter(keyword => 
    job.description.toLowerCase().includes(keyword.toLowerCase()) &&
    !currentUserProfile.projects.some(p => p.description.toLowerCase().includes(keyword.toLowerCase()) || p.name.toLowerCase().includes(keyword.toLowerCase()))
  );

  const generateAIAnalysis = () => {
  const analysis = {
    skills: [],
    projects: [],
    certs: []
  };

  // 1. SKILLS ANALYSIS
  if (missingSkills.length > 0) {
    const topMissing = missingSkills.slice(0, 3).join(", ");
    analysis.skills.push(
      `You are missing critical skills: ${topMissing}. Mastering these could increase your salary potential by 20% for this role.`
    );

  }

// 2. PROJECT ANALYSIS
const jobDesc = job.description.toLowerCase();
const userProjectsStr = JSON.stringify(currentUserProfile.projects).toLowerCase();

// Check for Open Source
const hasOpenSource = userProjectsStr.includes("open source");
if (!hasOpenSource) {
  analysis.projects.push(
    "This role cares about giving back to the community. If you contribute to an open-source project, your profile will stand out more."
  );
}

// Check for Missing Domain Projects based on your Skills Gap (Python, AI, ML)
const domains = [
  { key: "ai", label: "Artificial Intelligence" },
  { key: "machine learning", label: "Machine Learning" },
  // { key: "python", label: "Python-based Automation" }
];

domains.forEach(domain => {
  // Agar job mein ye skill required hai par user ke projects mein nahi hai
  if (jobDesc.includes(domain.key) && !userProjectsStr.includes(domain.key)) {
    analysis.projects.push(
      `Missing ${domain.label} Project: Since the job requires ${domain.key.toUpperCase()}, building a dedicated project in this domain is highly recommended to prove your expertise.`
    );
  }
});

if (analysis.projects.length === 0) {
  analysis.projects.push("Your current projects align well. Consider adding technical documentation to your existing repositories.");
}

  // 3. CERTIFICATION ANALYSIS
const certKeywords = ["aws", "azure", "google cloud", "docker", "kubernetes", "pmp", "react", "node"];
const jobCerts = certKeywords.filter(c => job.requirements.some(r => r.toLowerCase().includes(c)));
const myCerts = currentUserProfile.certifications?.map(c => c.toLowerCase()) || [];

const missingCertsList = jobCerts.filter(c => !myCerts.some(mc => mc.includes(c)));

if (missingCertsList.length > 0) {
  // Sabhi certificates ke naam ko uppercase mein convert karke comma se join karna
  const certNames = missingCertsList.map(c => c.toUpperCase()).join(", ");
  const count = missingCertsList.length;

  analysis.certs.push(
    `This role explicitly requires ${count} certifications: ${certNames}. Earning these will strongly validate your expertise for this position.`
  );
}

  return analysis;
};

const aiAdvice = generateAIAnalysis();
  // --- 3. SCORING ---
  const totalCriteria = job.skills.length + 2 + 5; // Arbitrary total weight
  let matchCount = matchedSkills.length;
  if (isExpMatch) matchCount += 2;
  if (isRoleMatch) matchCount += 2;
  // Add partial points for projects/certs logic if needed
  
  // Safe calculation to avoid >100% or NaN
  const rawPercentage = Math.round((matchCount / (job.skills.length + 4)) * 100); 
  const matchPercentage = Math.min(Math.max(rawPercentage, 10), 98); // Clamp between 10% and 98%

  const scoreColor = matchPercentage > 75 ? "text-green-600" : matchPercentage > 50 ? "text-orange-500" : "text-red-600";
  const circleColor = matchPercentage > 75 ? "border-green-600" : matchPercentage > 50 ? "border-orange-500" : "border-red-600";

  return (
    <Modal show={isOpen} onClose={onClose} title="Profile Match Analysis" widthClass="max-w-5xl">
      <div className="space-y-6 pb-6">

        {/* Top Section: Score */}
        <div className="flex flex-col md:flex-row items-center gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <div className={`relative w-24 h-24 rounded-full border-4 ${circleColor} flex items-center justify-center bg-white shadow-sm`}>
            <span className={`text-2xl font-bold ${scoreColor}`}>{matchPercentage}%</span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-gray-900">
              {matchPercentage > 75 ? "Great Match!" : "Potential Gap"}
            </h4>
            <p className="text-gray-600 text-sm mt-1">
              Your profile matches <strong>{matchPercentage}%</strong> for <strong>{job.title}</strong> at {job.companyName}.
            </p>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid custom-scroll overflow-y-auto  grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left Column: Requirements & Analysis */}
          <div className="space-y-4">
            <h5 className="font-semibold text-gray-900 border-b border-gray-300 pb-2">Job Requirements</h5>

            {/* Role Check */}
            <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 bg-white shadow-sm">
              <div className="mt-1">
                {isRoleMatch ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-500" />}
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-medium">Role Alignment</p>
                <p className="text-sm font-medium text-gray-900">{job.title}</p>
                {!isRoleMatch && <p className="text-xs text-red-500 mt-1">Targeting: {currentUserProfile.role}</p>}
              </div>
            </div>

            {/* Experience Check */}
            <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 bg-white shadow-sm">
              <div className="mt-1">
                {isExpMatch ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <AlertCircle className="w-5 h-5 text-orange-500" />}
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-medium">Experience Level</p>
                <p className="text-sm font-medium text-gray-900">{job.experience} Years Required</p>
                {!isExpMatch && <p className="text-xs text-orange-500 mt-1">You have {currentUserProfile.experience} years</p>}
              </div>
            </div>

            {/* --- DYNAMIC AI TIP SECTION --- */}
                             <div className="mt-6">
  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100 relative overflow-hidden">
    
    {/* Background decoration */}
    <div className="absolute top-0 right-0 -mt-2 -mr-2 w-20 h-20 bg-blue-100 rounded-full opacity-50 blur-xl"></div>

    <div className="relative z-10">
      
      {/* Main Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-white p-1.5 rounded-lg shadow-sm">
          <Zap className="w-5 h-5 text-blue-600 fill-blue-600" />
        </div>
        <h4 className="font-bold text-blue-900 text-sm uppercase tracking-wide">
          AI Smart Analysis
        </h4>
        <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full ml-auto">
          Personalized
        </span>
      </div>

      <div className="space-y-4">
        
        {/* CATEGORY 1: SKILLS ANALYSIS */}
        {aiAdvice.skills.length > 0 && (
          <div className="bg-white/60 p-3 rounded-lg border border-white/50">
            <h5 className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
              <BookOpen size={14} className="text-orange-500" />
              Skills Analysis
            </h5>
            <div className="space-y-2">
              {aiAdvice.skills.map((tip, idx) => (
                <div key={idx} className="flex gap-2 items-start text-xs text-slate-600 leading-relaxed">
                  <div className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 shrink-0" />
                  <p>{tip}</p>
                </div>
              ))}
               {/* Skill CTA */}

            </div>
          </div>
        )}

        {/* CATEGORY 2: PROJECT ANALYSIS */}
        {aiAdvice.projects.length > 0 && (
          <div className="bg-white/60 p-3 rounded-lg border border-white/50">
            <h5 className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
              <GitPullRequest size={14} className="text-purple-500" />
              Project Recommendations
            </h5>
            <div className="space-y-2">
              {aiAdvice.projects.map((tip, idx) => (
                <div key={idx} className="flex gap-2 items-start text-xs text-slate-600 leading-relaxed">
                   <div className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 shrink-0" />
                   <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* CATEGORY 3: CERTIFICATES */}
        {aiAdvice.certs.length > 0 && (
          <div className="bg-white/60 p-3 rounded-lg border border-white/50">
            <h5 className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
              <Award size={14} className="text-green-600" />
              Certification Strategy
            </h5>
            <div className="space-y-2">
              {aiAdvice.certs.map((tip, idx) => (
                <div key={idx} className="flex gap-2 items-start text-xs text-slate-600 leading-relaxed">
                   <div className="mt-1.5 w-1 h-1 rounded-full bg-green-500 shrink-0" />
                   <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  </div>
</div>

          </div>

          {/* Right Column: Skills & Projects Breakdown */}
    
<div className="space-y-4">
  <h5 className="font-semibold text-gray-900 border-b border-gray-300 pb-2">Skills & Portfolio</h5>

  <div className="pr-2 custom-scroll space-y-4">
    
    {/* ---------------- SKILLS SECTION ---------------- */}
    <div>
       <p className="text-xs font-bold text-gray-500 mb-2 uppercase">Skills</p>
       <div className="space-y-2">
         {matchedSkills.map((skill, idx) => (
           <div key={`m-${idx}`} className="flex items-center justify-between p-2 bg-green-50 rounded border border-green-100">
             <span className="text-sm font-medium text-green-800">{skill}</span>
             <CheckCircle2 className="w-4 h-4 text-green-600" />
           </div>
         ))}
         {missingSkills.map((skill, idx) => (
           <div key={`ms-${idx}`} className="flex items-center justify-between p-2 bg-red-50 rounded border border-red-100 group">
             <span className="text-sm font-medium text-red-800">{skill}</span>
             <div className="flex items-center gap-2">
               <span className="text-[10px] text-red-600 font-medium uppercase opacity-70">Required</span>
               <XCircle className="w-4 h-4 text-red-500" />
             </div>
           </div>
         ))}
       </div>
    </div>


   {/* ---------------- PROJECTS SECTION ---------------- */}
<div>
  <h5 className="font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-2">Projects Analysis</h5>
  
  {/* 1. Logic to show Matched and Non-Matched User Projects */}
  {currentUserProfile.projects.map((proj, idx) => {
    // Logic: Agar project ka naam ya description job description mein hai
    const isRelevant = job.description.toLowerCase().includes(proj.name.toLowerCase().split(" ")[0]) || 
                       job.description.toLowerCase().includes(proj.description.toLowerCase().split(" ")[0]);

    if (isRelevant) {
      return (
        <div key={`match-${idx}`} className="flex items-center justify-between p-2 bg-green-50 rounded border border-green-100 mb-2">
          <div>
            <span className="text-sm font-medium text-green-900">{proj.name}</span>
            <p className="text-[10px] text-green-700">Perfect Match: Relevant to job domain</p>
          </div>
          <CheckCircle2 className="w-4 h-4 text-green-600" />
        </div>
      );
    } else {
      return (
        <div key={`no-match-${idx}`} className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200 mb-2 opacity-75">
          <div>
            <span className="text-sm font-medium text-gray-600">{proj.name}</span>
            <p className="text-[10px] text-gray-400">Not directly relevant to this role</p>
          </div>
          <AlertCircle className="w-4 h-4 text-gray-400" />
        </div>
      );
    }
  })}

  {/* 2. Show MISSING Project Domains (Jo Job mang raha hai par user ke paas nahi hai) */}
  {(() => {
    const criticalKeywords = ["AI", "Python", "Machine Learning"];
    const jobDescriptionLower = job.description.toLowerCase();
    const userProjectsLower = JSON.stringify(currentUserProfile.projects).toLowerCase();

    return criticalKeywords
      .filter(k => jobDescriptionLower.includes(k.toLowerCase()) && !userProjectsLower.includes(k.toLowerCase()))
      .map((keyword, idx) => (
        <div key={`missing-${idx}`} className="flex items-center justify-between p-2 bg-red-50 rounded border border-red-100 mb-2">
          <div>
            <span className="text-sm font-medium text-red-900">Missing: {keyword} Project</span>
            <p className="text-[10px] text-red-600">The employer is looking for {keyword} experience.</p>
          </div>
          <XCircle className="w-4 h-4 text-red-500" />
        </div>
      ));
  })()}
</div>

    {/* ---------------- CERTIFICATIONS SECTION ---------------- */}
    <div>
      <h5 className="font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-2">Certifications</h5>
      
      {/* 1. Calculate Missing Certs Logic */}
      {(() => {
        // Common certs to look for
        const certList = ["AWS", "Azure", "Google Cloud", "PMP", "React", "Node", "Cisco"];
        // Certs the JOB wants
        const jobRequires = certList.filter(c => job.requirements.some(r => r.toLowerCase().includes(c.toLowerCase())));
        // Certs the USER has
        const userHas = currentUserProfile.certifications.map(c => c.toLowerCase());
        
        // Find diff
        const missingCerts = jobRequires.filter(req => !userHas.some(userCert => userCert.includes(req.toLowerCase())));
        const matchedCerts = currentUserProfile.certifications.filter(c => jobRequires.some(req => c.toLowerCase().includes(req.toLowerCase())));

        return (
          <div className="space-y-2">
            
            {/* Show Matched */}
            {matchedCerts.map((cert, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-green-50 rounded border border-green-100">
                <span className="text-sm font-medium text-green-800">{cert}</span>
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
            ))}

            {/* Show Missing (The Error You Wanted) */}
            {missingCerts.map((cert, i) => (
              <div key={`mc-${i}`} className="flex items-center justify-between p-2 bg-red-50 rounded border border-red-100">
                 <div>
                   <span className="text-sm font-medium text-red-800">Missing: {cert}</span>
                   <p className="text-[10px] text-red-600">Explicitly listed in requirements</p>
                 </div>
                 <XCircle className="w-4 h-4 text-red-500" />
              </div>
            ))}

            {/* If user has certs but they aren't relevant */}
            {currentUserProfile.certifications
              .filter(c => !matchedCerts.includes(c))
              .map((cert, i) => (
                <div key={`oc-${i}`} className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200 opacity-60">
                   <span className="text-sm text-gray-500">{cert}</span>
                </div>
            ))}
          </div>
        );
      })()}
    </div>

  </div>
</div>
        </div>

      </div>

      {/* Sticky Bottom Action */}
      <div className="sticky bottom-0 bg-white p-4 flex justify-between items-center border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] -mx-6 -mb-6 rounded-b-xl z-50">
         <div className="text-xs text-gray-500">
            {matchPercentage < 50 
              ? "Low match score. Applying might be risky." 
              : "Good match! Recommended to apply."}
         </div>
         <div className="flex gap-3">
             <Buttonborder name="Close" onClick={onClose} />
             <Button name="Apply Anyway" />
         </div>
      </div>
    </Modal>
  );
}