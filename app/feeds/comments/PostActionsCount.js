import { Heart, MessageCircle, Repeat2, Bookmark, Forward } from "lucide-react";

function PostActionsCount({ likes = 0, comments = 0, reposts = 0, saved = false }) {
  return (
    <div className="flex  items-center space-x-6 md:space-x-10 text-gray-500 text-sm pt-2 max-w-[360px]">
      
      {/* Like */}
      <div className="flex items-center gap-1">
        <Heart size={20} />
        <span>{likes}</span>
      </div>

      {/* Comment */}
      <div className="flex items-center gap-1">
        <MessageCircle size={20} />
        <span>{comments}</span>
      </div>

      {/* Repost */}
      <div className="flex items-center gap-1">
        <Repeat2 size={20} />
        <span>{reposts}</span>
      </div>

      {/* Save / Bookmark */}
      <div className="flex gap-2">
       <div className="flex items-center gap-1">
        <Bookmark size={20} />
         {/* className={saved ? "text-blue-600" : "text-gray-500"} /> */}
      </div>

      {/* Forward / Share */}
      <div className="flex items-center gap-1">
        <Forward size={20} />
      </div>
      </div>
     
    </div>
  );
}

export default PostActionsCount;
