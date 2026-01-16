"use client";

import { useState } from "react";
import { Heart, MessageCircle, Repeat2, Bookmark } from "lucide-react";
import BackButton from "@/app/components/button/BackButton";

/* ================= DUMMY DATA - Same as PinnedPosts ================= */
const ALL_POSTS = [
  {
    id: 1,
    activity: "Posts",
    date: "2024-12-28",
    user: { name: "Prabha Shrinivasan", role: "Content Writer | SEO", avatar: null },
    title: "Happiness Is the Key Achievement of Life",
    description:
      "In every age, from the ancient Vedic seekers who walked barefoot across forests, to the modern builders who code beneath the glow of blue screens, the truth has remained quietly undefeated: we are all searching for happiness.",
    images: ["/post1.jpg", "/post2.jpg"],
    stats: { likes: "1.2k", comments: "12k", reposts: "1.2k" },
  },
  {
    id: 2,
    activity: "Posts",
    date: "2024-12-27",
    user: { name: "Prabha Shrinivasan", role: "Content Writer | SEO", avatar: null },
    title: "Happiness Is the Key Achievement of Life",
    description:
      "In every age, from the ancient Vedic seekers who walked barefoot across forests, to the modern builders who code beneath the glow of blue screens, the truth has remained quietly undefeated: we are all searching for happiness.",
    images: ["/post3.jpg", "/post4.jpg"],
    stats: { likes: "1.2k", comments: "12k", reposts: "1.2k" },
  },
  {
    id: 3,
    activity: "Posts",
    date: "2024-12-26",
    user: { name: "Amit Kumar", role: "Designer", avatar: null },
    title: "Design Thinking in Modern World",
    description: "Design is not just what it looks like and feels like. Design is how it works.",
    images: ["/post9.jpg"],
    stats: { likes: "890", comments: "67", reposts: "234" },
  },
  {
    id: 4,
    activity: "tagged",
    date: "2024-12-25",
    user: { name: "Rajesh Kumar", role: "Software Engineer", avatar: null },
    title: "Tagged in Amazing Project",
    description: "Just got tagged in this amazing collaborative project! Excited to be part of this journey.",
    images: ["/post5.jpg"],
    stats: { likes: "850", comments: "45", reposts: "120" },
  },
  {
    id: 5,
    activity: "Media",
    date: "2024-12-24",
    user: { name: "Priya Sharma", role: "Photographer", avatar: null },
    title: "Beautiful Sunset Captured",
    description: "Captured this breathtaking sunset yesterday. Nature never fails to amaze!",
    images: ["/post6.jpg", "/post7.jpg", "/post8.jpg"],
    stats: { likes: "2.5k", comments: "180", reposts: "450" },
  },
  {
    id: 6,
    activity: "Media",
    date: "2024-12-23",
    user: { name: "Neha Verma", role: "Travel Blogger", avatar: null },
    title: "Mountain Adventure",
    description: "The mountains are calling and I must go!",
    images: ["/post10.jpg", "/post11.jpg"],
    stats: { likes: "1.8k", comments: "95", reposts: "320" },
  },
  {
    id: 7,
    activity: "reposted",
    date: "2024-12-22",
    user: { name: "Amit Patel", role: "Product Manager", avatar: null },
    title: "Re: Product Launch Strategy",
    description: "Great insights on the product launch! I think we should also consider the user feedback from beta testing phase.",
    images: [],
    stats: { likes: "320", comments: "67", reposts: "45" },
  },
  {
    id: 8,
    activity: "reposted",
    date: "2024-12-21",
    user: { name: "Sanjay Singh", role: "Developer", avatar: null },
    title: "Re: Code Review Comments",
    description: "Thanks for the detailed review! I've implemented the suggested changes.",
    images: [],
    stats: { likes: "156", comments: "23", reposts: "12" },
  },
];

const TEXT_LIMIT = 150;

