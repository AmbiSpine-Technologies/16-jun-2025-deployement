
// app/community/join/page.js
"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { joinCommunityByInvite, getCommunityById } from "../../utils/communityService";
import Link from "next/link";

export default function JoinCommunityClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { currentUser } = useSelector((state) => state.users);
  const [community, setCommunity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [message, setMessage] = useState("");

  const communityId = searchParams.get('code');

  useEffect(() => {
    if (communityId) {
      const foundCommunity = getCommunityById(communityId);
      setCommunity(foundCommunity);
      setIsLoading(false);
      
      if (!foundCommunity) {
        setMessage("Community not found or invalid invite link.");
      }
    } else {
      setMessage("No invite code provided.");
      setIsLoading(false);
    }
  }, [communityId]);

  const handleJoinCommunity = async () => {
    if (!currentUser) {
      setMessage("Please login to join community");
      return;
    }

    if (!community) {
      setMessage("Community not found");
      return;
    }

    setIsJoining(true);
    try {
      const result = await joinCommunityByInvite(
        communityId, 
        currentUser.id, 
        currentUser.name || currentUser.email
      );

      if (result.success) {
        setMessage(result.message);
        setTimeout(() => {
          router.push(`/community/${communityId}`);
        }, 1500);
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      setMessage("Error joining community");
    } finally {
      setIsJoining(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading community...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl text-white">👥</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {message ? (message.includes('success') ? 'Welcome!' : 'Oops!') : 'Join Community'}
          </h1>
          <p className="text-blue-100">
            {message ? '' : 'You\'ve been invited to join a community'}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {message ? (
            <div className="text-center space-y-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                message.includes('success') ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <span className={`text-2xl ${
                  message.includes('success') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {message.includes('success') ? '✅' : '❌'}
                </span>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {message.includes('success') ? 'Success!' : 'Error'}
                </h2>
                <p className="text-gray-600">{message}</p>
              </div>

              {message.includes('success') ? (
                <div className="space-y-3">
                  <div className="animate-pulse text-sm text-gray-500">
                    Redirecting to community...
                  </div>
                  <button
                    onClick={() => router.push(`/community/${communityId}`)}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Go Now
                  </button>
                </div>
              ) : (
                <Link
                  href="/community"
                  className="inline-block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                >
                  Browse Communities
                </Link>
              )}
            </div>
          ) : community ? (
            <div className="space-y-6">
              {/* Community Info */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {community.name}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {community.description || "No description provided."}
                </p>
              </div>

              {/* Community Details */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Category</span>
                  <span className="text-sm font-medium text-gray-900 capitalize">
                    {community.category.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Visibility</span>
                  <span className="text-sm font-medium text-gray-900 capitalize">
                    {community.type}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Members</span>
                  <span className="text-sm font-medium text-gray-900">
                    {community.memberCount}/5
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    community.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {community.status === 'active' ? 'Active' : 'Pending'}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              {community.status !== 'active' && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-900">Activation Progress</span>
                    <span className="text-sm text-blue-700">
                      {5 - community.memberCount} more needed
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all" 
                      style={{ width: `${(community.memberCount / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Join Button */}
              {community.members.includes(currentUser?.id) ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <p className="text-green-800 font-medium mb-3">You're already a member!</p>
                  <button
                    onClick={() => router.push(`/community/${community.id}`)}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Enter Community
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleJoinCommunity}
                  disabled={isJoining}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-lg shadow-lg"
                >
                  {isJoining ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Joining...</span>
                    </div>
                  ) : (
                    `Join Community`
                  )}
                </button>
              )}
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl text-red-600">❌</span>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Community Not Found
                </h2>
                <p className="text-gray-600">
                  The community you're trying to join doesn't exist or the invite link has expired.
                </p>
              </div>

              <Link
                href="/community"
                className="inline-block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Browse Communities
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}