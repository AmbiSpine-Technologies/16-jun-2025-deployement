// components/community/tabs/FeedTab.js
import { useState } from "react";
import { useSelector } from "react-redux";
// import { addCommunityPost } from "../../utils/communityService";

export default function FeedTab({ community, isMember }) {
  const [posts, setPosts] = useState(community.posts || []);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({ type: "text", content: "" });
  const { currentUser } = useSelector((state) => state.users);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.content.trim()) return;

    const result = await addCommunityPost(community.id, {
      ...newPost,
      author: currentUser.id,
      authorName: currentUser.name || currentUser.email,
      authorAvatar: currentUser.avatar
    });

    if (result.success) {
      setPosts([{ ...newPost, id: Date.now().toString(), author: currentUser, createdAt: new Date().toISOString(), likes: [], comments: [] }, ...posts]);
      setNewPost({ type: "text", content: "" });
      setShowCreatePost(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Create Post Card */}
      {isMember && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          {!showCreatePost ? (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-lg">👤</span>
              </div>
              <button
                onClick={() => setShowCreatePost(true)}
                className="flex-1 text-left px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-gray-500"
              >
                Share something with your community...
              </button>
            </div>
          ) : (
            <form onSubmit={handleCreatePost} className="space-y-4">
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="What's on your mind?"
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                maxLength={1000}
              />
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button type="button" className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    🖼️
                  </button>
                  <button type="button" className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    📊
                  </button>
                  <button type="button" className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    ❓
                  </button>
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreatePost(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!newPost.content.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600">
              {isMember ? "Be the first to share something with the community!" : "Join the community to see posts"}
            </p>
          </div>
        ) : (
          posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
}

// Post Card Component
function PostCard({ post }) {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Post Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-sm">👤</span>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{post.authorName}</h4>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()} • {new Date(post.createdAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-6">
        <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Post Actions */}
      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-2 transition-colors ${
                isLiked ? "text-red-600" : "text-gray-500 hover:text-red-600"
              }`}
            >
              <span className="text-lg">{isLiked ? "❤️" : "🤍"}</span>
              <span className="text-sm">{post.likes.length + (isLiked ? 1 : 0)}</span>
            </button>
            
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <span className="text-lg">💬</span>
              <span className="text-sm">{post.comments.length}</span>
            </button>
            
            <button className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors">
              <span className="text-lg">🔄</span>
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}