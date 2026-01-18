"use client";
import React, { useState, useEffect } from "react";
import {

  MapPin,
  Briefcase,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { JobCard } from "./JobsCard"
import JobPreferenceCard, { ManageJobsTabs } from "./JobPreferenceCard";
import { ProfileCompletionCard } from "../components/common/ProfileCompletion";
import { useSearchParams } from "next/navigation";
import { handleGlobalAction } from "../save-items/handleActions";
import { getAllJobs } from "../utils/jobsApi";
import { toast } from "react-toastify";
import { Suspense } from "react";
import { GlobalLoader } from "@/app/components/Loader";  
import { useTimeAgo, formatTimeAgo } from '@/app/hooks/useTimeAgo';
import { useMemo } from 'react'
import { useAppProfile } from "../hooks/useAppProfile";


const JobSearchClient = () => {
  const calculateProgress = () => {
  let score = 0;
  if (userdata?.personalInfo?.firstName) score += 20;
  if (userdata?.personalInfo?.email) score += 10;
  if (userdata?.profileSummary) score += 20;
  if (userdata?.workExperience?.length > 0) score += 20;
  if (userdata?.education?.length > 0) score += 20;
  if (userdata?.skills?.length > 0) score += 10;
  return score;
};

  const [jobs, setJobs] = useState([]);
  const RECOMMENDED_AFTER = 3;
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobsToShow, setJobsToShow] = useState(12);
  const [comparisonJobs, setComparisonJobs] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    location: "",
    workMode: "",
    jobType: {},
    industry: "",
    skills: [],
  }); 
// const userdata = useSelector((state) => state.profile.data);
const { profile: userdata, isLoading: isProfileLoading } = useAppProfile();
const lastUpdatedText = useTimeAgo(userdata?.updatedAt);


const profileDisplayData = useMemo(() => ({
    profile: {
      name: `${userdata?.personalInfo?.firstName || ""} ${userdata?.personalInfo?.lastName || ""}`.trim() || "User Name",
      role: userdata?.personalInfo?.headline || "Designation",
      company: userdata?.workExperience?.[0]?.company || "",
      avatar: userdata?.personalInfo?.avatar || "/default-user-profile.svg",
      about: userdata?.profileSummary || "No summary added.",
      username: userdata?.personalInfo?.userName,
      completion: calculateProgress(userdata),
      lastUpdated: lastUpdatedText, // Dynamic Real-time text
    },
  
    preferences: {
  role: userdata?.jobAlertPreferences?.targetRole || "Software Engineer",

  locations: userdata?.jobAlertPreferences?.locationPreference
    ? [userdata.jobAlertPreferences.locationPreference]
    : ["Not Specified"],

  industry: userdata?.jobAlertPreferences?.targetIndustry || "IT / Software",

  salary: userdata?.jobAlertPreferences?.salaryRange
    ? `${userdata.jobAlertPreferences.salaryRange.currency} ${userdata.jobAlertPreferences.salaryRange.min} - ${userdata.jobAlertPreferences.salaryRange.max}`
    : "Negotiable",
}

  }), [userdata, lastUpdatedText,]);

