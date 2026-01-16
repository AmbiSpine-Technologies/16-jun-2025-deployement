"use client";
import React, { useState, useEffect } from "react";
import {
  MoreVertical,
  Users,
  Eye,
  Edit3,
  Plus,
  Calendar,
  Settings,
  Activity,
  UserCircle,
  XCircle,
  RefreshCw,
  MapPin,
} from "lucide-react";
import Link from "next/link";
// Import your reusable Dropdown component
import Dropdown, { SmartDropdown
} from "../../components/Dropdown"; 
import { Pencil } from 'lucide-react';
import { useRouter } from "next/navigation";
import EmployerSidebar from "../../components/company/EmployerSidebar";
import { Trash } from 'lucide-react';
import { getMyJobs, deleteJob, toggleJobStatus } from "../../utils/jobsApi";
import { toast } from "react-toastify";

export default function Page() {
const [postedJobs, setPostedJobs] = useState([]);
const [loading, setLoading] = useState(true);
const router = useRouter();

// Format date to relative time (e.g., "23 days ago")
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Just now";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }
  const months = Math.floor(diffDays / 30);
  return `${months} month${months > 1 ? 's' : ''} ago`;
};

// Fetch jobs from API
useEffect(() => {
  
  const fetchJobs = async () => {
   const token = localStorage.getItem("token") || localStorage.getItem("spreadnext_token");
    if (!token) {
      toast.error("Session expired. Please login again.");
      router.push("/signin");
      return;
    }
    setLoading(true);
    try {
      const result = await getMyJobs(1, 50);
      if (result.success && result.data) {
        // Transform backend data to match frontend format
        const transformedJobs = result.data.map((job) => ({
          id: job._id,
          title: job.title,
          location: job.location,
          postedDate: formatDate(job.createdAt),
          status: job.isActive ? "Active" : "Closed",
          applicants: job.applicationsCount || 0,
          views: job.views || 0,
          category: job.industry || "General",
          companyname: job.company,
          mode: job.workMode || "On-site",
        }));
        setPostedJobs(transformedJobs);
      } else {
        toast.error(result.message || "Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  fetchJobs();
}, []);

const handleDeleteJob = async (jobId) => {
  const isConfirmed = window.confirm("Are you sure you want to delete this job post?");
  
  if (isConfirmed) {
    try {
      const result = await deleteJob(jobId);
      if (result.success) {
        setPostedJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
        toast.success("Job deleted successfully");
      } else {
        toast.error(result.message || "Failed to delete job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job");
    }
  }
};

const handleToggleStatus = async (jobId, currentStatus) => {
  try {
    const result = await toggleJobStatus(jobId);
    if (result.success) {
      setPostedJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId
            ? { ...job, status: currentStatus === "Active" ? "Closed" : "Active" }
            : job
        )
      );
      toast.success(`Job ${currentStatus === "Active" ? "closed" : "reopened"} successfully`);
    } else {
      toast.error(result.message || "Failed to update job status");
    }
  } catch (error) {
    console.error("Error toggling job status:", error);
    toast.error("Failed to update job status");
  }
};

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 py-1 text-green-700 border-0";
      case "Closed": return "bg-[#F69A9C] py-1 text-red-700 border-0";
      case "Pending": return "bg-[#A09AF6] py-1 text-gray-700 border-0 ";
      default: return "bg-blue-100  py-1 text-blue-700 border-0";
    }
  };

  // Reusable Menu Item Component for inside the Dropdown
  const ActionMenuItem = ({ icon, label, onClick, variant = "default" }) => (
    <button
      onClick={onClick}
      className={`w-full flex hover:cursor-pointer items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${
        variant === "danger" ? "text-red-600" : "text-gray-700"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className=" mt-16 pt-10 ">
      <div className="max-w-7xl mx-auto px-4">

    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-xl font-bold text-[#4F5D73]">Manage Your Job Postings</h1>
            <p className="text-[#4F5D73] text-sm">Track and manage your hiring pipeline.</p>
          </div>
          <Link href="/company/hiring-talent/job-post" className="flex items-center gap-2 bg-[#0516D4] text-white px-4 py-2.5 rounded-full font-semibold transition-all text-sm">
            <Plus className="w-5 h-5" />
            Post a New Job
          </Link>
        </div>

        <div className="flex">
   <div className=" w-full lg:max-w-[65%] mx-auto">
            <div
              className={` 
  sticky top-0 inset-0  p-6 lg:relative bg-white  border-[0.3px]
  border-[#cccccc]
  border-b-0
  overflow-hidden
  rounded-2xl
  rounded-bl-none
  rounded-br-none  `}
          >
      <div className="overflow-y-auto custom-scroll h-[calc(100vh-250px)]">

 
  {/* Table Section */}
  {loading ? (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading jobs...</p>
      </div>
    </div>
  ) : postedJobs.length > 0 ? ( 
    <div className=" rounded-2xl  shadow-sm ">
          <div className="">
            <table className="w-full text-left border-collapse">
              <thead className="sticky z-50 -top-5 bg-[#fff]">
                <tr className="bg-gray-50/50 border-b border-gray-200">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Job Details</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-center">Applicants</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-center">Views</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#cccccc]">
                {postedJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-5">
          <Link href={`/company/hiring-talent/${job.id}`} className="group block">
            {/* 1. Job Title - Extra Bold and Dark */}
            <h3 className="text-[#334155] font-semibold text-lg">
              {job.title}
            </h3>

    <div className="flex flex-col gap-1.5">
      {/* 2. Company Name (Optional based on image) */}
      <span className="text-[#475569] text-base font-medium ">
         {job.companyname || "AmbiSpine Technologies"}
      </span>

      {/* 3. Location with Icon */}
      <div className="flex items-center gap-2 text-[#64748b] text-xs">
        <MapPin size={16} className="text-[#94a3b8]" />
        <span>{job.location}</span>
        <span className="text-[#94a3b8]">{job.mode || "Onsite"}</span>
      </div>

      {/* 4. Posted Date with Icon */}
      <div className="flex items-center gap-2 text-[#64748b] text-xs">
        <Calendar size={16} className="text-[#94a3b8]" />
        <span>{job.postedDate}</span>
      </div>
    </div>
  </Link>
</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(job.status)}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="inline-flex items-center gap-2  text-[#4F5D73] px-4 py-2 rounded-lg font-bold">
                        {job.applicants}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-600 font-medium">
                        <Eye className="w-4 h-4" /> {job.views}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        
                        {/* REUSABLE DROPDOWN INTEGRATION */}
                        <Dropdown
                          className="right-0 w-56 top-5 bg-white rounded-xl shadow-xl border border-gray-200 py-2"
                          button={
                            <div className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors cursor-pointer">
                              <Edit3 className="w-5 h-5" />
                            </div>
                          }
                        >
                          {({ close }) => (
                            <div>
                           <div className="flex flex-col">
                              {/* PRIMARY ACTIONS BASED ON STATUS */}
                              {job.status === "Active" ? (
                                <>
                           
                                  <ActionMenuItem 
                                  icon={<Edit3 size={16} />} 
                                  label="Edit post" 
                                  onClick={() => {
                                    // Option A: Sirf ID bhejna (agar API se fetch karna hai)
                                    // router.push(`/company/hiring-talent/job-post?edit=${job.id}`);
                                    
                                    // Option B: Pura data bhej dena (Quick solution)
                                    localStorage.setItem("editJobData", JSON.stringify(job));
                                    router.push(`/company/hiring-talent/job-post?mode=edit`);
                                    close(); 
                                  }} 
                                />
                                <ActionMenuItem 
                  icon={<Trash size={16} className="text-red-500" />} 
                  label={<span className="text-red-600">Delete job post</span>} 
                  onClick={() => {
                    handleDeleteJob(job.id); // Call delete function
                    close(); 
                  }} 
                 
                />
                                
                                  <ActionMenuItem 
                                    icon={<XCircle size={16} />} 
                                    label="Close post" 
                                    variant="danger"
                                    onClick={() => { 
                                      handleToggleStatus(job.id, job.status);
                                      close(); 
                                    }} 
                                  />
                                </>
                              ) : job.status === "Closed" ? (
                                <>
                                  <ActionMenuItem 
                                    icon={<RefreshCw size={16} />} 
                                    label="Reopen post" 
                                    onClick={() => { 
                                      handleToggleStatus(job.id, job.status);
                                      close(); 
                                    }} 
                                  />
                                  <ActionMenuItem 
                                    icon={<Edit3 size={16} />} 
                                    label="Edit post" 
                                    onClick={() => { console.log("Edit", job.id); close(); }} 
                                  />
                                </>
                              ) : null}

                              <div className="my-1 border-t border-gray-100" />

                         
                            </div>
                            </div>
                           
                          )}
                        </Dropdown>

                            <Dropdown
                          className="right-0 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2"
                          button={
                            <div className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors cursor-pointer">
                              <MoreVertical className="w-5 h-5" />
                            </div>
                          }
                        >
                          {({ close }) => (
                            <div>
                        <div className="flex flex-col">
                  
                              <div className="" />

                              {/* SECONDARY SHARED ACTIONS */}
                              <ActionMenuItem 
                                icon={<Settings size={16} />} 
                                label="Manage job post" 
                                onClick={close} 
                              />
                              <ActionMenuItem 
                                icon={<Activity size={16} />} 
                                label="Track application status" 
                                onClick={() => {
                                  router.push(`/company/hiring-talent/status/applicationview?jobId=${job.id}`);
                                  close();
                                }} 
                              />
                              <ActionMenuItem 
                                icon={<UserCircle size={16} />} 
                                label="View as a member" 
                                  onClick={() => {
                                    router.push(`/jobs/${job.id}`);
                                    close(); 
  }} 
                              />
                            </div>
                            </div>
                           
                          )}
                        </Dropdown>
                       

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    ) :(
      <div className="rounded-2xl shadow-sm w-full max-w-5xl min-h-[520px] flex items-center justify-center">
          <div className="flex flex-col items-center text-center max-w-md">
            {/* Illustration */}
            <img
              src="/Man-mailbox.png"
              alt="No applications"
              className="w-56 mb-6"
            />

            {/* Text */}
            <h2 className="text-base font-semibold text-gray-800 mb-2">
              You have no jobs right now
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              You haven’t posted any jobs yet. Create your first job to start receiving applications.
            </p>
          </div>
        </div>

    ) 
  }
    

      </div>

          </div>
</div>
<div className=" w-full lg:max-w-[30%] mx-auto">
  <div className="sticky top-0 inset-0  p-6 lg:relativ
  overflow-hidden
 ">
    <div className=" max-h-[calc(100vh-250px)]">
        <EmployerSidebar postedJobs={postedJobs} />
    </div>
  </div>

</div>
        </div>
     

      

      </div>
    </div>
  );
}