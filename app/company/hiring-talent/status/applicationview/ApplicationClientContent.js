"use client";

import Link from "next/link";
import { ArrowLeft, Download, Eye, MessageCircle, Share2, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getJobApplications } from "../../../../utils/jobsApi";
import { toast } from "react-toastify";

export default function ApplicationClientContent() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!jobId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const result = await getJobApplications(jobId, 1, 100);
        if (result.success && result.data) {
          // Transform backend data to match frontend format
          const transformedApplicants = result.data.map((app) => ({
            id: app._id,
            name: `${app.applicant?.firstName || ""} ${app.applicant?.lastName || ""}`.trim() || "Unknown",
            role: app.applicant?.userName || "N/A",
            description: app.coverLetter || "No cover letter provided",
            image: app.applicant?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(app.applicant?.firstName || "User")}`,
            matchScore: app.matchScore || 0,
            isPremium: app.applicant?.isPremium || false,
            status: app.status || "pending",
            appliedAt: app.appliedAt,
          }));
          setApplicants(transformedApplicants);
        } else {
          toast.error(result.message || "Failed to fetch applications");
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        toast.error("Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);
  return (
    <div className="mt-16 pt-10 ">
          <div className="max-w-7xl mx-auto px-4">
             <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-5">
                      <Link href="/company/hiring-talent" className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <ArrowLeft size={20} strokeWidth={2} />
          <span className="font-medium">Back</span>
        </Link >
        <div>
                  <h1 className="text-xl font-bold text-[#4F5D73]">Applications</h1>
                  <p className="text-[#4F5D73] text-sm">Track and manage your hiring pipeline.</p>
          </div>

                </div>
                <button  className="flex items-center gap-2 bg-[#0516D4] text-white px-4 py-2.5 rounded-full font-semibold transition-all text-sm">

                  Download data
                </button>
              </div>
      
       <div className=" bg-white  sticky top-3 inset-0 lg:relative  border-[0.3px]
  border-[#cccccc]
  border-b-0
  overflow-hidden
  rounded-2xl
  rounded-bl-none
  rounded-br-none ">
{loading ? (
        <div className="flex justify-center px-4 py-6">
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading applications...</p>
          </div>
        </div>
      ) : !jobId ? (
        <div className="flex justify-center px-4 mt-6">
          <div className="rounded-2xl shadow-sm w-full max-w-5xl min-h-[520px] flex items-center justify-center">
            <div className="flex flex-col items-center text-center max-w-md">
              <h2 className="text-base font-semibold text-gray-800 mb-2">
                No job selected
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Please select a job from the job listings to view applications.
              </p>
            </div>
          </div>
        </div>
      ) : applicants.length > 0 ? (  <div className="flex justify-center px-4 py-6">
          <div className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden ">

            {/* LIST HEADER */}
            <div className="p-6 border-b  flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                {applicants.length} qualified applicant{applicants.length !== 1 ? 's' : ''}
              </h2>

              <div className="hidden md:flex gap-2">
                {["Application Date", "Review", "Experience", "Location", "Skills"].map(
                  (filter) => (
                    <button
                      key={filter}
                      className="px-4 py-1.5 border border-blue-600 text-blue-600 rounded-full text-xs font-medium hover:bg-blue-50"
                    >
                      {filter}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* LIST BODY */}
            <div className="divide-y divide-gray-100">
              {applicants.map((applicant) => (
                <div
                  key={applicant.id}
                  className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition"
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-14 h-14 rounded-full overflow-hidden border shadow-sm relative">
                      <img
                        src={applicant.image}
                        alt={applicant.name}
                        className="w-full h-full object-cover"
                      />
                      {applicant.isPremium && (
                        <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-0.5">
                          <Star size={12} className="text-yellow-600 fill-yellow-600" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900">
                          {applicant.name}
                        </h3>
                        {applicant.isPremium && (
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full flex items-center gap-1">
                            <Star size={10} className="fill-yellow-600" />
                            Premium
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-gray-500">
                        {applicant.role}
                      </p>
                      <p className="text-xs text-gray-400 line-clamp-1 max-w-xl">
                        {applicant.description}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-4">
                    {applicant.matchScore > 0 && (
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-500">Match Score</span>
                        <span className={`text-lg font-bold ${applicant.matchScore >= 75 ? 'text-green-600' : applicant.matchScore >= 50 ? 'text-orange-600' : 'text-red-600'}`}>
                          {applicant.matchScore}%
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-gray-400">
                      <Download className="hover:text-blue-600 cursor-pointer" size={20} />
                      <Eye className="hover:text-blue-600 cursor-pointer" size={20} />
                      <MessageCircle className="hover:text-blue-600 cursor-pointer" size={20} />
                      <Share2 className="hover:text-blue-600 cursor-pointer" size={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>) : (
 <div className="flex justify-center px-4 mt-6">
        <div className="rounded-2xl shadow-sm w-full max-w-5xl min-h-[520px] flex items-center justify-center">
          <div className="flex flex-col items-center text-center max-w-md">
            
            <img
              src="/femal-hr-hiring.png"
              alt="No applications"
              className="w-56 mb-6"
            />

           
            <h2 className="text-base font-semibold text-gray-800 mb-2">
              Looks like you’ve no longer accepted application
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              New applications are no longer being accepted. Manage your
              jobs’ availability from the control panel.
            </p>
          </div>

        </div>

      </div>
        )
}


    
      </div>
      
          </div>

    </div>
  );
}


