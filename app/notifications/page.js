"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead } from "../utils/notificationsApi";
import { toast } from "react-toastify";
import Link from "next/link";
import { Bell } from "lucide-react";
import AdvertisementCard from "../components/AdvertisementCard";
import Image from "next/image";

export default function NotificationsPage() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((s) => s.users);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);


  const ads = [
    {
      companyName: "Spreadnext India",
      tagline: "Where Community meets Careers.",
      logo: "https://img.icons8.com/color/96/company.png",
      link: "https://google.com",
    },
    {
      companyName: "Spreadnext India",
      tagline: "Where Community meets Careers.",
      logo: "https://img.icons8.com/color/96/company.png",
      link: "https://google.com",
    },

  ];

  // Fetch notifications from API
  useEffect(() => {
    const fetchNotificationsData = async () => {
      if (!currentUser) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Map frontend tabs to backend filter types
        const typeMap = {
          'all': undefined,
          'mentions': 'mention',
          'follows': 'follow',
          'jobs': 'job'
        };
        
        const filters = {};
        if (typeMap[activeTab] && typeMap[activeTab] !== undefined) {
          filters.type = typeMap[activeTab];
        }

        const result = await getNotifications(filters, 1, 50);
        if (result.success && result.data) {
          // Transform backend notification data to frontend format
          const transformedNotifications = result.data.map(notif => ({
            id: notif._id || notif.id,
            type: notif.type || 'general',
            message: notif.message || notif.content || '',
            title: notif.title || '',
            category: notif.category || notif.type || 'general',
            read: notif.read || false,
            createdAt: notif.createdAt || new Date().toISOString(),
            from: notif.from?._id || notif.from || notif.userId?._id || notif.userId || notif.senderId,
            to: notif.to?._id || notif.to || currentUser.id,
            user: notif.from ? {
              id: notif.from._id || notif.from.id,
              name: `${notif.from.firstName || ''} ${notif.from.lastName || ''}`.trim() || notif.from.userName || 'User',
              username: notif.from.userName || '',
              avatar: notif.from.profileImage || '/default-user-profile.svg',
            } : (notif.userId ? {
              id: notif.userId._id || notif.userId.id,
              name: `${notif.userId.firstName || ''} ${notif.userId.lastName || ''}`.trim() || notif.userId.userName || 'User',
              username: notif.userId.userName || '',
              avatar: notif.userId.profileImage || '/default-user-profile.svg',
            } : null),
            link: notif.link || notif.url || '',
            metadata: notif.metadata || {},
          }));
          setNotifications(transformedNotifications);
        } else {
          // Fallback to empty array if API fails
          setNotifications([]);
          if (result.message) {
            console.warn("Notifications API warning:", result.message);
          }
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        setNotifications([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotificationsData();
  }, [activeTab, currentUser]);


  if (!currentUser)
    return <p className="p-5 text-gray-500">No user logged in.</p>;

  // Handle mark as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      const result = await markNotificationAsRead(notificationId);
      if (result.success) {
        setNotifications(prev => prev.map(notif => 
          notif.id === notificationId ? { ...notif, read: true } : notif
        ));
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // Handle mark all as read
  const handleMarkAllAsRead = async () => {
    try {
      const result = await markAllNotificationsAsRead();
      if (result.success) {
        setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
        toast.success("All notifications marked as read");
      } else {
        toast.error(result.message || "Failed to mark all as read");
      }
    } catch (error) {
      console.error("Failed to mark all as read:", error);
      toast.error("Failed to mark all as read");
    }
  };

  // Group notifications by time (Today, Yesterday, This Week, Earlier)
  const groupedNotifications = useMemo(() => {
    const groups = {
      today: [],
      yesterday: [],
      thisWeek: [],
      earlier: []
    };

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const thisWeek = new Date(today);
    thisWeek.setDate(thisWeek.getDate() - 7);

    notifications.forEach((notification) => {
      const notifDate = new Date(notification.createdAt);

      if (notifDate >= today) {
        groups.today.push(notification);
      } else if (notifDate >= yesterday) {
        groups.yesterday.push(notification);
      } else if (notifDate >= thisWeek) {
        groups.thisWeek.push(notification);
      } else {
        groups.earlier.push(notification);
      }
    });

    return groups;
  }, [notifications]);

  // Filter notifications based on active tab (PRD tabs)
  const filteredNotifications = useMemo(() => {
    switch (activeTab) {
      case "mentions":
        return notifications.filter((n) =>
          n.type === "mention" || n.message?.includes("@")
        );
      case "follows":
        return notifications.filter((n) =>
          n.type === "follow" || n.type === "connection"
        );
      case "jobs":
        return notifications.filter((n) =>
          n.type.includes("job") || n.category === "job_alerts"
        );
      case "all":
      default:
        return notifications;
    }
  }, [notifications, activeTab]);


  return (
    <div className="mt-16">
      {/* Main Layout - PRD Structure */}
      <div className="max-w-7xl justify-between mx-auto mt-6">

        <div className="flex space-x-2">
          {/* Main Panel Feed - PRD Requirement */}
          <div className="flex-1 p-6 ">
            {/* Tabs - PRD Tabs: All, Mentions, Follows, Job Alerts */}
            <div className="bg-[#ffffffdc]  px-4  border-[0.3px]  border-[#cccccc] rounded-lg mb-6">
              <div className="flex border-b ">
                {[
                  { id: "all", name: "All" },
                  { id: "mentions", name: "Mentions" },
                  { id: "follows", name: "Follows" },
                  { id: "jobs", name: "Job Alerts" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex-1 px-3 py-3 text-sm font-medium transition-colors hover:cursor-pointer ${activeTab === tab.id
                      ? "text-blue-600 border-b-2 -mb-[2px] border-blue-600"
                      : "text-gray-600 "
                      }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white  border-[0.3px] border-[#cccccc] rounded-4xl p-4 animate-pulse">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State - PRD Requirement */}
            {!isLoading && filteredNotifications.length === 0 && (
              <div className="bg-[#fff]  rounded-4xl border h-[620px]  flex justify-center align-middle flex-col  border-gray-200 px-12 text-center">
                <div className="flex justify-center">
                  <Image src="/nothingillustrator.svg" alt="nothing " width={200} height={200} />

                </div>
                <h3 className="text-2xl  font-semibold text-gray-900">
                  Quiet for now
                </h3>
                <p className="text-gray-500 text-sm">
                  Something good is on its way.
                </p>
              </div>
            )}

            {/* Notifications Feed - Grouped by time */}
            {!isLoading && filteredNotifications.length > 0 && (
              <div className="border-[0.3px] my-3 border-[#cccccc]   h-[620px] overflow-y-auto custom-scroll  !border-b-0  bg-[#FFF] p-4 rounded-4xl !rounded-br-none !rounded-bl-none">

                <div className="text-right mx-3">
                  {notifications.length > 0 && (
                    <button
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      onClick={handleMarkAllAsRead}
                    >
                      Mark All as Read
                    </button>
                  )}
                </div>

                {Object.entries(groupedNotifications).map(([period, periodNotifications]) => {
                  const filteredPeriodNotifications = periodNotifications.filter(n =>
                    filteredNotifications.includes(n)
                  );

                  if (filteredPeriodNotifications.length === 0) return null;

                  const periodLabels = {
                    today: "Today",
                    yesterday: "Yesterday",
                    thisWeek: "This Week",
                    earlier: "Earlier"
                  };

                  return (
                    <div key={period} className="bg-[#fff] border-b border-[#cccccc]   p-4  ">
                      <h3 className="text-sm  font-medium text-gray-500 mb-3">
                        {periodLabels[period]}
                      </h3>
                      <div className="space-y-3  ">
                        {filteredPeriodNotifications.map((n) => {
                          const sender = usersMap[n.from] || {
                            name: "Unknown User",
                            avatar: "/default-user-profile.svg",
                          };
                          const collab = collabsMap[n.id];

                          return (
                            <div
                              key={n.id}
                              className={`bg-white rounded-xl transition-all  ${!n.read ? "border-blue-200 bg-blue-50/30" : "border-gray-200"
                                }`}
                            >
                              <div className="">
                                <div className="flex gap-4">
                                  {/* Notification Icon */}
                                  <img
                                    src={sender.avatar || "/default-user-profile.svg"}
                                    alt={sender.name}
                                    className="w-12 h-12 rounded-full"
                                  />

                                  {/* Notification Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                      <div className="flex items-center gap-2 mb-1">
                                        {/* <img
                                          src={sender.avatar || "/default-user-profile.svg"}
                                          alt={sender.name}
                                          className="w-12 h-12 rounded-full"
                                        /> */}
                                        <span className="font-medium text-gray-900 text-sm">
                                          {sender.name}
                                        </span>
                                      </div>

                                      <div className="flex items-center gap-2">

                                      </div>
                                    </div>

                                    <p className="text-gray-700 text-sm mb-2">
                                      {n.message}
                                    </p>

                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-gray-500">
                                        {new Date(n.createdAt).toLocaleTimeString([], {
                                          hour: '2-digit',
                                          minute: '2-digit'
                                        })}
                                      </span>

                                      {/* Action Buttons - Can be extended for collaboration requests */}
                                      {n.type === "collab-request" && n.to === currentUser?.id && (
                                        <div className="flex gap-2">
                                          <button
                                            className="px-3 py-1.5 rounded-full text-xs font-medium bg-green-500 text-white hover:bg-green-600 transition-colors"
                                            onClick={() => {
                                              // TODO: Implement accept collaboration API call
                                              handleMarkAsRead(n.id);
                                            }}
                                          >
                                            Accept
                                          </button>
                                          <button
                                            className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
                                            onClick={() => {
                                              // TODO: Implement reject collaboration API call
                                              handleMarkAsRead(n.id);
                                            }}
                                          >
                                            Ignore
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar Navigation - PRD Requirement */}
          <div className=" ">


            {/* Ad placeholders */}
            <div className="mt-8 flex flex-col gap-5">
              {ads.map((ad, i) => (
                <AdvertisementCard
                  key={i}
                  companyName={ad.companyName}
                  tagline={ad.tagline}
                  logo={ad.logo}
                  link={ad.link}
                />
              ))}

            </div>
          </div>



        </div>
      </div>
    </div>
  );
}