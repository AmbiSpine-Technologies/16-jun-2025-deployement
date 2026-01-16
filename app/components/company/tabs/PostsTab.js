import { 
  MapPin, Globe, Plus, MoreHorizontal, 
} from 'lucide-react';

export const PostsTab = ({ posts }) => (
   <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-300 px-4 py-3 shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar">
         <button className="bg-[#01754f] text-white px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap">All</button>
         <button className="border border-gray-400 text-gray-600 hover:bg-gray-100 px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap">Images</button>
         <button className="border border-gray-400 text-gray-600 hover:bg-gray-100 px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap">Videos</button>
         <button className="border border-gray-400 text-gray-600 hover:bg-gray-100 px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap">Articles</button>
         <button className="border border-gray-400 text-gray-600 hover:bg-gray-100 px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap">Documents</button>
      </div>

      {/* Feed */}
      {posts.map(post => (
         // NOTE: Reusing the PostCard component logic from previous answer
         <div key={post.id} className="bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden">
             <div className="p-4">
                 <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                        <img src="https://via.placeholder.com/48" className="w-12 h-12 rounded-sm bg-black"/>
                        <div>
                            <div className="font-bold text-sm text-gray-900">AmbiSpine Technologies</div>
                            <div className="text-xs text-gray-500">756 followers</div>
                            <div className="text-xs text-gray-500">6d • <Globe size={10} className="inline"/></div>
                        </div>
                    </div>
                    <MoreHorizontal className="text-gray-600"/>
                 </div>
                 <div className="mt-3 text-sm text-gray-900">
                     {post.content}
                 </div>
             </div>
             {post.image && (
                 <div className="w-full bg-red-600 h-80 flex items-center justify-center text-white text-4xl font-bold">
                    {/* Simulated image from screenshot */}
                    ARAMBH
                 </div>
             )}
             <div className="px-4 py-2 border-t border-gray-100 flex justify-between">
                 <button className="text-gray-600 font-semibold text-sm flex gap-2 items-center hover:bg-gray-100 px-4 py-2 rounded">Like</button>
                 <button className="text-gray-600 font-semibold text-sm flex gap-2 items-center hover:bg-gray-100 px-4 py-2 rounded">Comment</button>
                 <button className="text-gray-600 font-semibold text-sm flex gap-2 items-center hover:bg-gray-100 px-4 py-2 rounded">Repost</button>
                 <button className="text-gray-600 font-semibold text-sm flex gap-2 items-center hover:bg-gray-100 px-4 py-2 rounded">Send</button>
             </div>
         </div>
      ))}
   </div>
);