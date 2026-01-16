import React from 'react'
import AnalyticsDashboard from '../ProfileAnalyticsDashboard'
import ProfileVisitorsDemo from '../ProfileVisitorsCard'
import BackButton from '@/app/components/button/BackButton'

const ProfileAnalytics = () => {
  return (
    <div className=" bg-gray-50 mt-10">
      {/* Container with max width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6 mt-5">
          <BackButton />
        </div>

        {/* Main Layout: Two Column Grid */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Side - Analytics Dashboard (65-68% width) */}
          <div className="w-full lg:w-[65%] ">
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
     
      <div className="overflow-y-auto custom-scroll h-[calc(100vh-180px)]">
<AnalyticsDashboard />
        </div>
</div>
            
          </div>

          {/* Right Side - Profile Visitors (30-35% width) */}
                 <div  className=" w-full lg:max-w-[30%] mx-auto mt-2">
             <div className="overflow-y-auto custom-scroll h-[calc(100vh-180px)]">
 <ProfileVisitorsDemo />
             </div>
             </div>
           
        </div>
      </div>
    </div>
  )
}

export default ProfileAnalytics