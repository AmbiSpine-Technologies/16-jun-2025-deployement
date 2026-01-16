'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // ✅ Import useParams to get dynamic ID
import Link from 'next/link';
import { 
  MapPin, Globe, Users, Briefcase, CheckCircle, 
  Plus, MoreHorizontal, Building2 
} from 'lucide-react';
import AdvertisementCard from "../../components/AdvertisementCard";
import PeopleHighlights from "../../components/company/PeopleHighlights";

import { COMPANY_DATA, PEOPLE_STATS } from '@/app/data/comapnydata';
import { AboutTab } from '../../components/company/tabs/AboutTab';
import { JobsTab } from '../../components/company/tabs/JobsTab';
import { PostsTab } from '../../components/company/tabs/PostsTab';
import { PeopleTab } from '../../components/company/tabs/PeopleTab';
import { SidebarWidget  } from '../../components/company/tabs/SidebarWidget';
import ReusableSection from './Feature';
import { ALL_POSTS } from "../../data/data"
import CompanyInsightsCard from "../../components/company/CompanyInsightsCard";
import { getCompanyById } from '@/app/utils/companyApi';

export default function CompanyProfilePage() {
  const params = useParams(); // ✅ Get ID from URL (e.g., cmp_12345)
  const companyId = params.id; 
  const [activeTab, setActiveTab] = useState('Home');
  const [isFollowing, setIsFollowing] = useState(false);
  const [companyData, setCompanyData] = useState(null);

  const hiringData = [
    { name: 'Jan 2025', value: 30 },
    { name: 'Apr 2025', value: 32 }, // Hidden point for smoothness
    { name: 'Jul 2025', value: 28 },
    { name: 'Oct 2025', value: 35 }, // Hidden point for smoothness
    { name: 'Jan 2026', value: 34 }, 
  ];

  const recentHires = [
    { name: "Mayank Sharma", avatar: "https://i.pravatar.cc/150?u=1" },
    { name: "Anjali Gupta", avatar: "https://i.pravatar.cc/150?u=2" },
    { name: "Rahul Verma", avatar: "https://i.pravatar.cc/150?u=3" },
  ];

const WhatsappIcon = () => {
  const phoneNumber = "9685221056";
  const message = "Hello, I am founder of AmbiSpine technology";

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#25D366",
        borderRadius: "50%",
        padding: "10px",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        zIndex: "2",
      }}
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="#FFFFFF"
      >
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.433.716 4.7 1.95 6.598L.184 22.96l4.404-1.754C6.462 22.326 8.66 23 11.034 23 17.66 23 23 17.66 23 12S17.66 0 12 0zm0 21.23c-2.334 0-4.52-.664-6.372-1.812l-4.146 1.668 1.694-4.112C1.928 15.462 1.23 13.28 1.23 11c0-5.95 4.82-10.77 10.77-10.77S22.77 5.05 22.77 11 17.95 21.23 12 21.23zm6.486-7.598c-.328-.164-1.944-.96-2.244-1.068-.3-.11-.52-.164-.74.164-.22.328-.852 1.068-1.044 1.286-.192.218-.384.246-.712.082-.328-.164-1.386-.51-2.64-1.626-.976-.87-1.634-1.944-1.826-2.272-.192-.328-.02-.506.144-.67.148-.148.328-.384.492-.576.164-.192.22-.328.328-.546.11-.218.056-.41-.028-.576-.082-.164-.74-1.782-1.014-2.438-.266-.642-.54-.554-.74-.564-.192-.01-.41-.01-.63-.01-.22 0-.576.082-.876.41-.3.328-1.146 1.12-1.146 2.73 0 1.61 1.174 3.166 1.338 3.384.164.218 2.308 3.52 5.594 4.936 3.286 1.416 3.286 1.044 3.848.978.562-.066 1.944-.796 2.22-1.564.276-.768.276-1.426.192-1.564-.082-.138-.3-.22-.63-.384z" />
      </svg>
    </div>
  );
};

const goToTab = (tabName) => {
    setActiveTab(tabName);
    window.scrollTo(0, 0); // Scroll to top for a better UX
  };

