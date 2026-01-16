"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { User, Search, Calendar, MessageSquare } from "lucide-react";

const SAMPLE_MENTORS = [
  {
    id: 1,
    name: "Aisha Khan",
    title: "Senior Data Scientist @ Finlytics",
    experience: "6 years",
    rating: 4.8,
    field: "Data Science",
    tags: ["Python", "ML", "NLP", "Interview Prep"],
    available: true,
  },
  {
    id: 2,
    name: "Rohit Verma",
    title: "Frontend Engineer @ PixelPlay",
    experience: "4 years",
    rating: 4.6,
    field: "Frontend",
    tags: ["React", "Next.js", "TypeScript", "Performance"],
    available: false,
  },
  {
    id: 3,
    name: "Meera Iyer",
    title: "Product Manager @ BuildHive",
    experience: "8 years",
    rating: 4.9,
    field: "Product",
    tags: ["Roadmaps", "Stakeholder Mgmt", "PM Interviews"],
    available: true,
  },
  {
    id: 4,
    name: "Sahil Gupta",
    title: "Java Engineer @ CoreStack",
    experience: "5 years",
    rating: 4.5,
    field: "Backend",
    tags: ["Java", "Spring", "System Design"],
    available: true,
  },
];

export default function MentorsSection() {
  const [mentors] = useState(SAMPLE_MENTORS);
  const [query, setQuery] = useState("");
  const [fieldFilter, setFieldFilter] = useState("All");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState("rating");

  const fields = useMemo(() => {
    const set = new Set(mentors.map((m) => m.field));
    return ["All", ...Array.from(set)];
  }, [mentors]);

  const filtered = useMemo(() => {
    let list = mentors.filter((m) => {
      const matchesQuery =
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.tags.join(" ").toLowerCase().includes(query.toLowerCase()) ||
        m.title.toLowerCase().includes(query.toLowerCase());

      const matchesField =
        fieldFilter === "All" ? true : m.field === fieldFilter;
      const matchesAvail = onlyAvailable ? m.available === true : true;

      return matchesQuery && matchesField && matchesAvail;
    });

    if (sortBy === "rating") {
      list = list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "experience") {
      list = list.sort(
        (a, b) => parseInt(b.experience) - parseInt(a.experience)
      );
    }

    return list;
  }, [mentors, query, fieldFilter, onlyAvailable, sortBy]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
          Connect with Mentors
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Find mentors by field, chat instantly or book a session — tailored for
          students.
        </p>
      </header>

      {/* Controls */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-6">
        <div className="col-span-1 md:col-span-2 flex gap-3">
          <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm w-full">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search mentors, tags or titles..."
              className="ml-3 w-full bg-transparent outline-none text-sm"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="ml-2 text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <div className="flex flex-col sm:flex-row gap-2 bg-white border rounded-lg p-3 shadow-sm w-full">
            <select
              value={fieldFilter}
              onChange={(e) => setFieldFilter(e.target.value)}
              className="text-sm bg-transparent outline-none border-b sm:border-b-0 sm:border-r pr-2 mb-2 sm:mb-0"
            >
              {fields.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>

            <label className="inline-flex items-center text-sm border-b sm:border-b-0 sm:border-r pr-2 mb-2 sm:mb-0">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="mr-2"
              />
              Available
            </label>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm bg-transparent outline-none"
            >
              <option value="rating">Rating</option>
              <option value="experience">Experience</option>
            </select>
          </div>
        </div>
      </section>

      {/* Mentor grid */}
      <section className="grid grid-cols-1  gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-12 border rounded-lg ">
            <p className="text-gray-600">
              No mentors match your filters. Try clearing filters or searching
              different keywords.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setFieldFilter("All");
                setOnlyAvailable(false);
              }}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          filtered.map((m) => (
            <motion.article
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="relative rounded-2xl  p-5 shadow-lg overflow-hidden border border-gray-200 bg-white hover:shadow-xl transition-shadow"
            >
              <div className="absolute -right-10 -top-10 opacity-30 transform rotate-12">
                <div className="w-36 h-36 rounded-full bg-gradient-to-r from-indigo-300 to-pink-300 filter blur-2xl" />
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-[#5803e0] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {m.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {m.name}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">{m.title}</p>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {m.rating} ★
                      </div>
                      <div
                        className={`text-xs mt-1 px-2 py-0.5 rounded-full ${
                          m.available
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {m.available ? "Available" : "Busy"}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {m.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 bg-gray-100 rounded-full border border-gray-200 text-gray-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xs text-gray-600">
                      Experience: {m.experience}
                    </div>

                    <div className="flex gap-2">
                      <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-gray-300 shadow-sm text-sm hover:bg-gray-50 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        Chat
                      </button>

                      <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-500 text-white text-sm shadow-lg hover:from-indigo-700 hover:to-pink-600 transition-colors">
                        <Calendar className="w-4 h-4" />
                        Book
                      </button>

                      <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-sm hover:bg-gray-50 transition-colors">
                        <User className="w-4 h-4" />
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))
        )}
      </section>

      <footer className="mt-8 text-sm text-gray-500 text-center">
        Tip: Encourage mentors to keep tags concise ("React", "System Design")
        so search works best.
      </footer>
    </div>
  );
}
