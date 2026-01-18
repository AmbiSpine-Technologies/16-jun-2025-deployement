"use client";
import { useState, useMemo, useEffect } from "react";
import {
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiChevronDown,
  FiChevronUp,
  FiPlus,
} from "react-icons/fi";
import { InputWithCount } from "../components/FormInput";
import SelectField from "../components/FormSelect";
import { getProficiencyDots } from "../utils/resumeUtils";
import { skillLists, suggestedInterests, allIndianLanguages } from '@/app/data/data';

const ProfessionalSkillsSection = ({ skills = {}, onSkillsUpdate }) => {
  const [techInput, setTechInput] = useState("");
  const [softInput, setSoftInput] = useState("");
  const [showTechSuggestions, setShowTechSuggestions] = useState(false);
  const [showSoftSuggestions, setShowSoftSuggestions] = useState(false);

  // ✅ Safe skills structure with defaults - ADD THIS
  const safeSkills = {
    technical: skills?.technical || [],
    soft: skills?.soft || [],
  };

  // ✅ Separate Skill Lists for Technical and Soft Skills


  // ✅ Skill Suggestions
  const getSkillSuggestions = (type, inputValue) => {
    const query = inputValue.trim().toLowerCase();
    const typeSkills = skillLists[type] || [];

    if (!query) {
      return typeSkills.slice(0, 12);
    } else {
      return typeSkills
        .filter((skill) => skill.toLowerCase().includes(query))
        .slice(0, 10);
    }
  };

  const techSuggestions = useMemo(() => {
    return getSkillSuggestions("technical", techInput);
  }, [techInput]);

  const softSuggestions = useMemo(() => {
    return getSkillSuggestions("soft", softInput);
  }, [softInput]);

  // ✅ Fixed add functions using safeSkills
  const addTechSkill = (val) => {
    if (!val.trim()) return;
    const v = val.trim();
    const exists = safeSkills.technical.some(
      (s) => s.toLowerCase() === v.toLowerCase()
    );
    if (!exists) {
      onSkillsUpdate({
        ...safeSkills,
        technical: [...safeSkills.technical, v],
      });
    }
    setTechInput("");
    setShowTechSuggestions(false);
  };

  const addSoftSkill = (val) => {
    if (!val.trim()) return;
    const v = val.trim();
    const exists = safeSkills.soft.some(
      (s) => s.toLowerCase() === v.toLowerCase()
    );
    if (!exists) {
      onSkillsUpdate({
        ...safeSkills,
        soft: [...safeSkills.soft, v],
      });
    }
    setSoftInput("");
    setShowSoftSuggestions(false);
  };

  // ✅ Fixed remove functions using safeSkills
  const removeTechSkill = (index) => {
    onSkillsUpdate({
      ...safeSkills,
      technical: safeSkills.technical.filter((_, i) => i !== index),
    });
  };

  const removeSoftSkill = (index) => {
    onSkillsUpdate({
      ...safeSkills,
      soft: safeSkills.soft.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="bg-white rounded-2xl p-4">
      {/* Technical Skills Section */}
      <div className="">
        {/* Technical Skills Input */}
        <div className="relative mb-4">
          <InputWithCount
            label="Technical Skills"
            value={techInput}
            onChange={(val) => {
              setTechInput(val);
              setShowTechSuggestions(val.length >= 1);
            }}
            placeholder="Type a technical skill..."
            showCount={false}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Tab") {
                e.preventDefault();
                if (techSuggestions.length > 0 && techInput.trim()) {
                  const exactMatch = techSuggestions.find(
                    (s) => s.toLowerCase() === techInput.trim().toLowerCase()
                  );
                  addTechSkill(exactMatch || techInput);
                } else if (techInput.trim()) {
                  addTechSkill(techInput);
                }
              }
            }}
            onFocus={() => {
              if (techInput.length >= 1) setShowTechSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowTechSuggestions(false), 150)}
          />

          {/* Technical Skill Suggestions - FIXED with safeSkills */}
          {showTechSuggestions && techSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 bg-white custom-scroll border border-[#aeadad] rounded-lg max-h-48 overflow-y-auto z-50">
              {techSuggestions.map((skill, idx) => {
                const isAdded = safeSkills.technical.some(
                  (s) => s.toLowerCase() === skill.toLowerCase()
                );
                return (
                  <div
                    key={idx}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      if (!isAdded) addTechSkill(skill);
                    }}
                    className={`px-3 py-2 text-sm cursor-pointer ${
                      isAdded
                        ? "text-gray-500 bg-white cursor-not-allowed"
                        : "text-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {skill}
                    {isAdded && (
                      <span className="text-xs text-gray-500 ml-2">
                        ✓ Added
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Display Technical Skills - FIXED with safeSkills */}
        <div className="space-x-2 flex flex-wrap  ">
          {safeSkills.technical.map((skill, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-3 py-1 rounded-full border border-[#aeadad]"
            >
              <span className="text-black font-medium text-sm px-1">
                {skill}
              </span>
              <button
                onClick={() => removeTechSkill(i)}
                className="text-gray-400 hover:text-red-400 text-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Soft Skills Section */}
      <div>
        {/* Soft Skills Input */}
        <div className="relative mt-3 ">
          <InputWithCount
            label="Soft Skills"
            value={softInput}
            onChange={(val) => {
              setSoftInput(val);
              setShowSoftSuggestions(val.length >= 1);
            }}
            placeholder="Type a soft skill..."
            showCount={false}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Tab") {
                e.preventDefault();
                if (softSuggestions.length > 0 && softInput.trim()) {
                  const exactMatch = softSuggestions.find(
                    (s) => s.toLowerCase() === softInput.trim().toLowerCase()
                  );
                  addSoftSkill(exactMatch || softInput);
                } else if (softInput.trim()) {
                  addSoftSkill(softInput);
                }
              }
            }}
            onFocus={() => {
              if (softInput.length >= 1) setShowSoftSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowSoftSuggestions(false), 150)}
          />

          {/* Soft Skill Suggestions - FIXED with safeSkills */}
          {showSoftSuggestions && softSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 bg-white custom-scroll border border-[#aeadad] rounded-lg max-h-48 overflow-y-auto z-50">
              {softSuggestions.map((skill, idx) => {
                const isAdded = safeSkills.soft.some(
                  (s) => s.toLowerCase() === skill.toLowerCase()
                );
                return (
                  <div
                    key={idx}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      if (!isAdded) addSoftSkill(skill);
                    }}
                    className={`px-3 py-2 text-sm cursor-pointer ${
                      isAdded
                        ? "text-gray-500 bg-white cursor-not-allowed"
                        : "text-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {skill}
                    {isAdded && (
                      <span className="text-xs text-gray-500 ml-2">
                        ✓ Added
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Display Soft Skills - FIXED with safeSkills */}
        <div className="space-x-2 flex flex-wrap mt-3 ">
          {safeSkills.soft.map((skill, i) => (
            <div
              key={i}
              className="flex items-center gap-1 px-3 py-1 rounded-full border border-[#3A3A3A]"
            >
              <span className="text-white font-medium text-sm">{skill}</span>
              <button
                onClick={() => removeSoftSkill(i)}
                className="text-gray-400 hover:text-red-400 text-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProfessionalInterestsSection = ({
  interests = [],
  onInterestsUpdate,
}) => {
  const [interestInput, setInterestInput] = useState("");
  const [showInterestSuggestions, setShowInterestSuggestions] = useState(false);



  // ✅ Filter logic: Only show after typing minimum 1 character
  const filteredInterestSuggestions = useMemo(() => {
    const q = interestInput.trim().toLowerCase();
    if (q.length < 1) return []; // don't show until user types something

    const allCandidates = Array.from(
      new Set([...suggestedInterests, ...interests])
    );
    const filtered = allCandidates.filter(
      (i) =>
        i.toLowerCase().includes(q) &&
        !interests.some(
          (existing) => existing.toLowerCase() === i.toLowerCase()
        )
    );

    return filtered.length
      ? filtered
      : suggestedInterests.filter(
          (i) =>
            !interests.some(
              (existing) => existing.toLowerCase() === i.toLowerCase()
            )
        );
  }, [interestInput, interests]);

  const addInterest = (val) => {
    if (!val || !val.trim()) return;
    const v = val.trim();
    const exists = interests.some((it) => it.toLowerCase() === v.toLowerCase());
    if (!exists) {
      onInterestsUpdate([...interests, v]);
    }
    setInterestInput("");
    setShowInterestSuggestions(false);
  };

  const removeInterest = (index) => {
    const updated = interests.filter((_, i) => i !== index);
    onInterestsUpdate(updated);
  };

  return (
    <div className="bg-white p-4 relative">
      <div className="relative">
        <InputWithCount
          value={interestInput}
          onChange={(val) => {
            setInterestInput(val);
            if (val.length >= 1) setShowInterestSuggestions(true);
            else setShowInterestSuggestions(false);
          }}
          placeholder="Type an interest and press Enter..."
          showCount={false}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Tab") {
              e.preventDefault();
              if (
                filteredInterestSuggestions.length > 0 &&
                interestInput.trim()
              ) {
                const exactMatch = filteredInterestSuggestions.find(
                  (i) => i.toLowerCase() === interestInput.trim().toLowerCase()
                );
                addInterest(exactMatch || interestInput);
              } else if (interestInput.trim()) {
                addInterest(interestInput);
              }
            }
          }}
          onFocus={() => {
            if (interestInput.length >= 1) setShowInterestSuggestions(true);
          }}
          onBlur={() =>
            setTimeout(() => setShowInterestSuggestions(false), 150)
          }
        />

        {/* ✅ Suggestions appear only after typing */}
        {showInterestSuggestions && filteredInterestSuggestions.length > 0 && (
          <div className="absolute mt-2 border-b bg-white max-h-48 custom-scroll overflow-auto z-30 w-full pe-3">
            {filteredInterestSuggestions.map((interest, idx) => {
              const isAdded = interests.some(
                (i) => i.toLowerCase() === interest.toLowerCase()
              );
              return (
                <div
                  key={idx}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    if (!isAdded) addInterest(interest);
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer ${
                    isAdded
                      ? "text-gray-500 bg-white cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {interest}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ✅ Display selected interests */}
      <div className="flex flex-wrap gap-2 mt-1">
        {interests.map((interest, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-3 py-1 bg-[#dbdbdb] text-gray-600 rounded-full text-sm"
          >
            <span>{interest}</span>
            <button
              onClick={() => removeInterest(i)}
              className="text-gray-400 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* ✅ Quick Picks for Interests */}
      <div className="mt-4">
        <label className="font-medium text-gray-300 mb-2 block">
          Popular Interests
        </label>
        <div className="flex flex-wrap gap-2">
          {suggestedInterests.slice(0, 3).map((interest, i) => {
            const isAdded = interests.some(
              (i) => i.toLowerCase() === interest.toLowerCase()
            );
            return (
              <button
                key={i}
                onClick={() => !isAdded && addInterest(interest)}
                disabled={isAdded}
                className={`px-3 py-1 rounded-full text-sm ${
                  isAdded
                    ? "bg-white text-gray-500 cursor-not-allowed"
                    : "bg-white text-gray-300 hover:bg-gray-200"
                }`}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ProfessionalLanguagesSection = ({
  languages = [],
  onLanguagesUpdate,
}) => {
  const [langInput, setLangInput] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [showLangSuggestions, setShowLangSuggestions] = useState(false);
  const [proficiency, setProficiency] = useState("");

  // Options
  const proficiencyOptions = [
    { label: "Select Level", value: "" },
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" },
    { label: "Native", value: "native" },
  ];


  const getProficiencyDots = (level) => {
    switch (level) {
      case "beginner":
        return 2;
      case "intermediate":
        return 3;
      case "advanced":
        return 4;
      case "native":
        return 5;
      default:
        return 0;
    }
  };

  // Filter language suggestions
  const filteredSuggestions = useMemo(() => {
    const q = langInput.trim().toLowerCase();
    if (!q) return [];
    return allIndianLanguages.filter((l) => l.toLowerCase().includes(q));
  }, [langInput]);

  // ✅ Add Language only if both filled
  const addLanguage = (val) => {
    const v = val.trim();
    if (!v || !proficiency) return;

    const exists = languages.some(
      (l) => l.language.toLowerCase() === v.toLowerCase()
    );
    if (!exists) {
      onLanguagesUpdate([...languages, { language: v, proficiency }]);
    }

    setLangInput("");
    setSelectedLanguage("");
    setProficiency("");
    setShowLangSuggestions(false);
  };

  // ✅ Auto add when both values ready
  useEffect(() => {
    if (selectedLanguage && proficiency) {
      addLanguage(selectedLanguage);
    }
  }, [selectedLanguage, proficiency]);

  const removeLanguage = (index) => {
    onLanguagesUpdate(languages.filter((_, i) => i !== index));
  };

  const updateProficiency = (index, newProficiency) => {
    const updated = languages.map((lang, i) =>
      i === index ? { ...lang, proficiency: newProficiency } : lang
    );
    onLanguagesUpdate(updated);
  };

  return (
    <div className="bg-white p-4 relative">
      <h4 className="font-semibold text-lg text-black mb-4">Languages</h4>
      <p className="text-gray-400 text-sm mb-4">
        Add languages and specify your proficiency level
      </p>

      {/* Input + Level */}
      <div className="flex flex-col md:flex-row gap-4 mb-2">
        {/* Language Input */}
        <div className="flex-1 w-full relative">
          <InputWithCount
            value={langInput}
            onChange={(val) => {
              setLangInput(val);
              setShowLangSuggestions(val.length >= 1);
            }}
            placeholder="Type a language..."
            showCount={false}
            onFocus={() => setShowLangSuggestions(true)}
            onBlur={() => setTimeout(() => setShowLangSuggestions(false), 150)}
          />

          {/* Suggestions */}
          {showLangSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 bg-white border border-[#aeadad] rounded-lg max-h-48 overflow-y-auto z-50">
              {filteredSuggestions.map((lang, idx) => {
                const isAdded = languages.some(
                  (l) => l.language.toLowerCase() === lang.toLowerCase()
                );
                return (
                  <div
                    key={idx}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      if (!isAdded) {
                        setLangInput(lang);
                        setSelectedLanguage(lang);
                        setShowLangSuggestions(false);
                      }
                    }}
                    className={`px-3 py-2 text-sm cursor-pointer ${
                      isAdded
                        ? "text-gray-500 bg-white cursor-not-allowed"
                        : "text-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    {lang}
                    {isAdded && <span className="text-xs ml-2">✓ Added</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Level Dropdown (reusable SelectField) */}
        <div className="flex-1">
          <SelectField
            options={proficiencyOptions}
            value={proficiency}
            onChange={(e) => setProficiency(e.target.value)}
          />
        </div>
      </div>

      {/* Added Languages List */}
      <div className="space-y-3 mt-4">
        {languages.map((lang, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-[#3A3A3A]"
          >
            <div className="flex items-center gap-3 mb-2 sm:mb-0">
              <span className="text-black font-medium text-sm">
                {lang.language}
              </span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, dotIndex) => (
                  <div
                    key={dotIndex}
                    className={`h-2 w-2 rounded-full ${
                      dotIndex < getProficiencyDots(lang.proficiency)
                        ? "bg-blue-500"
                        : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-400 text-xs capitalize">
                ({lang.proficiency})
              </span>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={lang.proficiency}
                onChange={(e) => updateProficiency(i, e.target.value)}
                className="bg-white border border-[#aeadad] text-black text-xs rounded px-2 py-1"
              >
                {proficiencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeLanguage(i)}
                className="text-gray-400 hover:text-red-400 text-sm"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Add Languages */}
      <div className="mt-2">
        <label className="font-medium text-gray-300 mb-3 block text-sm">
          Quick Add Common Languages
        </label>
        <div className="flex flex-wrap gap-2">
          {["English", "Hindi", "Bengali", "Tamil", "Telugu", "Marathi"].map(
            (lang, i) => (
              <button
                key={i}
                onClick={() => {
                  setLangInput(lang);
                  setSelectedLanguage(lang);
                }}
                disabled={languages.some(
                  (l) => l.language.toLowerCase() === lang.toLowerCase()
                )}
                className="px-3 py-1 bg-white text-black rounded-full hover:bg-[#dbdbdb] disabled:opacity-50 disabled:cursor-not-allowed text-xs transition-colors"
              >
                {lang}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

const  ProfessionalSkillsInterestsSection = ({
  skills = [],
  interests = [],
  languages = [],
  onSkillsUpdate,
  onInterestsUpdate,
  onLanguagesUpdate,
}) => {
  return (
    <div className="space-y-2">
      <div>
        <h3 className="text-base font-semibold mb-2 text-white">
          Professional Skills
        </h3>
        <ProfessionalSkillsSection
          skills={skills}
          onSkillsUpdate={onSkillsUpdate}
        />
      </div>

      <div>
        <h3 className="text-base font-semibold text-white mb-2">
          Professional Interests
        </h3>
        <ProfessionalInterestsSection
          interests={interests}
          onInterestsUpdate={onInterestsUpdate}
        />
      </div>

      <div>
        <h3 className="text-base font-semibold text-white mb-2">Languages</h3>
        <ProfessionalLanguagesSection
          languages={languages}
          onLanguagesUpdate={onLanguagesUpdate}
        />
      </div>
    </div>
  );
};

export default ProfessionalSkillsInterestsSection;
