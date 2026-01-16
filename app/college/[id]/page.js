"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
   MapPin, Building2, CheckCircle, Send, Plus, Globe, Phone, Mail,
   Calendar, Users, BookOpen, Award, TrendingUp, Briefcase, UserPlus,
   BarChart3, FileText, Edit3, Trash2, Heart, MessageCircle, Share2,
   ExternalLink, ArrowRight,
   LayoutDashboard,
   NotebookText
} from 'lucide-react';

export default function CollegeProfilePage() {
   const [activeTab, setActiveTab] = useState('Overview');
   const [isFollowing, setIsFollowing] = useState(false);
   const [showMessage, setShowMessage] = useState(false);
   const [message, setMessage] = useState('');
   const [showCreatePost, setShowCreatePost] = useState(false);
   const [newPostContent, setNewPostContent] = useState('');

   const [data, setData] = useState(null);

   const [feeds, setFeeds] = useState([
      {
         id: 1,
         content: "We're excited to announce our new AI & Machine Learning Center of Excellence! Applications for research positions are now open.",
         timestamp: "2 hours ago",
         likes: 45,
         comments: 12,
         shares: 8,
         liked: false
      },
      {
         id: 2,
         content: "Campus placement drive completed successfully! 95% students placed in top companies including Microsoft, Google, and Amazon.",
         timestamp: "1 day ago",
         likes: 128,
         comments: 34,
         shares: 22,
         liked: false
      },
      {
         id: 3,
         content: "Registration for Annual Tech Fest 'Technovate 2026' is now live! Don't miss out on workshops, competitions, and networking opportunities.",
         timestamp: "3 days ago",
         likes: 89,
         comments: 18,
         shares: 45,
         liked: false
      }
   ]);

   // College data - APS University
   const collegeData = {
      name: "APS University",
      tagline: "Excellence in Education & Innovation",
      type: "Private University",
      city: "Rewa, Madhya Pradesh",
      established: "2011",
      isVerified: true,
      website: "https://www.apsuniversity.ac.in",
      phone: "+91-7662-230000",
      email: "info@apsuniversity.ac.in",
      about: "APS University, established in 2011, is a leading private university in Madhya Pradesh committed to providing quality education in Engineering, Management, Pharmacy, and other professional courses. With state-of-the-art infrastructure and experienced faculty, we focus on holistic development of students preparing them for successful careers and meaningful contributions to society.",
      jobs: [
         { id: 1, title: "Software Development Engineer", company: "Microsoft", type: "Full-time", posted: "3 days ago", location: "Bangalore" },
         { id: 2, title: "Data Scientist Intern", company: "Google", type: "Internship", posted: "1 week ago", location: "Hyderabad" },
         { id: 3, title: "Research Associate", company: "APS University", type: "Full-time", posted: "2 weeks ago", location: "Rewa" },
         { id: 4, title: "Business Analyst", company: "Deloitte", type: "Full-time", posted: "3 weeks ago", location: "Mumbai" }
      ],
      people: [
         { id: 1, name: "Dr. Rajesh Kumar", role: "Director", department: "Administration" },
         { id: 2, name: "Prof. Priya Sharma", role: "HOD", department: "Computer Science" },
         { id: 3, name: "Prof. Amit Verma", role: "Dean", department: "Academic Affairs" },
         { id: 4, name: "Dr. Sneha Patel", role: "HOD", department: "Management Studies" }
      ]
   };

   const params = useParams();

   useEffect(() => {
      if (!params?.id) return;

      const saved = localStorage.getItem(params.id);
      if (saved) {
         setData(JSON.parse(saved));
      }
   }, [params?.id]);

   /* ✅ RETURN AFTER ALL HOOKS */
   if (!data) {
      return (
         <div className="h-screen flex items-center justify-center">
            Loading Institute...
         </div>
      );
   }

   /* ---------- HANDLERS ---------- */
   const handleFollow = () => {
      setIsFollowing(!isFollowing);
   };

   const handleSendMessage = () => {
      if (message.trim()) {
         alert(`Message sent to ${collegeData.name}:\n\n"${message}"`);
         setMessage('');
         setShowMessage(false);
      }
   };

   const handleCreatePost = () => {
      if (newPostContent.trim()) {
         const newPost = {
            id: feeds.length + 1,
            content: newPostContent,
            timestamp: "Just now",
            likes: 0,
            comments: 0,
            shares: 0,
            liked: false
         };
         setFeeds([newPost, ...feeds]);
         setNewPostContent('');
         setShowCreatePost(false);
      }
   };

   const handleLike = (postId) => {
      setFeeds(feeds.map(post => {
         if (post.id === postId) {
            return {
               ...post,
               liked: !post.liked,
               likes: post.liked ? post.likes - 1 : post.likes + 1
            };
         }
         return post;
      }));
   };

   const handleDeletePost = (postId) => {
      if (confirm('Are you sure you want to delete this post?')) {
         setFeeds(feeds.filter(post => post.id !== postId));
      }
   };

   // const handleDashboardClick = () => {
   //   window.location.href = 'https://spreadnextdashboard.vercel.app/collegedashboard';
   // };

   // OVERVIEW TAB - Everything visible in single page
   const renderOverviewTab = () => (
      <div className="space-y-4">
         {/* About Section */}
         <div className="bg-white rounded-xl border border-gray-300 p-6 ">
            <h2 className="text-lg font-bold text-gray-900 mb-4">About</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
               {collegeData.about}
            </p>
         </div>

         {/* Recent Posts */}
         <div className="bg-white rounded-xl border border-gray-300 p-6 ">
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-bold text-gray-900">Recent Posts</h2>
               <button
                  onClick={() => setActiveTab('Posts')}
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
               >
                  View all <ArrowRight size={16} />
               </button>
            </div>
            <div className="space-y-3">
               {feeds.slice(0, 2).map(post => (
                  <div key={post.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                     <h3 className="font-semibold text-gray-900 text-sm mb-1">{post.content.substring(0, 100)}...</h3>
                     <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                        <span>{post.timestamp}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                           <TrendingUp size={12} /> {post.likes} reactions
                        </span>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Jobs Overview */}
         <div className="bg-white rounded-xl border border-gray-300 p-6 ">
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-bold text-gray-900">Latest Job Opportunities</h2>
               <button
                  onClick={() => setActiveTab('Jobs')}
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
               >
                  View all <ArrowRight size={16} />
               </button>
            </div>
            <div className="space-y-3">
               {collegeData.jobs.slice(0, 3).map(job => (
                  <div key={job.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                     <h3 className="font-bold text-gray-900 text-sm mb-1">{job.title}</h3>
                     <p className="text-sm text-gray-600 mb-2">{job.company} • {job.location}</p>
                     <div className="flex items-center gap-3 text-xs">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded font-semibold">
                           {job.type}
                        </span>
                        <span className="text-gray-500">{job.posted}</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* People Overview */}
         <div className="bg-white rounded-xl border border-gray-300 p-6 ">
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-bold text-gray-900">Key People</h2>
               <button
                  onClick={() => setActiveTab('People')}
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
               >
                  View all <ArrowRight size={16} />
               </button>
            </div>
            <div className="space-y-3">
               {collegeData.people.slice(0, 3).map(person => (
                  <div key={person.id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                     <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {person.name.split(' ').map(n => n[0]).join('')}
                     </div>
                     <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-sm">{person.name}</h3>
                        <p className="text-xs text-gray-600">{person.role} • {person.department}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );

   // ABOUT TAB
   const renderAboutTab = () => (
      <div className="bg-white rounded-xl border border-gray-300 p-6 ">
         <h2 className="text-lg font-bold text-gray-900 mb-4">About {collegeData.name}</h2>
         <p className="text-sm text-gray-700 leading-relaxed mb-6">
            {collegeData.about}
         </p>

         <div className="space-y-4 pt-6 border-t border-gray-200">
            <div className="flex items-start gap-3">
               <Globe size={20} className="text-blue-600 mt-1" />
               <div>
                  <p className="text-sm font-semibold text-gray-900">Website</p>
                  <a href={collegeData.website} className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                     {collegeData.website} <ExternalLink size={12} />
                  </a>
               </div>
            </div>
            <div className="flex items-start gap-3">
               <Phone size={20} className="text-blue-600 mt-1" />
               <div>
                  <p className="text-sm font-semibold text-gray-900">Phone</p>
                  <p className="text-sm text-gray-700">{collegeData.phone}</p>
               </div>
            </div>
            <div className="flex items-start gap-3">
               <Mail size={20} className="text-blue-600 mt-1" />
               <div>
                  <p className="text-sm font-semibold text-gray-900">Email</p>
                  <p className="text-sm text-gray-700">{collegeData.email}</p>
               </div>
            </div>
            <div className="flex items-start gap-3">
               <MapPin size={20} className="text-blue-600 mt-1" />
               <div>
                  <p className="text-sm font-semibold text-gray-900">Location</p>
                  <p className="text-sm text-gray-700">{collegeData.city}</p>
               </div>
            </div>
            <div className="flex items-start gap-3">
               <Calendar size={20} className="text-blue-600 mt-1" />
               <div>
                  <p className="text-sm font-semibold text-gray-900">Established</p>
                  <p className="text-sm text-gray-700">{collegeData.established}</p>
               </div>
            </div>
         </div>
      </div>
   );

   // POSTS TAB
   const renderPostsTab = () => (
      <div className="space-y-4">
         {/* Create Post Card */}
         {/* <div className="bg-white rounded-xl border border-gray-300 p-4 "> */}
            {/* {!showCreatePost ? ( */}
               {/* <button
                  onClick={() => setShowCreatePost(true)}
                  className="w-full flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-left"
               >
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                     {collegeData.name.charAt(0)}
                  </div>
                  <span className="text-gray-500">Share an update with your followers...</span>
               </button> */}
            {/* ) : (
               <div>
                  <textarea
                     value={newPostContent}
                     onChange={(e) => setNewPostContent(e.target.value)}
                     placeholder="What do you want to share with your followers?"
                     className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                     rows="4"
                  />
                  <div className="flex gap-2 mt-3">
                     <button
                        onClick={handleCreatePost}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                     >
                        Post
                     </button>
                     <button
                        onClick={() => {
                           setShowCreatePost(false);
                           setNewPostContent('');
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 transition"
                     >
                        Cancel
                     </button>
                  </div>
               </div>
            )} */}
         {/* </div> */}

         {/* Feed Posts */}
         {feeds.map(post => (
            <div key={post.id} className="bg-white rounded-xl border border-gray-300 shadow-sm">
               <div className="p-4">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-3">
                     <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                           {collegeData.name.charAt(0)}
                        </div>
                        <div>
                           <h3 className="font-bold text-gray-900 flex items-center gap-1">
                              {collegeData.name}
                              {collegeData.isVerified && <CheckCircle size={16} className="text-blue-600 fill-blue-600" />}
                           </h3>
                           <p className="text-xs text-gray-500">{post.timestamp}</p>
                        </div>
                     </div>
                     <button
                        onClick={() => handleDeletePost(post.id)}
                        className="text-gray-400 hover:text-red-600 transition"
                     >
                        <Trash2 size={18} />
                     </button>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                     {post.content}
                  </p>

                  {/* Engagement Stats */}
                  <div className="flex items-center gap-4 py-2 border-t border-b border-gray-200 text-xs text-gray-500">
                     <span>{post.likes} likes</span>
                     <span>{post.comments} comments</span>
                     <span>{post.shares} shares</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-around pt-2">
                     <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${post.liked
                           ? 'text-red-600 hover:bg-red-50'
                           : 'text-gray-600 hover:bg-gray-100'
                           }`}
                     >
                        <Heart size={18} className={post.liked ? 'fill-red-600' : ''} />
                        Like
                     </button>
                     <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition">
                        <MessageCircle size={18} />
                        Comment
                     </button>
                     <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition">
                        <Share2 size={18} />
                        Share
                     </button>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );

   // JOBS TAB
   const renderJobsTab = () => (
      <div className="bg-white rounded-xl border border-gray-300 p-6 shadow-sm">
         <h2 className="text-lg font-bold text-gray-900 mb-4">Job Opportunities</h2>
         <div className="space-y-3">
            {collegeData.jobs.map(job => (
               <div key={job.id} className="p-5 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                  <h3 className="font-bold text-gray-900 mb-1">{job.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{job.company} • {job.location}</p>
                  <div className="flex items-center gap-3 text-xs">
                     <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded font-semibold">
                        {job.type}
                     </span>
                     <span className="text-gray-500">{job.posted}</span>
                  </div>
                  <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-semibold">
                     View Details →
                  </button>
               </div>
            ))}
         </div>
      </div>
   );

   // PEOPLE TAB
   const renderPeopleTab = () => (
      <div className="bg-white rounded-xl border border-gray-300 p-6 shadow-sm">
         <h2 className="text-lg font-bold text-gray-900 mb-4">Key People</h2>
         <div className="space-y-3">
            {collegeData.people.map(person => (
               <div key={person.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                     {person.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                     <h3 className="font-bold text-gray-900 text-sm">{person.name}</h3>
                     <p className="text-xs text-gray-600">{person.role} • {person.department}</p>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                     Connect
                  </button>
               </div>
            ))}
         </div>
      </div>
   );

   return (
      <div className="min-h-screen bg-[#fafafa] font-sans">


         {/* CONTENT */}
         <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6 mt-15">
            {/* LEFT: MAIN PROFILE */}
            <div className="lg:col-span-3 space-y-4">
               {/* HERO CARD */}
               <div className="bg-white rounded-xl border border-[#dbdbdb] overflow-hidden">
                  <div className="h-48 bg-[#fafafa] border border-[#dbdbdb] rounded-xl relative"></div>

                  <div className="px-6 pb-6 pt-0 relative">
                     <div className="-mt-16 mb-4 inline-block">
                        <div className="w-32 h-32 bg-white rounded-lg border border-[#dbdbdb] flex items-center justify-center">
                           <Building2 size={40} className="text-blue-600" />
                        </div>
                     </div>

                     <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div>
                           <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                              {collegeData.name}
                              {collegeData.isVerified && <CheckCircle size={20} className="text-blue-600 fill-blue-600" />}
                           </h1>
                           <p className="text-gray-900 mt-1 font-medium">{collegeData.tagline}</p>

                           <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                 <Building2 size={14} /> {collegeData.type}
                              </span>
                              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                              <span className="flex items-center gap-1">
                                 <MapPin size={14} /> {collegeData.city}
                              </span>
                              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                              <span className="text-blue-600 font-semibold">Est. {collegeData.established}</span>
                           </div>

                           <div className="flex items-center gap-2 mt-4">
                              <button
                                 onClick={handleFollow}
                                 className={`px-6 py-2 rounded-full font-semibold transition flex items-center gap-1 ${isFollowing
                                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                              >
                                 {isFollowing ? (
                                    <>
                                       <CheckCircle size={16} />
                                       Following
                                    </>
                                 ) : (
                                    <>
                                       <Plus size={16} />
                                       Follow
                                    </>
                                 )}
                              </button>

                              <button
                                 onClick={() => setShowMessage(!showMessage)}
                                 className="flex gap-1 border border-blue-600 text-blue-600 px-3 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition"
                              >
                                 <Send size={16} />
                                 Message
                              </button>
                           </div>

                           {showMessage && (
                              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                 <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your message here..."
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="3"
                                 />
                                 <div className="flex gap-2 mt-2">
                                    <button
                                       onClick={handleSendMessage}
                                       className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                                    >
                                       Send
                                    </button>
                                    <button
                                       onClick={() => {
                                          setShowMessage(false);
                                          setMessage('');
                                       }}
                                       className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 transition"
                                    >
                                       Cancel
                                    </button>
                                 </div>
                              </div>
                           )}
                        </div>
                     </div>

                     {/* TABS */}
                     <div className="mt-8 border-t border-gray-200">
                        <div className="flex gap-8 overflow-x-auto">
                           {['Overview', 'About', 'Posts', 'Jobs', 'People', ].map((tab) => (
                              <button
                                 key={tab}
                                 // onClick={() => {
                                 //    if (tab === 'Dashboard') {
                                 //       handleDashboardClick();
                                 //    } else {
                                 //       setActiveTab(tab);
                                 //    }

                                 onClick={() => {
                                    setActiveTab(tab);
                                    
                                 }}
                                 className={`py-3 text-sm font-semibold border-b-[3px] whitespace-nowrap transition ${activeTab === tab
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-800'
                                    }`}
                              >
                                 {tab}
                              </button>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>

               {/* TAB CONTENT */}
               {activeTab === 'Overview' && renderOverviewTab()}
               {activeTab === 'About' && renderAboutTab()}
               {activeTab === 'Posts' && renderPostsTab()}
               {activeTab === 'Jobs' && renderJobsTab()}
               {activeTab === 'People' && renderPeopleTab()}
            </div>

            {/* RIGHT: SIDEBAR */}
            <div className="space-y-4">
               {/* <div className="bg-white rounded-xl border border-gray-300 p-4 "> */}
                  {/* <h3 className="text-sm font-bold text-gray-900 mb-3 border-b pb-2">Institute Admin</h3>
                  <p className="text-xs text-gray-500 mb-3">Manage your college profile, admissions, and job postings.</p> */}
                  {/* <button
                     onClick={handleDashboardClick}
                     className="flex gap-2 w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition"
                  >
                     <LayoutDashboard size={16} />   Dashboard
                  </button> */}
                  {/* <button className="flex gap-2 w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition">
                     <Briefcase size={16} />    Post a Job / Internship
                  </button>
                  <button className="flex gap-2 w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition">
                     <NotebookText size={16} />  Manage Admissions
                  </button> */}
               {/* </div> */}

               <div className="bg-white rounded-xl border border-gray-300 p-4 ">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">Profile Views</h3>
                  <div className="space-y-2 text-sm">
                     <div className="flex justify-between items-center">
                        <span className="text-gray-600">Last 7 days</span>
                        <span className="font-bold text-gray-900">142</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-gray-600">Last 30 days</span>
                        <span className="font-bold text-gray-900">1,234</span>
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </div>
   );
}