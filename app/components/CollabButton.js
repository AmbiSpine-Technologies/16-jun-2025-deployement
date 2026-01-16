"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendCollabRequest } from "../store/userSlice";

export default function CollabButton({ targetId, collabclass = "", isFollowing }) {
  const dispatch = useDispatch();
  const { currentUser, collabs } = useSelector((s) => s.users);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !currentUser) return null; // Wait for client mount

const isConnected = (currentUser.connections || []).includes(targetId);

  const collab = collabs.find(
    (c) =>
      ((c.from === currentUser.id && c.to === targetId) ||
        (c.from === targetId && c.to === currentUser.id)) &&
      (c.status === "pending" || c.status === "accepted")
  );

 let label = isFollowing ? "Requested" : "Collab";
  let disabled = false;

  if (isConnected || (collab && collab.status === "accepted")) {
    label = "Connected";
    disabled = true;
  } else if (collab && collab.status === "pending") {
    if (collab.from === currentUser.id) {
      label = "Pending";
      disabled = true;
    } else {
      label = "Respond";
      disabled = false;
    }
  }

  const handleClick = () => {
    if (label === "Respond") return (window.location.href = "/notifications");
    dispatch(sendCollabRequest({ targetId, currentUserId: currentUser.id }));
  };

  return (
    <button
      className={`text-[13px] flex justify-center items-center gap-1 px-4 py-1.5 rounded-full bg-[#fff] border border-[#0668E0] font-semibold text-[#0668E0] hover:cursor-pointer ${collabclass}`}
      disabled={disabled}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
