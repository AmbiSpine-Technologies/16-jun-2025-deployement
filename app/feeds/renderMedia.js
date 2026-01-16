// export const renderMedia = ({post}) => {
//     if (!post) return null;
    
//     switch (post.type) {
//       case "image":
//          if (!post?.media || post.media.length === 0) return null;

//   const images = getImagesFromMedia(post.media);
//   const videos = post.media.filter(m => m.type === "video");

//       if (images.length === 0) return null;
      
//       const imageCount = images.length;
//       console.log(imageCount);
//       // Single image
//       if (imageCount === 1) {
//         return (
//           <div className="">
//              <img 
//                  src={images[0]}
            
//                 className="w-full h-full bg-gray-200 rounded-xl border-2 border-gray-400 object-cover"
//                 alt="Post image"
//                 style={getCardImageStyle('square', 'large')}
//               />
//           </div>
//         );
//       }
      
//       // Multiple images
//       return (
//         <div className="">
//           <div className="flex gap-3 overflow-x-auto  custom-scroll">
//             {images.map((img, index) => (
//               <div 
//                 key={index}
//                 className="flex-shrink-0 rounded-xl overflow-hidden"
               
//               >
//                 <img 
//                   src={img} 
//                   className="w-full h-full object-cover"
//                   alt={`Post image ${index + 1}`}
//                    style={getCardImageStyle('square', 'small')}
//                 />
//               </div>
//             ))}
            
//           </div>
//         </div>
//       );
//       case "video":
//         if (post.video) {
//           return (
//             <div className="rounded-lg overflow-hidden mb-3" onClick={(e) => e.stopPropagation()}>
//               <video
//                 src={post.video}
//                 controls
//                 className="w-full h-[300px] object-cover"
//               >
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           );
//         }
//         return null;

//    "use client";

// // Inside your switch/case or renderMedia function
// case "poll":
//   return post.poll ? (
//     <div className="border border-gray-200 rounded-xl p-4 mb-4 bg-white shadow-sm">
//       <h4 className="font-bold text-gray-900 text-sm mb-4 leading-snug">
//         {post.poll.question}
//       </h4>

//       <div className="space-y-2">
//         {post.poll.options.map((option, index) => {
//           const totalVotes = post.poll.votes?.reduce((a, b) => a + b, 0) || 0;
//           const voteCount = post.poll.votes?.[index] || 0;
//           const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
          
//           // isSelected is defined inside this map for each specific button
//           const isSelected = post.pollSelection === index;

//           return (
//             <button
//               key={index}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onPollVote?.(post.id, index);
//               }}
//               className={`relative w-full h-11 rounded-full border transition-all overflow-hidden flex items-center group ${
//                 isSelected ? "border-blue-600 ring-1 ring-blue-600" : "border-blue-500 hover:bg-blue-50"
//               }`}
//             >
//               {/* Progress Background */}
//               {post.poll.votes && (
//                 <div
//                   className={`absolute left-0 top-0 h-full transition-all duration-700 ease-out ${
//                     isSelected ? "bg-blue-100" : "bg-gray-100/50"
//                   }`}
//                   style={{ width: `${percentage}%` }}
//                 />
//               )}

//               <div className="relative z-10 w-full px-4 flex justify-between items-center font-semibold text-sm">
//                 <div className="flex items-center gap-2">
//                   <span className={isSelected ? "text-blue-700" : "text-blue-600"}>
//                     {option}
//                   </span>
//                   {isSelected && (
//                     <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
//                       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
//                     </svg>
//                   )}
//                 </div>
//                 {post.poll.votes && <span className="text-gray-700">{percentage}%</span>}
//               </div>
//             </button>
//           );
//         })}
//       </div>

//       {/* FOOTER: Fixed 'isSelected' error by checking pollSelection directly */}
//       <div className="flex items-center gap-2 mt-3">
//         <span className="text-xs text-gray-500">
//           {post.poll.votes?.reduce((a, b) => a + b, 0) || 0} votes
//         </span>
//         <span className="text-gray-300">•</span>
//         <span className="text-xs text-gray-500">{post.poll.timeLeft} left</span>
        
