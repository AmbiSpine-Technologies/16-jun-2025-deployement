
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






// "use client";
// import React, { useState } from "react";
// import { FaRegEdit } from "react-icons/fa";
// import { MdOutlineAddComment } from "react-icons/md";
// import { IoDiamondOutline } from "react-icons/io5";
// import { GoDotFill } from "react-icons/go";
// import { X } from "lucide-react";
// import Button from "../components/Button";
// import TextAreaField from "../components/TextAreaField";
// import { AnimatedWrapper } from "../animation/animation";

// export default function AboutSection() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [about, setAbout] = useState("");
//   const [skills, setSkills] = useState([]);
//   const [newSkill, setNewSkill] = useState("");
//   const [errors, setErrors] = useState({});
//   const [showSkillInput, setShowSkillInput] = useState(false);

//   // ✅ Validation
//   const validateForm = () => {
//     let newErrors = {};
//     if (!about.trim()) newErrors.about = "About section cannot be empty.";
//     return newErrors;
//   };

//   // ✅ Submit
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
//     console.log("✅ Saved Data:", { about, skills });
//     setErrors({});
//     setIsModalOpen(false);
//   };

//   // ✅ Add Skill (with validation)
//   const addSkill = () => {
//     if (!newSkill.trim()) return;
//     if (skills.includes(newSkill.trim())) {
//       alert("Skill already added!");
//       return;
//     }
//     if (skills.length >= 5) {
//       alert("You can add only up to 5 skills.");
//       return;
//     }
//     setSkills([...skills, newSkill.trim()]);
//     setNewSkill("");
//   };

//   return (
//     <div className="p-6 mb-4 border border-gray-400 rounded-sm transition-all">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h3 className="text-xl font-medium font-[jost]">About</h3>
//         <Button
//           onClick={() => setIsModalOpen(true)}
//           buttonclass="bg-white text-blue-700 px-3 py-1 flex items-center gap-1 hover:!bg-transparent hover:!text-blue-800"
//         >
//           {about ? (
//             <>
//               <FaRegEdit className="w-6 h-6" /> Edit
//             </>
//           ) : (
//             <>
//               <MdOutlineAddComment className="w-6 h-6" /> Add
//             </>
//           )}
//         </Button>
//       </div>

//       {/* About Text */}
//       {about ? (
//         <div className="mt-4 text-gray-800  whitespace-pre-line">
//           {about}
//         </div>
//       ) : (
//         <p className="mt-4 text-gray-500">
//           Add a short introduction about yourself, your skills, and career goals.
//         </p>
//       )}

//       {/* ✅ Modal */}
//       {isModalOpen && (
//         <AnimatedWrapper className="fixed  inset-0 flex items-center justify-center bg-[#0b0b0b71] z-50">
//           <div className="bg-white m-3 rounded-sm w-full max-w-2xl">
//             {/* Header */}
//             <div className="relative border-b border-gray-300 py-3 px-6">
//               <h3 className="text-lg font-medium">Edit About & Skills</h3>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="absolute top-3 right-3 p-2 text-gray-500 hover:text-black hover:cursor-pointer"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className=" p-4">
//               <h3 className="my-2 text-xl text-black font-semibold font-[inter]">A skill, habit, or personality trait that makes you unique.</h3>
//   {/* About */}
//   <TextAreaField
//     label="About You"
//     placeholder="Write about your experience, skills, and aspirations..."
//     value={about}
//     onChange={(e) => setAbout(e.target.value)}
//     error={errors.about}
//     rows={6}
//   />

//   {/* Buttons */}
//   <div className="flex gap-3 justify-end ">
//     <Button
//       type="button"
//       onClick={() => setIsModalOpen(false)}
//       buttonclass="bg-gray-300 text-black hover:bg-gray-400"
//     >
//       Cancel
//     </Button>
//     <Button
//       type="submit"
//       buttonclass="!bg-blue-700 text-white hover:bg-blue-800"
//     >
//       Save
//     </Button>
//   </div>
// </form>

//           </div>
//         </AnimatedWrapper>
//       )}
//     </div>
//   );
// }
