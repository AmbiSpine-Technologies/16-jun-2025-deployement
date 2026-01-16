"use client";
import React, { useState, useMemo } from "react";
import { resumeTemplates, templateCategories, experienceLevels } from "./templateManager";
import { FiSearch, FiFilter, FiX, FiCheck } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";

export default function Page({ onTemplateSelect, currentTemplate }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(true);

  const filteredTemplates = useMemo(() => {
    let filtered = Object.values(resumeTemplates);

    if (selectedCategory !== "all") {
      filtered = filtered.filter((template) => template.category === selectedCategory);
    }

    if (selectedExperience !== "all") {
      filtered = filtered.filter((template) => template.experienceLevel === selectedExperience);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (template) =>
          template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.recommendedFor.some((role) =>
            role.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    return filtered;
  }, [selectedCategory, selectedExperience, searchTerm]);

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedExperience("all");
    setSearchTerm("");
  };

    const handleTemplateSelect = (templateId) => {
    onTemplateSelect(templateId);
    // Don't auto-close, let parent handle it
  };

  const generateTemplatePreview = (template) => {
    const previewColors = {
      modern: { primary: "#2563eb" },
      classic: { primary: "#4b5563" },
      creative: { primary: "#ec4899" },
      professional: { primary: "#0d9488" },
    };
    return previewColors[template.style] || previewColors.modern;
  };

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedExperience !== "all" ? 1 : 0) +
    (searchTerm ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700 bg-gray-800">
        <h2 className="text-3xl font-bold mb-2">Choose Your Template</h2>
        <p className="text-gray-400 text-sm">Professional designs optimized for ATS systems</p>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Left Sidebar */}
        <div className="w-full md:w-[30%] border-r border-gray-700 p-4 bg-gray-900">
          <div className="flex gap-2 items-center mb-4">
            <div className="relative flex-grow">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, role, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 py-2.5 w-full bg-gray-800 border border-gray-700 rounded-xl placeholder-gray-400 text-sm focus:ring-2 focus:ring-blue-500"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="absolute right-3 top-3 text-gray-400">
                  <FiX />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-semibold text-sm ${
                showFilters
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-800 text-gray-300 border-gray-700"
              }`}
            >
              <FiFilter /> Filters
              {activeFiltersCount > 0 && (
                <span className="bg-white bg-opacity-20 rounded-full text-xs px-2 py-0.5">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="px-3 py-2.5 bg-gray-800 text-red-400 border border-red-600 rounded-xl text-sm"
              >
                Clear
              </button>
            )}
          </div>

          {showFilters && (
            <>
              {/* Industry Filter */}
              <div className="mb-4">
                <h3 className="text-xs font-bold text-gray-400 mb-2 uppercase">Industry</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-4 py-2 rounded-lg border text-sm font-semibold ${
                      selectedCategory === "all"
                        ? "bg-blue-600 border-blue-600"
                        : "bg-gray-800 border-gray-700"
                    }`}
                  >
                    🌐 All
                  </button>
                  {Object.entries(templateCategories).map(([key, cat]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`px-4 py-2 rounded-lg border text-sm font-semibold ${
                        selectedCategory === key
                          ? "bg-blue-600 border-blue-600"
                          : "bg-gray-800 border-gray-700"
                      }`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Filter */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 mb-2 uppercase">Experience Level</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedExperience("all")}
                    className={`px-4 py-2 rounded-lg border text-sm font-semibold ${
                      selectedExperience === "all"
                        ? "bg-green-600 border-green-600"
                        : "bg-gray-800 border-gray-700"
                    }`}
                  >
                    All
                  </button>
                  {Object.entries(experienceLevels).map(([key, level]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedExperience(key)}
                      className={`px-4 py-2 rounded-lg border text-sm font-semibold ${
                        selectedExperience === key
                          ? "bg-green-600 border-green-600"
                          : "bg-gray-800 border-gray-700"
                      }`}
                    >
                      {level.name}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[70%] overflow-y-auto p-6 custom-scroll">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-bold mb-2">No templates found</h3>
              <p className="text-gray-400 mb-4">Try adjusting your filters or search terms.</p>
              <button
                onClick={clearFilters}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Show All Templates
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => {
                const isSelected = currentTemplate === template.id;
                const colors = generateTemplatePreview(template);
                return (
                  <div
                    key={template.id}
                    onClick={() => handleTemplateSelect(template.id)}
                    className={`group cursor-pointer border rounded-xl overflow-hidden transition-all hover:scale-105 ${
                      isSelected ? "ring-2 ring-blue-500" : "border-gray-700"
                    }`}
                  >
                    <div
                      className="h-32 flex items-center justify-center"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <img src={template.img} alt={template.name} className="h-12" />
                    </div>
                    <div className="p-4 bg-gray-800">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold">{template.name}</h3>
                        {template.isPremium && (
                          <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
                            <FaCrown /> Premium
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                        {template.description}
                      </p>
                      <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded">
                        {template.style}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 bg-gray-800 flex justify-between items-center">
        <div className="text-sm text-gray-400">
          Selected:{" "}
          <span className="text-blue-400 font-semibold">
            {resumeTemplates[currentTemplate]?.name || "None"}
          </span>{" "}
          | Showing {filteredTemplates.length} of {Object.keys(resumeTemplates).length}
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-gray-700 rounded-lg hover:bg-gray-600">
            Cancel
          </button>
          <button className="px-6 py-2.5 bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <FiCheck /> Apply Template
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scroll::-webkit-scrollbar-thumb { 
          background: #4b5563;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