const searchParams = useSearchParams();
  const skillQuery = searchParams.get("query");

  const [directSaved, setDirectSaved] = useState(() => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("direct_saved_items");
    try {
      const parsed = saved ? JSON.parse(saved) : [];
      // 🔥 Safety Check: Agar data object hai toh use array mein convert karo
      return Array.isArray(parsed) ? parsed : Object.values(parsed).flat();
    } catch {
      return [];
    }
  }
  return [];
});
  // 2. LocalStorage Sync
  useEffect(() => {
    localStorage.setItem("direct_saved_items", JSON.stringify(directSaved));
  }, [directSaved]);
  
  const [collections, setCollections] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("user_collections");
      return saved ? JSON.parse(saved) : [{ id: 1, name: "General", items: [] }];
    }
    return [{ id: 1, name: "General", items: [] }];
  });

  // Central Handler (PostsFeed wala hi copy-paste)
  const onSaveAction = (actionType, data, type) => {
    handleGlobalAction(actionType, data, type, { setCollections, setDirectSaved, });
  };

  // Transform backend job data to frontend format
  const transformJobData = (job) => {
    const daysAgo = job.createdAt 
      ? Math.floor((new Date() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24))
      : 0;
    
    return {
      id: job._id,
      title: job.title,
      company: job.company,
      companyLogo: job.companyLogo || "/spreads.svg",
      companyColor: job.companyColor || "bg-blue-600",
      location: job.location,
      salary: job.salary || "Not specified",
      workMode: job.workMode || "On-site",
      jobType: job.jobType || "Full-time",
      education: job.education || "Any",
      experience: job.experience || "0",
      postedDate: job.createdAt ? formatTimeAgo(job.createdAt) : "Recently",
      daysAgo: daysAgo,
      skills: job.skills || [],
      description: job.description || "",
      views: job.views || 0,
      matchScore: Math.floor(Math.random() * 30 + 70), // Can be calculated from profile later
      isFeatured: job.isFeatured || false,
      isNew: daysAgo <= 2,
      isHiring: job.isActive !== false,
      isBookmarked: false,
      isLiked: false,
      isApplied: false,
      companySize: job.companySize || "Mid-size",
      industry: job.industry || "Technology",
    };
  };

  // Fetch jobs from API
  const fetchJobs = async (apiFilters = {}, page = 1) => {
    setLoading(true);
    setPageLoading(page === 1);
    try {
      // Transform frontend filters to API format
      const apiFiltersFormatted = {
        search: searchQuery || undefined,
        location: locationQuery || apiFilters.location || undefined,
        workMode: apiFilters.workMode || undefined,
        jobType: apiFilters.jobType && Object.values(apiFilters.jobType).some(v => v)
          ? Object.keys(apiFilters.jobType).filter(key => apiFilters.jobType[key]).map(key => {
              if (key === 'fulltime') return 'Full-time';
              if (key === 'parttime') return 'Part-time';
              return key.charAt(0).toUpperCase() + key.slice(1);
            })
          : undefined,
        industry: apiFilters.industry || undefined,
        skills: skillQuery ? [skillQuery] : undefined,
        sortBy: sortBy === "relevance" ? "createdAt" : sortBy,
        order: "desc",
      };

      // Remove undefined values
      Object.keys(apiFiltersFormatted).forEach(key => 
        apiFiltersFormatted[key] === undefined && delete apiFiltersFormatted[key]
      );

      const result = await getAllJobs(apiFiltersFormatted, page, 50);
      if (result.success && result.data) {
        const transformedJobs = result.data.map(transformJobData);
        if (page === 1) {
          setJobs(transformedJobs);
          setFilteredJobs(transformedJobs);
        } else {
          setJobs(prev => [...prev, ...transformedJobs]);
          setFilteredJobs(prev => [...prev, ...transformedJobs]);
        }
        setCurrentPage(page);
      } else {
        toast.error(result.message || "Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
      setPageLoading(false);
    }
  };

  // Initial fetch and when filters change
  useEffect(() => {
    fetchJobs(filters, 1);
  }, [searchQuery, locationQuery, skillQuery, sortBy]);



  const clearAllFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setFilters({
      location: "",
      workMode: "",
      jobType: {},
      industry: "",
      skills: [],
    });
    fetchJobs({}, 1);
  };

  // Client-side filtering for skillQuery (for URL query param)
  useEffect(() => {
    if (skillQuery && jobs.length > 0) {
      const filtered = jobs.filter((job) => {
        const query = skillQuery.toLowerCase();
        const skillMatch = job.skills?.some(skill => skill.toLowerCase().includes(query));
        const titleMatch = job.title?.toLowerCase().includes(query);
        const companyMatch = job.company?.toLowerCase().includes(query);
        return skillMatch || titleMatch || companyMatch;
      });
      setFilteredJobs(filtered);
    } else if (!skillQuery && jobs.length > 0) {
      setFilteredJobs(jobs);
    }
  }, [skillQuery, jobs]);
  // Update displayed jobs whenever filtered list changes
  useEffect(() => {
    setDisplayedJobs(filteredJobs.slice(0, jobsToShow));
  }, [filteredJobs, jobsToShow]);
 

  useEffect(() => {
    setDisplayedJobs(filteredJobs.slice(0, jobsToShow));
  }, [filteredJobs, jobsToShow]);

  const toggleBookmark = (jobId) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, isBookmarked: !job.isBookmarked } : job
      )
    );
    setFilteredJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, isBookmarked: !job.isBookmarked } : job
      )
    );
  };

  const loadMoreJobs = () => {
    setJobsToShow(prev => prev + 12);
    // If we're close to the end, fetch more
    if (jobsToShow >= jobs.length - 5 && !loading) {
      fetchJobs(filters, currentPage + 1);
    }
  };

