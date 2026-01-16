
"use client"
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBookmarks, removeBookmark, toggleBookmark } from "../utils/bookmarksApi";
import { toast } from "react-toastify";
import Image from "next/image";
import { JobCard } from "../jobs/JobsCard";
import ItemsRight from "./ItemsRight";
import AdvertisementCard from "../components/AdvertisementCard";
import { Avatar } from "../components/common/Avatar"
import { Bookmark, MessageCircle, ThumbsUp, FolderHeart, 
  ChevronRight, Plus, Briefcase, FileText as PostIcon, ArrowLeft, 
  Folder,
  MoreHorizontal
} from "lucide-react";
import Dropdown, { SmartDropdown } from "../components/Dropdown";
import SaveItemsMenu from "./SaveitemsMenu";
import { handleGlobalAction } from "./handleActions";
import { Trash } from 'lucide-react';
import { useRouter } from "next/navigation";
import Modal from "../components/Modal";
import { FormInputField } from "../components/common/FormField/FormInputField";
/* ------------------ DUMMY DATA ------------------ */
const jobs = [
  { id: 1, title: "Frontend Developer", company: "Spreadnext", location: "Remote", matchScore: 92, jobType: "Full Time", workMode: "Remote", postedDate: "2 days ago", salary: "₹6–10 LPA", skills: ["React", "Next.js", "Tailwind"], description: "Looking for a React + Next.js developer.", companyLogo: "SN", companyColor: "bg-blue-600" },
  { id: 2, title: "UI Engineer", company: "PixelNova", location: "Bangalore", matchScore: 88, jobType: "Hybrid", workMode: "Hybrid", postedDate: "5 days ago", salary: "₹5–8 LPA", skills: ["HTML", "CSS", "JS"], description: "Design focused UI role.", companyLogo: "PN", companyColor: "bg-purple-600" },
];

const posts = [
  { id: 1, title: "How I cracked my first frontend job 🚀", content: "Sharing my journey...", authorName: "Rupendra Vishwakarma", authorAvatar: "/default-user-profile.svg", username: "rupendra_dev", timeAgo: "2h", likes: 128, comments: 24 },
  { id: 2, title: "React vs Next.js", content: "A breakdown of use-cases...", authorName: "Aman Sharma", authorAvatar: "/default-user-profile.svg", username: "aman.codes", timeAgo: "5h", likes: 89, comments: 16 },
];

const savedItems = [
  { id: "s1", type: "job", data: jobs[0] },
  { id: "s2", type: "post", data: posts[0] },
];

