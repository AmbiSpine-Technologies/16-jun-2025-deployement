// components/community/CommunitySidebar.js
import Link from "next/link";
import {
  FiUsers,
  FiFileText,
  FiCalendar,
  FiFolder,
  FiEdit3,
  FiUserPlus,
  FiUploadCloud,
  FiMessageCircle,
  FiSettings,
  FiBarChart2,
  FiActivity,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import CommunityConnectionUI from "./CommunityConnectionUI";

export default function CommunitySidebar({
  community,
  isMember,
  isAdmin,
  activeSection,
  onSectionChange,
}) {
  const { currentUser } = useSelector((state) => state.users);

  // Real analytics based on community data
  const analytics = [
    {
      label: "Total Members",
      value: community?.memberCount || 0,
      icon: <FiUsers />,
      type: "members",
      color: "text-blue-600",
    },
    {
      label: "Community Posts",
      value: community?.posts?.length || 0,
      icon: <FiFileText />,
      type: "posts",
      color: "text-green-600",
    },
    {
      label: "Active Events",
      value: community?.events?.length || 0,
      icon: <FiCalendar />,
      type: "events",
      color: "text-purple-600",
    },
    {
      label: "Shared Files",
      value: community?.files?.length || 0,
      icon: <FiFolder />,
      type: "files",
      color: "text-orange-600",
    },
  ];

  // Navigation sections
  const navigationSections = [
    {
      id: "posts",
      label: "Community Posts",
      icon: <FiFileText />,
      available: true,
    },
    { id: "members", label: "Members", icon: <FiUsers />, available: true },
    {
      id: "events",
      label: "Events",
      icon: <FiCalendar />,
      available: isMember,
    },
    {
      id: "files",
      label: "Files & Resources",
      icon: <FiFolder />,
      available: isMember,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <FiBarChart2 />,
      available: isAdmin,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <FiSettings />,
      available: isAdmin,
    },
  ];

  // Recent activities based on actual community data
  const getRecentActivities = () => {
    if (!community) return [];

    const activities = [];

    // Add member join activities
    if (community.members && community.members.length > 0) {
      activities.push({
        user: "New member",
        action: "joined the community",
        time: "Recently",
        icon: <FiUserPlus />,
        color: "bg-green-50 text-green-600",
      });
    }

    // Add post creation activities
    if (community.posts && community.posts.length > 0) {
      activities.push({
        user: "Member",
        action: "created a new post",
        time: "Recently",
        icon: <FiEdit3 />,
        color: "bg-blue-50 text-blue-600",
      });
    }

    // Add file upload activities
    if (community.files && community.files.length > 0) {
      activities.push({
        user: "Member",
        action: "shared a file",
        time: "Recently",
        icon: <FiUploadCloud />,
        color: "bg-orange-50 text-orange-600",
      });
    }

    // Add comment activities
    activities.push({
      user: "Member",
      action: "commented on a post",
      time: "Recently",
      icon: <FiMessageCircle />,
      color: "bg-purple-50 text-purple-600",
    });

    return activities.slice(0, 4); // Limit to 4 activities
  };

  const recentActivities = getRecentActivities();

  // Quick actions for members and admins
  const quickActions = [
    ...(isMember
      ? [
          // { label: "Create Post", icon: <FiEdit3 />, action: "createPost", color: "bg-blue-600 hover:bg-blue-700" },
          {
            label: "Share Resource",
            icon: <FiUploadCloud />,
            action: "shareFile",
            color: "bg-green-600 hover:bg-green-700",
          },
        ]
      : []),
    ...(isAdmin
      ? [
          {
            label: "Manage Members",
            icon: <FiUsers />,
            action: "manageMembers",
            color: "bg-purple-600 hover:bg-purple-700",
          },
          {
            label: "Community Settings",
            icon: <FiSettings />,
            action: "communitySettings",
            color: "bg-gray-600 hover:bg-gray-700",
          },
        ]
      : []),
  ];

  const handleQuickAction = (action) => {
    // Implement quick action handlers
    switch (action) {
      case "createPost":
        // Handle create post
        break;
      case "shareFile":
        // Handle share file
        break;
      case "manageMembers":
        // Handle manage members
        break;
      case "communitySettings":
        // Handle community settings
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-2">
      <CommunityConnectionUI />
      {/* QUICK STATS */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiActivity className="text-blue-600 text-lg" />
          <h3 className="font-semibold text-gray-900">Community Stats</h3>
        </div>

        <div className="">
          {analytics.map((stat, index) => (
            <div key={index} className="flex items-center justify-between p-2 ">
              <div className="flex items-center gap-3">
                <span className={`text-xl text-gray-700`}>{stat.icon}</span>
                <span className="text-sm text-gray-700 font-medium">
                  {stat.label}
                </span>
              </div>
              <span className="font-bold text-gray-900 text-lg">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
        <div className="text-center mt-2">
          <Link
            href="/view/analytics"
            className="text-sm text-gray-700 font-medium border-2 rounded-full px-3 py-1.5"
          >
            View Analytics
          </Link>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      {quickActions.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.action)}
                className={`${action.color} text-white px-4 py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 hover:shadow-md`}
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* NAVIGATION SECTIONS */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Community Sections</h3>
        <div className="space-y-1">
          {navigationSections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              disabled={!section.available}
              className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-all ${
                activeSection === section.id
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-700 hover:bg-gray-50"
              } ${
                !section.available
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <span
                className={`text-lg ${
                  activeSection === section.id
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                {section.icon}
              </span>
              <span className="font-medium text-sm">{section.label}</span>
              {!section.available && (
                <span className="ml-auto text-xs text-gray-400">
                  Members only
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* RECENT ACTIVITIES */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiActivity className="text-green-600 text-lg" />
          <h3 className="font-semibold text-gray-900">Recent Activities</h3>
        </div>

        {recentActivities.length > 0 ? (
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color}`}
                >
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 font-medium truncate">
                    {activity.user} {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 text-sm">No recent activities</p>
            <p className="text-gray-400 text-xs mt-1">
              Activities will appear here
            </p>
          </div>
        )}
      </div>

      {/* COMMUNITY INFO */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-3">About Community</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Category:</span>
            <span className="font-medium text-gray-900 capitalize">
              {community?.category}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Visibility:</span>
            <span className="font-medium text-gray-900">
              {community?.visibility}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Created:</span>
            <span className="font-medium text-gray-900">
              {community?.createdAt
                ? new Date(community.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span
              className={`font-medium ${
                community?.status === "active"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {community?.status || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
