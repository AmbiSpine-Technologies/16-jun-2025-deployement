"use client";

import { useSelector } from "react-redux";
import { useMemo, useState, memo } from "react";
import { FiChevronDown, FiSearch, FiZap, FiDownload } from "react-icons/fi";
import { FaMagic, FaShareAlt, FaPalette, FaFont } from "react-icons/fa";
import { SmartDropdown } from "../../components/Dropdown";
import { CirclePlus, FileDown, LayoutTemplate, Link, List, SwatchBook } from "lucide-react";
import DownloadPopup from "./DownloadPopup";

/* ---------- Static Data ---------- */

const COLOR_SCHEMES = [
  { id: "blue", primary: "#2563eb" },
  { id: "gray", primary: "#4b5563" },
  { id: "teal", primary: "#0d9488" },
  { id: "purple", primary: "#7c3aed" },
  { id: "red", primary: "#dc2626" },
  { id: "green", primary: "#059669" },
  { id: "amber", primary: "#d97706" }
];

const FONT_OPTIONS = [
  { id: "inter", name: "Inter" },
  { id: "roboto", name: "Roboto" },
  { id: "opensans", name: "Open Sans" },
  { id: "lato", name: "Lato" },
  { id: "montserrat", name: "Montserrat" },
  { id: "poppins", name: "Poppins" },
  { id: "playfair", name: "Playfair" },
  { id: "lora", name: "Lora" },
  { id: "georgia", name: "Georgia" },
  { id: "times", name: "Times" }
];

