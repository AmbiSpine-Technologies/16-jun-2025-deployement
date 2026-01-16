"use client";

import { useResume } from "@/app/context/ResumeContext";
import { Trash2 } from "lucide-react";

export default function ResumeUploadCard({ uploadedResumeUrl, setUploadedResumeUrl, onPreviewClick }) {


    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setUploadedResumeUrl(url);
    };

    const handleDelete = () => {
        setUploadedResumeUrl(null);
    };

    const handlePreview = () => {
        if (uploadedResumeUrl) {
            window.open(uploadedResumeUrl, "_blank");
        } else {
            // window.open("/create-resume/resume-building/resume-preview", "_blank");
            onPreviewClick();
        }
    };

    return (
        <div className="bg-white border border-[#cccccc] rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-700">Resume</h2>

            {/* Upload */}
            <label className="border-2 border-dashed border-blue-500 rounded-xl p-6 flex flex-col items-center cursor-pointer">
                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleUpload}
                />
                <p className="text-blue-600 font-semibold">Upload Resume</p>
                <p className="text-xs text-gray-400">
                    doc, docx, pdf (upto 2MB)
                </p>
            </label>

            {/* Actions */}
            <div className="flex gap-3">
                <button
                    onClick={handlePreview}
                    className="flex-1 rounded-full border border-blue-500 text-blue-600 py-2 text-sm hover:bg-blue-50"
                >
                    Preview
                </button>


                {uploadedResumeUrl && (
                    <button
                        onClick={handleDelete}
                        className="p-2 rounded-full border border-red-400 text-red-500 hover:bg-red-50"
                    >
                        <Trash2 size={16} />
                    </button>
                )}
            </div>
            <p className="text-[10px] text-center text-gray-400">
                Tap on preview button to see the changes in your resume
            </p>
        </div>
    );
}
