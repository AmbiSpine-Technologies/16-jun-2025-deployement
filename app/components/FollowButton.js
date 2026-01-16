// "use client";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { followEntitySuccess, unfollowEntitySuccess } from "../store/userSlice";

// export default function FollowButtonUniversal({
//   targetId,
//   targetType = "user", // or "company" // college
//   followclassName = "",
// }) {
//   const dispatch = useDispatch();
//   const [hydrated, setHydrated] = useState(false);
//   const { currentUser, users, companies } = useSelector((s) => s.users || {});

//   useEffect(() => {
//     setHydrated(true);
//   }, []);

//   if (!hydrated || !currentUser) return null;

//   const targetList = targetType === "user" ? users : companies;
//   const target = targetList?.find((t) => t.id === targetId);

//   const isFollowing = currentUser.following?.includes(targetId);

//   const handleFollowToggle = () => {
//     const payload = {
//       followerId: currentUser.id,
//       targetId,
//       targetType,
//     };

//     if (isFollowing) dispatch(unfollowEntitySuccess(payload));
//     else dispatch(followEntitySuccess(payload));
//   };

//   return (
//     <button
//       onClick={handleFollowToggle}
//       className={`text-[12px] flex items-center justify-center gap-1 
//     px-4 py-1 min-h-[28px]
//     text-[#0668E0] border border-[#0668E0] rounded-full leading-none
//     font-semibold hover:cursor-pointer ${followclassName}`}
//     >
//       {isFollowing ? "Following" : "+ Follow"}
//     </button>

//   );
// }


// "use client";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { followEntitySuccess, unfollowEntitySuccess } from "../store/userSlice";

// export default function FollowButtonUniversal({
//   targetId,
//   targetType = "user",
//   followclassName = "",
//   isFollowing: isFollowingFromProps, 
// }) {
//   const dispatch = useDispatch();
//   const [hydrated, setHydrated] = useState(false);
//   const { currentUser } = useSelector((s) => s.users || {});

//   useEffect(() => {
//     setHydrated(true);
//   }, []);

//   if (!hydrated) return null;

//   // ✅ Check if it's following based on Props (onboarding) OR Redux (normal)
//   const isFollowing = isFollowingFromProps !== undefined 
//     ? isFollowingFromProps 
//     : currentUser?.following?.includes(targetId);

//   const handleFollowToggle = (e) => {
//     // Agar prop pass ho raha hai (Onboarding), toh hum handleFollowToggle parent se chalayenge
//     // Isliye yahan Redux dispatch ko skip karenge.
//     if (isFollowingFromProps !== undefined) return;

//     if (!currentUser) return;
//     const payload = { followerId: currentUser.id, targetId, targetType };

//     if (isFollowing) dispatch(unfollowEntitySuccess(payload));
//     else dispatch(followEntitySuccess(payload));
//   };

//   return (
//     <button
//       onClick={handleFollowToggle}
//       className={`text-[12px] flex items-center justify-center gap-1 
//     px-4 py-1 min-h-[28px] transition-all duration-200
//     ${isFollowing 
//       ? "bg-[#0668E0] text-white border-[#0668E0]" 
//       : "text-[#0668E0] border border-[#0668E0]"} 
//     rounded-full leading-none font-semibold hover:cursor-pointer ${followclassName}`}
//     >
//       {isFollowing ? "Following" : "+ Follow"}
//     </button>
//   );
// }



"use client";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { followUser, unfollowUser } from "@/app/utils/connectionsApi";
import { Check, X } from "lucide-react";

export default function FollowButtonUniversal({
  targetId,
  targetType = "user",
  followclassName = "",
  isFollowing: isFollowingFromProps,
}) {
  const { currentUser } = useSelector((s) => s.users || {});

  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ LOCAL FOLLOW STATE (Optimistic UI)
  const [isFollowing, setIsFollowing] = useState(false);

  /* -------------------- HYDRATION -------------------- */
  useEffect(() => {
    setHydrated(true);
  }, []);

  /* -------------------- INITIAL SYNC -------------------- */
  useEffect(() => {
    if (isFollowingFromProps !== undefined) {
      setIsFollowing(isFollowingFromProps);
    } else {
      setIsFollowing(
        currentUser?.following?.includes(targetId) || false
      );
    }
  }, [isFollowingFromProps, currentUser?.following, targetId]);

  /* -------------------- FOLLOW / UNFOLLOW -------------------- */
  const handleFollowToggle = useCallback(
    async (e) => {
      e.stopPropagation();

      if (!currentUser || loading) return;

      setLoading(true);

      // 🔥 Optimistic UI update
      setIsFollowing((prev) => !prev);

      try {
        if (isFollowing) {
          const res = await unfollowUser(targetId);
          if (!res?.success) throw new Error(res?.message);
        } else {
          const res = await followUser(targetId);
          if (!res?.success) throw new Error(res?.message);
        }
      } catch (err) {
        // ❌ rollback if API fails
        setIsFollowing((prev) => !prev);
        console.error(err);
        alert(err.message || "Action failed");
      } finally {
        setLoading(false);
      }
    },
    [currentUser, isFollowing, targetId, loading]
  );

  if (!hydrated) return null;

  /* -------------------- UI -------------------- */
  return (
    <button
      onClick={handleFollowToggle}

      className={`text-[12px] flex items-center justify-center gap-1
        px-4 py-1 min-h-[28px] transition-all duration-200
        border border-[#040d90] text-gray-500 rounded-full font-semibold leading-none
    hover:cursor-pointer
        ${followclassName}
      `}
    >
      {isFollowing ? (
        <>
          <X size={14} />
          <span>Unfollow</span>
        </>
      ) : (
        <>
          <Check size={14} />
          <span>Follow</span>
        </>
      )}
    </button>
  );
}
