import React from 'react'
import AnalyticsDashboard from './ProfileAnalyticsDashboard'

const ProfileAnalytics = () => {
  return (
    <div>
       <div className="min-h-screen max-w-7xl bg-[#ffffff] mt-10 p-4 sm:p-6 lg:p-8 h-screen mx-auto ">
        <div className="border-[0.3px] border-[#cccccc] rounded-2xl  space-y-0 overflow-hidden">
            <AnalyticsDashboard />
             <aside className="w-full mt-5 rounded-2xl overflow-hidden lg:max-w-[300px] flex flex-col space-y-3">

             </aside>
        </div>
       </div>
    </div>
  )
}

export default ProfileAnalytics