const renderContent = () => {
    if (!companyData) return null;

    // Prepare data for AboutTab
    const aboutTabData = {
      description: companyData.description || companyData.tagline || '',
      website: companyData.website || '',
      industry: companyData.industry || '',
      companySize: companyData.orgSize || '',
      headquarters: companyData.headquarters || companyData.location || '',
      founded: companyData.founded || '',
      specialties: companyData.specialties || '',
    };

    switch (activeTab) {
      case 'Home':
        return (
          <>
             <div className='bg-[#fff] my-5 border-b border-[#cccccc] pb-3'>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Overview</h2>
      <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-line mb-4">
        {companyData.description || companyData.tagline || ''}
      </p>

      <div className='text-center'>
      <button onClick={() => goToTab("About")} className="text-gray-600 text-base font-semibold  mt-2">See more</button>

      </div>
             </div>
        

             <div className="mt-4">
              <ReusableSection 
          title="Page posts"
         goToTab={() => goToTab("Posts")}
          allData={ALL_POSTS}
          showAllPath="/student-profile/activity"
        />
        <div className='pt-4'>
          <ReusableSection 
          title="Featured"
          goToTab={() => goToTab("Posts")}
          allData={ALL_POSTS}
          showAllPath="/student-profile/activity"
        />
        </div>
        
        </div>
        <PeopleHighlights goToTab={() => goToTab("People")}/>
          <CompanyInsightsCard 
        companyName={companyData.name || "Company"}
        growthRate={11}
        recentHires={recentHires}
        chartData={hiringData}
        price="₹0"
      />
          </>

        );
      case 'About':
        return <AboutTab data={aboutTabData} />;
      case 'Posts':
        return <PostsTab posts={[{id:1, content:"We are happy to initiate...", image:true}]} />;
      case 'Jobs':
        return <JobsTab />;
      case 'People':
      return <PeopleTab stats={PEOPLE_STATS} />;
      default:
        return <AboutTab data={aboutTabData} />;
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyData = async () => {
    if (companyId) {
        setLoading(true);
        try {
          const result = await getCompanyById(companyId);
          if (result.success && result.data) {
            // Transform API data to match component expectations
            const transformedData = {
              ...result.data,
              logoPreview: result.data.logo || null,
              industry: result.data.industry || '',
              location: result.data.location || '',
              name: result.data.name || '',
              tagline: result.data.tagline || result.data.description || '',
              description: result.data.description || result.data.tagline || '',
              isVerified: result.data.isVerified || false,
              website: result.data.website || '',
              orgSize: result.data.orgSize || '',
              headquarters: result.data.headquarters || result.data.location || '',
              founded: result.data.founded || '',
              specialties: result.data.specialties || '',
              followers: result.data.followers || 0,
            };
            setCompanyData(transformedData);
      } else {
            setCompanyData(null);
          }
        } catch (error) {
          console.error('Error fetching company:', error);
          setCompanyData(null);
        } finally {
          setLoading(false);
      }
    }
    };

    fetchCompanyData();
  }, [companyId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f3f2ef]">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading company...</p>
      </div>
    );
  }

  if (!companyData) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f3f2ef]">
            <h2 className="text-xl font-bold text-gray-700">Company Not Found</h2>
            <Link href="/company/create-company-page" className="text-blue-600 hover:underline mt-2">
                Create a new company
            </Link>
        </div>
    );
  }

  return (
    <div className="min-h-screen mt-10 pt-10 bg-[#f3f2ef] font-sans">
       
     {/* <WhatsappIcon /> */}
       {/* MAIN CONTENT */}
       <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          <div className="lg:col-span-3 space-y-4">
             {/* Hero Card */}
             <div className="bg-white rounded-xl border border-gray-300 overflow-hidden shadow-sm relative">
                <div className="h-48 bg-[#a0b4b7] relative">
                   {/* Cover Image Logic could go here */}
                </div>

                <div className="px-6 pb-6 pt-0 relative">
                   <div className="-mt-16 mb-4 inline-block relative">
                      <div className="w-32 h-32 bg-white rounded-lg border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                         {companyData.logoPreview ? (
                            <img src={companyData.logoPreview} alt="Logo" className="w-full h-full object-cover" />
                         ) : (
                            <div className="w-full h-full bg-[#f3f2ef] flex items-center justify-center">
                               <Building2 size={40} className="text-gray-400" />
                            </div>
                         )}
                      </div>
                   </div>

                   <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div>
                         <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            {companyData.name}
                            {/* Check Verification Status */}
                            {companyData.isVerified && <CheckCircle size={18} className="text-[#0a66c2] fill-white" />}
                         </h1>
                  
                         
                         <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-gray-500">
                            <span>{companyData.industry}</span>
                            {companyData.location && (
                              <>
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <span>{companyData.location}</span>
                              </>
                            )}
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            <span className="text-[#0a66c2] font-semibold hover:underline cursor-pointer">
                               {companyData.followers || 0} followers
                            </span>
                         </div>
                               <div className="flex items-center mt-2 gap-2">
                         <button className="bg-[#0a66c2] text-white px-4 py-1 rounded-full font-semibold hover:bg-[#004182] transition flex items-center gap-2">
                            <Plus size={18} /> Follow
                         </button>
                         <button className="border border-[#0a66c2] text-[#0a66c2] px-4 py-1 rounded-full font-semibold hover:bg-blue-50 transition flex items-center gap-2">
                           Message 
                         </button>
                      </div>
                      </div>

                
                   </div>

                   {/* Tabs (Static for now) */}
                 <div className="border-t border-b border-gray-200 px-4 mt-4">
                   <div className="flex gap-1">
                      {['Home', 'About', 'Posts', 'Jobs', 'People'].map((tab) => (
                         <button 
                            key={tab} 
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-3 text-sm hover:cursor-pointer font-semibold border-b-[3px] transition whitespace-nowrap
                               ${activeTab === tab ? 'border-[#01754f] text-[#01754f]' : 'border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-600'}
                            `}
                         >
                            {tab}
                         </button>
                      ))}
                   </div>
                </div>
                <div className='px-4'>
     {renderContent()}
                </div>
           
                </div>
             </div>

       
          </div>
          
          {/* Right Sidebar remains static for now */}
          <div className="">
           {/* RIGHT COLUMN (Sidebar) */}
          <div className="hidden lg:block lg:col-span-4 space-y-4">
            <AdvertisementCard />
             {/* Affiliated Pages */}
             <SidebarWidget 
                title="Affiliated pages" 
                items={companyData.similarPages || []}
             />

             {/* People Also Viewed */}
             <SidebarWidget 
                title="Pages people also viewed" 
                items={[
                   {name: "Mind Coders", tagline: "Education"},
                   {name: "HR Mohini", tagline: "IT Services and IT Consulting"}
                ]} 
             />

             {/* Ad Space Placeholder */}
             <div className="bg-white rounded-xl border border-gray-300 p-2 shadow-sm text-center">
                 <div className="text-xs text-gray-400 text-right mb-1">Ad</div>
                 <img src="https://via.placeholder.com/300x250/e1e1e1/999999?text=See+who's+hiring" className="mx-auto rounded-md" />
             </div>

          </div>
          </div>

       </main>
    </div>
  );
}