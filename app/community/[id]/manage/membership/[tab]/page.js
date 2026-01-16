'use client';

import { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  UserPlus, 
  UserX, 
  Search, 
  Shield,
  Clock,
  Mail,
  Ban,
  Check,
  X,
  Send,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

// Mock data for different tabs
const mockData = {
  members: [
    { 
      id: 1, 
      name: 'Rahul Sharma', 
      avatar: '👨‍💼', 
      designation: 'Software Engineer', 
      company: 'Tech Corp',
      joinDate: '2024-01-15',
      role: 'member'
    },
    { 
      id: 2, 
      name: 'Priya Singh', 
      avatar: '👩‍💼', 
      designation: 'Product Manager', 
      company: 'Startup Inc',
      joinDate: '2024-01-10',
      role: 'member'
    },
  ],
  admins: [
    { 
      id: 101, 
      name: 'John Doe', 
      avatar: '👨‍💼', 
      designation: 'Community Admin', 
      company: 'Tech Community',
      joinDate: '2024-01-01',
      role: 'admin'
    },
  ],
  requests: [
    { 
      id: 201, 
      name: 'Anjali Verma', 
      avatar: '👩‍💼', 
      designation: 'HR Manager', 
      company: 'People First',
      requestDate: '2024-01-20'
    },
    { 
      id: 202, 
      name: 'Ravi Patel', 
      avatar: '👨‍🔬', 
      designation: 'Data Scientist', 
      company: 'AI Labs',
      requestDate: '2024-01-21'
    },
  ],
  invited: [
    { 
      id: 301, 
      name: 'Sneha Gupta', 
      avatar: '👩‍🎨', 
      designation: 'UI/UX Designer', 
      company: 'Design Studio',
      invitedDate: '2024-01-18',
      status: 'pending'
    },
  ],
  blocked: [
    { 
      id: 401, 
      name: 'Mike Johnson', 
      avatar: '👨‍💼', 
      designation: 'Marketing Head', 
      company: 'Market Pros',
      blockedDate: '2024-01-12',
      reason: 'Spam content'
    },
  ]
};

const tabs = [
  { id: 'members', label: 'Members', icon: Users, count: mockData.members.length },
  { id: 'admins', label: 'Admins', icon: Shield, count: mockData.admins.length },
  { id: 'requests', label: 'Requests', icon: Clock, count: mockData.requests.length },
  { id: 'invited', label: 'Invited', icon: Mail, count: mockData.invited.length },
  { id: 'blocked', label: 'Blocked', icon: Ban, count: mockData.blocked.length },
];

export default function MembershipManagement({ params }) {
  const { communityId, tab } = params;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(tab || 'members');

  const currentData = mockData[activeTab] || [];
  
  const filteredUsers = currentData.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAcceptRequest = (userId) => {
    console.log('Accept request:', userId);
    // Add your logic here
  };

  const handleRejectRequest = (userId) => {
    console.log('Reject request:', userId);
    // Add your logic here
  };

  const handleRemoveUser = (userId) => {
    console.log('Remove user:', userId);
    // Add your logic here
  };

  const handleBlockUser = (userId) => {
    console.log('Block user:', userId);
    // Add your logic here
  };

  const handleUnblockUser = (userId) => {
    console.log('Unblock user:', userId);
    // Add your logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link 
            href={`/community/${communityId}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Community
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Membership</h1>
          <p className="text-gray-600">Manage members, admins, and membership requests</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {tabs.map(({ id, label, icon: Icon, count }) => (
                <Link
                  key={id}
                  href={`/community/${communityId}/manage/membership/${id}`}
                  className={`flex items-center px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={18} className="mr-2" />
                  {label}
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    activeTab === id
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {count}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Search Bar */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Users List */}
          <div className="divide-y divide-gray-200">
            {filteredUsers.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <div className="text-gray-400 mb-4">
                  {activeTab === 'members' && <Users size={48} className="mx-auto" />}
                  {activeTab === 'admins' && <Shield size={48} className="mx-auto" />}
                  {activeTab === 'requests' && <Clock size={48} className="mx-auto" />}
                  {activeTab === 'invited' && <Mail size={48} className="mx-auto" />}
                  {activeTab === 'blocked' && <Ban size={48} className="mx-auto" />}
                </div>
                <p className="text-gray-500 text-lg mb-2">No {activeTab} found</p>
                <p className="text-gray-400 text-sm">
                  {searchQuery ? 'Try adjusting your search terms' : `No ${activeTab} to display`}
                </p>
              </div>
            ) : (
              filteredUsers.map(user => (
                <div
                  key={user.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-2xl">
                        {user.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{user.name}</h3>
                          {user.role === 'admin' && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full flex items-center gap-1">
                              <Shield size={12} />
                              Admin
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{user.designation} • {user.company}</p>
                        <p className="text-gray-400 text-xs mt-1">
                          {activeTab === 'requests' && `Requested on ${new Date(user.requestDate).toLocaleDateString()}`}
                          {activeTab === 'invited' && `Invited on ${new Date(user.invitedDate).toLocaleDateString()}`}
                          {activeTab === 'blocked' && `Blocked on ${new Date(user.blockedDate).toLocaleDateString()}`}
                          {(activeTab === 'members' || activeTab === 'admins') && `Joined on ${new Date(user.joinDate).toLocaleDateString()}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {activeTab === 'requests' && (
                        <>
                          <button
                            onClick={() => handleAcceptRequest(user.id)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm flex items-center gap-2 transition-colors"
                          >
                            <Check size={16} />
                            Accept
                          </button>
                          <button
                            onClick={() => handleRejectRequest(user.id)}
                            className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors"
                          >
                            <X size={16} />
                            Reject
                          </button>
                        </>
                      )}
                      
                      {activeTab === 'members' && (
                        <>
                          <button
                            onClick={() => handleBlockUser(user.id)}
                            className="px-4 py-2 border border-red-200 text-red-700 hover:bg-red-50 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors"
                          >
                            <Ban size={16} />
                            Block
                          </button>
                          <button
                            onClick={() => handleRemoveUser(user.id)}
                            className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors"
                          >
                            <UserX size={16} />
                            Remove
                          </button>
                        </>
                      )}

                      {activeTab === 'blocked' && (
                        <button
                          onClick={() => handleUnblockUser(user.id)}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm flex items-center gap-2 transition-colors"
                        >
                          <UserCheck size={16} />
                          Unblock
                        </button>
                      )}

                      {activeTab === 'invited' && (
                        <button
                          onClick={() => handleRemoveUser(user.id)}
                          className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors"
                        >
                          <X size={16} />
                          Cancel Invite
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {tabs.map(({ id, label, icon: Icon, count }) => (
            <Link
              key={id}
              href={`/community/${communityId}/manage/membership/${id}`}
              className={`bg-white p-4 rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-all ${
                activeTab === id ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                  <p className="text-gray-600 text-sm">{label}</p>
                </div>
                <div className={`p-2 rounded-full ${
                  activeTab === id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  <Icon size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}