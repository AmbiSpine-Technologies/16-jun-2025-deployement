"use client";
import { useState, useRef, useEffect } from "react";
import { Pencil, Image as ImageIcon, Trash2, Eye } from "lucide-react";
import { Camera } from 'lucide-react';

export default function ImageEditMenu({
  image,
  onUpload,
  onRemove,
  position = "avatar", //avatar | cover
  buttonclssname = "",
  iconsize=12,
}) {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const fileRef = useRef(null);
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
 
            <button
        onClick={() => setOpen((p) => !p)}
        className={`
               p-1.5 bg-black/70 text-white rounded-full
          hover:bg-black hover:scale-110 active:scale-95
          transition-all duration-200 group hover:cursor-pointer
        ${buttonclssname}
          `}
     
      >
        <Pencil size={iconsize} />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50">
          <button
            onClick={() => setConfirm("upload")}
            className="flex items-center text-gray-700 gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100"
          >
            <ImageIcon size={14} /> Upload Image
          </button>

          {image && (
            <button
              onClick={() => setConfirm("remove")}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <Trash2 size={14} /> Remove Image
            </button>
          )}

          {image && (
            <button
              onClick={() => window.open(image, "_blank")}
              className="flex items-center text-gray-700 gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100"
            >
              <Eye size={14} /> View Image
            </button>
          )}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (!e.target.files?.[0]) return;
          onUpload(e.target.files[0]);
          setConfirm(null);
          setOpen(false);
        }}
      />

      {/* Confirmation Modal */}
      {confirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-5 w-[320px]">
            <h3 className="font-semibold text-gray-700 mb-2">
              {confirm === "upload" ? "Upload Image?" : "Remove Image?"}
            </h3>

            <p className="text-sm text-gray-600">
              {confirm === "upload"
                ? "Do you want to upload a new image?"
                : "Do you want to remove this image?"}
            </p>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setConfirm(null)}
                className="px-4 py-1.5 text-gray-800 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (confirm === "upload") fileRef.current.click();
                  if (confirm === "remove") onRemove();
                  setConfirm(null);
                  setOpen(false);
                }}
                className={`px-4 py-1.5 rounded-lg text-white ${confirm === "remove" ? "bg-red-600" : "bg-blue-600"
                  }`}
              >
                {confirm === "upload" ? "Upload" : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export  function ImageEditMenuOnly({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        opacity-0 group-hover:opacity-100
        transition-opacity duration-200
        p-1.5 bg-black/70 text-white rounded-full hover:cursor-pointer
      "
    >
      <Pencil size={12} />
    </button>
  );
}
export function CameraPlaceholder({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        w-full h-full flex items-center justify-center
        cursor-pointer text-gray-400 hover:text-gray-600
      "
    >
      <Camera size={26} />
    </div>
  );
}