export default function ActivityPage() {
  // In real app: const { type } = useParams();
  // For demo, using state
  const [activeTab, setActiveTab] = useState("all");
  const [expanded, setExpanded] = useState({});

  // Tab Config
  const tabs = [
    { key: "all", label: "Posts" },
    { key: "tagged", label: "Tagged" },
    { key: "media", label: "Media" },
    { key: "reposted", label: "Reposted" },
  ];

  // Filter Data - matching your logic
  let items = [...ALL_POSTS];
  if (activeTab !== "all") {
    const activityMap = {
      all: "Posts",
      tagged: "tagged",
      media: "Media",
      reposted: "Reposted",
    };
    items = items.filter((p) => p.activity === activityMap[activeTab]);
  }

  // Recent → Old
  items.sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleAction = (type, postId) => {
    console.log(type, postId);
  };

  const toggleExpand = (id) => {
    setExpanded((p) => ({ ...p, [id]: !p[id] }));
  };

  return (
    //  <div className=" pt-10 mt-10 bg-[#fafafa] font-roboto">
    <div className="max-w-7xl mx-auto px-4 pt-10 mt-10 bg-[#fafafa] font-roboto">
      <div className="mx-4 my-2 sticky z-30">
        <BackButton />
      </div>

      <div className="flex flex-col px-4 md:px-10 lg:px-16 mt-4 md:flex-row lg:gap-16 lg:flex-row gap-10">
        {/* LEFT SECTION */}
        <div className="w-full md:w-2/3 lg:w-3/4 ">
          {/* <h1 className="text-2xl font-bold text-black mb-6">Activity</h1> */}

          {/* Tabs */}
          <div className="flex mb-3  flex-wrap border border-[#cccccc] rounded-xl justify-between items-center z-30 sticky bg-white">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-2 transition ${activeTab === tab.key
                  ? "text-black font-medium rounded-xl"
                  : "text-gray-800 hover:text-black "
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          {items.length > 0 ? (
            <div className="grid grid-cols-1 p-4 gap-4 border border-[#cccccc] rounded-2xl custom-scroll overflow-hidden">
              {items.map(({ id, user, title, description, images, stats }) => {
                const isExpanded = expanded[id];
                const isLong = description.length > TEXT_LIMIT;

                return (
                  <article
                    key={id}
                    className="bg-white p-4 flex flex-col gap-4 border-b border-[#cccccc]"
                  >
                    {/* User */}
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="rounded-full"
                          />
                        ) : (
                          <span className="text-sm font-medium text-gray-300">
                            {user.name[0]}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-black">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.role}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-sm">
                      <p className="font-medium text-black mb-2">{title}</p>
                      <p
                        className={`text-sm text-gray-600 ${!isExpanded && "line-clamp-3"
                          }`}
                      >
                        {description}
                      </p>

                      {isLong && (
                        <button
                          onClick={() => toggleExpand(id)}
                          className="text-xs font-medium mt-2 text-blue-400 hover:text-blue-300"
                        >
                          {isExpanded ? "Show less" : "...more"}
                        </button>
                      )}
                    </div>

                    {/* Media */}
                    {images.length > 0 && (
                      <div className="grid grid-cols-2 gap-3">
                        {images.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt="post media"
                            className="h-48 w-full rounded-xl object-cover border border-[#aeadad]"
                          />
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-between items-center text-xs text-gray-500 pt-2">
                      <div className="flex gap-4">
                        <button onClick={() => handleAction("like", id)} className="flex gap-1 items-center hover:text-gray-700">
                          <Heart size={14} /> {stats.likes}
                        </button>
                        <button onClick={() => handleAction("comment", id)} className="flex gap-1 items-center hover:text-gray-700">
                          <MessageCircle size={14} /> {stats.comments}
                        </button>
                        <button onClick={() => handleAction("repost", id)} className="flex gap-1 items-center hover:text-gray-700">
                          <Repeat2 size={14} /> {stats.reposts}
                        </button>
                      </div>

                      <button onClick={() => handleAction("bookmark", id)} className="hover:text-gray-700">
                        <Bookmark size={14} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-12">No activity found.</p>
          )}
        </div>

        {/* RIGHT SECTION */}
        <div className="mt-10 md:block w-full lg:max-w-[35%] mx-auto space-y-4 p-4">
          <div className="bg-[#fff] p-5 rounded-2xl border border-[#dbdbdb] text-gray-600 sticky top-6">
            <h3 className="text-lg font-semibold text-black mb-4">
              Suggested for you
            </h3>
            <p className="text-sm">
              Discover profiles, trends, and content tailored to your interests.
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-black">User Name</p>
                  <p className="text-xs text-gray-400">Software Engineer</p>
                </div>
                <button className="text-xs px-3 py-1 bg-blue-600 text-black rounded-full hover:bg-blue-700">
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}