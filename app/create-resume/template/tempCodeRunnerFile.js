
"use client";
import { 
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaFolderOpen,
  FaCode,
  FaAward,
  FaCertificate,
  FaBook,
  FaStar,
  FaGlobe,
  FaLinkedin,
  FaGithub,
  FaTwitter
} from "react-icons/fa";
import { 
  formatMonthYear, 
  getLocationText, 
  shouldShowSection 
} from "../../utils/resumeUtils";
import PageBreakHandler from "../template/PageBreakHandler";

const ProfessionalTemplate = ({ data, profileImage }) => {
  const { 
    personalInfo, 
    profileSummary, 
    projects, 
    workExperience, 
    education, 
    skills, 
    interests,
    socialLinks,
    certificates,
    publications,
    awards,
    languages 
  } = data;

  // Platform icons with react-icons
  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'LinkedIn': return <FaLinkedin className="text-blue-600" />;
      case 'GitHub': return <FaGithub className="text-gray-800" />;
      case 'Twitter': return <FaTwitter className="text-blue-400" />;
      case 'Portfolio': return <FaGlobe className="text-green-600" />;
      default: return <FaGlobe className="text-gray-600" />;
    }
  };

  // Language level dots
  const renderLanguageLevel = (level) => {
    const levelDots = {
      beginner: 1,
      intermediate: 3,
      advanced: 4,
      native: 5,
    }[level?.toLowerCase()] || 0;

    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-3 w-3 rounded-full ${
              i < levelDots ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <PageBreakHandler template="professional">
      <div className="bg-white text-gray-800 p-8 mx-auto font-sans" style={{ width: '100%' }}>
       
        {/* Header Section */}
        <section className="page-section border-b-2 border-gray-200 pb-6 mb-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {personalInfo.headline && (
              <p className="text-xl text-gray-600 font-medium mb-4">{personalInfo.headline}</p>
            )}
          </div>
          
          <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600 mb-3">
            {personalInfo.email && (
              <span className="flex items-center gap-2">
                <FaEnvelope className="text-gray-500" /> 
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-2">
                <FaPhone className="text-gray-500" /> 
                {personalInfo.phone}
              </span>
            )}
            {getLocationText(personalInfo) && (
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-500" /> 
                {getLocationText(personalInfo)}
              </span>
            )}
          </div>

          {socialLinks?.filter(link => link.url).length > 0 && (
            <div className="flex justify-center flex-wrap gap-3 mt-2">
              {socialLinks.filter(link => link.url).map((link, i) => (
                <a
                  key={`social-${i}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-sm"
                >
                  {getPlatformIcon(link.platform)}
                  <span className="font-medium">
                    {link.platform === "Other" ? (link.customName || "Website") : link.platform}
                  </span>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* Profile Summary */}
        {profileSummary && (
          <section className="page-section mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200 flex items-center gap-2">
              <FaStar className="text-blue-600" /> Professional Summary
            </h2>
            <div
              className="text-gray-700 text-sm leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: profileSummary }}
            />
          </section>
        )}
        
        {/* Work Experience */}
        {shouldShowSection(workExperience) && (
          <section className="page-section mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
              <FaBriefcase className="text-blue-600" /> Work Experience
            </h2>
            <div className="space-y-6">
              {workExperience.filter(exp => !exp.hidden).map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                      <p className="text-gray-700 font-medium">{exp.company}</p>
                      {exp.employmentType && (
                        <p className="text-gray-600 text-sm">{exp.employmentType}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 font-medium text-sm">
                        {formatMonthYear(exp.startMonth, exp.startYear, 'long')} –{" "}
                        {exp.currentlyWorking ? "Present" : formatMonthYear(exp.endMonth, exp.endYear, 'long')}
                      </p>
                      {exp.location && (
                        <p className="text-gray-500 text-xs mt-1 flex items-center justify-end gap-1">
                          <FaMapMarkerAlt className="text-xs" /> {exp.location}
                        </p>
                      )}
                    </div>
                  </div>
                  {exp.description && (
                    <div
                      className="text-gray-700 text-sm leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: exp.description }}
                    />
                  )}
                  {exp.bullets?.length > 0 && (
                    <ul className="list-disc ml-5 mt-2 text-gray-700 text-sm space-y-1">
                      {exp.bullets.map((bullet, i) => (
                        <li key={`bullet-${exp.id}-${i}`}
                          className="text-gray-700 text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: bullet }}
                        />
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {shouldShowSection(education) && (
          <section className="page-section mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
              <FaGraduationCap className="text-green-600" /> Education
            </h2>
            <div className="space-y-5">
              {education.filter(edu => !edu.hidden).map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-700">{edu.college}</p>
                      {edu.specialisation && (
                        <p className="text-gray-600 text-sm">Specialization: {edu.specialisation}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 font-medium text-sm">
                        {formatMonthYear(edu.startMonth, edu.startYear, 'long')} –{" "}
                        {edu.currentlyStudying ? "Present" : formatMonthYear(edu.endMonth, edu.endYear, 'long')}
                      </p>
                      {edu.marks && (
                        <p className="text-gray-500 text-xs mt-1">GPA: {edu.marks}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {shouldShowSection(projects) && (
          <section className="page-section mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
              <FaFolderOpen className="text-purple-600" /> Projects
            </h2>
            <div className="space-y-6">
              {projects.filter(project => !project.hidden).map((project) => (
                <div key={project.id} className="break-inside-avoid">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                      {project.organization && (
                        <p className="text-gray-700 text-sm">{project.organization}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 font-medium text-sm">
                        {formatMonthYear(project.startMonth, project.startYear, 'long')} –{" "}
                        {project.currentlyWorking ? "Present" : formatMonthYear(project.endMonth, project.endYear, 'long')}
                      </p>
                    </div>
                  </div>
                  {project.url && (
                    <a href={project.url} target="_blank" className="text-blue-600 text-sm hover:underline block mb-2 flex items-center gap-1">
                      <FaGlobe className="text-xs" /> View Project
                    </a>
                  )}
                  {project.description && (
                    <div
                      className="text-gray-700 text-sm leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    />
                  )}
                  {project.bullets?.length > 0 && (
                    <ul className="list-disc ml-5 mt-2 text-gray-700 text-sm space-y-1">
                      {project.bullets.map((bullet, i) => (
                        <li
                          key={`project-bullet-${project.id}-${i}`}
                          className="text-gray-700 text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: bullet }}
                        />
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <section className="page-section mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
              <FaCode className="text-orange-600" /> Skills
            </h2>
            <div className="space-y-4">
              {skills.map((category, idx) => (
                <div key={`skill-category-${idx}`} className="break-inside-avoid">
                  <h4 className="font-semibold text-gray-800 text-base mb-2">{category.categoryName}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                      <span
                        key={`skill-${idx}-${i}`}
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm border border-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certificates */}
        {shouldShowSection(certificates) && (
          <section className="page-section mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
              <FaCertificate className="text-red-600" /> Certifications
            </h2>
            <div className="space-y-3">
              {certificates.filter(cert => !cert.hidden).map((cert) => (
                <div key={cert.id} className="pl-4 border-l-2 border-red-400 break-inside-avoid">
                  <h3 className="text-base font-semibold text-gray-900">{cert.name}</h3>
                  <p className="text-gray-700 text-sm">{cert.authority}</p>
                  {cert.issueDate && <p className="text-gray-600 text-xs">Issued: {cert.issueDate}</p>}
                  {cert.url && (
                    <a href={cert.url} target="_blank" className="text-blue-600 text-sm hover:underline flex items-center gap-1">
                      <FaGlobe className="text-xs" /> View Certificate
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Awards */}
        {shouldShowSection(awards) && (
          <section className="page-section mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
              <FaAward className="text-yellow-600" /> Awards & Achievements
            </h2>
            <div className="space-y-3">
              {awards.filter(award => !award.hidden).map((award) => (
                <div key={award.id} className="pl-4 border-l-2 border-yellow-400 break-inside-avoid">
                  <h3 className="text-base font-semibold text-gray-900">{award.title}</h3>
                  <p className="text-gray-700 text-sm flex items-center">
                    <span>Issued by: {award.issuer}</span> 
                    {award.url && ( 
                      <span> 
                        <a target="_blank" href={`${award.url}`} className="ms-3 font-bold text-gray-700 flex items-center gap-1">
                          <FaGlobe className="text-xs" /> View Link
                        </a>
                      </span>
                    )}
                  </p>
                  {award.description && (
                    <div
                      className="text-gray-700 text-sm leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: award.description }}
                    /> 
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Publications */}
        {shouldShowSection(publications) && (
          <section className="page-section mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
              <FaBook className="text-indigo-600" /> Publications
            </h2>
            <div className="space-y-3">
              {publications.filter(pub => !pub.hidden).map((pub) => (
                <div key={pub.id} className="pl-4 border-l-2 border-indigo-400 break-inside-avoid">
                  <h3 className="text-base font-semibold text-gray-900">{pub.title}</h3>
                  <p className="text-gray-700 text-sm flex items-center">
                    <span>Published by: {pub.publisher}</span> 
                    {pub.url && ( 
                      <span> 
                        <a target="_blank" href={`${pub.url}`} className="ms-3 font-bold text-gray-700 flex items-center gap-1">
                          <FaGlobe className="text-xs" /> View Link
                        </a>
                      </span>
                    )}
                  </p>
                  {pub.authors && <p className="text-gray-600 text-xs">Authors: {pub.authors}</p>}
                  {pub.publicationMonth && pub.publicationYear && (
                    <p className="text-gray-600 text-xs">
                      Published: {formatMonthYear(pub.publicationMonth, pub.publicationYear, 'long')}
                    </p>
                  )}
                  {pub.description && 
                    <div
                      className="text-gray-700 text-sm leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: pub.description }}
                    /> 
                  }
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Interests */}
        {interests?.length > 0 && (
          <section className="page-section mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200 flex items-center gap-2">
              <FaStar className="text-pink-600" /> Professional Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, idx) => (
                <span
                  key={`interest-${idx}`}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm border border-gray-300"
                >
                  {interest}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages?.length > 0 && (
          <section className="page-section mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200 flex items-center gap-2">
              <FaGlobe className="text-blue-600" /> Languages
            </h2>
            <div className="flex flex-col gap-3">
              {languages.map((language, idx) => (
                <div
                  key={`language-${idx}`}
                  className="flex items-center justify-between w-full break-inside-avoid"
                >
                  <div className="text-gray-800 font-medium">
                    {language.name || "Unknown"}
                  </div>
                  {renderLanguageLevel(language.level)}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </PageBreakHandler>
  );
};

export default ProfessionalTemplate;