if (pageLoading) {
    return <GlobalLoader />;
  }


  return (
    <div className=" pt-10 mt-10 bg-gray-50 text-gray-900">
      
      {/* 1. Global Loading Check: Agar loading hai to poore page pe Loader dikhao */}
  
  <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 ">
   
        <div className="flex flex-col lg:flex-row gap-10">

          <div className=" w-full lg:max-w-[65%] mx-auto">
            <div
              className={` 
  sticky top-3 inset-0 bg-opacity-50 lg:relative lg:bg-transparent  border-[0.3px]
  border-[#cccccc]
  border-b-0
  overflow-hidden
  rounded-2xl
  rounded-bl-none
  rounded-br-none  `}
          >
     
      <div className="overflow-y-auto custom-scroll h-[calc(100vh-120px)]">

         <div className="">
                
               <div>
  {displayedJobs.map((job, index) => (
    <React.Fragment key={job.id}>
      <JobCard job={job} clickable  directSaved={directSaved} collections={collections} onSaveAction={onSaveAction}  />

                          {index === RECOMMENDED_AFTER - 1 && (
                            <div className="">

                              {filteredJobs.length > 0 && (
                                <div className="py-4 px-3 bg-[#fff]">
                                  <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                      <TrendingUp className="w-5 h-5 text-blue-600" />
                                      Recommended for You
                                    </h2>
                                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                                      View All
                                      <ChevronRight className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
                                    {jobs
                                      .filter((job) => job.matchScore >= 85)
                                      .slice(0, 2)
                                      .map((job) => (
                                        <div
                                          key={job.id}
                                          className=" border-[0.3px] border-[#cccccc]  rounded-xl p-6  transition-all duration-300 hover:-translate-y-0.5"
                                        >
                                          <div className="flex items-start justify-between mb-3">
                                               <img src={job.companyLogo} className=" w-14 h-14 object-cover"  alt={job.name} />
                                          

                                            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                              {job.matchScore}% Match
                                            </span>
                                          </div>
                                          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                                            {job.title}
                                          </h3>
                                          <p className="text-gray-700 font-medium text-sm mb-3">
                                            {job.company}
                                          </p>
                                          <div className="space-y-2 mb-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                              <MapPin className="w-4 h-4 text-gray-600" />
                                              {job.location}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                              {job.salary}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                              <Briefcase className="w-4 h-4 text-gray-600" />
                                              {job.workMode} • {job.jobType}
                                            </div>
                                          </div>
                                          <div className="flex flex-wrap gap-2 mb-4">
                                            {job.skills.slice(0, 3).map((skill, idx) => (
                                              <span
                                                key={idx}
                                                className="bg-white text-gray-700 px-2 py-1 rounded text-xs font-medium border border-gray-200"
                                              >
                                                {skill}
                                              </span>
                                            ))}
                                          </div>
                                          <button className="w-full hover:cursor-pointer bg-blue-700 text-white py-2 rounded-full text-sm font-medium transition-colors">
                                            Apply Now
                                          </button>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {filteredJobs.length > displayedJobs.length && (
                      <div className="bg-white py-3 text-center">
                        <button
                          onClick={loadMoreJobs}
                          disabled={loading}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? "Loading..." : `Load More Jobs (${filteredJobs.length - displayedJobs.length} remaining)`}
                        </button>
                      </div>
                    )}

                {filteredJobs.length === 0 && (
                  <div className="bg-white h-full rounded-xl p-12 text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">
                      No jobs found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your filters or search terms
                    </p>
                    <button
                      onClick={clearAllFilters}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors text-sm"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div> 

              </div>


          </div>


          </div>
          <div  className=" w-full lg:max-w-[30%] mx-auto">
             <div className="overflow-y-auto custom-scroll h-[calc(100vh-120px)] mt-4">


              <div className=" space-y-4 ">

                <ProfileCompletionCard
  user={profileDisplayData.profile}
    />
                <JobPreferenceCard preferences={profileDisplayData.preferences} />
                <ManageJobsTabs />
              </div>

            </div>
          </div>


        </div>
      </div>
    
    </div>
  );

};

export default function JobSearchPage() {
  return (
    <Suspense fallback={<GlobalLoader />}>
      <JobSearchClient />
    </Suspense>
  );
}

