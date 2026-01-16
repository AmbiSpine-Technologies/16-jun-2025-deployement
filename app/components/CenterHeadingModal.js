"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function CenterHeadingModal({
  show,
  onClose,
  title,
  children,

  /* layout */
  widthClass = "max-w-lg",
  bodyClass = "",
  contentClass = "",

  /* header */
  centerTitle = true,
  headingClass = "",
  showClose = true,

  /* positioning */
  verticalCenter = true, // 🔥 NEW
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    if (show) {
      document.body.style.overflow = "hidden";
      const onKey = (e) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", onKey);
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = "unset";
      };
    }
  }, [show, mounted, onClose]);

  if (!mounted || !show) return null;

  return createPortal(
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/60"
        onClick={onClose}
      />


        <div
  className={`fixed inset-0 z-50 flex justify-center ${
    verticalCenter ? "items-center" : "items-start mt-20"
  }`}
>

        <div
          className={`relative w-full m-2 px-4 bg-white rounded-3xl shadow-2xl border max-h-[85vh] overflow-hidden ${widthClass}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          {(title || showClose) && (
            <div className="relative flex items-center border-b pb-1.5 border-gray-400 px-6  pt-3">
              {title && (
                <h3
                  className={`
                    text-xl text-gray-800
                    ${centerTitle ? "absolute left-1/2 -translate-x-1/2 text-center" : ""}
                    ${headingClass}
                  `}
                >
                  {title}
                </h3>
              )}

              {showClose && (
                <button
                  onClick={onClose}
                  className="ml-auto p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          {/* BODY */}
          <div className={`px-6 pt-4 overflow-y-auto custom-scroll ${bodyClass}`}>
            {children}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
