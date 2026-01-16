"use client";
import Link from "next/link";

export default function ResumeStoryVideoCard({ videoSrc, username, img ="/AboutDumImg.jpeg ", isStory = true }) {
  return (
   <div className="flex flex-col items-center w-[120px] md:w-[140px] cursor-pointer group">

  <Link
    href={`/in/${username}`}
    className="relative w-full h-[150px] md:h-[160px] rounded-2xl overflow-hidden group-hover:scale-[1.03] transition"
  >
    {/* Video */}
    <video
      loop
      muted
      playsInline
      className="w-full h-full object-cover brightness-80 group-hover:brightness-100 transition"
    >
      <source src={videoSrc} type="video/mp4" />
    </video>

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

    {/* Avatar CENTERED */}
    <div className="absolute inset-0 flex bottom-0.5 items-end justify-center">
      <img
        src={img}
        alt="profile"
        className={`w-14 h-14 rounded-full border-3 ${
          isStory ? "border-[#00FF6A]" : "border-white"
        }`}
      />
    </div>
  </Link>

  {/* Username */}
  <p className="text-center text-[13px] text-[#373E41] mt-1 font-medium truncate w-full">
    {username}
  </p>
</div>

  );
}
