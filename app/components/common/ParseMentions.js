
"use client";
import Link from "next/link";

export default function ParseMentions({ text = "" }) {
  if (!text) return null;

  // 🔥 Split by new lines first
  const lines = text.split("\n");

  return (
    <>
      {lines.map((line, lineIndex) => {
        const parts = line.split(/(@\w+|#\w+|https?:\/\/[^\s]+)/g);

        return (
          <span key={lineIndex}>
            {parts.map((part, i) => {
              if (part.startsWith("@")) {
                return (
                  <Link
                    key={i}
                    href={`/profile/${part.slice(1)}`}
                    className="text-blue-600 text-[15px] font-medium"
                  >
                    {part}
                  </Link>
                );
              }

              if (part.startsWith("#")) {
                return (
                  <span key={i} className="text-blue-500 text-[15px] font-medium">
                    {part}
                  </span>
                );
              }

              if (/https?:\/\/[^\s]+/.test(part)) {
                return (
                  <a
                    key={i}
                    href={part}
                    target="_blank"
                    className="text-blue-500 underline text-[15px]"
                  >
                    {part}
                  </a>
                );
              }

              // ✅ NORMAL TEXT → inline (NO NEW LINE)
              return (
                <span
                  key={i}
                  className="text-[#303a53] font-roboto text-[15px]"
                >
                  {part}
                </span>
              );
            })}

            {/* ✅ ONLY if user pressed ENTER */}
            {lineIndex < lines.length - 1 && <br />}
          </span>
        );
      })}
    </>
  );
}
