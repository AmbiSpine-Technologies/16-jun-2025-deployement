"use client";
import React, { useState } from "react";
import {
  Plus,
  Bell,
  MoreHorizontal,
  Calendar,
  Lock,
  Edit2,
  Mail,
  Users,
  TrendingUp,
  Settings,
  Search,
  Filter,
  MessageSquare,
  Share2,
  Bookmark,
  Flag,
  Eye,
} from "lucide-react";

export default function CommunityPagee() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [activeTab, setActiveTab] = useState("posts");
  const [sortBy, setSortBy] = useState("best");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [members] = useState(1234);
  const [online] = useState(89);

  const handleCreatePost = () => {
    if (postTitle.trim() || postContent.trim()) {
      const newPost = {
        id: Date.now(),
        title: postTitle,
        content: postContent,
        author: "jhdhsh",
        time: "Just now",
        upvotes: 1,
        comments: 0,
        views: 0,
      };
      setPosts([newPost, ...posts]);
      setPostTitle("");
      setPostContent("");
      setShowCreatePost(false);
    }
  };

  const handleUpvote = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
      )
    );
  };

  const handleDownvote = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, upvotes: post.upvotes - 1 } : post
      )
    );
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setBannerImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const sortOptions = [
    { value: "best", label: " Best", icon: TrendingUp },
    { value: "new", label: "🆕 New", icon: Calendar },
    { value: "top", label: "⬆️ Top", icon: TrendingUp },
    { value: "hot", label: "🔥 Hot", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div className="relative bg-white shadow-sm">
        <div
          className="h-40 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 relative group"
          style={{
            backgroundImage: bannerImage ? `url(${bannerImage})` : "",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <input
            type="file"
            id="banner-upload"
            className="hidden"
            accept="image/*"
            onChange={handleBannerUpload}
          />
          <label
            htmlFor="banner-upload"
            className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-lg cursor-pointer hover:bg-gray-50 transition-all hover:shadow-xl"
          >
            <Edit2 className="w-4 h-4 text-gray-700" />
          </label>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Profile Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between -mt-12 pb-4 gap-4">
            <div className="flex items-end gap-4">
              {/* Profile Image with hover effect */}
              <div className="relative group bottom-5">
                <div className="w-28 h-28 bg-white rounded-full border-4 border-white shadow-xl overflow-hidden ring-2 ring-gray-100">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
                      profile
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="profile-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfileUpload}
                />
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-1 right-1 bg-blue-600 p-2 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-all"
                >
                  <Edit2 className="w-3 h-3 text-white" />
                </label>
              </div>

              <div className="mb-2">
                <div className="flex items-center gap-2 pt-12">
                  <h1 className="text-3xl font-bold text-gray-900">
                    rshshhsjsjsjss
                  </h1>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                    ADMIN
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  Created by u/jhdhsh
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span className="font-semibold">
                      {members.toLocaleString()}
                    </span>
                    <span>members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-semibold">{online}</span>
                    <span>online</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-all">
                <Bell className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => setShowCreatePost(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all font-medium"
              >
                <Plus className="w-5 h-5 text-gray-800" />
                <span className="hidden text-gray-800 sm:inline">
                  Create Post
                </span>
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-md hover:shadow-lg">
                Mod Tools
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-all">
                <Settings className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex gap-6">
              {["posts", "about", "rules", "moderators"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-sm font-medium capitalize transition-all relative ${
                    activeTab === tab
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Posts Section */}
          <div className="flex-1">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search in rshshhsjsjsjss"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowSortMenu(!showSortMenu)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all font-medium"
                  >
                    <Filter className="w-4 h-4 text-gray-800" />
                    <span className="text-gray-800">
                      {sortOptions.find((opt) => opt.value === sortBy)?.label}
                    </span>
                  </button>

                  {showSortMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setShowSortMenu(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-all flex items-center gap-2 ${
                            sortBy === option.value
                              ? "bg-blue-50 text-blue-600"
                              : ""
                          }`}
                        >
                          <option.icon className="w-4 h-4" />
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Create Post Modal */}
            {showCreatePost && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Create a post
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Share something with the community
                    </p>
                  </div>
                  <div className="p-6">
                    <input
                      type="text"
                      placeholder="An interesting title..."
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                    />
                    <textarea
                      placeholder="What's on your mind? (optional)"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-4 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex justify-between items-center px-6 py-4 bg-gray-50 rounded-b-xl">
                    <p className="text-sm text-gray-500">
                      Posting as <span className="font-semibold">u/jhdhsh</span>
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowCreatePost(false)}
                        className="px-5 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-all font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCreatePost}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-md hover:shadow-lg"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Posts or Empty State */}
            {posts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  This community doesn't have any posts yet
                </h2>
                <p className="text-gray-600 mb-6">
                  Be the first to start a conversation!
                </p>
                <button
                  onClick={() => setShowCreatePost(true)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-md hover:shadow-lg inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Create Post
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all overflow-hidden"
                  >
                    <div className="flex gap-0">
                      {/* Voting Section */}
                      <div className="bg-gray-50 px-3 py-4 flex flex-col items-center gap-1">
                        <button
                          onClick={() => handleUpvote(post.id)}
                          className="text-gray-400 hover:text-orange-600 hover:bg-orange-50 p-1.5 rounded transition-all"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 4l8 8h-6v8h-4v-8H4z" />
                          </svg>
                        </button>
                        <span className="text-sm font-bold text-gray-900">
                          {post.upvotes}
                        </span>
                        <button
                          onClick={() => handleDownvote(post.id)}
                          className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 p-1.5 rounded transition-all"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 20l-8-8h6V4h4v8h6z" />
                          </svg>
                        </button>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 p-4">
                        <div className="flex items-center gap-2 text-xs text-gray-600 mb-2 flex-wrap">
                          <span className="font-semibold text-gray-900">
                            rshshhsjsjsjss
                          </span>
                          <span>•</span>
                          <span>
                            Posted by{" "}
                            <span className="hover:underline cursor-pointer">
                              u/{post.author}
                            </span>
                          </span>
                          <span>•</span>
                          <span>{post.time}</span>
                          <span className="flex items-center gap-1 ml-auto">
                            <Eye className="w-3 h-3" />
                            {post.views}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                          {post.title}
                        </h3>

                        {post.content && (
                          <p className="text-gray-700 mb-4 leading-relaxed">
                            {post.content}
                          </p>
                        )}

                        <div className="flex items-center gap-2 text-sm">
                          <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-all font-medium text-gray-600 hover:text-gray-900">
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.comments} Comments</span>
                          </button>
                          <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-all font-medium text-gray-600 hover:text-gray-900">
                            <Share2 className="w-4 h-4" />
                            <span>Share</span>
                          </button>
                          <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-all font-medium text-gray-600 hover:text-gray-900">
                            <Bookmark className="w-4 h-4" />
                            <span>Save</span>
                          </button>
                          <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-all font-medium text-gray-600 hover:text-gray-900 ml-auto">
                            <Flag className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Enhanced Sidebar */}
          <div className="w-80 space-y-4">
            {/* About Community Card */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3">
                <h3 className="font-bold text-white text-sm">
                  About Community
                </h3>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-gray-900 mb-2 text-lg">
                  rshshhsjsjsjss
                </h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Welcome to our community! Share, discuss, and connect with
                  others.
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Members</span>
                    <span className="font-bold text-gray-900">
                      {members.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Online</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-bold text-gray-900">{online}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 py-2">
                    <Calendar className="w-4 h-4" />
                    <span>Created Nov 24, 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 py-2">
                    <Lock className="w-4 h-4" />
                    <span>Private Community</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowCreatePost(true)}
                  className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium mb-3 shadow-sm hover:shadow-md"
                >
                  Update Community
                </button>

                <button className="w-full py-2.5 border-2 border-gray-200 rounded-lg text-gray-800 hover:bg-gray-50 transition-all font-medium flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4 text-gray-800" />
                  Community Guide
                </button>
              </div>
            </div>

            {/* Rules Card */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-bold text-gray-900 text-sm">
                  Community Rules
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {[
                  "Be respectful and civil",
                  "No spam or self-promotion",
                  "Stay on topic",
                  "No harassment or hate speech",
                ].map((rule, index) => (
                  <div key={index} className="flex gap-3 text-sm">
                    <span className="font-bold text-gray-400">
                      {index + 1}.
                    </span>
                    <span className="text-gray-700">{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Moderators Card */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Moderators
                </h3>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    J
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      u/jhdhsh
                    </p>
                    <p className="text-xs text-gray-500">Community Admin</p>
                  </div>
                </div>
                <button className="w-full py-2.5 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-all font-medium text-sm flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Message Mods
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
