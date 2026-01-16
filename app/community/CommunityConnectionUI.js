import { useState } from 'react';
import { X, Search, Check, UserPlus, Users, Send, UserCheck } from 'lucide-react';
import Link from 'next/link';

// Mock data for demonstration
const mockUsers = [
  { id: 1, name: 'Rahul Sharma', avatar: '👨‍💼', designation: 'Software Engineer', company: 'Tech Corp' },
  { id: 2, name: 'Priya Singh', avatar: '👩‍💼', designation: 'Product Manager', company: 'Startup Inc' },
  { id: 3, name: 'Amit Kumar', avatar: '👨‍🔧', designation: 'Full Stack Developer', company: 'Code Labs' },
  { id: 4, name: 'Sneha Gupta', avatar: '👩‍🎨', designation: 'UI/UX Designer', company: 'Design Studio' },
  { id: 5, name: 'Vikram Mehta', avatar: '👨‍💻', designation: 'DevOps Engineer', company: 'Cloud Systems' },
];

const mockCommunityAdmin = {
  name: 'John Doe',
  avatar: '👨‍💼',
  role: 'Community Admin'
};

export default function CommunityConnectionUI() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'manage'
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([
    { id: 101, name: 'Anjali Verma', avatar: '👩‍💼', designation: 'HR Manager', company: 'People First', status: 'pending' },
    { id: 102, name: 'Ravi Patel', avatar: '👨‍🔬', designation: 'Data Scientist', company: 'AI Labs', status: 'pending' },
  ]);
  const [activeTab, setActiveTab] = useState('sent'); // 'sent' or 'received'
  const [connections, setConnections] = useState([]);

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSendInvitations = () => {
    const newRequests = mockUsers
      .filter(user => selectedUsers.includes(user.id))
      .map(user => ({ ...user, status: 'pending' }));
    
    setSentRequests(prev => [...prev, ...newRequests]);
    setShowSuccessMessage(true);
    
    setTimeout(() => {
      setShowSuccessMessage(false);
      setShowInviteModal(false);
      setSelectedUsers([]);
      setSearchQuery('');
    }, 2000);
  };

  const handleAcceptRequest = (requestId) => {
    const request = receivedRequests.find(req => req.id === requestId);
    if (request) {
      setConnections(prev => [...prev, { ...request, status: 'connected' }]);
      setReceivedRequests(prev => prev.filter(req => req.id !== requestId));
    }
  };

  const handleRejectRequest = (requestId) => {
    setReceivedRequests(prev => prev.filter(req => req.id !== requestId));
  };

  const handleCancelRequest = (requestId) => {
    setSentRequests(prev => prev.filter(req => req.id !== requestId));
  };

  // Home Page UI
  if (currentPage === 'home') {
    return (
      <div className="bg-gray-50">
        <div className="">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">1 member</h2>
            
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-2xl">
                {mockCommunityAdmin.avatar}
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-800">{mockCommunityAdmin.name}</p>
                <p className="text-sm text-gray-500">{mockCommunityAdmin.role}</p>
              </div>
            </div>

            <button
              onClick={() => setShowInviteModal(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <UserPlus size={20} />
              Invite connections
            </button>

             <button
              onClick={() => setCurrentPage('manage')}
              className="w-full mt-4 text-gray-600 hover:text-gray-800 font-medium py-2 flex items-center justify-center gap-2 transition-colors duration-200"
            >
              Show all
              <span className="text-lg">→</span>
            </button>  
            
             {/* <Link
            href="/manage/member/membership"
              // onClick={() => setCurrentPage('manage')} 
              className="w-full mt-4 text-gray-600 hover:text-gray-800 font-medium py-2 flex items-center justify-center gap-2 transition-colors duration-200"
            >
              Show all
              <span className="text-lg">→</span>
            </Link> */}
          </div>
        </div>

        {/* Invite Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">Invite Connections</h3>
                <button
                  onClick={() => {
                    setShowInviteModal(false);
                    setSelectedUsers([]);
                    setSearchQuery('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              {showSuccessMessage && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 m-6">
                  <div className="flex items-center">
                    <Check className="text-green-500 mr-2" size={20} />
                    <p className="text-green-700 font-medium">Invitation sent successfully!</p>
                  </div>
                </div>
              )}

              <div className="p-6">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search users by name or designation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {filteredUsers.map(user => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                      onClick={() => toggleUserSelection(user.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-2xl">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.designation}</p>
                          <p className="text-xs text-gray-400">{user.company}</p>
                        </div>
                      </div>
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                          selectedUsers.includes(user.id)
                            ? 'bg-blue-600 border-blue-600'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedUsers.includes(user.id) && (
                          <Check size={16} className="text-white" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => {
                    setShowInviteModal(false);
                    setSelectedUsers([]);
                    setSearchQuery('');
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendInvitations}
                  disabled={selectedUsers.length === 0}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium text-white transition-colors flex items-center justify-center gap-2 ${
                    selectedUsers.length === 0
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <Send size={18} />
                  Send Invitations ({selectedUsers.length})
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Manage Connections Page
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 mb-4"
          >
            ← Back to Community
          </button>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Connections</h1>
          <p className="text-gray-600">View and manage your connection requests</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('sent')}
                className={`flex-1 py-4 px-6 font-medium transition-colors flex items-center justify-center gap-2 ${
                  activeTab === 'sent'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Send size={20} />
                Sent Requests ({sentRequests.length})
              </button>
              <button
                onClick={() => setActiveTab('received')}
                className={`flex-1 py-4 px-6 font-medium transition-colors flex items-center justify-center gap-2 ${
                  activeTab === 'received'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Users size={20} />
                Received Requests ({receivedRequests.length})
              </button>
              <button
                onClick={() => setActiveTab('connections')}
                className={`flex-1 py-4 px-6 font-medium transition-colors flex items-center justify-center gap-2 ${
                  activeTab === 'connections'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <UserCheck size={20} />
                Connections ({connections.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'sent' && (
              <div>
                {sentRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <Send size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">No sent requests yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sentRequests.map(request => (
                      <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-2xl">
                            {request.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{request.name}</p>
                            <p className="text-sm text-gray-500">{request.designation}</p>
                            <p className="text-xs text-gray-400">{request.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                            Pending
                          </span>
                          <button
                            onClick={() => handleCancelRequest(request.id)}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'received' && (
              <div>
                {receivedRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <Users size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">No received requests</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {receivedRequests.map(request => (
                      <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-2xl">
                            {request.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{request.name}</p>
                            <p className="text-sm text-gray-500">{request.designation}</p>
                            <p className="text-xs text-gray-400">{request.company}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAcceptRequest(request.id)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleRejectRequest(request.id)}
                            className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors font-medium"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'connections' && (
              <div>
                {connections.length === 0 ? (
                  <div className="text-center py-12">
                    <UserCheck size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">No connections yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {connections.map(connection => (
                      <div key={connection.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-2xl">
                            {connection.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{connection.name}</p>
                            <p className="text-sm text-gray-500">{connection.designation}</p>
                            <p className="text-xs text-gray-400">{connection.company}</p>
                          </div>
                        </div>
                        <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center gap-1">
                          <Check size={16} />
                          Connected
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}