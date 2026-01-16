import React, { useState, useEffect } from "react";
import { Image as ImageIcon, X } from "lucide-react";

export default function MediaUpload({
  label = "Upload File",
  accept = "image/*",
  maxSizeMB = 1,
  onFileSelect,
  initialFile = null, // <-- Add prop for edit case
}) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  // 🔹 When editing, show existing media
  useEffect(() => {
    if (initialFile) {
      setFile(initialFile);
      if (typeof initialFile === "string") {
        // if it's a saved URL
        setPreviewUrl(initialFile);
      } else {
        // if it's a File object
        setPreviewUrl(URL.createObjectURL(initialFile));
      }
    }
  }, [initialFile]);

  const validateFile = (selectedFile) => {
    if (!selectedFile) return false;
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be under ${maxSizeMB}MB`);
      return false;
    }
    return true;
  };

  const handleFile = (selectedFile) => {
    if (!validateFile(selectedFile)) return;
    setError(null);
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    simulateUpload();
    onFileSelect?.(selectedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) handleFile(droppedFile);
  };

  const simulateUpload = () => {
    setProgress(0);
    let value = 0;
    const interval = setInterval(() => {
      value += 10;
      setProgress(value);
      if (value >= 100) clearInterval(interval);
    }, 200);
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setProgress(0);
    onFileSelect?.(null);
  };

  return (
    <div className="mt-3">
      {label && <label className="block text-sm font-medium text-gray-200 mb-2">{label}</label>}

      {!file ? (
        <label
          htmlFor="fileUploadInput"
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition ${
            dragActive ? "border-blue-500 bg-blue-500/10" : "border-gray-600"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragActive(false);
          }}
          onDrop={handleDrop}
        >
          <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-gray-400 text-sm">Click or drag & drop to upload</span>
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            id="fileUploadInput"
          />
        </label>
      ) : (
        <div className="relative flex items-center gap-3 p-3 border border-gray-600 rounded-lg bg-[#070C11]">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-16 h-16 object-cover rounded-md border"
          />
          <div className="flex-1">
            <p className="text-sm text-gray-200">{file.name || "Saved file"}</p>
            {file.size && (
              <p className="text-xs text-gray-400">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            )}
            {progress > 0 && (
              <>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">{progress}%</p>
              </>
            )}
          </div>
          <button onClick={removeFile} className="text-gray-400 hover:cursor-pointer hover:text-red-500">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
