import React from "react";
import { 
  ClipboardCheck, 
  Clock, 
  CheckCircle2, 
  Users, 
  Briefcase, 
  Bookmark, 
  HelpCircle 
} from "lucide-react";
import Link from "next/link";
const EmployerSidebar = ({ postedJobs }) => {
  // Dynamic Calculations based on your state
  const totalApplications = postedJobs.reduce((acc, job) => acc + (job.applicants || 0), 0);
  const activeJobsCount = postedJobs.filter(job => job.status === "Active").length;
  const closedJobsCount = postedJobs.filter(job => job.status === "Closed").length;

  const stats = [
    { label: "Total Applications", value: totalApplications, icon: ClipboardCheck,  href: "company/hiring-talent/status/applicationview" },
    { label: "In Review", value: 0, icon: Clock,  href: "#" }, // Placeholder if not in data
    { label: "Shortlisted", value: 0, icon: CheckCircle2,  href: "#" }, // Placeholder
    { label: "Intake Used", value: 0, icon: Users ,  href: "#"}, // Placeholder
  ];

  const jobMetrics = [
    { label: "Posted Jobs", value: postedJobs.length, icon: Briefcase , href: "save-items"},
    { label: "Saved Jobs", value: 0, icon: Bookmark, href: "#" }, // Static or separate state
  ];

  return (
    <div className="w-full  space-y-4">
      {/* Company Branding Card */}
      <div className="bg-white border border-[#cccccc] rounded-2xl p-5 flex items-center gap-4 shadow-sm">
        <div className="  rounded-xl flex items-center justify-center">
          <img src="/spreads.svg" alt="Logo" className="w-12 h-12 " />
        </div>
        <h2 className="font-semibold text-gray-700 text-lg">Spreadnext Inc</h2>
      </div>

      {/* Application Stats Card */}
      <div className="bg-white border border-[#cccccc]  rounded-2xl p-6 space-y-5 shadow-sm">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex items-center justify-between group cursor-default">
            <Link href={`/${stat.href}`} className="flex items-center gap-3">
              <stat.icon size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
              <span className="text-gray-600 font-medium">{stat.label}</span>
            </Link>
            <span className="text-gray-700 font-bold text-lg">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Job Count Card */}
      <div className="bg-white border border-[#cccccc] rounded-2xl p-6 space-y-5 shadow-sm">
        {jobMetrics.map((metric, idx) => (
          <div key={idx} className="flex items-center justify-between group cursor-default">
            <Link href={`/${metric.href}`} className="flex items-center gap-3">
              <metric.icon size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
              <span className="text-gray-600 font-medium">{metric.label}</span>
            </Link>
            <span className="text-gray-700 font-bold text-lg">{metric.value}</span>
          </div>
        ))}
      </div>

      {/* Support Card */}
      <div className="bg-white border  border-[#cccccc] rounded-2xl p-5 flex items-center gap-3 shadow-sm hover:bg-gray-50 cursor-pointer transition-colors">
        <HelpCircle size={22} className="text-gray-400" />
        <span className="text-gray-600 font-medium">Help and support</span>
      </div>
    </div>
  );
};

export default EmployerSidebar;