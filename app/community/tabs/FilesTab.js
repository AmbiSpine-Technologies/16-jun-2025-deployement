// components/community/tabs/FilesTab.js
export  function FilesTab({ community, isMember }) {
  const mockFiles = [
    { id: "1", name: "React Cheat Sheet.pdf", type: "pdf", size: "2.4 MB", uploadedBy: "John Doe", uploadedAt: "2024-01-20", downloads: 45 },
    { id: "2", name: "Project Requirements.docx", type: "doc", size: "1.2 MB", uploadedBy: "Jane Smith", uploadedAt: "2024-01-19", downloads: 23 },
    { id: "3", name: "Study Notes.md", type: "text", size: "0.8 MB", uploadedBy: "Mike Johnson", uploadedAt: "2024-01-18", downloads: 67 },
    { id: "4", name: "Code Examples.zip", type: "zip", size: "5.1 MB", uploadedBy: "Sarah Wilson", uploadedAt: "2024-01-17", downloads: 34 },
  ];

  const getFileIcon = (type) => {
    const icons = {
      pdf: "📄",
      doc: "📝",
      text: "📃",
      zip: "📦",
      image: "🖼️",
      video: "🎥"
    };
    return icons[type] || "📁";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Shared Files</h2>
            <p className="text-gray-600 mt-1">Resources and documents shared by members</p>
          </div>
          
          {isMember && (
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Upload File
            </button>
          )}
        </div>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockFiles.map(file => (
          <div key={file.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center text-xl">
                {getFileIcon(file.type)}
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {file.size}
              </span>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2 truncate">{file.name}</h3>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center justify-between">
                <span>Uploaded by {file.uploadedBy}</span>
                <span>{file.downloads} downloads</span>
              </div>
              <div>
                {new Date(file.uploadedAt).toLocaleDateString()}
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Download
              </button>
              {isMember && (
                <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {mockFiles.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📁</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No files shared yet</h3>
          <p className="text-gray-600">
            {isMember ? "Be the first to share helpful resources!" : "Join the community to access shared files"}
          </p>
        </div>
      )}
    </div>
  );
}

// ChatTab.js
import { HiOutlineUserGroup } from "react-icons/hi2";

export function ChatTab({ community, isMember, onOpenChat }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
      <div className="text-center py-12">

        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br 
            from-blue-50 to-blue-100 
            flex items-center justify-center mx-auto 
            shadow-sm backdrop-blur-md mb-5">
          <HiOutlineUserGroup className="text-4xl text-blue-600" />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Community Chat
        </h3>

        <p className="text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
          {isMember
            ? "Chat with everyone inside your community in real-time."
            : "Join the community to unlock chat features."}
        </p>

        {isMember ? (
          <div className="max-w-xs mx-auto">

            {/* Only Group Chat Card */}
            <div
              onClick={onOpenChat}
              className="p-5 bg-gray-50 border border-gray-200 rounded-xl hover:shadow-md transition cursor-pointer"
            >
              <HiOutlineUserGroup className="text-3xl text-blue-600 mx-auto mb-3" />
              <div className="text-sm font-semibold text-gray-800">Group Chat</div>
              <p className="text-xs text-gray-500 mt-1">
                Real-time messaging for all members.
              </p>
            </div>

          </div>
        ) : (
          <button
            className="bg-blue-600 text-white px-8 py-3 rounded-xl 
                       hover:bg-blue-700 transition-all font-semibold shadow-md"
          >
            Join Community to Chat
          </button>
        )}
      </div>
    </div>
  );
}


// components/community/tabs/AboutTab.js
export  function AboutTab({ community }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Community</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {community.description || "No description provided for this community."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Community Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium text-gray-900 capitalize">{community.category.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Visibility</span>
                  <span className="font-medium text-gray-900 capitalize">{community.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Members</span>
                  <span className="font-medium text-gray-900">{community.memberCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-medium ${
                    community.status === 'active' ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {community.status === 'active' ? 'Active' : 'Pending Activation'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Created</span>
                  <span className="font-medium text-gray-900">
                    {new Date(community.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Community Guidelines</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Respect all community members</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Share relevant and helpful content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>No spam or self-promotion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Keep discussions professional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Report any inappropriate behavior</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Community Goals</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-blue-800">
                This community aims to provide a collaborative space for members to learn, 
                share knowledge, and work together on projects. We believe in the power of 
                community-driven learning and mutual support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}