export default function Page() {
  const { currentUser } = useSelector((state) => state.users);
  const tabs = ["Saved", "Collections", "Jobs", "Post"];
  const [activeTab, setActiveTab] = useState("Saved");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

const handleCreateCollection = (e) => {
  e.preventDefault();
  const name = newFolderName.trim();

  // Error 1: Input khali hai
  if (!name) {
    setError("Please enter a collection name.");
    return;
  }

  // Error 2: Folder pehle se exist karta hai (Already exists check)
  const isDuplicate = collections.some(
    (f) => f.name.toLowerCase() === name.toLowerCase()
  );

  if (isDuplicate) {
    setError("A collection with this name already exists.");
    return;
  }

  // Agar sab sahi hai toh save karein
  const newFolder = {
    id: Date.now(),
    name: name,
    items: [],
  };

  setCollections([...collections, newFolder]);
  setNewFolderName("");
  setError(""); // Reset error
  setIsModalOpen(false);
};

  const [collections, setCollections] = useState([
    { id: 1, name: "General", items: [] }
  ]);

  const [directSaved, setDirectSaved] = useState({
    system_saved: [],
    system_jobs: [],
    system_post: [],
  });

  // Fetch bookmarks from API
  useEffect(() => {
    const fetchBookmarksData = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const result = await getBookmarks({ page: 1, limit: 100 });
        if (result.success && result.data) {
          // Transform backend bookmarks to frontend format
          const transformedItems = result.data.map(bookmark => ({
            id: bookmark._id || bookmark.id,
            type: bookmark.itemType || bookmark.type || 'job',
            data: bookmark.item || bookmark.itemData || {},
            createdAt: bookmark.createdAt || new Date().toISOString(),
            collectionId: bookmark.collectionId || null,
          }));

          // Separate by type
          const jobs = transformedItems.filter(item => item.type === 'job');
          const posts = transformedItems.filter(item => item.type === 'post');
          const allSaved = transformedItems;

          setDirectSaved({
            system_saved: allSaved,
            system_jobs: jobs,
            system_post: posts,
          });

          // Load collections from localStorage (collections are frontend-only feature)
          const savedCollections = localStorage.getItem("user_collections");
          if (savedCollections) {
            try {
              const parsed = JSON.parse(savedCollections);
              if (Array.isArray(parsed) && parsed.length > 0) {
                setCollections(parsed);
              }
            } catch (e) {
              console.error("Error parsing collections:", e);
            }
          }
        } else {
          toast.error(result.message || "Failed to fetch bookmarks");
        }
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
        toast.error("Failed to load saved items");
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarksData();
  }, [currentUser]);
  
  const ads = [{ companyName: "Spreadnext India", tagline: "Where Community meets Careers.", logo: "https://img.icons8.com/color/96/company.png", link: "https://google.com" }];

  const removeCollection = (id) => {
    if(confirm("Are you sure you want to delete this folder?")) {
      setCollections(prev => prev.filter(f => f.id !== id));
    }
  };
  
const allSavedItems = Object.values(directSaved).flat();

const sidebarStats = {
  // Ab filter kaam karega kyunki allSavedItems ek Array hai
  jobs: allSavedItems.filter(i => i.type === 'job').length,
  posts: allSavedItems.filter(i => i.type === 'post').length,
  collections: collections.length
};


  const getActiveItems = () => {
    if (activeTab === "Saved") {
      return directSaved.system_saved || [];
    }
    
    if (activeTab === "Jobs") {
      return directSaved.system_jobs || [];
    }
    
    if (activeTab === "Post") {
      return directSaved.system_post || [];
    }
    
    return [];
  };
  const activeItems = getActiveItems();


  return (
    <div className="bg-[#FAFAFA] mt-10 pt-10">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="flex gap-6">
          <div className="flex-1">
            {/* TABS NAVIGATION */}
            <div className="flex bg-white overflow-hidden rounded-2xl border mb-3 border-[#cccccc] p-1 gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setSelectedFolder(null); }}
                  className={`flex-1 px-3 py-3 hover:cursor-pointer text-sm font-medium transition-colors ${
                    activeTab === tab ? "text-blue-600 border-b-2 -mb-[4px] border-blue-600" : "text-gray-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* MAIN CONTENT CONTAINER */}
            <div className="bg-white border  rounded-4xl h-[calc(100vh-160px)] px-6 pt-4 custom-scroll overflow-y-auto  border-[#cccccc]
  border-b-0
  overflow-hidden
  rounded-bl-none
  rounded-br-none ">
              
              {/* 1. RENDER COLLECTIONS (Independent of activeItems) */}
              {activeTab === "Collections" ? (
                <div>
                  {selectedFolder ? (
                    <div className="space-y-4 pb-10">
                      <div className="flex items-center gap-4 mb-6">
                        <button onClick={() => setSelectedFolder(null)} className="p-2 hover:bg-gray-100 hover:cursor-pointer rounded-full"><ArrowLeft size={20} className="text-gray-600" /></button>
                        <h2 className="text-2xl font-bold text-gray-700">{selectedFolder.name}</h2> 
                      </div>
                      {selectedFolder.items.length === 0 ? (
                        <div className="py-20 text-center text-gray-400">Empty Collection</div>
                      ) : (
                        selectedFolder.items.map(item => (
                          item.type === 'job' ? <JobCard key={item.id} job={item.data} showSaveMenu={true} /> : <PostCard key={item.id} post={item.data} />
                        ))
                      )}
           
                    </div>
                  ) : (
                    <div className=" pb-10">
                      {collections.map(folder => (
                        <div key={folder.id} onClick={() => setSelectedFolder(folder)} className="group my-2 bg-white border border-gray-200 rounded-3xl p-5  transition-all cursor-pointer">
                          <div className="flex items-center  justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <div className=" transition-colors"><Folder size={24} className="text-gray-600" /></div>
                              <div><h4 className="font-bold text-gray-700">{folder.name}</h4><p className="text-xs text-gray-500">{folder.items.length} items</p></div>
                            </div>
                            <div className="flex gap-2 items-start justify-end">
                                        <button 
                          onClick={(e) => { e.stopPropagation();  removeCollection(folder.id); }}
                          className=" text-gray-700 hover:cursor-pointer "
                        >
                          <Trash size={18} />
                        </button>

                            <ChevronRight size={18} className="text-gray-500" />

                            </div>

                          </div>
                          
                        </div>
                      ))}
                   
                    </div>
                  )}
                </div>
              ) : (
                /* 2. RENDER OTHER TABS (Saved, Jobs, Posts) */
                activeItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <Image src="/nothingillustrator.svg" alt="No data" width={220} height={220} />
                    <h3 className="text-xl font-semibold text-gray-900 mt-4">No {activeTab} yet</h3>
                  </div>
                ) : (
                  <div className="space-y-3 pb-10">
               

                    {activeItems?.map((item) => {
  if (activeTab === "Saved") {
    if (item.type === "job") {
      return (
        <JobCard
          key={item.id}
          job={item.data}
          showSaveMenu={true}
          setCollections={setCollections}
        />
      );
    }

    return (
      <PostCard
        key={item.id || `${item.id}`}
        post={item.data}
        setCollections={setCollections}

      />
    );
  }

  if (activeTab === "Jobs") {
    return (
      <JobCard
        key={item.id}
        job={item}
        showSaveMenu={false}
        setCollections={setCollections}
      />
    );
  }

  return (
    <PostCard
      key={item.id}
      post={item}
      setCollections={setCollections}

    />
  );
})}

                  </div>
                )
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-[30%] mt-12 space-y-3">
            {/* <ItemsRight 
    stats={sidebarStats} 
    onCreateList={handleCreateNewList} 
  /> */}
  <ItemsRight 
  stats={sidebarStats} 
  onCreateList={() => setIsModalOpen(true)} // Modal open karein
/>
            {ads.map((ad, i) => <AdvertisementCard key={i} {...ad} />)}
          </div>
        </div>
      </div>

<Modal
  show={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="List Name"
  bodycenter="!items-center !mt-0"
  widthClass="!w-[450px]"
>
 <form onSubmit={handleCreateCollection} className="space-y-4 pb-6">
  <div className="space-y-1">
    <FormInputField
      placeholder="List Name"
      autoFocus
      value={newFolderName}
      onChange={(e) => {
        setNewFolderName(e.target.value);
        if (error) setError(""); // Typing karte hi error gayab ho jaye
      }}
      // FormInputField mein error pass karein
      error={error} 
      touched={true}
    />
  </div>

  <button
    type="submit"
    
    className={`flex-1 w-full px-4 py-3 rounded-full transition font-bold text-sm shadow-md bg-blue-700 text-white hover:cursor-pointer`}
  >
    Create New List
  </button>
</form>
</Modal>

    </div>
  );
}




function PostCard({ post, saved = [], onSave, setCollections }) {
  const router = useRouter();

  return (
    <div className="border p-4 rounded-xl border-[#cccccc] bg-white hover:shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center gap-3 mb-3">
        <div className="flex items-center gap-3 ">
       <Avatar name={post.authorName} src={post.authorAvatar} username={post.username} size="lg" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{post.authorName}</p>
          <p className="text-xs text-gray-500">@{post.username || 'user'}</p>
        </div>
        </div>

<div className="relative">
          <Dropdown
            button={
              <button className="p-2 rounded-full hover:bg-gray-100">
                <MoreHorizontal size={18} className="text-gray-600"/>
              </button>
            }
            className="right-0 top-0 w-56 border border-[#cccccc] rounded-sm shadow-sm overflow-hidden"
          >
            {/* 🔥 YAHAN CHANGE HAI: Function wrap karein */}
            {({ close }) => (
              <SaveItemsMenu
                type="post"
                item={post}
                close={close} // Ab ye function hai
                onAction={(actionType, data) => 
                  handleGlobalAction(actionType, data, "post", { setCollections, router })
                }
              />
            )}
          </Dropdown>
        </div>


      </div>
      <h3 className="font-semibold text-base text-gray-800 mb-2 line-clamp-2">{post.title}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.content}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><ThumbsUp size={14} /> {post.likes || 0}</span>
          <span className="flex items-center gap-1"><MessageCircle size={14} /> {post.comments || 0}</span>
        </div>
        <Bookmark className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
}