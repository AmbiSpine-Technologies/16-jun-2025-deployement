"use client";
import React, { useState } from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from "recharts"; // Recharts is excellent for React, but Chart.js works similarly
import { 
  MoreHorizontal, Eye, Users, 
  ChevronDown, ExternalLink, MessageCircle, 
  ChevronUp
} from "lucide-react";
import Button, { Buttonborder } from "@/app/components/Button";

export default function JobDetailsPage() {
  // Mock data for the performance chart
const [isExpanded, setIsExpanded] = useState(false);
  const job = {
    title: "Full Stack Engineer",
    company: "AmbiSpine Technologies",
    location: "Satna, MP (On-site)",
    postedDate: "1 month ago",
    views: 120,
    applicants: 45,
    shortlisted: 18,
    selected: 4,
    salary: "₹8L - ₹12L",
    workMode: "On-site",
    jobType: "Full-time",
    experience: "2-4 Years",
    matchScore: 78,
    skills: ["React", "Node.js", "TypeScript", "Next.js", "Tailwind CSS"],
    description: "AmbiSpine Technologies is reimagining the future of digital India...",
    requirements: ["Proficiency in React.js", "Experience with Node.js", "Agile experience"],
    benefits: ["Health Insurance", "Performance Bonus"]
  };

  const performanceData = [
    { day: "Mon", v: 20, a: 5, sh: 2, se: 0 },
    { day: "Tue", v: 45, a: 12, sh: 5, se: 1 },
    { day: "Wed", v: 60, a: 18, sh: 8, se: 1 },
    { day: "Thu", v: 80, a: 25, sh: 10, se: 2 },
    { day: "Fri", v: 95, a: 32, sh: 14, se: 3 },
    { day: "Sat", v: 110, a: 40, sh: 16, se: 4 },
    { day: "Sun", v: 120, a: 45, sh: 18, se: 4 },
  ];

  return (
  <div className="pt-10 mt-10  text-gray-900">
    <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
      <div className="flex flex-col lg:flex-row gap-10">

        {/* LEFT COLUMN */}
        <div className="w-full lg:max-w-[65%] mx-auto">
          <div
            className="
              sticky top-3 inset-0
              bg-opacity-50
              lg:relative bg-[#fff]
              border-[0.3px] border-[#cccccc]
              border-b-0
              overflow-hidden
              rounded-2xl
              rounded-bl-none
              rounded-br-none
            "
          >
            <div className="overflow-y-auto custom-scroll h-[calc(100vh-120px)]">

       <div className="">
              {/* JOB HEADER */}
              <div className="p-6 flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-blue-900 rounded flex items-center justify-center text-white text-xl font-bold">
                    AS
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-gray-900">{job.title}</h1>
                    <p className="text-gray-600 text-xs">{job.company} • {job.location}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="text-red-600 font-medium">Closed</span> • {job.postedDate} • {job.views} views
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                 
                  <button className="!border-gray-500 !text-gray-500">View applicants</button>
                  <button className="p-2 hover:bg-gray-100 rounded-full"><MoreHorizontal /></button>
                </div>
              </div>

              {/* TAB NAVIGATION */}
              <div className="border-t border-[#cccccc]  flex text-sm font-semibold">
                <button className="px-6 py-3 border-b-2 border-blue-700 text-blue-700">Job Info</button>
                <button className="px-6 py-3 text-gray-500 hover:bg-gray-50">Settings</button>
              </div>

              {/* JOB CONTENT */}
              <div className="p-6 border-t border-[#cccccc]">
                <h2 className="text-lg font-semibold mb-4">Job description</h2>
                
                <section className="mb-6">
                  <h3 className="font-semibold text-gray-800">Company Description</h3>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">{job.description}</p>
                </section>

                {/* 2. CONDITIONAL DATA (Shown only when expanded) */}
                {isExpanded && (
                  <div className="space-y-6 animate-in fade-in duration-500">
                    <section>
                      <h3 className="font-semibold text-gray-800">Requirements</h3>
                      <ul className="list-disc ml-5 mt-2 text-sm text-gray-600 space-y-1">
                        {job.requirements.map((req, i) => <li key={i}>{req}</li>)}
                      </ul>
                    </section>

                    <section>
                      <h3 className="font-semibold text-gray-800">Skills</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {job.skills.map(skill => (
                          <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h3 className="font-semibold text-gray-800">Benefits</h3>
                      <ul className="list-disc ml-5 mt-2 text-sm text-gray-600 space-y-1">
                        {job.benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
                      </ul>
                    </section>
                  </div>
                )}

                {/* 3. SHOW MORE / LESS BUTTON */}
                <div className="flex justify-center border-t border-[#cccccc] mt-6 pt-4">
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-blue-600 hover:cursor-pointer font-semibold flex items-center gap-1 hover:text-blue-800 transition-colors"
                  >
                    {isExpanded ? (
                      <>Show less <ChevronUp size={18} /></>
                    ) : (
                      <>Show more <ChevronDown size={18} /></>
                    )}
                  </button>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full lg:max-w-[30%] mx-auto">
          <div className="overflow-y-auto custom-scroll h-[calc(100vh-120px)] mt-4">
            <div className="space-y-4">

              {/* PERFORMANCE CARD */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  Job performance
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <Stat label="Views" value={job?.views ?? 0} color="blue" />
                  <Stat label="Applicants" value={job?.applicants ?? 0} color="green" />
                  <Stat label="Shortlisted" value={job?.shortlisted ?? 0} color="orange" />
                  <Stat label="Selected" value={job?.selected ?? 0} color="purple" />
                </div>

                <div className="h-48 w-full -ml-4">
                

                  <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '11px' }}
                    />
                    
                    {/* View Metric (Blue) */}
                    <Area type="monotone" dataKey="v" name="Views" stroke="#2563EB" fill="url(#colorViews)" strokeWidth={2} />
                    
                    {/* Applicant Metric (Green) */}
                    <Area type="monotone" dataKey="a" name="Applicants" stroke="#10B981" fill="transparent" strokeWidth={2} />
                    
                    {/* Shortlisted Metric (Orange) */}
                    <Area type="monotone" dataKey="sh" name="Shortlisted" stroke="#F59E0B" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
                    
                    {/* Selected Metric (Purple) */}
                    <Area type="monotone" dataKey="se" name="Selected" stroke="#8B5CF6" fill="transparent" strokeWidth={3} />
                    
                  </AreaChart>
                </ResponsiveContainer>
                </div>

                <p className="text-[10px] text-gray-400 mt-4 text-center">
                  Pipeline status over the last 7 days
                </p>
              </div>

              {/* POST JOB */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <p className="font-semibold text-sm">Hiring for more roles?</p>
                <button className="mt-3 w-full py-1.5 border border-gray-800 rounded-full font-semibold text-sm hover:bg-gray-50">
                  Post new job
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
);
}

const Stat = ({ label, value, color }) => (
  <div className={`border-l-2 border-${color}-500 pl-3`}>
    <p className="text-xl font-black">{value}</p>
    <p className="text-[10px] uppercase text-gray-400">{label}</p>
  </div>
);