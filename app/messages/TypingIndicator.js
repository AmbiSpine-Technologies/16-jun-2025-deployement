"use client";

import React from "react";

/**
 * TypingIndicator
 *
 * @param {Array} typingUsers - array of users currently typing
 * Example: [{ id: 1, name: "Anjali" }]
 */
export default function TypingIndicator({ typingUsers = [] }) {
  if (!typingUsers.length) return null;

  const names = typingUsers.map((u) => u.name);

  const typingText =
    names.length === 1
      ? `${names[0]} is typing`
      : `${names.slice(0, 2).join(", ")} ${
          names.length > 2 ? "and others" : ""
        } are typing`;

  return (
    <div className="flex items-center gap-2 px-3 py-1 text-sm text-gray-500">
      <span>{typingText}</span>

      <div className="flex gap-1">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>

      <style jsx>{`
        .dot {
          width: 4px;
          height: 4px;
          background-color: #6b7280;
          border-radius: 50%;
          animation: blink 1.4s infinite both;
        }

        .dot:nth-child(1) {
          animation-delay: 0s;
        }
        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes blink {
          0% {
            opacity: 0.2;
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}
