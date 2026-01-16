import React, { useState } from "react";
import { Search, Plus, X, Award } from "lucide-react";

export default function SkillsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Available skills suggestions
  const availableSkills = [
    "HTML/CSS",
    "JavaScript",
    "React JS",
    "Node JS",
    "Python",
    "Java",
    "TypeScript",
    "Bootstrap",
    "Ionic",
    "Polymer",
    "AngularJS",
    "Vue JS",
    "Express JS",
    "Django",
    "Flask",
    "Spring Boot",
    "MongoDB",
    "SQL",
    "AWS",
    "Docker",
  ];

  const [userSkills, setUserSkills] = useState([]);

  const filteredSuggestions = availableSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !userSkills.some((userSkill) => userSkill.name === skill)
  );

  const addSkill = (skillName) => {
    const newSkill = {
      id: Date.now(),
      name: skillName,
      rating: 3, // Default rating
    };
    setUserSkills([...userSkills, newSkill]);
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const removeSkill = (id) => {
    setUserSkills(userSkills.filter((skill) => skill.id !== id));
  };

  const updateRating = (id, newRating) => {
    setUserSkills(
      userSkills.map((skill) =>
        skill.id === id ? { ...skill, rating: newRating } : skill
      )
    );
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-bold text-black mb-2">SKILLS</h1>
        </div>

        {/* Add Skill Section */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="text-md font-bold text-black mb-4 flex items-center gap-2">
            <Plus className="w-6 h-6" />
            Add New Skill
          </h2>

          <div className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search skills (e.g., React JS, Python, HTML/CSS...)"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            {showSuggestions &&
              searchQuery &&
              filteredSuggestions.length > 0 && (
                <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg z-10 max-h-64 overflow-y-auto">
                  {filteredSuggestions.map((skill, index) => (
                    <button
                      key={index}
                      onClick={() => addSkill(skill)}
                      className="w-full px-4 py-3 text-left text-black hover:bg-gray-100 transition-all flex items-center gap-3 border-b border-gray-200 last:border-b-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="font-medium">{skill}</span>
                    </button>
                  ))}
                </div>
              )}
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-3">Popular Skills:</p>
            <div className="flex flex-wrap gap-2">
              {[
                "HTML/CSS",
                "JavaScript",
                "React JS",
                "Python",
                "Bootstrap",
              ].map(
                (skill) =>
                  !userSkills.some((s) => s.name === skill) && (
                    <button
                      key={skill}
                      onClick={() => addSkill(skill)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black rounded-lg text-sm transition-all border border-gray-300"
                    >
                      + {skill}
                    </button>
                  )
              )}
            </div>
          </div>
        </div>

        {/* Skills Display */}
        {userSkills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
            {userSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-lg font-semibold text-black min-w-[140px]">
                    {skill.name}
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => updateRating(skill.id, star)}
                        className="w-6 h-6 rounded-full transition-all hover:scale-110"
                      >
                        {star <= skill.rating ? (
                          <div className="w-6 h-6 bg-black rounded-full"></div>
                        ) : (
                          <div className="w-6 h-6 border-2 border-black rounded-full"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                >
                  <X className="w-5 h-5 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-12 text-center">
            <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-black mb-2">
              No Skills Added Yet
            </h3>
            <p className="text-gray-600">
              Start by adding your skills using the search bar above
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
