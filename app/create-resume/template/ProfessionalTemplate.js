"use client";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaGlobe,
  FaCertificate,
  FaFolderOpen,
  FaAward,
  FaBook,
  FaStar,
} from "react-icons/fa";
import {
  formatMonthYear,
  getLocationText,
  getProficiencyDots,
  shouldShowSection,
} from "../../utils/resumeUtils";
import PageBreakHandler from "../template/PageBreakHandler";
import { getPlatformIconObject } from "../../utils/resumeUtils";

const ProfessionalTemplate = ({
  data,
  profileImage,
  currentFont,
  currentColor,
}) => {
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
    achievements,
    awardsAchievements,
    languages,
  } = data;

  // Font classes mapping
  const fontClasses = {
    inter: "font-inter",
    roboto: "font-roboto",
    opensans: "font-open-sans",
    lato: "font-lato",
    montserrat: "font-montserrat",
    poppins: "font-poppins",
    playfair: "font-playfair",
    georgia: "font-georgia",
    times: "font-times",
  };

  const currentFontClass = fontClasses[currentFont] || "font-inter";

  return (
    <PageBreakHandler template="professional">
      <div className={`${currentFontClass} font-sans min-h-screen`}>
        {/* Header Section */}
        <section className="page-section text-center border-gray-400 p-8">
          <h1
            className="text-3xl font-bold mb-2 uppercase tracking-wide"
            style={{ color: currentColor || "#414141" }}
          >
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>

          {personalInfo.headline && (
            <p className="text-[14px] text-gray-600 font-medium mb-2">
              {personalInfo.headline}
            </p>
          )}

          {/* Contact Information */}
          <div className="flex justify-center flex-wrap gap-6 text-[12px] text-gray-600">
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

          {/* Social Links */}
          {socialLinks?.filter((link) => link.url).length > 0 && (
            <div className="flex justify-center flex-wrap gap-4 mt-3">
              {socialLinks
                .filter((link) => link.url)
                .map((link, i) => (
                  <a
                    key={`social-${i}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors text-[12px] font-medium"
                  >
                    {getPlatformIconObject(link.platform)}
                    <span>
                      {link.platform === "Other"
                        ? link.customName || "Website"
                        : link.platform}
                    </span>
                  </a>
                ))}
            </div>
          )}
        </section>

        <div className="px-6">
          {/* Profile Summary */}
          {profileSummary && (
            <section className="page-section my-2">
              <h2
                className="text-[14px] font-bold mb-2 border-b border-gray-400 uppercase tracking-wide flex items-center gap-3"
                style={{
                  borderColor: currentColor || "#9CA3AF",
                  color: currentColor || "#4a4b4c",
                }}
              >
                <FaBriefcase />
                Career Objective
              </h2>
              <div
                className="text-gray-700 text-[12px] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: profileSummary }}
              />
            </section>
          )}

          {/* Work Experience */}
          {shouldShowSection(workExperience) && (
            <section className="page-section my-2">
              <h2
                className="text-[14px] font-bold mb-3 border-b border-gray-400 uppercase tracking-wide flex items-center gap-3"
                style={{
                  borderColor: currentColor || "#9CA3AF",
                  color: currentColor || "#4a4b4c",
                }}
              >
                <FaBriefcase />
                Work Experience
              </h2>
              <div className="space-y-2">
                {workExperience
                  .filter((exp) => !exp.hidden)
                  .map((exp) => (
                    <div
                      key={exp.id}
                      className="break-inside-avoid page-subsection"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="text-[14px] font-semibold text-gray-900 mb-1">
                            {exp.company}
                          </h3>
                          <p className="text-[13px] text-gray-700 font-medium mb-1">
                            {exp.title}
                          </p>
                          <p className="flex gap-2 text-[12px] text-gray-600">
                            {exp.employmentType && (
                              <span>{exp.employmentType}</span>
                            )}
                            {exp.field && <span>{exp.field}</span>}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600 font-medium text-[12px] px-2 py-1 rounded">
                            {formatMonthYear(
                              exp.startMonth,
                              exp.startYear,
                              "long"
                            )}{" "}
                            –{" "}
                            {exp.currentlyWorking
                              ? "Present"
                              : formatMonthYear(
                                  exp.endMonth,
                                  exp.endYear,
                                  "long"
                                )}
                          </p>
                          {exp.location && (
                            <p className="text-gray-500 text-[12px] mt-1 flex items-center justify-end gap-1">
                              <FaMapMarkerAlt className="text-xs" />{" "}
                              {exp.location}
                            </p>
                          )}
                        </div>
                      </div>
                      {exp.description && (
                        <div
                          className="text-gray-700 text-[12px] leading-relaxed mt-2"
                          dangerouslySetInnerHTML={{ __html: exp.description }}
                        />
                      )}
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* Skills - FIXED LAYOUT */}
          {/* {skills?.length > 0 && (
            <section className="page-section my-2">
              <h2
                className="text-[14px] font-bold mb-3 border-b border-gray-400 uppercase tracking-wide flex items-center gap-3"
                style={{
                  borderColor: currentColor || "#9CA3AF",
                  color: currentColor || "#4a4b4c",
                }}
              >
                Skills
              </h2>
              <div className="space-y-1">
                {skills.map((category, idx) => (
                  <div
                    key={`skill-category-${idx}`}
                    className=" flex items-center gap-1 "
                  >
                    {category.categoryName && (
                      <h4 className="font-semibold text-gray-800 text-[12px] mb-1">
                        {category.categoryName.toUpperCase()}:
                      </h4>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, i) => (
                        <span
                          key={`skill-${idx}-${i}`}
                          className="text-gray-700 text-[12px]  px-2  rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )} */}

          <div className="">
            {/* Show Technical Skills if they exist */}
            {skills?.technical && skills.technical.length > 0 && (
              <div className="py-0.5 my-0 !border-0">
                <h2
                  className="text-[14px] flex items-center gap-3 font-bold mb-3 uppercase tracking-wide border-b "
                  style={{
                    borderColor: currentColor || "#9CA3AF",
                    color: currentColor || "#4a4b4c",
                  }}
                >
                  TECHNICAL SKILLS
                </h2>
                <div className="flex flex-wrap gap-x-3 gap-y-0">
                  {skills.technical.map((skill, i) => (
                    <div
                      key={`tech-skill-${i}`}
                      className="text-gray-700 text-[12px]"
                    >
                      • {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Show Soft Skills if they exist */}
            {skills?.soft && skills.soft.length > 0 && (
              <div className="py-0.5 my-0 !border-0">
                <h2
                  className="text-[14px] flex items-center gap-3 font-bold mb-3 uppercase tracking-wide border-b "
                  style={{
                    borderColor: currentColor || "#9CA3AF",
                    color: currentColor || "#4a4b4c",
                  }}
                >
                  SOFT SKILLS
                </h2>
                <div className="flex flex-wrap gap-x-3 gap-y-0">
                  {skills.soft.map((skill, i) => (
                    <div
                      key={`soft-skill-${i}`}
                      className="text-gray-700 text-[12px]"
                    >
                      • {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Education */}
          {shouldShowSection(education) && (
            <section className="page-section my-2">
              <h2
                className="text-[14px] font-bold mb-3 border-b border-gray-400 uppercase tracking-wide flex items-center gap-3"
                style={{
                  borderColor: currentColor || "#9CA3AF",
                  color: currentColor || "#4a4b4c",
                }}
              >
                <FaGraduationCap />
                Education
              </h2>
              <div className="space-y-3">
                {education
                  .filter((edu) => !edu.hidden)
                  .map((edu) => (
                    <div
                      key={edu.id}
                      className="break-inside-avoid page-subsection"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-[13px] font-medium text-gray-900 mb-1">
                            {edu.course}
                          </h3>
                          {(edu.college || edu.level) && (
                            <p className="text-gray-600 text-[12px] mb-1">
                              {edu.level} {edu.college && ` • ${edu.college}`}
                            </p>
                          )}
                          {edu.specialisation && (
                            <p className="text-gray-600 text-[12px]">
                              <strong>Specialization:</strong>{" "}
                              {edu.specialisation}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600 font-medium text-[12px]  px-2 py-1 rounded">
                            {formatMonthYear(
                              edu.startMonth,
                              edu.startYear,
                              "long"
                            )}{" "}
                            –{" "}
                            {edu.currentlyStudying
                              ? "Present"
                              : formatMonthYear(
                                  edu.endMonth,
                                  edu.endYear,
                                  "long"
                                )}
                          </p>
                          {edu.marks && (
                            <p className="text-gray-500 text-[12px] mt-1">
                              <strong>GPA:</strong> {edu.marks}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* Other sections (Projects, Certificates, etc.) yahan continue karein */}
          {/* Projects */}
          {shouldShowSection(projects) && (
            <section className="page-section my-2">
              <h2
                className="text-[14px] font-bold mb-3 border-b border-gray-400 uppercase tracking-wide flex items-center gap-3"
                style={{
                  borderColor: currentColor || "#9CA3AF",
                  color: currentColor || "#4a4b4c",
                }}
              >
                <FaFolderOpen />
                Projects
              </h2>
              <div className="space-y-2">
                {projects
                  .filter((project) => !project.hidden)
                  .map((project) => (
                    <div
                      key={project.id}
                      className="break-inside-avoid page-subsection"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="text-[14px] font-semibold text-gray-900 mb-1">
                            {project.title}
                          </h3>
                          {project.organization && (
                            <p className="text-gray-700 text-[13px]">
                              {project.organization}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600 font-medium text-[12px]  px-2 py-1 rounded">
                            {formatMonthYear(
                              project.startMonth,
                              project.startYear,
                              "long"
                            )}{" "}
                            –{" "}
                            {project.currentlyWorking
                              ? "Present"
                              : formatMonthYear(
                                  project.endMonth,
                                  project.endYear,
                                  "long"
                                )}
                          </p>
                        </div>
                      </div>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          className="text-blue-600 text-[12px] hover:underline mb-2 flex items-center gap-2 font-medium"
                        >
                          <FaGlobe /> View Project
                        </a>
                      )}
                      {project.description && (
                        <div
                          className="text-gray-700 text-[12px] leading-relaxed mb-2"
                          dangerouslySetInnerHTML={{
                            __html: project.description,
                          }}
                        />
                      )}
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* Certificates */}
          {shouldShowSection(certificates) && (
            <section className="page-section mt-3">
              <h2
                className="text-[14px] font-bold mb-2  border-b border-gray-400 uppercase tracking-wide flex items-center gap-3"
                style={{
                  borderColor: currentColor || "#4a4b4c",
                  color: currentColor || "#4a4b4c",
                }}
              >
                <FaCertificate />
                Certifications
              </h2>
              <div className="space-y-2">
                {certificates
                  .filter((cert) => !cert.hidden)
                  .map((cert) => (
                    <div
                      key={cert.id}
                      className="break-inside-avoid flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <h3 className="text-[14px] font-semibold text-gray-900 mb-1">
                          {cert.name}
                        </h3>
                        <p className="text-gray-700 text-[12px] mb-2">
                          {cert.authority}
                        </p>
                        {cert.media && (
                          <a
                            href={
                              typeof cert.media === "string"
                                ? cert.media
                                : URL.createObjectURL(cert.media)
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-[12px] text-gray-700 flex items-center gap-2 hover:text-gray-900"
                          >
                            <FaGlobe /> View Certificate
                          </a>
                        )}
                      </div>
                      {cert.issueDate && (
                        <p className="text-gray-600 text-[12px]  px-3 py-1 rounded">
                          Issued: {cert.issueDate}
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* Awards & Achievements */}
          {shouldShowSection(awardsAchievements) && (
            <section className="page-section mt-3">
              <h2
                className="text-[14px] font-bold mb-2  border-b border-gray-400 uppercase tracking-wide flex items-center gap-3"
                style={{
                  borderColor: currentColor || "#9CA3AF",
                  color: currentColor || "#4a4b4c",
                }}
              >
                <FaAward />
                Awards / Achievements
              </h2>
              <div className="space-y-2">
                {awardsAchievements
                  .filter((award) => !award.hidden)
                  .map((award) => (
                    <div key={award.id} className="break-inside-avoid">
                      <h3 className="text-[14px] font-semibold text-gray-900 mb-1">
                        {award.title}
                      </h3>
                      <p className="text-gray-700 text-[12px] mb-2 flex items-center gap-2">
                        <span>Issued by: {award.issuer}</span>
                        {award.url && (
                          <a
                            target="_blank"
                            href={`${award.url}`}
                            className="font-bold text-gray-700 flex items-center gap-2 hover:text-gray-900"
                          >
                            <FaGlobe /> View Link
                          </a>
                        )}
                      </p>
                      {award.description && (
                        <div
                          className="text-gray-700 text-[12px] leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: award.description,
                          }}
                        />
                      )}
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* Publications */}
          {shouldShowSection(publications) && (
            <section className="page-section mt-3">
              <h2
                className="text-[14px] font-bold mb-2  border-b border-gray-400 uppercase tracking-wide flex items-center gap-3"
                style={{
                  borderColor: currentColor || "#9CA3AF",
                  color: currentColor || "#4a4b4c",
                }}
              >
                <FaBook />
                Publications
              </h2>
              <div className="space-y-2">
                {publications
                  .filter((pub) => !pub.hidden)
                  .map((pub) => (
                    <div key={pub.id} className="break-inside-avoid">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="text-[14px] font-semibold text-gray-900 mb-1">
                            {pub.title}
                          </h3>
                          <p className="text-gray-700 text-[12px] mb-1 flex items-center gap-2">
                            <span>Published by: {pub.publisher}</span>
                            {pub.url && (
                              <a
                                target="_blank"
                                href={`${pub.url}`}
                                className="font-bold text-gray-700 flex items-center gap-2 hover:text-gray-900"
                              >
                                <FaGlobe /> View Link
                              </a>
                            )}
                          </p>
                          {pub.authors && (
                            <p className="text-gray-600 text-[12px]">
                              <span className="font-semibold">Authors:</span>{" "}
                              {pub.authors}
                            </p>
                          )}
                        </div>
                        {pub.publicationMonth && pub.publicationYear && (
                          <p className="text-gray-600 text-[12px]  px-3 py-1 rounded">
                            Published:{" "}
                            {formatMonthYear(
                              pub.publicationMonth,
                              pub.publicationYear,
                              "long"
                            )}
                          </p>
                        )}
                      </div>
                      {pub.description && (
                        <div
                          className="text-gray-700 text-[12px] leading-relaxed mt-2"
                          dangerouslySetInnerHTML={{ __html: pub.description }}
                        />
                      )}
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* Interests */}
          {interests?.length > 0 && (
            <section className="page-section mt-3">
              <h2
                className="text-[14px] font-bold mb-2  border-b border-gray-400 uppercase tracking-wide flex items-center gap-3"
                style={{
                  borderColor: currentColor || "#9CA3AF",
                  color: currentColor || "#4a4b4c",
                }}
              >
                <FaStar />
                Professional Interests
              </h2>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, idx) => (
                  <span
                    key={`interest-${idx}`}
                    className="text-gray-800 text-[12px]"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </section>
          )}
          {/* Languages */}
          {languages?.length > 0 && (
            <section className="page-section my-2">
              <h2
                className="text-[14px] font-bold mb-3 border-b border-gray-400 uppercase tracking-wide flex items-center gap-2"
                style={{
                  borderColor: currentColor || "#9CA3AF",
                  color: currentColor || "#4a4b4c",
                }}
              >
                <FaGlobe className="text-[12px]" />
                Languages
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {languages.map((language, idx) => (
                  <div
                    key={`language-${idx}`}
                    className="flex items-center justify-between p-2  rounded"
                  >
                    <span className="font-medium text-gray-700 text-[12px]">
                      {language.language}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, dotIndex) => (
                          <div
                            key={dotIndex}
                            className={`h-2 w-2 rounded-full ${
                              dotIndex <
                              getProficiencyDots(language.proficiency)
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </PageBreakHandler>
  );
};

export default ProfessionalTemplate;
