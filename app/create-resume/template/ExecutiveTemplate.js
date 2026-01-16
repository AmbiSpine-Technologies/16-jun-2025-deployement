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
import { formatMonthYear, getPlatformIcon } from "../../utils/resumeUtils";
import PageBreakHandler from "../template/PageBreakHandler";
import { selectCurrentUser } from "../../store/userSlice";
import { useSelector } from "react-redux";
const ExecutiveTemplate = ({ data, profileImage }) => {
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
    languages,
  } = data;

  const shouldShowSection = (items) => {
    return items && items.filter((item) => !item.hidden).length > 0;
  };
  const currentUser = useSelector((state) => state.users?.currentUser);

  console.log(currentUser);
  return (
    <PageBreakHandler template="executive">
      <div className=" text-gray-800 min-h-screen font-serif">
        <div className="flex flex-col lg:flex-row w-full min-h-screen">
          {/* Left Sidebar */}
          <div className="lg:w-1/3 bg-gray-800 text-white p-4">
            {/* Profile Image */}

            {/* Personal Info */}
            <div className=" mb-6">
              <h1 className="text-2xl font-bold mb-2 text-left">
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              {personalInfo.headline && (
                <p className="text-gray-300 text-center mb-2">
                  {personalInfo.headline}
                </p>
              )}
            </div>

            {/* Contact Information */}
            <div className=" space-y-4 mb-6">
              <h2 className="text-lg font-bold mb-4 border-b border-gray-600 pb-2">
                Contact
              </h2>
              {personalInfo.email && (
                <div className="flex items-center ">
                  <FaEnvelope className="text-gray-400" />
                  <span className="text-sm">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-3">
                  <FaPhone className="text-gray-400" />
                  <span className="text-sm">{personalInfo.phone}</span>
                </div>
              )}
              {(personalInfo.city ||
                personalInfo.state ||
                personalInfo.country) && (
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <span className="text-sm">
                    {[
                      personalInfo.city,
                      personalInfo.state,
                      personalInfo.country,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </div>
              )}
            </div>

            {/* Social Links */}
            {socialLinks?.filter((link) => link.url).length > 0 && (
              <div className=" mb-8">
                <h2 className="text-lg font-bold mb-4 border-b border-gray-600 pb-2">
                  Social Links
                </h2>
                <div className="space-y-2">
                  {socialLinks
                    .filter((link) => link.url)
                    .map((link, i) => (
                      <a
                        key={`social-${i}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-300 hover:text-white hover:cursor-pointer transition-colors text-sm"
                      >
                        {getPlatformIcon(link.platform)}
                        <span>
                          {link.platform === "Other"
                            ? link.customName || "Website"
                            : link.platform}
                        </span>
                      </a>
                    ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills?.length > 0 && (
              <div className=" mb-8">
                <h2 className="text-lg font-bold mb-4 border-b border-gray-600 pb-2">
                  Skills
                </h2>
                <div className="space-y-4">
                  {skills.map((category, idx) => (
                    <div key={`skill-category-${idx}`}>
                      <h4 className="font-semibold text-gray-300 text-sm mb-2">
                        {category.categoryName}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {category.skills.map((skill, i) => (
                          <span
                            key={`skill-${idx}-${i}`}
                            className="bg-gray-700 text-gray-200 px-2 py-1 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {shouldShowSection(education) && (
              <div className=" mb-8">
                <h2 className="text-lg font-bold mb-4 border-b border-gray-600 pb-2">
                  Education
                </h2>
                <div className="space-y-3">
                  {education
                    .filter((edu) => !edu.hidden)
                    .map((edu) => (
                      <div key={edu.id}>
                        <h3 className="font-semibold text-sm">{edu.degree}</h3>
                        <p className="text-gray-300 text-xs">{edu.college}</p>
                        <p className="text-gray-400 text-xs">
                          {formatMonthYear(
                            edu.startMonth,
                            edu.startYear,
                            "long"
                          )}{" "}
                          -{" "}
                          {edu.currentlyStudying
                            ? "Present"
                            : formatMonthYear(
                                edu.endMonth,
                                edu.endYear,
                                "long"
                              )}
                        </p>
                        {edu.marks && (
                          <p className="text-gray-400 text-xs">
                            GPA: {edu.marks}
                          </p>
                        )}
                        {edu.specialisation && (
                          <p className="text-gray-400 text-xs">
                            Specialization: {edu.specialisation}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages?.length > 0 && (
              <div className=" mb-8">
                <h2 className="text-lg font-bold mb-4 border-b border-gray-600 pb-2">
                  Languages
                </h2>
                <div className="space-y-2">
                  {languages.map((language, idx) => (
                    <div
                      key={`language-${idx}`}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm text-gray-300">
                        {language.name}
                      </span>
                      <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                        {language.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interests */}
            {interests?.length > 0 && (
              <div className="page-section">
                <h2 className="text-lg font-bold mb-4 border-b border-gray-600 pb-2">
                  Interests
                </h2>
                <div className="flex flex-wrap gap-1">
                  {interests.map((interest, idx) => (
                    <span
                      key={`interest-${idx}`}
                      className="bg-gray-700 text-gray-200 px-2 py-1 rounded text-xs"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:w-2/3 p-8">
            {/* Profile Summary */}
            {profileSummary && (
              <section className="page-section mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
                  Professional Summary
                </h2>
                <div
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: profileSummary }}
                />
              </section>
            )}

            {/* Work Experience */}
            {shouldShowSection(workExperience) && (
              <section className="page-section mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
                  Work Experience
                </h2>
                <div className="space-y-6">
                  {workExperience
                    .filter((exp) => !exp.hidden)
                    .map((exp) => (
                      <div
                        key={exp.id}
                        className="border-l-2 border-gray-400 pl-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {exp.title}
                            </h3>
                            <p className="text-gray-700 font-medium">
                              {exp.company}
                            </p>
                            {exp.employmentType && (
                              <p className="text-gray-600 text-sm">
                                {exp.employmentType}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-gray-600 font-medium text-sm">
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
                              <p className="text-gray-500 text-xs mt-1">
                                {exp.location}
                              </p>
                            )}
                          </div>
                        </div>
                        {exp.description && (
                          <div
                            className="text-gray-700 text-sm leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: exp.description,
                            }}
                          />
                        )}
                        {exp.bullets?.length > 0 && (
                          <ul className="list-disc ml-5 mt-2 text-gray-700 text-sm space-y-1">
                            {exp.bullets.map((bullet, i) => (
                              <li
                                key={`bullet-${exp.id}-${i}`}
                                className="leading-relaxed"
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
                  Projects
                </h2>
                <div className="space-y-6">
                  {projects
                    .filter((project) => !project.hidden)
                    .map((project) => (
                      <div key={project.id} className="">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {project.title}
                            </h3>
                            {project.organization && (
                              <p className="text-gray-700 text-sm">
                                {project.organization}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-gray-600 font-medium text-sm">
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
                            className="text-blue-600 text-sm hover:underline block mb-2 flex items-center gap-1"
                          >
                            <FaGlobe className="text-xs" /> View Project
                          </a>
                        )}
                        {project.description && (
                          <div
                            className="text-gray-700 text-sm mt-2"
                            dangerouslySetInnerHTML={{
                              __html: project.description,
                            }}
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

            {/* Certificates & Awards */}
            {(shouldShowSection(certificates) || shouldShowSection(awards)) && (
              <section className="page-section mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
                  Achievements
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Certificates */}
                  {shouldShowSection(certificates) && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <FaCertificate className="text-gray-600" />{" "}
                        Certifications
                      </h3>
                      <div className="space-y-3">
                        {certificates
                          .filter((cert) => !cert.hidden)
                          .map((cert) => (
                            <div key={cert.id} className="">
                              <h4 className="font-semibold text-gray-900">
                                {cert.name}
                              </h4>
                              <p className="text-gray-700 text-sm">
                                {cert.authority}
                              </p>
                              {cert.issueDate && (
                                <p className="text-gray-600 text-xs">
                                  Issued: {cert.issueDate}
                                </p>
                              )}
                              {cert.url && (
                                <a
                                  href={cert.url}
                                  target="_blank"
                                  className="text-blue-600 text-sm hover:underline flex items-center gap-1"
                                >
                                  <FaGlobe className="text-xs" /> View
                                  Certificate
                                </a>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Awards */}
                  {shouldShowSection(awards) && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <FaAward className="text-gray-600" /> Awards
                      </h3>
                      <div className="space-y-3">
                        {awards
                          .filter((award) => !award.hidden)
                          .map((award) => (
                            <div key={award.id} className="bg-gray-50 p-4">
                              <h4 className="font-semibold text-gray-900">
                                {award.title}
                              </h4>
                              <p className="text-gray-700 text-sm">
                                {award.issuer}
                              </p>
                              {award.description && (
                                <div
                                  className="text-gray-700 text-sm mt-1"
                                  dangerouslySetInnerHTML={{
                                    __html: award.description,
                                  }}
                                />
                              )}
                              {award.url && (
                                <a
                                  href={award.url}
                                  target="_blank"
                                  className="text-blue-600 text-sm hover:underline flex items-center gap-1"
                                >
                                  <FaGlobe className="text-xs" /> View Award
                                </a>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Publications */}
            {shouldShowSection(publications) && (
              <section className="page-section">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
                  Publications
                </h2>
                <div className="space-y-4">
                  {publications
                    .filter((pub) => !pub.hidden)
                    .map((pub) => (
                      <div key={pub.id} className="">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {pub.title}
                        </h3>
                        <p className="text-gray-700 text-sm">{pub.publisher}</p>
                        {pub.authors && (
                          <p className="text-gray-600 text-sm">
                            Authors: {pub.authors}
                          </p>
                        )}
                        {pub.publicationMonth && pub.publicationYear && (
                          <p className="text-gray-600 text-sm">
                            Published:{" "}
                            {formatMonthYear(
                              pub.publicationMonth,
                              pub.publicationYear,
                              "long"
                            )}
                          </p>
                        )}
                        {pub.description && (
                          <div
                            className="text-gray-700 text-sm mt-2"
                            dangerouslySetInnerHTML={{
                              __html: pub.description,
                            }}
                          />
                        )}
                        {pub.url && (
                          <a
                            href={pub.url}
                            target="_blank"
                            className="text-blue-600 text-sm hover:underline flex items-center gap-1"
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
        </div>
      </div>
    </PageBreakHandler>
  );
};

export default ExecutiveTemplate;