//         {/* If the user has selected ANY option, show Undo */}
//         {post.pollSelection !== null && (
//           <>
//             <span className="text-gray-300">•</span>
//             <button 
//               className="text-xs font-bold text-blue-600 hover:underline"
//               onClick={() => onPollVote?.(post.id, null)} // Pass null to reset
//             >
//               Undo
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   ) : null;

// // ... inside your component logic
// case "poll":
//   return post.poll ? (
//     <div className="border border-gray-200 rounded-xl p-4 mb-4 bg-white shadow-sm">
//       {/* Question Header */}
//       <h4 className="font-bold text-gray-900 text-sm mb-4 leading-snug">
//         {post.poll.question}
//       </h4>

//       <div className="space-y-2">
//         {post.poll.options.map((option, index) => {
//           const totalVotes = post.poll.votes?.reduce((a, b) => a + b, 0) || 0;
//           const voteCount = post.poll.votes?.[index] || 0;
//           const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
//           const isSelected = post.pollSelection === index;

//           return (
//             <button
//               key={index}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onPollVote?.(post.id, index);
//               }}
//               className={`relative w-full h-11 rounded-full border transition-all overflow-hidden flex items-center group ${
//                 isSelected ? "border-blue-600 ring-1 ring-blue-600" : "border-blue-500 hover:bg-blue-50"
//               }`}
//             >
//               {/* Progress Bar Background Fill */}
//               {post.poll.votes && (
//                 <div
//                   className={`absolute left-0 top-0 h-full transition-all duration-700 ease-out ${
//                     isSelected ? "bg-blue-100" : "bg-gray-100/50"
//                   }`}
//                   style={{ width: `${percentage}%` }}
//                 />
//               )}

//               {/* Content Layer */}
//               <div className="relative z-10 w-full px-4 flex justify-between items-center font-semibold text-sm">
//                 <div className="flex items-center gap-2">
//                   <span className={isSelected ? "text-blue-700" : "text-blue-600"}>
//                     {option}
//                   </span>
//                   {isSelected && (
//                     <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
//                       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
//                     </svg>
//                   )}
//                 </div>
                
//                 {post.poll.votes && (
//                   <span className="text-gray-700">{percentage}%</span>
//                 )}
//               </div>
//             </button>
//           );
//         })}
//       </div>

//       {/* Footer info */}
//       <div className="flex items-center gap-2 mt-3">
//         <span className="text-xs text-gray-500">
//           {post.poll.votes?.reduce((a, b) => a + b, 0) || 0} votes
//         </span>
//         <span className="text-gray-300">•</span>
//         <span className="text-xs text-gray-500">{post.poll.timeLeft} left</span>
//         {isSelected && (
//           <>
//             <span className="text-gray-300">•</span>
//             <button className="text-xs font-bold text-blue-600 hover:underline">Undo</button>
//           </>
//         )}
//       </div>
//     </div>
//   ) : null;
//       default:
//         return null;
//     }
//   };

export  const renderMedia = ({post}) => {
  if (!post?.media || post.media.length === 0) return null;

  const images = post.media
    .filter(m => m.type === "image")
    .map(m => m.url);

  const videos = post.media
    .filter(m => m.type === "video")
    .map(m => m.url);

  /* ================= IMAGES ================= */
  if (images.length > 0) {
    // Single Image
    if (images.length === 1) {
      return (
        <div className="mt-2">
          <img
            src={images[0]}
            alt="Post image"
            className="w-full max-h-[420px] object-cover rounded-xl border"
          />
        </div>
      );
    }

    // Multiple Images (Horizontal Scroll)
    return (
      <div className="mt-2 flex gap-3 overflow-x-auto custom-scroll">
        {images.map((img, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[260px] h-[260px] rounded-xl overflow-hidden border"
          >
            <img
              src={img}
              alt={`Post image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  /* ================= VIDEOS ================= */
  if (videos.length > 0) {
    return (
      <div
        className="mt-2 rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          src={videos[0]}
          controls
          className="w-full max-h-[420px] object-cover"
        />
      </div>
    );
  }

  return null;
};
