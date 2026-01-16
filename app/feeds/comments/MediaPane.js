// "use client";

// import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Image from "next/image";

// const FALLBACK_IMAGES = ["/SignInLeftImg1.jpg", "/pexels-magda-ehlers-pexels-1319515.jpg"];

// export default function MediaPane({ post }) {
//   // ✅ सही logic: हमेशा array return करे
//   const getImages = () => {
//     if (Array.isArray(post?.images) && post.images.length > 0) {
//       return post.images;
//     }
//     if (post?.image) {
//       return [post.image];
//     }
//     return FALLBACK_IMAGES;
//   };

//   const images = getImages(); // ✅ अब ये हमेशा array है
//   const [current, setCurrent] = useState(0);
//   const total = images.length;

//   const showLeft = total > 1 && current > 0;
// const showRight = total > 1 && current < total - 1;

//   // reset when post changes
//   useEffect(() => {
//     setCurrent(0);
//   }, [post]);

//   const prev = () => {
//     setCurrent((i) => (i === 0 ? total - 1 : i - 1));
//   };

//   const next = () => {
//     setCurrent((i) => (i === total - 1 ? 0 : i + 1));
//   };

//   // ✅ Debugging के लिए: console में देखें
//   useEffect(() => {
//     console.log("MediaPane Images:", images);
//     console.log("Current Image:", images[current]);
//   }, [images, current]);

//   return (
//     <div className="hidden md:flex w-full h-full bg-black relative items-center justify-center overflow-hidden">
//       {images.length > 0 && images[current] ? (
//         <Image
//           src={images[current]}
//           alt="Post media"
//           fill
          
//           sizes="(max-width: 768px) 100vw, 50vw"
//           className="object-contain transition-all duration-300"
//           onError={(e) => {
//             console.error("Image failed to load:", images[current]);
//             e.currentTarget.src = "/SignInLeftImg1.jpg"; // fallback
//           }}
//         />
//       ) : (
//         <div className="text-white">No image available</div>
//       )}

//       {/* Navigation arrows */}
//     {/* Navigation arrows */}
// {showLeft && (
//   <button
//     onClick={prev}
//     className="absolute left-0 hover:cursor-pointer z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
//     aria-label="Previous image"
//   >
//     <ChevronLeft size={20} />
//   </button>
// )}

// {showRight && (
//   <button
//     onClick={next}
//     className="absolute right-0 hover:cursor-pointer z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
//     aria-label="Next image"
//   >
//     <ChevronRight size={20} />
//   </button>
// )}

//       {/* Dots indicator */}
//       {total > 1 && (
//         <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
//           {images.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrent(i)}
//               className={`h-2 w-2 rounded-full transition-all ${
//                 i === current 
//                   ? "bg-white scale-125" 
//                   : "bg-white/40 hover:bg-white/60"
//               }`}
//               aria-label={`Go to image ${i + 1}`}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const FALLBACK_IMAGES = [
  "/SignInLeftImg1.jpg",
  "/pexels-magda-ehlers-pexels-1319515.jpg",
];

export default function MediaPane({ post }) {
  /**
   * 🔒 Always return a VALID, NON-EMPTY image array
   */
  const images = useMemo(() => {
    // Case 1: post.images (array)
    if (Array.isArray(post?.images)) {
      const validImages = post.images.filter(
        (img) => typeof img === "string" && img.trim() !== ""
      );
      if (validImages.length > 0) return validImages;
    }

    // Case 2: single post.image
    if (typeof post?.image === "string" && post.image.trim() !== "") {
      return [post.image];
    }

    // Case 3: fallback
    return FALLBACK_IMAGES;
  }, [post]);

  const [current, setCurrent] = useState(0);
  const total = images.length;

  const showLeft = total > 1 && current > 0;
  const showRight = total > 1 && current < total - 1;

  /**
   * 🔄 Reset index when post changes
   */
  useEffect(() => {
    setCurrent(0);
  }, [post]);

  const prev = () => {
    setCurrent((i) => (i === 0 ? total - 1 : i - 1));
  };

  const next = () => {
    setCurrent((i) => (i === total - 1 ? 0 : i + 1));
  };

  /**
   * 🛡️ Safety guard (never allow invalid index)
   */
  const currentImage = images[current] || FALLBACK_IMAGES[0];

  return (
    <div className="hidden md:flex w-full h-full bg-black relative items-center justify-center overflow-hidden">
      {/* Image */}
      <Image
        src={currentImage}
        alt="Post media"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-contain transition-all duration-300"
        priority={current === 0} // ✅ preload only first image
      />

      {/* Left Arrow */}
      {showLeft && (
        <button
          onClick={prev}
          className="absolute left-0 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Right Arrow */}
      {showRight && (
        <button
          onClick={next}
          className="absolute right-0 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Dots Indicator */}
      {total > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                i === current
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
