
"use client";
import React, { useState, useEffect } from "react";
import TextAreaField from "../components/TextAreaField";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateSection, updateUser } from "../store/userSlice";


export default function ProfileAbout({ about, setAbout, onClose }) {
  const [draft, setDraft] = useState(about || ""); // local editable state
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users?.currentUser);


  // Determines if user typed something to switch button/title dynamically
  const isEditing = draft !== (about || "");

  useEffect(() => {
    setDraft(about || "");
  }, [about]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!draft.trim()) {
      setError("Overview cannot be empty.");
      return;
    }
    if (draft.trim() === (about || "").trim()) {
      setError("No changes made.");
      return;
    }

    // update parent UI immediately
    setAbout(draft.trim());

    // guard: currentUser must exist (usually it will)
    if (!currentUser) {
      setError("No user loaded. Try reloading the page.");
      return;
    }

    // build updated user object (no helper)
    const updatedUser = { ...currentUser, about: draft.trim() };

    // update Redux
    dispatch(updateUser(updatedUser));

    // persist to localStorage
    try {
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    } catch (err) {
      console.warn("localStorage write failed:", err);
    }

    setError("");
    onClose();
  };
  
  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h3 className="text-gray-600 font-semibold text-lg mb-2">
        {about ? (isEditing ? "Edit Overview" : "Edit Overview") : "Add Overview"}
      </h3>

      <TextAreaField
        value={draft}
        onChange={setDraft}
        placeholder="Write a short professional summary about your career, skills, and goals..."
        error={error}
        rows={6}
        maxLength={2000}
        showCount={true}
      />
      <div className="sticky not-first:right-0 -bottom-5 py-2">
       <div className="flex justify-end mt-4 gap-2">
        <Button
          type="button"
          buttonclass=" "
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button type="submit" buttonclass=" " variant="primary">
          {about ? "Update" : "Save"}
        </Button>
      </div>
      </div>
      
    </form>
  );
}
