"use client";

import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaGlobe,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  formatMonthYear,
  getLocationText,
  shouldShowSection,
  getPlatformIconObject,
} from "../../utils/resumeUtils";
import { useMemo, memo } from "react";
import { useSelector } from "react-redux";

/* ================= FONT MAP ================= */
const FONT_CLASSES = {
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

/* ================= SECTION HEADER ================= */
const SectionHeader = memo(({ children, color }) => (
  <h2
    className="text-[13px] font-bold uppercase tracking-wider border-b pb-1 mb-2"
    style={{ color, borderColor: color }}
  >
    {children}
  </h2>
));
// const isPremiumUser = user?.isSubscribed === true;


/* ================= WORK EXPERIENCE ================= */
const WorkExperienceItem = memo(({ exp }) => {
  const endDate = exp.currentlyWorking
    ? "Present"
    : formatMonthYear(exp.endMonth, exp.endYear, "short");

  return (
    <div className="mb-3">
      <div className="flex justify-between">
        <h3 className="font-semibold text-gray-800 text-[13px]">
          {exp.company}
        </h3>
        <span className="text-[12px] text-gray-500">
          {formatMonthYear(exp.startMonth, exp.startYear, "short")} – {endDate}
        </span>
      </div>

      <p className="italic text-[12px] text-gray-600">{exp.title}</p>

      {exp.description && (
        <div
          className="text-[10px] text-gray-700 mt-1"
          dangerouslySetInnerHTML={{ __html: exp.description }}
        />
      )}

      {exp.bullets?.length > 0 && (
        <ul className="list-disc ml-4 mt-1 space-y-1 text-[12px] text-gray-700">
          {exp.bullets.map((b, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
          ))}
        </ul>
      )}
    </div>
  );
});

/* ================= EDUCATION ================= */
const EducationItem = memo(({ edu }) => {
  const endDate = edu.currentlyStudying
    ? "Present"
    : formatMonthYear(edu.endMonth, edu.endYear, "short");

  return (
    <div className="mb-2">
      <h3 className="font-semibold text-[13px] text-gray-800">
        {edu.level}
      </h3>
      <p className="text-[12px] text-gray-600">{edu.college}</p>
      <p className="text-[12px] text-gray-500">
        {formatMonthYear(edu.startMonth, edu.startYear, "short")} – {endDate}
      </p>
    </div>
  );
});

/* ================= SOCIAL ================= */
const SocialLinkItem = memo(({ link }) => {
  const Icon = getPlatformIconObject(link.platform);
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-[12px] text-gray-700"
    >
      {Icon}
      {link.customName || link.platform}
    </a>
  );
});

/* ================= MAIN TEMPLATE ================= */
const ModernTemplate = ({ data, currentFont, currentColor }) => {
  if (!data) return null;

  const {
    personalInfo,
    profileSummary,
    workExperience,
    education,
    skills,
    socialLinks,
  } = data;

  const user = useSelector((state) => state.users?.currentUser);

  const color = currentColor || "#8b5cf6";
  const fontClass = FONT_CLASSES[currentFont] || "font-inter";
  const locationText = useMemo(
    () => getLocationText(personalInfo),
    [personalInfo]
  );


  return (
    <div className={`relative bg-white ${fontClass} text-gray-800 px-10 py-8 min-h-[11in] mx-auto`}
     style={{
        pageBreakAfter: 'auto',
        pageBreakInside: 'avoid'
      }}>

      {/* ================= HEADER ================= */}
      <div className="text-center border-b pb-3 mb-5" style={{ borderColor: color }}>
        <h1
          className="text-[28px] font-bold uppercase tracking-wide"
          style={{ color }}
        >
          {personalInfo?.firstName} {personalInfo?.lastName}
        </h1>

        <p className="text-[12px] text-gray-600 mt-1">
          {personalInfo?.email} • {personalInfo?.phone} • {locationText}
        </p>

        {personalInfo?.website && (
          <p className="text-[12px] text-gray-600">
            {personalInfo.website}
          </p>
        )}
      </div>

      {/* ================= BODY ================= */}

      <div className="col-span-2 space-y-4">
        {profileSummary && (
          <section>
            <SectionHeader color={color}>Summary</SectionHeader>
            <div
              className="text-[10px] text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: profileSummary }}
            />
          </section>
        )}

        {shouldShowSection(workExperience) && (
          <section>
            <SectionHeader color={color}>
              <FaBriefcase className="inline mr-2" />
              Work Experience
            </SectionHeader>
            {workExperience?.map((exp) => (
              <WorkExperienceItem key={exp.id} exp={exp} />
            ))}
          </section>
        )}
      </div>


      <div className="space-y-4">
        {skills?.technical?.length > 0 && (
          <section>
            <SectionHeader color={color}>Skills</SectionHeader>
            <p className="text-[12px] text-gray-700 leading-relaxed">
              {skills.technical.join(", ")}
            </p>
          </section>
        )}

        {shouldShowSection(education) && (
          <section>
            <SectionHeader color={color}>Education</SectionHeader>
            {education.map((edu) => (
              <EducationItem key={edu.id} edu={edu} />
            ))}
          </section>
        )}

        {socialLinks?.length > 0 && (
          <section>
            <SectionHeader color={color}>Links</SectionHeader>
            <div className="space-y-1">
              {socialLinks.map((l, i) => (
                <SocialLinkItem key={i} link={l} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default memo(ModernTemplate);
