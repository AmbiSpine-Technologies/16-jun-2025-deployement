// components/post/RepostCard.jsx
"use client";
import React from "react";
import Link from "next/link";
import { FaShare } from "react-icons/fa";
import PostCard from "./PostCard";
import { Repeat2 } from "lucide-react";
import { Avatar } from "../components/common/Avatar";
// export default function RepostCard({ post, originalPost, ...handlers }) {
//   // originalPost expected to be the actual post object (found by parent)
//   return (
//     <div className="w-full p-8">
//       <div className="flex items-center text-gray-400 text-sm">
//         <FaShare className="" /> {post.user.name}
//         <Link href={`/profile/${post.user.username}`} className="text-gray-600 ms-4 font-medium hover:underline">         
//         </Link>{" "}
//        <span className="text-gray-600">+ 4 other  reposted </span>
//       </div>

//       <div className="">
//         <PostCard post={originalPost} {...handlers} />
//       </div>
//     </div>
//   );
// }


export default function RepostCard({
  post, // This is the repost object
  originalPost,
  // ... other props
}) {
  return (
    <div className="rounded-4xl p-4 bg-white">
      {/* Reposter info and repost icon */}
      <div className="flex items-center gap-2 px-6"> 
        <span className="text-sm flex items-center gap-2 text-gray-600">
          <div className="">
          <img src={post.user?.avatar || "/default-user-profile.svg"} />

          </div>
          <span className="font-medium ">
          {post.user?.name || "Rupendra Vishwakarma"} reposted

          </span>
        </span>
      </div>
      
      {/* Quote text if exists */}
      {post.quote && (
        <div className=" border-blue-500 rounded-r-lg">
          <p className="text-gray-800">{post.quote}</p>
        </div>
      )}
      
      {/* Original post */}
      <div className="">
        <PostCard
          post={originalPost}
          mode="embedded" // Add a new mode for embedded display
          // Pass minimal handlers for embedded view
        />
      </div>
    </div>
  );
}