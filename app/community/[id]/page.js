"use client";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { getCommunityById as getCommunityByIdApi } from "../../utils/communityApi";
import { toast } from "react-toastify";

import CommunitySidebar from "../../community/CommunitySidebar";
import CommunityPagee from "../../community/communityHome";
import { GlobalLoader } from "../../components/Loader";

export default function CommunityPage() {
  const params = useParams();
  const { currentUser } = useSelector((state) => state.users);

  const [community, setCommunity] = useState(null);
  const [activeTab, setActiveTab] = useState("feed");
  const [loading, setLoading] = useState(true);

  const [isChatOpen, setIsChatOpen] = useState(false);

  // Fetch community from API
  useEffect(() => {
    const fetchCommunity = async () => {
      if (!params.id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const result = await getCommunityByIdApi(params.id);
        if (result.success && result.data) {
          // Transform backend community data to frontend format
          const transformedCommunity = {
            id: result.data._id || result.data.id,
            name: result.data.name || '',
            description: result.data.description || '',
            category: result.data.category || '',
            type: result.data.type || result.data.visibility || 'public',
            visibility: result.data.visibility || result.data.type || 'public',
            members: result.data.members || [],
            memberCount: result.data.memberCount || result.data.members?.length || 0,
            createdBy: result.data.createdBy?._id || result.data.createdBy || result.data.createdById,
            createdByName: result.data.createdBy?.userName || result.data.createdBy?.firstName || '',
            creatorAvatar: result.data.createdBy?.profileImage || '/default-user-profile.svg',
            bannerImage: result.data.bannerImage || result.data.banner || '',
            communityIcon: result.data.communityIcon || result.data.icon || result.data.logo || '',
            status: result.data.status || 'active',
            rules: result.data.rules || [],
            inviteCode: result.data.inviteCode || '',
            createdAt: result.data.createdAt || new Date().toISOString(),
            updatedAt: result.data.updatedAt || new Date().toISOString(),
            ...result.data,
          };
          setCommunity(transformedCommunity);
        } else {
          toast.error(result.message || "Community not found");
          setCommunity(null);
        }
      } catch (error) {
        console.error("Error fetching community:", error);
        toast.error("Failed to load community");
        setCommunity(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunity();
  }, [params.id]);

  if (loading) {
    return <GlobalLoader text="Loading Community..." />;
  }

  if (!community) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-red-600">❌</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Community Not Found</h2>
          <p className="text-gray-600">The community you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Check if user is member (members can be array of IDs or user objects)
  const isMember = useMemo(() => {
    if (!community || !currentUser) return false;
    const members = community.members || [];
    return members.some(member => {
      const memberId = typeof member === 'object' ? (member._id || member.id || member.userId?._id || member.userId?.id) : member;
      return memberId === currentUser.id || memberId === currentUser._id;
    });
  }, [community, currentUser]);

  const isAdmin = community.createdBy === currentUser?.id || community.createdBy === currentUser?._id;

  return (
    <div className="min-h-screen mt-10">
      <div className="flex items-start mx-15 gap-8">
        <div className="w-[70%]">
          {/* <CommunityHeader community={community} isMember={isMember} isAdmin={isAdmin} /> */}

          <CommunityPagee />

        </div>

        <div className="w-[30%]">
          <CommunitySidebar
            community={community}
            isMember={isMember}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div>
  );
}
