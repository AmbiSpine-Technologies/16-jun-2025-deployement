
"use client";
import React from "react";
import { 
  Edit, MapPin, Briefcase, IndianRupee, Clock, 
  GraduationCap, Layers, Globe, Mail, Link as LinkIcon 
} from "lucide-react";

export default function JobPreviewStep({ data, onEdit }) {

  // ✅ HTML Renderer to preserve Rich Text Formatting (Bullets, Bold, etc.)
  const createMarkup = (html) => {
    return { __html: html || "<p class='text-gray-400 italic'>Not provided</p>" };
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
    <div className=" flex justify-end">
        <button onClick={onEdit} className="text-blue-600 border px-2 py-1 hover:cursor-pointer border-gray-300 font-medium hover:underline text-xs">Edit Details</button>

    </div>
      {/* 📄 MAIN JOB CARD */}
      <div className="bg-white  border-[0.3px] border-[#cccccc] rounded-2xl shadow-sm overflow-hidden">
        
        {/* 1. Header & Highlights */}
        <div className="p-8 pb-6 border-b  border-[#cccccc] ">
            {/* Header */}
            <div className="flex items-center  gap-2 mb-6">
                             {/* {data.logo && (
                    
                )} */}
                <div className="w-10 h-10 border border-gray-200 rounded-lg p-1 flex items-center justify-center bg-white shadow-sm">
                        <img src={data.logo || "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{data.companyName || "Job Title"}</h1>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <span className="font-semibold text-gray-900">{data.jobTitle || "Company Name"}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><MapPin size={14}/> {data.location || "Location"}</span>
                    </div>
                </div>
                {/* Logo (Optional) */}

            </div>

            {/* Highlights Grid (Experience, CTC, etc.) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-8 text-sm mt-6">
                
                {/* Experience */}
                <div className="flex items-start gap-3">
                    <Briefcase size={18} className="text-gray-500 mt-0.5"/>
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Experience</p>
                        <p className="font-medium text-gray-800 mt-0.5">{data.experience || "Not specified"}</p>
                    </div>
                </div>

                {/* Salary */}
                <div className="flex items-start gap-3">
                    <IndianRupee size={18} className="text-gray-500 mt-0.5"/>
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">CTC (Annual)</p>
                        <p className="font-medium text-gray-800 mt-0.5">
                            {data.minSalary && data.maxSalary ? `${data.minSalary} - ${data.maxSalary}` : "Not Disclosed"}
                        </p>
                    </div>
                </div>

                {/* Education */}
                <div className="flex items-start gap-3">
                    <GraduationCap size={18} className="text-gray-500 mt-0.5"/>
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Education</p>
                        <p className="font-medium text-gray-800 mt-0.5">
                            {data.education || "Any Graduate"}
                            {data.specialization && <span className="text-gray-500 font-normal"> ({data.specialization})</span>}
                        </p>
                    </div>
                </div>

                {/* Industry */}
                <div className="flex items-start gap-3">
                    <Layers size={18} className="text-gray-500 mt-0.5"/>
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Industry</p>
                        <p className="font-medium text-gray-800 mt-0.5">{data.industry || "IT Services"}</p>
                    </div>
                </div>

                 {/* Type & Availability */}
                 <div className="flex items-start gap-3">
                    <Clock size={18} className="text-gray-500 mt-0.5"/>
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Type & Availability</p>
                        <p className="font-medium text-gray-800 mt-0.5">
                            {data.employmentType || "Full Time"}
                            {data.availability && <span className="text-gray-500"> • {data.availability}</span>}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* 2. Detailed Description Body */}
        <div className="p-8 space-y-8">
            
            {/* Job Summary */}
            <div className="space-y-3">
                <h3 className="text-base font-bold text-gray-900 border-b border-[#cccccc] pb-2">Job Description</h3>
                
                <div className="text-sm text-gray-600 leading-7 space-y-4">
                    <div>
                        <strong className="block text-gray-900 mb-2">Role Overview:</strong>
                        {/* ✅ Rich Text Rendering with List Support */}
                       <div 
        className="text-sm text-gray-600 leading-7 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1" 
        dangerouslySetInnerHTML={createMarkup(data.jobSummary)} 
    />
                    </div>
                    
                   
                    {data.responsibilities && (
    <div>
        <strong className="block text-gray-900 mb-2 mt-6">Key Responsibilities:</strong>
        
        {/* 👇 YAHAN PASS KARNA HAI 👇 */}
        <div 
            className="text-sm text-gray-600 leading-7 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1" 
            dangerouslySetInnerHTML={createMarkup(data.responsibilities)} 
        />
    </div>
)}
                </div>
            </div>

            {/* Key Skills */}
            {data.skills && data.skills.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-base font-bold text-gray-900">Key Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, i) => (
                            <span key={i} className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs font-medium text-gray-600 shadow-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* About Company */}
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 mt-4">
                <h3 className="text-sm font-bold text-gray-900 mb-2">About {data.companyName || "Company"}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {data.companyProfile || "No description available."}
                </p>
                {data.website && (
                    <a href={data.website} target="_blank" className="text-blue-600 text-xs font-semibold hover:underline flex items-center gap-1">
                        <Globe size={12}/> Visit Website
                    </a>
                )}
            </div>

            {/* Internal Info (Recruiter Only) */}
            <div className="border-t border-dashed border-gray-200 pt-4 flex flex-col sm:flex-row gap-6 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                    <Mail size={14}/> <span>Apply Email: <b>{data.applyEmail || "N/A"}</b></span>
                </div>
                {data.applyLink && (
                    <div className="flex items-center gap-2">
                        <LinkIcon size={14}/> <span>External Link: <a href={data.applyLink} className="text-blue-500 hover:underline">Click to view</a></span>
                    </div>
                )}
            </div>

        </div>
      </div>
    </div>
  );
}