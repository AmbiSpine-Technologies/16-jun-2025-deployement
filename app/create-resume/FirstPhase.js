"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "../components/Modal";
import { CiFileOn } from "react-icons/ci";
import { FiEdit2 } from "react-icons/fi";
import Button, { Buttonborder } from "../components/Button";
import { IoCloudUploadOutline } from "react-icons/io5";
import { GlobalLoader } from "../components/Loader";
import VideoResumeSection from "./VideoResumeSection";
import MentorsSection from "../components/MentorsSection";
import { useRouter } from "next/navigation";

export default function FirstPhase() {
  const router = useRouter();
  const currentUser = useSelector((state) => state.users?.currentUser);

  const [resumes, setResumes] = useState([
    { id: 1, title: "Untitled", lastUpdated: "26 February, 2025, 8:26pm" },
  ]);
  const [activeTab, setActiveTab] = useState("Resume");
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingResumeId, setEditingResumeId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState("");

  // Prefetch resume-building route for instant navigation
  useEffect(() => {
    router.prefetch("/create-resume/resume-building");
  }, [router]);

  // ✅ Smooth navigation handler (single function for all routes)
  const navigateWithLoader = (path, message, delay = 1000) => {
    setIsLoading(true);
    setLoadingAction(message);
    setTimeout(() => {
      router.push(path);
    }, delay);
  };

  // Create new resume
  const handleStartNewResume = () => {
    const newResume = {
      id: resumes.length + 1,
      title: "New Resume",
      lastUpdated: new Date().toLocaleString(),
    };
    setResumes([newResume, ...resumes]);
    setShowResumeModal(false);
    navigateWithLoader(
      "/create-resume/resume-building",
      "Creating new resume..."
    );
  };

  // File upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadedData = {
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      uploadedAt: new Date().toISOString(),
    };

    const newResume = {
      id: resumes.length + 1,
      title: `Uploaded - ${file.name}`,
      lastUpdated: new Date().toLocaleString(),
      isUploaded: true,
      fileData: uploadedData,
    };

    setResumes([newResume, ...resumes]);
    setSelectedFile(null);
    setShowResumeModal(false);
    navigateWithLoader(
      "/create-resume/resume-building",
      "Processing uploaded resume...",
      1500
    );
  };

  // Edit existing resume
  const handleEditResume = (id) => {
    navigateWithLoader(
      "/create-resume/resume-building",
      "Loading resume editor..."
    );
  };

  // Title editing functions
  const startEditingTitle = (resume) => {
    setEditingResumeId(resume.id);
    setEditedTitle(resume.title);
  };
  const saveEditedTitle = (id) => {
    setResumes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, title: editedTitle } : r))
    );
    setEditingResumeId(null);
    setEditedTitle("");
  };
  const cancelEditing = () => {
    setEditingResumeId(null);
    setEditedTitle("");
  };

  // ✅ Single loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <GlobalLoader img="/spreads.svg" text={loadingAction} />
      </div>
    );
  }

  // ---------------------------------------------------
  // Main Page UI
  return (
    <div>
      {/* Header */}
      <div className="px-4 sm:px-8 lg:px-20 py-12 bg-[#edf9f8da] relative mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-700">
            Hello,{" "}
            <span className="text-[#5561d0]">
              {currentUser?.name || "User"}
            </span>
          </h1>
          <p className="text-gray-600 mt-2">
            Ready to create job-winning resumes and cover letters?
          </p>
        </div>
        <img
          src="/Happy Girl.png"
          alt="Illustration"
          className="absolute right-10 top-10 w-40 h-52 hidden sm:block object-cover"
        />
      </div>

      {/* Tabs */}
      <div className="px-4 sm:px-8 lg:px-20 mb-6">
        <div className="flex gap-4 mb-6 border-b border-gray-300">
          {["Resume", "Made By Mentors", "Cover Letter"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-5 font-medium ${
                activeTab === tab
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Resume Tab */}
        {activeTab === "Resume" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {/* New Resume Card */}
              <div
                onClick={() => setShowResumeModal(true)}
                className="border border-gray-200 rounded-xl p-8 shadow hover:shadow-lg transition cursor-pointer"
              >
                <h2 className="font-semibold text-lg mb-2 text-gray-700">New Resume</h2>
                <p className="text-gray-500 text-sm">
                  Build a tailored resume with step-by-step guidance.
                </p>
                <Buttonborder
                  onClick={() => setShowResumeModal(true)}
                  name="+ Create new Resume"
                  classNameborder="mt-4 py-2.5 text-[14px]"
                />
              </div>

              {/* Existing Resume Card */}
              {resumes.slice(0, 1).map((resume) => (
                <div
                  key={resume.id}
                  className="border border-gray-200 rounded-xl p-6 flex flex-col justify-between shadow hover:shadow-lg transition"
                >
                  <div>
                    {editingResumeId === resume.id ? (
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          className="w-full rounded-lg px-3 py-2 bg-[#333A44] text-white text-sm focus:ring-1 focus:ring-gray-300"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEditedTitle(resume.id);
                            if (e.key === "Escape") cancelEditing();
                          }}
                          autoFocus
                        />
                        <Buttonborder
                          name="Save"
                          onClick={() => saveEditedTitle(resume.id)}
                        />
                        <Buttonborder name="Cancel" onClick={cancelEditing} />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-lg">
                          {resume.title}
                        </h2>
                        <FiEdit2
                          className="w-4 h-4 text-gray-500 hover:text-purple-600 cursor-pointer"
                          onClick={() => startEditingTitle(resume)}
                        />
                      </div>
                    )}
                    <p className="text-gray-400 text-sm">
                      Last updated: {resume.lastUpdated}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEditResume(resume.id)}
                      className="border px-3 py-1 rounded-md"
                    >
                      Edit
                    </button>
                    <button className="border px-3 py-1 rounded-md">
                      Share
                    </button>
                    <button className="border px-3 py-1 rounded-md">
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <VideoResumeSection />
          </div>
        )}

        {activeTab === "Made By Mentors" && <MentorsSection />}

        {activeTab === "Cover Letter" && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-4">
              Cover Letter Builder Coming Soon
            </h3>
            <p className="text-gray-500">Stay tuned for updates!</p>
          </div>
        )}
      </div>

      {/* Resume Creation Modal */}
      <Modal
        show={showResumeModal}
        onClose={() => setShowResumeModal(false)}
        title="How would you like to build your resume?"
        widthClass="!max-w-2xl border-none"
      >
        <p className="text-gray-300 mb-6">
          Start fresh or upload an existing resume — we’ll help you refine it.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Fresh */}
          <div className="border border-gray-600 rounded-2xl p-8 bg-gradient-to-b from-gray-800/50 to-gray-900/30 hover:shadow-purple-500/10 transition">
            <CiFileOn className="w-10 h-10 text-white mb-4 mx-auto" />
            <h4 className="text-white font-semibold mb-2 text-center">
              Start with a new resume
            </h4>
            <p className="text-gray-300 text-sm mb-6 text-center">
              Guided builder with professional content.
            </p>
            <Buttonborder
              onClick={handleStartNewResume}
              name="+ Create new Resume"
              classNameborder="w-full py-3 text-sm"
            />
          </div>

          {/* Upload Resume */}
          <div className="border border-gray-600 rounded-2xl p-8 bg-gradient-to-b from-gray-800/50 to-gray-900/30 hover:shadow-green-500/10 transition">
            <IoCloudUploadOutline className="w-10 h-10 text-white mb-4 mx-auto" />
            <h4 className="text-white font-semibold mb-2 text-center">
              Upload an existing resume
            </h4>
            <p className="text-gray-300 text-sm mb-6 text-center">
              Transform your uploaded resume into a smart format.
            </p>
            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="resume-upload"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 border rounded-full text-white cursor-pointer text-sm hover:bg-green-700"
            >
              <IoCloudUploadOutline className="w-5 h-5" />
              Choose File
            </label>
          </div>
        </div>
      </Modal>
    </div>
  );
}