export default function MinimalActionBar({
  canProceed,
  downloadResume,
  handleNext,
  setShowTemplateModal,
  onShare,
  currentFont,
  currentColor,
  onFontChange,
  onColorChange,
  onETACheck,
  etaLocked = false,
  isPremiumUser = false,
  onUpgradeToPremium,
  atsScore = 0,
  resumeData = null,
  onAddSection
}) {
  const user = useSelector((state) => state.auth.user);

  const [showDownloadPopup, setShowDownloadPopup] = useState(false);

  const [fontSearch, setFontSearch] = useState("");
  const [customColor, setCustomColor] = useState(currentColor || "#2563eb");

  const activeFont = useMemo(
    () => FONT_OPTIONS.find(f => f.id === currentFont) || FONT_OPTIONS[0],
    [currentFont]
  );

  const filteredFonts = useMemo(
    () =>
      FONT_OPTIONS.filter(font =>
        font.name.toLowerCase().includes(fontSearch.toLowerCase())
      ),
    [fontSearch]
  );

  const handleCustomColorChange = (e) => {
    const color = e.target.value;
    setCustomColor(color);
    onColorChange(color);
  };

  const handleDownloadClick = () => {
    if (user?.isPremiumUser) {
      downloadResume({ watermark: false });
    } else {
      setShowDownloadPopup(true);
    }
  };


  // ATS Score circle calculations
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (atsScore / 100) * circumference;


  // Calculate unfilled sections
  const getUnfilledSections = () => {
    if (!resumeData) return [];

    const sections = [
      {
        key: 'location',
        label: 'Location',
        icon: '📍',
        check: () => {
          const info = resumeData.personalInfo;
          return !!(info.country && info.state && info.city);
        }
      },
      {
        key: 'headline',
        label: 'Headline/Title',
        icon: '👤',
        check: () => !!resumeData.personalInfo.headline
      },
      {
        key: 'profileSummary',
        label: 'Profile Summary',
        icon: '📝',
        check: () => resumeData.profileSummary && resumeData.profileSummary.length > 50
      },
      {
        key: 'workExperience',
        label: 'Work Experience',
        icon: '💼',
        check: () => resumeData.workExperience && resumeData.workExperience.length > 0
      },
      {
        key: 'education',
        label: 'Education',
        icon: '🎓',
        check: () => resumeData.education && resumeData.education.length > 0
      },
      {
        key: 'skills',
        label: 'Skills',
        icon: '⭐',
        check: () => resumeData.skills && resumeData.skills.length >= 3
      },
      {
        key: 'projects',
        label: 'Projects',
        icon: '🚀',
        check: () => resumeData.projects && resumeData.projects.length > 0
      },
      {
        key: 'certificates',
        label: 'Certificates',
        icon: '🏆',
        check: () => resumeData.certificates && resumeData.certificates.length > 0
      },
      {
        key: 'socialLinks',
        label: 'Social Links',
        icon: '🔗',
        check: () => resumeData.socialLinks && resumeData.socialLinks.length > 0
      }
    ];

    return sections.filter(section => !section.check());
  };

  const unfilledSections = getUnfilledSections();

  return (
    <div className="">
      <div className="w-[150px] bg-white rounded-xl border border-gray-200 overflow-hidden text-gray-600 font-poppins">

        {/* ATS Score Circle */}
        <div
          // onClick={onETACheck}
          className="relative px-4 py-6 flex flex-col items-center">

          <div className={`relative w-24 h-24 ${!isPremiumUser ? 'blur-sm' : ''}`}>
            {/* Background Circle */}
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r={radius}
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress Circle */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                stroke="#22D3EE"
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            {/* Score Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-semibold text-gray-800">{atsScore}%</span>
            </div>

            {/* Lock overlay for non-premium users */}
            {!isPremiumUser && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-full p-3">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-600 mt-3 font-semibold">ATS Score</p>
        </div>

        <ActionItem
          icon={<LayoutTemplate size={16} strokeWidth={1.25} />}
          label="Template"
          onClick={() => setShowTemplateModal(true)}
          badge={!isPremiumUser}
        />

        {/*  Color & Font – Single Dropdown */}
        {/* <SmartDropdown
          trigger={
            <button className="w-full flex items-center gap-3 px-4 py-3 text-xs border-t border-gray-100 text-gray-700 hover:bg-gray-50">
              <span className="text-gray-500">
                <SwatchBook size={16} strokeWidth={1.25} />
              </span>
              <span className="flex-1 text-left">Color & Font</span>
              <FiChevronDown className="text-gray-400" />
            </button>
          }
          width={288}
          maxHeight={400}
          placement="auto"
          closeOnClick={false}
        >
          <div className="p-4 space-y-4"> */}

        {/* Colors */}
        {/* <div>
              <div className="flex items-center gap-2 text-xs font-medium text-gray-600 mb-2 ">
                <FaPalette /> Colors
              </div>
              <div className="grid grid-cols-7 gap-2">
                {COLOR_SCHEMES.map(color => (
                  <button
                    key={color.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onColorChange(color.primary);
                      setCustomColor(color.primary);
                    }}
                    className={`h-7 w-7 rounded-md border transition
                      ${currentColor === color.primary
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-300"
                      }`}
                    style={{ backgroundColor: color.primary }}
                  />
                ))}
              </div> */}

        {/* Custom Color Picker */}
        {/* <div className="mt-3 pt-3 border-t border-gray-200">
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Custom Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customColor}
                    onChange={handleCustomColorChange}
                    onClick={(e) => e.stopPropagation()}
                    className="h-8 w-12 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customColor}
                    onChange={(e) => {
                      const value = e.target.value;
                      setCustomColor(value);
                      // Only apply if it's a valid hex color
                      if (/^#[0-9A-F]{6}$/i.test(value)) {
                        onColorChange(value);
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="#000000"
                    className="flex-1 px-2 py-1.5 text-xs border border-gray-300 rounded-md font-mono"
                  />
                </div>
              </div>
            </div> */}

        {/* Fonts */}
        {/* <div>
              <div className="flex items-center gap-2 text-xs font-medium text-gray-600 mb-2">
                <FaFont /> Font
              </div>

              <div className="relative mb-2">
                <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  value={fontSearch}
                  onChange={(e) => setFontSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Search font..."
                  className="w-full pl-7 pr-2 py-1.5 text-xs border border-gray-300 rounded-md"
                />
              </div>

              <div className="max-h-36 overflow-y-auto space-y-0">
                {filteredFonts.map(font => (
                  <button
                    key={font.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onFontChange(font.id);
                    }}
                    className={`w-full text-left px-2 py-1.5 text-xs rounded
                      ${currentFont === font.id
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "hover:bg-gray-50 text-gray-700"
                      }`}
                  >
                    {font.name}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </SmartDropdown> */}




        {/* Add Section Dropdown */}
        <SmartDropdown
          trigger={
            <button className="w-full flex items-center gap-3 px-3 py-3 text-xs border-t border-gray-100 text-gray-700 hover:bg-gray-50">
              <span className="text-gray-500">
                <CirclePlus size={16} strokeWidth={1.25} />
              </span>
              <span className="flex-1 text-left">Add Section</span>
              {unfilledSections.length > 0 && (
                <span className="text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full">
                  {unfilledSections.length}
                </span>
              )}
            </button>
          }
          width={240}
          maxHeight={320}
          placement="auto"
        >
          <div className="py-2">
            {unfilledSections.length === 0 ? (
              <div className="px-4 py-3 text-xs text-gray-500 text-center">
                All sections completed! 🎉
              </div>
            ) : (
              <>
                <div className="px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
                  Missing Sections
                </div>
                {unfilledSections.map((section) => (
                  <button
                    key={section.key}
                    onClick={() => {
                      if (onAddSection) {
                        onAddSection(section.key);
                      } else {
                        handleNext(section.key);
                      }
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 transition"
                  >
                    <span className="text-base">{section.icon}</span>
                    <span className="flex-1 text-left">{section.label}</span>
                    <span className="text-gray-400">→</span>
                  </button>
                ))}
              </>
            )}
          </div>
        </SmartDropdown>

        {/* <ActionItem
          icon={<CirclePlus size={16} strokeWidth={1.25} />}
          label="Add Section"
          onClick={handleNext}
          disabled={!canProceed}
        /> */}

        {/* <ActionItem
          icon={<CirclePlus size={16} strokeWidth={1.25} />}
          label="Add Section"
          onClick={handleNext}
          disabled={!canProceed}
        /> */}

        {/* <ActionItem
          icon={<List size={16} strokeWidth={1.25} />}
          label="ATS Score"
          onClick={onETACheck}
          badge={!isPremiumUser}
        /> */}

        <ActionItem
          icon={<FileDown size={16} strokeWidth={1.25} />}
          label="Download"
          onClick={handleDownloadClick}
        />

        {/* <ActionItem
          icon={<Link size={16} strokeWidth={1.25} />}
          label="Share"
          onClick={onShare}
        /> */}
      </div>
      <DownloadPopup
        isOpen={showDownloadPopup}
        onClose={() => setShowDownloadPopup(false)}
        onDownloadWithWatermark={() =>
          downloadResume({ watermark: true })
        }
      />
    </div >
  );
}

/* ---------- Reusable Row ---------- */

const ActionItem = memo(function ActionItem({
  icon,
  label,
  onClick,
  disabled = false,
  badge = false,
  suffix,
  asButton = false
}) {
  const Comp = asButton ? "div" : "button";

  return (
    <Comp
      onClick={onClick}
      className={`w-full flex items-center  px-3 py-2 text-xs border-t border-gray-100
        ${disabled
          ? "text-gray-400 cursor-not-allowed"
          : "hover:bg-gray-50 text-gray-700 cursor-pointer"
        }`}
    >
      <span className="text-gray-500">{icon}</span>
      <span className="flex-1 text-left">{label}</span>
      {suffix}
      {badge && (
        <span className="text-[10px] bg-yellow-400 text-white px-2 py-0.5 rounded-full">
          PRO
        </span>
      )}
    </Comp>
  );
});