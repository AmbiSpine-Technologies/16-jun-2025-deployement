"use client";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/userSlice";
import ContactInfoModal from "./ContactInfoModal";
import { Button2 } from "../components/button/Button2";
import { ImageEditMenuOnly } from "./ImageEditMenu"; 
import ImageEditorModal from "./ImageEditorModal";
import { Camera } from "lucide-react";

export default function ProfileTopSection({ user }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((s) => s.users?.currentUser);
  const isOwner = currentUser?.id === user?.id;
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editTarget, setEditTarget] = useState(null); 
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  const fileRef = useRef(null);

  const handleEditClick = (target, imgUrl) => {
    setEditTarget(target);
    setSelectedImage(imgUrl);
    setEditorOpen(true);
  };

  const handleUploadClick = (target) => {
    setEditTarget(target);
    fileRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setEditorOpen(true);
    }
  };

  return (
    <div className="relative">
      
      {/* ================= COVER ================= */}
      <div className="relative group overflow-hidden h-32 md:h-[170px] rounded-2xl border bg-[#fafafa]">
        {/* 🔥 CHECK: Display image if exists, OTHERWISE show EmptyPlaceholder */}
        {currentUser?.cover ? (
          <>
            <img src={currentUser.cover} className="w-full h-full object-cover" />
            {isOwner && (
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                <ImageEditMenuOnly onClick={() => handleEditClick("cover", currentUser.cover)} />
              </div>
            )}
          </>
        ) : (
          isOwner && (
            <EmptyPlaceholder onClick={() => handleUploadClick("cover")} />
          )
        )}
      </div>

      {/* ================= AVATAR ================= */}
      <div className="absolute -bottom-12 left-8 md:left-10 w-20 h-20 md:w-[100px] md:h-[100px] rounded-xl border bg-[#fafbff] overflow-hidden group ">
         {/* 🔥 CHECK: Display image if exists, OTHERWISE show EmptyPlaceholder */}
        {currentUser?.avatar ? (
          <>
            <img src={currentUser.avatar} className="w-full h-full object-cover" />
            {isOwner && (
               <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition">
                  <ImageEditMenuOnly onClick={() => handleEditClick("avatar", currentUser.avatar)} />
               </div>
            )}
          </>
        ) : (
          isOwner && (
             <EmptyPlaceholder onClick={() => handleUploadClick("avatar")} />
          )
        )}
      </div>

      {/* ================= EDIT PROFILE BUTTON ================= */}
      {isOwner && (
        <div className="absolute right-2 top-full mt-5">
          <Button2 onClick={() => setIsContactModalOpen(true)} name="Edit Profile" className="!text-sm h-8 !px-4 !py-1" />
        </div>
      )}

      {/* Hidden Global Input */}
      <input ref={fileRef} type="file" hidden accept="image/*" onChange={handleFileChange} />

      {/* Editor Modal */}
      <ImageEditorModal
        show={editorOpen}
        image={selectedImage}
        mode={editTarget === "cover" ? "cover" : "avatar"}
        onClose={() => setEditorOpen(false)}
        onSave={(url) => {
            // 🔥 If url is NULL (Remove clicked), this updates Redux to null, triggers EmptyPlaceholder
            dispatch(updateUser({ [editTarget]: url }));
            setEditorOpen(false);
        }}
      />
      
      <ContactInfoModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        user={currentUser}
        onSave={(updatedInfo) => {
          dispatch(updateUser(updatedInfo));
          setIsContactModalOpen(false);
        }}
      />
    </div>
  );
}

function EmptyPlaceholder({ onClick }) {
  return (
    <button 
      onClick={onClick}
      className="w-full h-full flex items-center justify-center transition-colors group cursor-pointer"
    >
      <div className="w-10 h-10 rounded-full  flex items-center justify-center   text-gray-400">
        <Camera size={18} />
      </div>
    </button>
  );
}