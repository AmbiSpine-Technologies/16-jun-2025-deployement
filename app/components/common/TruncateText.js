"use client";
import { useState } from "react";

export default function TruncateText({
  text = "",
  shortLimit = 180,
  fullLimit = 2000,
  className = "",
  children,
}) {
  const [expanded, setExpanded] = useState(false);

  const isLong = text.length > shortLimit;
  const limit = expanded ? fullLimit : shortLimit;

  return (
    <div className={`${className} w-full`}>
          <div className="w-full ">
             {children(limit)}
          </div>
   
      {isLong && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          className="text-gray-600 hover:cursor-pointer text-[15px] font-medium"
        >
          {expanded ? "-...See less" : "+...See more"}
          {/* {expanded && (<span></span+...more )} */}

        </button>
      )}
    </div>
  );
}
// If  normal text
{/* <TruncateText text={bio}>
  {(limit) => bio.slice(0, limit)}
</TruncateText> */}