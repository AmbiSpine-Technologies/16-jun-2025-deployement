
import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGlobe,
  FaBriefcase,
  FaGraduationCap,
  FaFolderOpen,
  FaCode,
  FaAward,
  FaCertificate,
  FaBook,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";
import { formatMonthYear, getPlatformIcon } from '../../utils/resumeUtils';
import PageBreakHandler from "../template/PageBreakHandler";
import { useSelector } from "react-redux";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";

const CreativeTemplate = ({ data, profileImage }) => {
  const { 
    personalInfo = {}, 
    profileSummary, 
    projects = [], 
    workExperience = [], 
    education = [], 
    skills = [], 
    interests = [],
    socialLinks = [],
    certificates = [],
    publications = [],
    awards = [],
    languages = [] 
  } = data || {};

  const currentUser = useSelector((state) => state.users?.currentUser);
  const avatarSrc = profileImage || currentUser?.avatar || personalInfo?.avatar;

  const shouldShowSection = (items) => items && items.filter(item => !item.hidden).length > 0;

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
            className={`h-2 w-2 rounded-full ${i < levelDots ? "bg-blue-600" : "bg-gray-300"}`}
          />
        ))}
      </div>
    );
  };

  return (
    <PageBreakHandler template="creative">
      <div className="min-h-screen font-sans text-gray-800">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* TOP HEADER */}
          <div className="relative bg-white p-8 border-b border-gray-600">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
                  {personalInfo.firstName} {personalInfo.lastName}
                </h1>
                {personalInfo.headline && (
                  <p className="text-blue-600 font-medium mt-1">{personalInfo.headline}</p>
                )}

                {/* contact small */}
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                  {personalInfo.email && (
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-blue-500" />
                      <span>{personalInfo.email}</span>
                    </div>
                  )}
                  {personalInfo.phone && (
                    <div className="flex items-center gap-2">
                      <FaPhone className="text-blue-500" />
                      <span>{personalInfo.phone}</span>
                    </div>
                  )}
                  {(personalInfo.city || personalInfo.state || personalInfo.country) && (
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-blue-500" />
                      <span>{[personalInfo.city, personalInfo.state, personalInfo.country].filter(Boolean).join(', ')}</span>
                    </div>
                  )}
                </div>
                
                {/* Social Links - FIXED: removed hover:text-white */}
                {socialLinks?.filter(link => link.url).length > 0 && (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-3 items-center">
                      {socialLinks.filter(link => link.url).map((link, i) => (
                        <a
                          key={`social-${i}`}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                        >
                          {getPlatformIcon(link.platform)}
                          <span>
                            {link.platform === "Other" ? (link.customName || "Website") : link.platform}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* profile image - top right */}
              <div className="mt-4 md:mt-0 md:ml-6 flex items-center">
                {avatarSrc ? (
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white">
                    <img src={avatarSrc} alt="profile" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                    {personalInfo.firstName?.[0] || "U"}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* MAIN GRID: Left = main content, Right = sidebar */}
          <div className="md:flex md:space-x-6 p-8">
            {/* LEFT COLUMN (Main) */}
            <div className="md:w-2/3 space-y-8">
              {/* ABOUT / SUMMARY */}
              {profileSummary && (
                <section className="page-section">
                  <h3 className="text-lg font-semibold border-b border-gray-500 text-gray-900 mb-3 flex items-center gap-2">
                    <FaStar className="text-blue-600" /> Summary
                  </h3>
                  <div className="text-gray-700 leading-relaxed rounded">
                    <div dangerouslySetInnerHTML={{ __html: profileSummary }} />
                  </div>
                </section>
              )}

              {/* WORK EXPERIENCE */}
              {shouldShowSection(workExperience) && (
                <section className="page-section">
                  <h3 className="text-lg font-semibold border-b border-gray-500 text-gray-900 mb-4 flex items-center gap-2">
                    <FaBriefcase className="text-blue-600" /> Experience
                  </h3>
                  <div className="space-y-4">
                    {workExperience.filter(e => !e.hidden).map((exp) => (
                      <div key={exp.id} className="page-section">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-lg font-semibold">{exp.title}</h4>
                            <p className="text-sm text-blue-600 font-bold">{exp.company}</p>
                            <div className="flex items-center mt-1">
                              {exp.startYear && (
                                <p className="text-xs flex items-center gap-2 text-gray-600 px-2 py-1 rounded">
                                  <MdOutlineDateRange /> {formatMonthYear(exp.startMonth, exp.startYear, 'long')} – {exp.currentlyWorking ? "Present" : formatMonthYear(exp.endMonth, exp.endYear, 'long')}
                                </p>
                              )}
                              {exp.location && <p className="text-xs text-gray-500 ml-3 flex items-center gap-2"><IoLocationSharp /> {exp.location}</p>}
                            </div>
                            {exp.employmentType && <p className="text-xs text-gray-500 mt-1">{exp.employmentType}</p>}
                          </div>
                        </div>

                        {exp.description && (
                          <div className="mt-2 text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: exp.description }} />
                        )}

                        {exp.bullets?.length > 0 && (
                          <ul className="list-disc ml-5 mt-2 text-sm text-gray-700 space-y-1">
                            {exp.bullets.map((b, i) => (
                              <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* PROJECTS */}
              {shouldShowSection(projects) && (
                <section className="page-section">
                  <h3 className="text-lg font-semibold border-b border-gray-500 text-gray-900 mb-4 flex items-center gap-2">
                    <FaFolderOpen className="text-blue-600" /> Projects
                  </h3>
                  <div className="space-y-4">
                    {projects.filter(p => !p.hidden).map((p) => (
                      <div key={p.id} className="page-section">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{p.title}</h4>
                            {p.organization && <p className="text-sm text-gray-700">{p.organization}</p>}
                          </div>
                          <div className="text-right">
                            {p.startMonth && (
                              <p className="text-xs text-gray-600 px-2 py-1 flex items-center gap-2 rounded">
                                <MdOutlineDateRange /> {formatMonthYear(p.startMonth, p.startYear, 'long')} – {p.currentlyWorking ? "Present" : formatMonthYear(p.endMonth, p.endYear, 'long')}
                              </p>
                            )}
                          </div>
                        </div>

                        {p.url && (
                          <a href={p.url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline mt-2 inline-flex items-center gap-2">
                            <FaGlobe /> View Project
                          </a>
                        )}

                        {p.description && (
                          <div className="mt-2 text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: p.description }} />
                        )}

                        {p.bullets?.length > 0 && (
                          <ul className="list-disc ml-5 mt-2 text-sm text-gray-700">
                            {p.bullets.map((b, i) => <li key={i} dangerouslySetInnerHTML={{ __html: b }} />)}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* RIGHT COLUMN (Sidebar) */}
            <aside className="md:w-1/3 mt-8 md:mt-0">
              <div className="sticky top-8 space-y-6">
                {/* EDUCATION */}
                {shouldShowSection(education) && (
                  <section className="page-section">
                    <h3 className="text-lg font-semibold border-b border-gray-500 text-gray-900 mb-4 flex items-center gap-2">
                      <FaGraduationCap className="text-blue-600" /> Education
                    </h3>
                    <div className="space-y-3">
                      {education.filter(e => !e.hidden).map((edu) => (
                        <div key={edu.id} className="page-section">
                          <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                          <p className="text-sm text-gray-700">{edu.college}</p>
                          <p className="text-xs text-gray-600 mt-1">
                            {formatMonthYear(edu.startMonth, edu.startYear, 'long')} – {edu.currentlyStudying ? "Present" : formatMonthYear(edu.endMonth, edu.endYear, 'long')}
                          </p>
                          {edu.marks && <p className="text-xs text-gray-500 mt-1">GPA: {edu.marks}</p>}
                          {edu.specialisation && <p className="text-xs text-gray-500">Specialization: {edu.specialisation}</p>}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Skills */}
                {skills?.length > 0 && (
                  <section className="page-section">
                    <h3 className="text-lg font-semibold border-b border-gray-500 text-gray-900 mb-3 flex items-center gap-2">
                      <FaCode className="text-blue-600" /> Skills
                    </h3>
                    <div className="space-y-3 text-sm">
                      {skills.map((cat, i) => (
                        <div key={i}>
                          <div className="font-semibold text-gray-600 mb-1">{cat.categoryName}:</div>
                          <div className="flex flex-wrap gap-2">
                            {cat.skills.map((s, j) => (
                              <span key={j} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Awards */}
                {shouldShowSection(awards) && (
                  <section className="page-section">
                    <h3 className="text-lg font-semibold border-b border-gray-500 text-gray-900 mb-3 flex items-center gap-2">
                      <FaAward className="text-blue-600" /> Strengths
                    </h3>
                    <div className="space-y-3">
                      {awards.filter(award => !award.hidden).map((award) => (
                        <div key={award.id} className="page-section">
                          <h4 className="font-semibold text-gray-900">{award.title}</h4>
                          <p className="text-gray-700 text-sm">{award.issuer}</p>
                          {award.description && (
                            <div
                              className="text-gray-700 text-sm mt-1"
                              dangerouslySetInnerHTML={{ __html: award.description }}
                            />
                          )}
                          {award.url && (
                            <a href={award.url} target="_blank" className="text-blue-600 text-sm hover:underline flex items-center gap-1">
                              <FaGlobe className="text-xs" /> View Award
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Certificates */}
                {shouldShowSection(certificates) && (
                  <section className="page-section">
                    <h3 className="text-lg font-semibold border-b border-gray-500 text-gray-900 mb-3 flex items-center gap-2">
                      <FaCertificate className="text-blue-600" /> Certifications
                    </h3>
                    <div className="space-y-3">
                      {certificates.filter(cert => !cert.hidden).map((cert) => (
                        <div key={cert.id} className="page-section">
                          <h4 className="font-semibold text-gray-900">{cert.name}</h4>
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

                {/* Publications */}
                {shouldShowSection(publications) && (
                  <section className="page-section">
                    <h3 className="text-lg font-semibold border-b border-gray-500 text-gray-900 mb-3 flex items-center gap-2">
                      <FaBook className="text-blue-600" /> Publications
                    </h3>
                    <div className="space-y-3">
                      {publications.filter(pub => !pub.hidden).map((pub) => (
                        <div key={pub.id} className="page-section">
                          <h4 className="font-semibold text-gray-900">{pub.title}</h4>
                          <p className="text-gray-700 text-sm">{pub.publisher}</p>
                          {pub.authors && <p className="text-gray-600 text-sm">Authors: {pub.authors}</p>}
                          {pub.publicationMonth && pub.publicationYear && (
                            <p className="text-gray-600 text-sm">
                              Published: {formatMonthYear(pub.publicationMonth, pub.publicationYear, 'long')}
                            </p>
                          )}
                          {pub.description && (
                            <div
                              className="text-gray-700 text-sm mt-1"
                              dangerouslySetInnerHTML={{ __html: pub.description }}
                            />
                          )}
                          {pub.url && (
                            <a href={pub.url} target="_blank" className="text-blue-600 text-sm hover:underline flex items-center gap-1">
                              <FaGlobe className="text-xs" /> View Publication
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Languages */}
                {languages?.length > 0 && (
                  <section className="page-section">
                    <h3 className="text-lg font-semibold border-b border-gray-500 text-gray-900 mb-3 flex items-center gap-2">
                      <FaGlobe className="text-blue-600" /> Languages
                    </h3>
                    <div className="space-y-2 text-sm">
                      {languages.map((lang, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="text-gray-700">{lang.name}</div>
                          {renderLanguageLevel(lang.level)}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Interests */}
                {interests?.length > 0 && (
                  <section className="page-section">
                    <h3 className="text-lg font-semibold border-b border-gray-500 text-gray-900 mb-3 flex items-center gap-2">
                      <FaStar className="text-blue-600" /> Interests
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest, idx) => (
                        <span
                          key={`interest-${idx}`}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm border border-blue-200"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </PageBreakHandler>
  );
};

export default CreativeTemplate;