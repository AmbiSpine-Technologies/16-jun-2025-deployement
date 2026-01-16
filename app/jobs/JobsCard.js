"use client";
import { useState } from "react";
import {
  Star,
  Briefcase,
  MapPin,
  Clock,
  Bookmark,
  Heart,
  Plus,
  Eye,
  Ellipsis,
  MoreHorizontal,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toggleSaveItem } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Dropdown, { SmartDropdown } from "../components/Dropdown";
import SaveitemsMenu from "../save-items/SaveitemsMenu";
import { handleGlobalAction } from "../save-items/handleActions";
import SaveButton from "../save-items/SaveButton";

export const JobCard = ({ job, clickable = false, showSaveMenu = false, directSaved, setDirectSaved, setCollections,   collections }) => {
  const router = useRouter();
 const dispatch = useDispatch()
 const [isPremiumUser, setIsPremiumUser] = useState(false);
 const savedJobs = useSelector(
    (state) => state.users?.currentUser?.saved?.jobs || []
  );

  const isSaved = savedJobs.includes(job.id);

   const toggleBookmark = (e) => {
    e.stopPropagation();

    dispatch(
      toggleSaveItem({
        type: "jobs",
        id: job.id,
      })
    );
  };
  const goToDetails = () => {
    router.push(`/jobs/${job.id}`);
  };

const onSaveAction = (actionType, data, type) => {
  handleGlobalAction(actionType, data, type, { 
    setCollections, 
    setDirectSaved,  
  });
};
  return (
    <div
      onClick={clickable ? goToDetails : undefined}
      className={`bg-white border-b-[0.3px]   border-[#cccccc]   p-6 transition-all duration-300
        ${clickable ? "cursor-pointer  " : ""}
      `}
    >
      <div className="flex gap-4">
        {/* Company Logo */}
       
          <img src={job.companyLogo} className=" w-14 h-14 object-cover"  alt={job.name} />


        {/* Job Details */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                {job.title}
              </h3>
              <div className="text-gray-600 text-sm flex items-center gap-2 flex-wrap">
                <span className="font-medium">{job.company}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {job.location}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
  {showSaveMenu && (
  
<Dropdown
  button={<MoreHorizontal className="cursor-pointer text-gray-500" />}
  className="right-0 top-0 w-56 border border-[#cccccc] rounded-sm shadow-sm overflow-hidden"
>
  {({ close }) => (
    <SaveitemsMenu
      type="job" 
      item={job}
      close={close} 

      onAction={(actionType, data) => 
  handleGlobalAction(actionType, data, "job", { 
    setCollections: setCollections, 
    setDirectSaved: setDirectSaved, 
    router: router 
  })
}
    />
  )}
</Dropdown>
  )}

  {job?.matchScore && (
    <span
      className={`border rounded-full text-xs font-semibold px-2 py-0.5 ${
        isPremiumUser
          ? "text-blue-600"
          : "border-gray-300 text-blue-600 bg-blue-50 blur-[1px]"
      }`}
    >
      {job.matchScore}% Match
    </span>
  )}
</div>


          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
         
            {job.isNew && (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                New
              </span>
            )}
            {job.isHiring && (
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">
                Actively Hiring
              </span>
            )}
            {job.isApplied && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                Applied ✓
              </span>
            )}
          </div>

          {/* Job Info */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3 text-sm text-gray-600">
            <span>{job.salary}</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-gray-600" />
              {job.workMode}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-4 h-4 text-gray-600" />
              {job.jobType}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-gray-600" />
              {job.postedDate}
            </span>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {job.skills?.slice(0, 5).map((skill, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-xs font-medium"
              >
                {skill}
              </span>
            ))}
            {job.skills?.length > 5 && (
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-xs">
                +{job.skills.length - 5} more
              </span>
            )}
          </div>

          {/* Description */}
      <div 
  className="text-gray-600 text-sm mb-4 line-clamp-2 prose prose-sm max-w-none"
  dangerouslySetInnerHTML={{ __html: job.description }} 
/>
          {/* Actions */}
          <div className="flex justify-between gap-3">
           <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={(e) => e.stopPropagation()}
              className="bg-blue-700 hover:cursor-pointer  text-white px-6 py-1.5 rounded-full text-sm font-medium"
            >
             Apply
            </button>




            <span className="text-gray-400 text-sm flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {job.views}
            </span>
            
          </div>
          <div>
           
{
  !showSaveMenu && (    <SaveButton 
            item={job} 
            type="job" // Type 'job' set karein taaki link/preview sahi bane
           directSaved={directSaved}
           collections={collections}
            onAction={(action, data) => onSaveAction(action, data, "job")} 
          />)
}
      
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
