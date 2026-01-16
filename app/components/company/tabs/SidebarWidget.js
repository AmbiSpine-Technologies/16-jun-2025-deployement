import { 
  MapPin, Globe, Users, CheckCircle, Plus, 
  MoreHorizontal, Building2, MessageSquare, 
  ArrowRight, ThumbsUp, MessageCircle, Share2, Send
} from 'lucide-react';

export const SidebarWidget = ({ title, items }) => (
   <div className="bg-white rounded-xl border border-gray-300 p-4 shadow-sm mb-4">
      <h3 className="text-base font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
         {items.map((item, i) => (
            <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
               <div className="w-12 h-12 bg-gray-200 rounded-sm flex-shrink-0"></div>
               <div>
                  <div className="text-sm font-semibold text-gray-900 hover:underline cursor-pointer line-clamp-1">
                     {item.name}
                  </div>
                  <div className="text-xs text-gray-500 line-clamp-2 mt-0.5">
                     {item.tagline}
                  </div>
                  <button className="mt-2 border border-gray-500 text-gray-600 rounded-full px-4 py-1 text-sm font-semibold hover:bg-gray-100 hover:border-gray-900 transition flex items-center gap-1">
                     <Plus size={14}/> Follow
                  </button>
               </div>
            </div>
         ))}
      </div>
      <button className="w-full mt-4 text-sm font-semibold text-gray-500 hover:bg-gray-100 py-2 rounded-md transition flex items-center justify-center gap-1">
         Show all <ArrowRight size={14}/>
      </button>
   </div>
);