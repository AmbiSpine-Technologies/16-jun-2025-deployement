"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaRegFileAlt, FaRegEye, FaDownload } from "react-icons/fa";
import { MdOutlineFileUpload, MdOutlineAdd } from "react-icons/md";
import { IoDiamondOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { X } from "lucide-react";
import Button from "../components/Button";
import { AnimatedWrapper } from "../animation/animation";

export default function ResumeCVSection() {
  const router = useRouter();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);

  const [resumes, setResumes] = useState([
    {
      id: 1,
      name: "John_Smith_Resume_2024.pdf",
      lastUpdated: "2 days ago",
      isCurrent: true,
      size: "2.3 MB",
      fileUrl: null,
    },
    {
      id: 2,
      name: "John_Smith_Resume_v2.pdf",
      lastUpdated: "1 week ago",
      isCurrent: false,
      size: "2.1 MB",
      fileUrl: null,
    },
    {
      id: 3,
      name: "John_Smith_CV_2023.pdf",
      lastUpdated: "3 months ago",
      isCurrent: false,
      size: "2.8 MB",
      fileUrl: null,
    },
  ]);

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file) => {
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please select a PDF, DOC, or DOCX file only.");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    setSelectedFile(file);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    validateAndSetFile(file);
  };

  const handleUploadSubmit = () => {
    if (!selectedFile) return;

    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          const fileUrl = URL.createObjectURL(selectedFile);

          setResumes((prevResumes) =>
            prevResumes.map((resume) => ({ ...resume, isCurrent: false }))
          );

          const newResume = {
            id: Date.now(),
            name: selectedFile.name,
            lastUpdated: "Just now",
            isCurrent: true,
            size: (selectedFile.size / (1024 * 1024)).toFixed(1) + " MB",
            fileUrl: fileUrl,
            file: selectedFile,
          };

          setResumes((prev) => [newResume, ...prev]);
          setIsUploadModalOpen(false);
          setSelectedFile(null);
          setUploadProgress(0);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const setAsCurrent = (resumeId) => {
    setResumes((prevResumes) =>
      prevResumes.map((resume) => ({
        ...resume,
        isCurrent: resume.id === resumeId,
      }))
    );
  };

  const handleCreateNewResume = () => {
    router.push("/create-resume");
  };

  const handlePreview = (resume) => {
    if (resume.fileUrl) {
      window.open(resume.fileUrl, "_blank");
    } else {
      const demoContent = `Demo preview for ${resume.name}`;
      const blob = new Blob([demoContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 100);
    }
  };

  const handleDownload = (resume) => {
    if (resume.fileUrl) {
      const link = document.createElement("a");
      link.href = resume.fileUrl;
      link.download = resume.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const demoContent = `Demo content for ${resume.name}`;
      const blob = new Blob([demoContent], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = resume.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  // Cleanup effect for object URLs
  useEffect(() => {
    return () => {
      resumes.forEach((resume) => {
        if (resume.fileUrl && resume.fileUrl.startsWith("blob:")) {
          URL.revokeObjectURL(resume.fileUrl);
        }
      });
    };
  }, [resumes]);

  return (
    <div className="mt-4 rounded-xs transition-all">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2">
          <FaRegFileAlt className="w-6 h-6 text-blue-600" />
          <h3 className="text-2xl font-sens font-medium font-[jost] text-[var(--gray-600)]">
            Resume & CV
          </h3>
        </div>
      </div>

      {/* Current Resume */}
      {resumes.find((r) => r.isCurrent) && (
        <div className="mb-6">
          <div className="bg-[#fff] border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaRegFileAlt className="w-8 h-8 text-blue-700" />
                <div>
                  <h4 className="text-gray-600 font-medium">
                    {resumes.find((r) => r.isCurrent).name}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Last updated: {resumes.find((r) => r.isCurrent).lastUpdated}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-200 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Current
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handlePreview(resumes.find((r) => r.isCurrent))
                    }
                    className="p-2 text-gray-600 hover:text-white transition-colors"
                    title="Preview"
                  >
                    <FaRegEye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      handleDownload(resumes.find((r) => r.isCurrent))
                    }
                    className="p-2 text-gray-600 hover:text-white transition-colors"
                    title="Download"
                  >
                    <FaDownload className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Upload Resume */}
        <div
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-[#fff] border border-gray-700 rounded-xl p-6 cursor-pointer hover:border-blue-500 transition-all group"
        >
          <div className="text-center">
            <MdOutlineFileUpload className="w-8 h-8 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="text-gray-600 font-medium mb-1">Upload Resume</h4>
            <p className="text-gray-460 text-sm">PDF, DOC, DOCX (Max 5MB)</p>
          </div>
        </div>

        {/* Create New Resume */}
        <div
          onClick={handleCreateNewResume}
          className="bg-[#fff] border border-gray-700 rounded-xl p-6 cursor-pointer hover:border-green-500 transition-all group"
        >
          <div className="text-center">
            <MdOutlineAdd className="w-8 h-8 text-green-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="text-gray-600 font-medium mb-1">Create New Resume</h4>
            <p className="text-gray-500 text-sm">
              Build with our resume builder
            </p>
          </div>
        </div>
      </div>

      {/* Previous Versions */}
      <div className="mb-4">
        <h4 className="text-lg font-medium text-gray-800 mb-4">
          Previous Versions
        </h4>
        <div className="space-y-3">
          {resumes
            .slice(0, 2)
            .filter((r) => !r.isCurrent)
            .map((resume) => (
              <div
                key={resume.id}
                className="bg-[#fff] border border-gray-700 rounded-xl p-4 hover:border-gray-600 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaRegFileAlt className="w-6 h-6 text-gray-600" />
                    <div>
                      <h5 className="text-gray-700 font-medium">{resume.name}</h5>
                      <p className="text-gray-500 text-sm">
                        {resume.lastUpdated} • {resume.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePreview(resume)}
                      className="p-2 text-gray-500 hover:text-gray-800 transition-colors rounded hover:bg-gray-100"
                      title="Preview"
                    >
                      <FaRegEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDownload(resume)}
                      className="p-2 text-gray-400 hover:text-white transition-colors rounded hover:bg-gray-700"
                      title="Download"
                    >
                      <FaDownload className="w-4 h-4" />
                    </button>
                    {!resume.isCurrent && (
                      <button
                        onClick={() => setAsCurrent(resume.id)}
                        className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        title="Set as Current"
                      >
                        Set Current
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-2">
          <IoDiamondOutline className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-blue-800 font-medium mb-2">Resume Tips</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li className="flex items-start gap-2">
                <GoDotFill className="w-3 h-3 mt-1.5 flex-shrink-0" />
                Keep it to 1-2 pages maximum
              </li>
              <li className="flex items-start gap-2">
                <GoDotFill className="w-3 h-3 mt-1.5 flex-shrink-0" />
                Use action verbs and quantify achievements
              </li>
              <li className="flex items-start gap-2">
                <GoDotFill className="w-3 h-3 mt-1.5 flex-shrink-0" />
                Tailor your resume for each job application
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <AnimatedWrapper className="fixed inset-0 flex items-center justify-center bg-[#0b0b0beb] z-50">
          <div className="m-3 bg-[#01030b] border border-gray-200 rounded-xl w-full max-w-lg">
            {/* Modal Header */}
            <div className="relative border-b border-gray-300 py-3 px-6">
              <h3 className="text-lg font-medium text-[var(--white)]">
                Upload Resume
              </h3>
              <button
                onClick={() => {
                  setIsUploadModalOpen(false);
                  setSelectedFile(null);
                  setUploadProgress(0);
                }}
                className="absolute top-3 right-3 p-2 text-white hover:cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {/* File Upload Area */}
              <div className="mb-4">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 ${
                    isDragOver
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-600"
                  } border-dashed rounded-lg cursor-pointer hover:border-blue-500 transition-colors`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <MdOutlineFileUpload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-400">
                    {isDragOver
                      ? "Drop file here"
                      : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX (Max 5MB)
                  </p>
                </label>
              </div>

              {/* Selected File */}
              {selectedFile && (
                <div className="mb-4 p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FaRegFileAlt className="w-4 h-4 text-blue-400" />
                    <span className="text-white text-sm">
                      {selectedFile.name}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
                  </div>
                </div>
              )}

              {/* Upload Progress */}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mb-4">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  onClick={() => {
                    setIsUploadModalOpen(false);
                    setSelectedFile(null);
                    setUploadProgress(0);
                  }}
                  buttonclass="bg-gray-300 text-black hover:bg-gray-400"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleUploadSubmit}
                  disabled={!selectedFile || uploadProgress > 0}
                  buttonclass="!bg-blue-700 text-white hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </AnimatedWrapper>
      )}
    </div>
  );
}
