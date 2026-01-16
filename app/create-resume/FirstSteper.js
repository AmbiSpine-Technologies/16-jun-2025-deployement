
"use client";
import React, { useEffect, useState, useMemo } from "react";
import { FaUserGraduate, FaBriefcase, FaUserTie, FaLaptopCode, FaUserClock } from "react-icons/fa"; // icons for experience

export default function ResumeBuilder({ currentUser = null, onSave }) {
  const STEPS = ["Welcome", "Upload Résumé", "Experience", "Your Challenges", "Feedback", "Finish"];
  const STORAGE_KEY = "resume_builder_draft_v2";

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [draft, setDraft] = useState({
    name: currentUser?.name || "",
    headline: currentUser?.headline || "",
    experienceText: currentUser?.about || "",
    resumeFile: null,
    experienceLevel: currentUser?.experienceLevel || "",
    pressingIssues: currentUser?.pressingIssues || [],
    hearAbout: "",
    hearOther: "",
    createdAt: new Date().toISOString(),
  });

  // hydrate
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setDraft((prev) => ({ ...prev, ...JSON.parse(stored) }));
    } catch (e) {
      console.warn("hydrate failed", e);
    }
  }, []);

  // autosave
  useEffect(() => {
    try {
      const toStore = { ...draft, resumeFile: draft.resumeFile ? { name: draft.resumeFile.name } : null };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    } catch (e) {}
  }, [draft]);

  // navigation validation
  const canNext = useMemo(() => {
    if (step === 0) return true;
    if (step === 1) return true;
    if (step === 2) return !!draft.experienceLevel;
    if (step === 3) return draft.pressingIssues.length > 0;
    if (step === 4) return !!draft.hearAbout;
    return true;
  }, [step, draft]);

  // handlers
  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(f.type)) {
      alert("Only PDF/Word files allowed.");
      return;
    }
    setDraft((p) => ({ ...p, resumeFile: f }));
  };

  const togglePressing = (item) => {
    setDraft((p) => ({
      ...p,
      pressingIssues: p.pressingIssues.includes(item)
        ? p.pressingIssues.filter((x) => x !== item)
        : [...p.pressingIssues, item],
    }));
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      const output = { ...draft, updatedAt: new Date().toISOString() };
      if (typeof onSave === "function") await onSave(output);
      localStorage.removeItem(STORAGE_KEY);
      setStep(step + 1); // go to Thank You
    } catch (e) {
      alert("Save failed.");
    } finally {
      setLoading(false);
    }
  };

  // data
  const EXPERIENCE_LEVELS = [
    { id: "student", label: "Student", icon: <FaUserGraduate />, subtitle: "Just starting" },
    { id: "graduate", label: "Graduate", icon: <FaUserClock />, subtitle: "Some experience" },
    { id: "intermediate", label: "Intermediate", icon: <FaLaptopCode />, subtitle: "1-5 years" },
    { id: "senior", label: "Senior", icon: <FaUserTie />, subtitle: "5+ years" },
    { id: "freelancer", label: "Freelancer", icon: <FaBriefcase />, subtitle: "Independent work" },
  ];

  const PRESSING = [
    "Getting more interviews",
    "Networking strategies",
    "Changing my career",
    "Finding the right job",
    "Negotiating salary",
       "Getting more interviews",
    "Networking strategies",
    "Changing my career",
    "Finding the right job",
    "Negotiating salary",
  ];

  const HEAR_OPTIONS = ["LinkedIn", "Friends", "College", "Events", "Other"];

  // UI
  const StepHeader = ({ title, subtitle }) => (
    <div className="mb-6 text-center">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      {subtitle && <p className="text-gray-300 mt-2">{subtitle}</p>}
    </div>
  );

  return (
    <div className=" bg-[#1f2b2f] ">
      <div className=" p-6 rounded-2xl shadow-lg p-8">
        {/* Progress */}
        {/* <div className="flex items-center mb-6">
          {STEPS.map((s, i) => (
            <div key={s} className={`flex-1 text-center py-2 rounded-lg mx-1 ${i === step ? "bg-[#16a085] text-white font-semibold" : "bg-[#2c3a40] text-gray-400"}`}>
              {s}
            </div>
          ))}
        </div> */}

        {/* Content */}
        <div>
          {step === 0 && (
            <>
              <StepHeader title={`Welcome ${draft.name || "User"}!`} subtitle="Let's craft a modern résumé together 🚀" />
              <img src="/Happy Girl.png" className="mx-auto w-40 h-40 mb-6" alt="resume" />

            </>
          )}

          {step === 1 && (
            <>
              <StepHeader title="Upload Résumé" subtitle="Upload an existing file (optional)" />
              <div className="p-6 bg-[#2c3a40] rounded-lg border border-gray-600 text-center">
                <input type="file" accept=".pdf,.doc,.docx" onChange={onFileChange} className="block mx-auto text-sm text-gray-200" />
                {draft.resumeFile && <p className="text-sm text-green-400 mt-2">Uploaded: {draft.resumeFile.name}</p>}
                <textarea
                  rows={4}
                  value={draft.experienceText}
                  onChange={(e) => setDraft((p) => ({ ...p, experienceText: e.target.value }))}
                  placeholder="Write a short professional summary..."
                  className="w-full mt-4 p-3 rounded bg-[#1a252c] text-white border border-gray-600"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <StepHeader title="Experience Level" subtitle="Pick the level that best describes you" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setDraft((p) => ({ ...p, experienceLevel: lvl.id }))}
                    className={`flex items-center gap-3 p-4 rounded-lg border transition ${draft.experienceLevel === lvl.id ? "bg-[#134b45] border-[#16a085]" : "bg-[#2c3a40] border-gray-600"}`}
                  >
                    <span className="text-xl">{lvl.icon}</span>
                    <div>
                      <div className="text-white font-semibold">{lvl.label}</div>
                      <div className="text-gray-400 text-xs">{lvl.subtitle}</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <StepHeader title="Your Challenges" subtitle="What are your biggest career challenges?" />
              <div className="space-y-3 grid grid-cols-1 gap-10 md:grid-cols-2">
                {PRESSING.map((p) => (
                  <label key={p} className="flex items-center gap-3 p-3 rounded-lg bg-[#2c3a40] hover:bg-[#34454f] cursor-pointer">
                    <input type="checkbox" checked={draft.pressingIssues.includes(p)} onChange={() => togglePressing(p)} className="w-5 h-5 rounded-full accent-[#16a085]" />
                    <span className="text-white">{p}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <StepHeader title="Feedback" subtitle="Tell us how you heard about this platform" />
              <select
                value={draft.hearAbout}
                onChange={(e) => setDraft((p) => ({ ...p, hearAbout: e.target.value }))}
                className="w-full p-3 rounded bg-[#2c3a40] text-white border border-gray-600"
              >
                <option value="">Select...</option>
                {HEAR_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              {draft.hearAbout === "Other" && (
                <input
                  type="text"
                  value={draft.hearOther}
                  onChange={(e) => setDraft((p) => ({ ...p, hearOther: e.target.value }))}
                  placeholder="Please specify"
                  className="w-full mt-4 p-3 rounded bg-[#2c3a40] text-white border border-gray-600"
                />
              )}
            </>
          )}

          {step === 5 && (
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold text-white mb-4">🎉 Thank You!</h2>
              <p className="text-gray-300 mb-6">Your résumé info has been saved successfully.</p>
              <button
                className="px-6 py-3 rounded-lg bg-[#16a085] text-white font-medium"
                onClick={() => setStep(0)}
              >
                Build Again
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
      {step < 5 && (
  <div className="flex justify-between mt-8">
    {/* Back button tabhi dikhaye jab step > 0 ho */}
    {step > 0 && (
      <button
        onClick={() => setStep((s) => Math.max(0, s - 1))}
        className="px-4 py-2 rounded bg-gray-700 text-white"
      >
        Back
      </button>
    )}

    {step === 4 ? (
      <button
        onClick={handleFinish}
        className="px-6 py-2 rounded bg-[#16a085] text-white font-semibold"
        disabled={!canNext || loading}
      >
        {loading ? "Saving..." : "Submit"}
      </button>
    ) : (
          <div className="flex justify-end">
      <button
        onClick={() => setStep((s) => s + 1)}
        className="px-6 py-2 rounded bg-[#16a085] text-white font-semibold disabled:opacity-40"
        disabled={!canNext}
      >
        Next
      </button>
          </div>

    )}
  </div>
)}

      </div>
    </div>
  );
}
