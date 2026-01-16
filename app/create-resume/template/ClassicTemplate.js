"use client";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaGlobe,
  FaStar,
  FaAward,
  FaCertificate,
  FaBook,
  FaLanguage,
  FaHeart,
  FaLink,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaFolderOpen,
  FaCalendarAlt,
} from "react-icons/fa";
import { SiEslint } from "react-icons/si";
import { MdLanguage } from "react-icons/md";
import { MdPermContactCalendar } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import {
  formatMonthYear,
  getLocationText,
  shouldShowSection,
} from "../../utils/resumeUtils";
import { FaSketch } from "react-icons/fa";
import PageBreakHandler from "../template/PageBreakHandler";
import { getPlatformIconObject } from "../../utils/resumeUtils";
import { getProficiencyDots } from "../../utils/resumeUtils";
const ClassicTemplate = ({ data, profileImage, currentFont, currentColor }) => {
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

  // Helper function to render social links

  return (
    <PageBreakHandler template="classic">
      <div className={`${currentFontClass}  text-gray-800 w-full h-screen`}>
        {/* Header Section */}
        <section className="page-section">
          <div className=" bg-[#ced5e6] px-6 !py-10 mb-2">
            <h1
              className="text-3xl font-bold mb-2 uppercase"
              style={{ color: currentColor }}
            >
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>

            {personalInfo.headline && (
              <p
                className="text-[14px]text-gray-600 font-medium mb-4"
                style={{ color: currentColor }}
              >
                {personalInfo.headline}
              </p>
            )}
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="two-column-layout flex flex-col md:flex-row gap-3 px-3  ">
          {/* Left Column - Main Content */}
          <div className="left-column md:w-[80%] pt-3 pe-3 border-gray-400 space-y-2">
            {/* Career Objective / Summary */}
            {profileSummary && (
              <section className="page-section">
                <h2
                  className="text-[14px] flex items-center gap-3 font-bold mb-2 uppercase tracking-wide border-b-2 "
                  style={{
                    borderColor: currentColor || "#4a4b4c",
                    color: currentColor || "#4a4b4c",
                  }}
                >
                  <GoGoal /> Career Objective
                </h2>
                <div
                  className="text-gray-700 text-[12px] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: profileSummary }}
                />
              </section>
            )}

            {/* Work Experience */}
            {shouldShowSection(workExperience) && (
              <section className="page-section">
                <h2
                  className="text-[14px] flex items-center gap-3  font-bold mb-2 uppercase tracking-wide border-b-2 "
                  style={{
                    borderColor: currentColor || "#4a4b4c",
                    color: currentColor || "#4a4b4c",
                  }}
                >
                  <FaBriefcase /> Professional Experience
                </h2>
                <div className="space-y-6">
                  {workExperience
                    .filter((exp) => !exp.hidden)
                    .map((exp) => (
                      <div key={exp.id} className="break-inside-avoid">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-[14px]font-bold text-gray-900">
                              {exp.company}
                            </h3>
                            {/* <p className="text-gray-700 flex item-center text-[12px]  font-semibold">{exp.title} </p>
                          {exp.employmentType && <span className="text-xs">{exp.employmentType}</span>}
                          <p className="flex gap-2 text-[12px] text-gray-600">
                        {exp.field && <span>{exp.field}</span>}

                      </p> */}
                            <p className="flex gap-2 text-[12px] text-gray-600">
                              {exp.employmentType && (
                                <span>{exp.employmentType}</span>
                              )}
                              {exp.field && <span>{exp.field}</span>}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-600 font-medium text-[12px]">
                              {formatMonthYear(
                                exp.startMonth,
                                exp.startYear,
                                "short"
                              )}{" "}
                              –{" "}
                              {exp.currentlyWorking
                                ? "Present"
                                : formatMonthYear(
                                  exp.endMonth,
                                  exp.endYear,
                                  "short"
                                )}
                            </p>
                            {exp.location && (
                              <p className="text-gray-500 text-xs mt-1">
                                {exp.location}
                              </p>
                            )}
                          </div>
                        </div>
                        {exp.description && (
                          <p
                            className="text-gray-700 text-[12px] leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: exp.description,
                            }}
                          />
                        )}
                        <div />
                        {exp.bullets?.length > 0 && (
                          <ul className="list-disc ml-5 mt-2 text-gray-700 text-[12px] ">
                            {exp.bullets.map((bullet, i) => (
                              <li
                                key={`bullet-${exp.id}-${i}`}
                                className="text-gray-700 text-[12px] "
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

            {/* Projects */}
            {shouldShowSection(projects) && (
              <section className="page-section mb-8">
                <h2
                  className="text-[14px] font-semibold text-gray-900 mb-4  border-b border-gray-200 flex items-center gap-2"
                  style={{
                    borderColor: currentColor || "#4a4b4c",
                    color: currentColor || "#4a4b4c",
                  }}
                >
                  <FaFolderOpen /> Projects
                </h2>
                <div className="space-y-2">
                  {projects
                    .filter((project) => !project.hidden)
                    .map((project) => (
                      <div key={project.id} className="break-inside-avoid">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-[14px]font-semibold text-gray-900">
                              {project.title}
                            </h3>
                            {project.organization && (
                              <p className="text-gray-700 text-[12px]">
                                {project.organization}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-gray-600 font-medium text-[12px]">
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
                            className="text-blue-600 text-[12px] hover:underline block mb-2 flex items-center gap-1"
                          >
                            <FaGlobe className="text-xs" /> View Project
                          </a>
                        )}
                        {project.description && (
                          <div
                            className="text-gray-700 text-[12px] leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{
                              __html: project.description,
                            }}
                          />
                        )}
                        {project.bullets?.length > 0 && (
                          <ul className="list-disc ml-5 mt-2 text-gray-700 text-[12px] space-y-1">
                            {project.bullets.map((bullet, i) => (
                              <li
                                key={`project-bullet-${project.id}-${i}`}
                                className="text-gray-700 text-[12px] leading-relaxed"
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

            {/* Publications */}
            {shouldShowSection(publications) && (
              <section className="page-section">
                <h2
                  className="text-[14px] flex items-center gap-3 font-bold mb-2 uppercase tracking-wide border-b-2 "
                  style={{
                    borderColor: currentColor || "#4a4b4c",
                    color: currentColor || "#4a4b4c",
                  }}
                >
                  <FaBook /> Publications
                </h2>

                <div className="space-y-2">
                  {publications
                    .filter((pub) => !pub.hidden)
                    .map((publication) => (
                      <div key={publication.id} className="break-inside-avoid">
                        {/* Header Row - Title Left, Date Right */}
                        <div className="flex justify-between items-start">
                          <h3 className="text-[14px] font-bold text-gray-900 mb-1">
                            {publication.title}
                          </h3>

                          {publication.publicationMonth &&
                            publication.publicationYear && (
                              <p className="text-gray-600 text-xs text-right min-w-[100px]">
                                Published:{" "}
                                {formatMonthYear(
                                  publication.publicationMonth,
                                  publication.publicationYear,
                                  "long"
                                )}
                              </p>
                            )}
                        </div>

                        {/* Publisher */}
                        {publication.publisher && (
                          <p className="text-gray-700 text-[12px] mb-1">
                            {publication.publisher}
                          </p>
                        )}

                        {/* Authors */}
                        {publication.authors && (
                          <p className="text-gray-600 text-xs mb-1">
                            <span className="font-semibold">Authors:</span>{" "}
                            {publication.authors}
                          </p>
                        )}

                        {/* Description */}
                        {publication.description && (
                          <div
                            className="text-gray-700 text-[12px] leading-relaxed mt-2 text-left"
                            dangerouslySetInnerHTML={{
                              __html: publication.description,
                            }}
                          />
                        )}

                        {/* URL */}
                        {publication.url && (
                          <a
                            href={publication.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 flex items-center gap-2 text-xs mt-2 hover:underline"
                          >
                            <FaGlobe className="text-xs" /> View Publication
                          </a>
                        )}
                      </div>
                    ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className=" right-column md:w-[30%] pt-3 space-y-2">
            {/* Contact Information */}
            <section className="page-section">
              <h2
                className="text-[14px] flex items-center gap-3 font-bold mb-2 uppercase tracking-wide border-b-2 "
                style={{
                  borderColor: currentColor || "#4a4b4c",
                  color: currentColor || "#4a4b4c",
                }}
              >
                <MdPermContactCalendar /> Contact
              </h2>
              <div className="space-y-2 text-[12px]">
                {personalInfo.email && (
                  <div>
                    <strong className="block text-gray-700">Email:</strong>
                    <div className="text-gray-600">{personalInfo.email}</div>
                  </div>
                )}
                {personalInfo.phone && (
                  <div>
                    <strong className="block text-gray-700">Phone:</strong>
                    <div className="text-gray-600">{personalInfo.phone}</div>
                  </div>
                )}
                {getLocationText(personalInfo) && (
                  <div>
                    <strong className="block text-gray-700">Location:</strong>
                    <div className="text-gray-600">
                      {getLocationText(personalInfo)}
                    </div>
                  </div>
                )}

                {socialLinks && socialLinks.length > 0 && (
                  <div className="flex flex-col gap-1">
                    {socialLinks && socialLinks.length > 0 && (
                      <div className="">
                        {socialLinks.map((link, index) => {
                          const IconComponent = getPlatformIconObject(
                            link.platform
                          );
                          return (
                            <a
                              key={index}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 transition-colors text-[12px]"
                            >
                              {IconComponent}
                              {link.customName ? (
                                <span>{link.customName}</span>
                              ) : (
                                <span>{link.platform}</span>
                              )}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* Skills */}
            {/* {skills?.length > 0 && (
              <section className="page-section">
                <h2 
                  className="text-[14px] flex items-center gap-3 font-bold mb-2 uppercase tracking-wide border-b-2 "
                    style={{
                borderColor: currentColor || "#4a4b4c",
                color: currentColor || "#4a4b4c"
              }}
                >
                 <FaSketch /> Skills
                </h2>
                <div className="space-y-2">
                  {skills.map((category, idx) => (
                    <div key={`skill-category-${idx}`} className="break-inside-avoid">
                      <h4 className="font-semibold text-gray-800 text-[12px] mb-2">
                        {category.categoryName.toUpperCase()}
                      </h4>
                      <div className="flex flex-wrap gap-x-3 gap-y-2">
                        {category.skills.map((skill, i) => (
                          <div
                            key={`skill-${idx}-${i}`}
                            className="text-gray-700 text-[12px]"
                          >
                            • {skill}
                          </div>
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
                    className="text-[14px] flex items-center gap-3 font-bold mb-2 uppercase tracking-wide border-b-2 "
                    style={{
                      borderColor: currentColor || "#4a4b4c",
                      color: currentColor || "#4a4b4c",
                    }}
                  >
                    <FaSketch />
                    Technical Skills
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
                    className="text-[14px] flex items-center gap-3 font-bold mb-2 uppercase tracking-wide border-b-2 "
                    style={{
                      borderColor: currentColor || "#4a4b4c",
                      color: currentColor || "#4a4b4c",
                    }}
                  >
                    <FaSketch />
                    Soft Skills
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

            {shouldShowSection(education) && (
              <section className="page-section">
                <h2
                  className="text-[14px] flex items-center gap-3 font-bold mb-2 uppercase tracking-wide border-b pb-1"
                  style={{
                    borderColor: currentColor || "#9CA3AF",
                    color: currentColor || "inherit",
                  }}
                >
                  <FaGraduationCap /> Education
                </h2>
                <div className="space-y-3">
                  {education
                    .filter((edu) => !edu.hidden)
                    .map((edu) => (
                      <div
                        key={edu.id}
                        className="text-[12px] text-gray-700 leading-snug"
                      >
                        {edu.course && (
                          <h3 className="font-semibold text-gray-700 text-[12px] mb-1">
                            {edu.course}
                          </h3>
                        )}
                        {(edu.college || edu.level) && (
                          <p className="text-gray-600 text-[12px] mb-1">
                            {edu.level} {edu.college && ` • ${edu.college}`}
                          </p>
                        )}
                        {edu.specialisation && (
                          <p className="text-gray-500 text-[12px] mb-1">
                            <strong>Specialization:</strong>{" "}
                            {edu.specialisation}
                          </p>
                        )}
                        {(edu.startMonth ||
                          edu.startYear ||
                          edu.endMonth ||
                          edu.endYear) && (
                            <p className="text-gray-500 text-[12.5px] flex items-center gap-1">
                              <FaCalendarAlt className="text-[12px] text-gray-700 font-medium" />
                              {formatMonthYear(
                                edu.startMonth,
                                edu.startYear,
                                "short"
                              )}{" "}
                              –{" "}
                              {edu.currentlyStudying
                                ? "Present"
                                : formatMonthYear(
                                  edu.endMonth,
                                  edu.endYear,
                                  "short"
                                )}
                            </p>
                          )}
                        {edu.marks && (
                          <p className="text-gray-500 text-xs mt-0.5">
                            <strong>GPA:</strong> {edu.marks}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </section>
            )}

            {/* Certificates */}
            {shouldShowSection(certificates) && (
              <section className="page-section">
                <h2
                  className="text-[14px] flex items-center gap-3 font-bold mb-2 uppercase tracking-wide border-b "
                  style={{
                    borderColor: currentColor || "#9CA3AF",
                    color: currentColor || "inherit",
                  }}
                >
                  <FaCertificate /> Certifications
                </h2>
                <div className="space-y-3">
                  {certificates
                    .filter((cert) => !cert.hidden)
                    .map((cert) => (
                      <div key={cert.id} className="break-inside-avoid">
                        <div>
                          <h3 className="text-[14px] font-semibold text-gray-600">
                            {cert.name}
                          </h3>
                          <p className="text-gray-700 text-[12px]">
                            {cert.authority}
                          </p>
                          {cert.issueDate && (
                            <p className="text-gray-600 text-xs mb-2">
                              Issued: {cert.issueDate}
                            </p>
                          )}
                          {cert.media && (
                            <a
                              href={
                                typeof cert.media === "string"
                                  ? cert.media
                                  : URL.createObjectURL(cert.media)
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-[12px] text-gray-700 flex items-center gap-1"
                            >
                              <FaGlobe className="text-xs" /> View Link
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            )}
            {/* Awards & Achievements */}

            {/* Awards & Achievements */}
            {shouldShowSection(awardsAchievements) && (
              <section className="page-section mb-6">
                <h2
                  className="text-[14px] flex items-center !text-[#161617] gap-3 font-bold mb-2 uppercase tracking-wide border-b-2 "
                  style={{
                    borderColor: currentColor || "",
                    color: currentColor || "#4a4b4c",
                  }}
                >
                  <FaAward /> Awards / Achievements
                </h2>
                <div className="space-y-3">
                  {awardsAchievements
                    .filter((item) => !item.hidden)
                    .map((item) => (
                      <div key={item.id} className="break-inside-avoid">
                        <h3 className="text-[14px] font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-gray-700 text-[12px] flex items-center">
                          <span>Issued by: {item.issuer}</span>
                          {/* {item.media && (
                <span>
                  <a
                    target="_blank"
                    href={`${item.media}`}
                    className="ms-3 font-bold text-gray-700 flex items-center gap-1"
                  >
                    <FaGlobe className="text-xs" /> View Link
                  </a>
                </span>
              )} */}
                        </p>
                        {item.media && (
                          <p>
                            <a
                              href={
                                typeof item.media === "string"
                                  ? item.media
                                  : URL.createObjectURL(item.media)
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-bold text-gray-700 flex items-center gap-1"
                            >
                              <FaGlobe className="text-xs" /> View Link
                            </a>
                          </p>
                        )}
                        {item.description && (
                          <div
                            className="text-gray-700 text-[12px] leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />
                        )}
                      </div>
                    ))}
                </div>
              </section>
            )}

            {/* Interests */}
            {interests?.length > 0 && (
              <section className="page-section mb-6">
                <h2
                  className="text-[14px] flex items-center gap-3 font-bold mb-2 uppercase border-b-2 "
                  style={{
                    borderColor: currentColor || "#4a4b4c",
                    color: currentColor || "#4a4b4c",
                  }}
                >
                  <SiEslint /> Professional Interests
                </h2>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, idx) => (
                    <span
                      key={`interest-${idx}`}
                      className=" text-gray-800  text-[12px]"
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
                <h2
                  className="text-[14px] flex items-center gap-3 font-bold mb-2 uppercase tracking-wide border-b-2 "
                  style={{
                    borderColor: currentColor || "#4a4b4c",
                    color: currentColor || "#4a4b4c",
                  }}
                >
                  <MdLanguage /> Languages
                </h2>
                <div className="flex flex-col ">
                  {languages.map((language, idx) => (
                    <div
                      key={`language-${idx}`}
                      className="flex items-center justify-between w-full break-inside-avoid"
                    >
                      <div className="text-gray-700 text-[12px]">
                        {language.language || "Unknown"}
                      </div>
                      {/* {getProficiencyDots(language.proficiency)} */}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
      //{" "}
    </PageBreakHandler>
  );
};

export default ClassicTemplate;
