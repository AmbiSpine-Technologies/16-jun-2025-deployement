// components/community/CommunityHeader.js
import { HiUsers, HiCalendar, HiPencilAlt, HiCog } from "react-icons/hi";
import { RiBook2Fill, RiTeamFill, RiBriefcase4Fill, RiRocket2Fill, RiBuilding4Fill, RiSchoolFill } from "react-icons/ri";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";
import { joinCommunityByInvite } from "../utils/communityService";
import { useSelector } from "react-redux";
import { Buttonborder } from '../components/Button';
import { MdOutlineManageAccounts } from "react-icons/md";
import { VscEdit } from "react-icons/vsc";

export default function CommunityHeader({ community, isMember, isAdmin, onEdit }) {
  const { currentUser } = useSelector((state) => state.users);

  const handleJoinCommunity = async () => {
    if (!currentUser) {
      alert("Please login to join community");
      return;
    }

    try {
      const result = await joinCommunityByInvite(
        community.id,
        currentUser.id,
        currentUser.name || currentUser.email
      );

      if (result.success) {
        alert("Successfully joined the community!");
        window.location.reload();
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert("Error joining community");
    }
  };

  // Category icons with better styling
  const getCategoryIcon = (category) => {
    const iconConfig = {
      Students: { icon: <RiSchoolFill className="text-3xl" />, color: "text-blue-600" },
      College: { icon: <RiBuilding4Fill className="text-3xl" />, color: "text-green-600" },
      Recruiter: { icon: <RiBriefcase4Fill className="text-3xl" />, color: "text-purple-600" },
      Professional: { icon: <RiRocket2Fill className="text-3xl" />, color: "text-orange-600" },
    };
    
    const config = iconConfig[category] || { 
      icon: <RiTeamFill className="text-3xl" />, 
      color: "text-gray-600" 
    };
    
    return <div className={config.color}>{config.icon}</div>;
  };

  // Visibility badges
  const getVisibilityBadge = (visibility) => {
    const styles = {
      Public: "bg-green-100 text-green-800 border-green-200",
      Private: "bg-blue-100 text-blue-800 border-blue-200",
      Restricted: "bg-orange-100 text-orange-800 border-orange-200"
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[visibility] || styles.Public}`}>
        {visibility}
      </span>
    );
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      {/* Cover Section with Gradient */}
      <div className="relative">
        {/* Banner Image or Gradient Fallback */}
        {community.bannerImage ? (
          <div 
            className="h-30 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${community.bannerImage})` }}
          >
            {/* <div className="absolute inset-0 bg-black bg-opacity-20"></div> */}
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 w-full"></div>
        )}
        
        {/* Edit Cover Button for Admin */}
      
        <div className="w-[100px] h-[100px] absolute left-10 -bottom-10 rounded-2xl  border border-gray-200 flex items-center justify-center">
              {community.communityIcon ? (
                <img 
                  src={community.communityIcon} 
                  alt={community.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="text-4xl">
                  {getCategoryIcon(community.category)}
                </div>
              )}
            </div>
      </div> 

      <div className="flex justify-end gap-3 px-3 mt-2">
            {!isMember ? (
              <Buttonborder
               onClick={handleJoinCommunity}
                name=" Join Community" />
            ) : (
              <div className="flex m-2 gap-2">
                <button className=" border border-[#475569] hover:cursor-pointer text-white px-3 py-2 rounded-xl font-semibold transition-all flex items-center justify-center">
                  <FaUserCheck className="text-[14px] text-[#475569]" />
                </button>

                {isAdmin && (
                  <button 
                  onClick={onEdit}
                  className=" border border-[#475569] hover:cursor-pointer text-white px-3 py-2 rounded-xl font-semibold transition-all flex items-center justify-center">
                  <VscEdit className="text-[14px] text-[#475569]" /> 
                </button>
        
                )}
              </div>
            )}
          </div>
      {/* Community Info Section */}
      <div className="max-w-7xl mx-auto px-4 mt-14 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-end gap-6 -mt-16 pb-8">
      

          {/* Community Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 ">
              <h1 className="text-[20px] font-medium font-jost text-[#373E41] truncate">
                {community.name}
              </h1>


              {/* Visibility Badge */}
              {getVisibilityBadge(community.visibility)}

              {/* Admin Badge */}
              {isAdmin && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200 flex items-center gap-1">
                  <HiCog className="text-sm" />
                  Admin
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-[14px] mt-1 leading-relaxed max-w-4xl mb-4">
              {community.description || "A vibrant community for collaboration and growth."}
            </p>

            {/* Stats and Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600">
     
              {/* Creation Date */}
              <div className="flex items-center gap-2  px-3 py-2 rounded-lg">
                <HiCalendar className="text-xl text-gray-600" />
                <span className="text-sm">
                  Created {new Date(community.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>

              {/* Category */}
              <div className="flex items-center gap-2  px-3 py-2 rounded-lg">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {community.category}
                </span>
              </div>

            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
}