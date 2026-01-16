"use client";
import { useState, useEffect, useRef } from "react";
import Button, { Buttonborder } from "../components/Button";
import ImageEditor from "./ImageEditor";
import { Crop, SlidersHorizontal, Zap, Tag, FileText, Edit3, X  } from "lucide-react";
import AutoGrowTextarea from '../components/TextAreaField';
import {InputField} from '../components/InputField';
import  { ImageEditorPost } from "./ImageEditor";
const steps = ["Crop", "Filters", "Adjust"];
import TextAreaField from "../components/TextAreaField";
import { createPortal } from "react-dom";
import Modal from "../components/Modal";
import { Button2 } from "../components/button/Button2";



// export default function ImageEditorModal({
//   show,
//   onClose,
//   image,
//   onSave,
//   mode = "auto",
// }) {
//   const [mounted, setMounted] = useState(false);
//   const editorRef = useRef(null);
//   const fileRef = useRef(null); // Ref for file input
  
//   // States: "idle" | "crop" | "filter" | "adjust"
//   const [editorStep, setEditorStep] = useState("idle"); 
// const [activeTool, setActiveTool] = useState("idle");
// const [currentImage, setCurrentImage] = useState(image);
//   useEffect(() => setMounted(true), []);


//   useEffect(() => {
//     if (!mounted) return;
//     if (show) {
//       document.body.style.overflow = "hidden";
//       const onKey = (e) => e.key === "Escape" && onClose();
//       window.addEventListener("keydown", onKey);
//       return () => {
//         document.body.style.overflow = "unset";
//         window.removeEventListener("keydown", onKey);
//       };
//     }
//   }, [show, mounted, onClose]);

//   const handleInternalFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setCurrentImage(url); // Update preview immediately
//       setActiveTool("crop"); // Go to crop mode for new image
//     }
//   };
//   const handleSave = async () => {
//     if (!editorRef.current) return;

//     // 1. Get the current result from the editor
//     const result = await editorRef.current.exportImage();
//     if (!result?.blob) return;

//     const url = URL.createObjectURL(result.blob);
    
//     // 2. Update the main preview
//     onSave(url); 

//     // 3. Logic: If inside a tool (Crop/Filter/Adjust), go back to Idle.
//     // If already in Idle, close the modal (Final Save).
//     if (["crop", "filter", "adjust"].includes(editorStep)) {
//       setEditorStep("idle"); 
//       // Reset the editor's internal mode to show just the image (optional logic depending on preference)
//     } else {
//       // Final save and close
//       onClose();
//     }
//   };

//   const handleToolClick = (toolName) => {
//      setEditorStep(toolName);
//   };

//   if (!mounted || !show) return null;

//   return createPortal(
//     <>
//       <div className="fixed inset-0 bg-[#0d0d0d89] z-40" onClick={onClose} />
//       <div className="fixed inset-0 z-50 flex justify-center items-center">
//         <div className="w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
          
//           {/* Header */}
//           <div className="sticky top-0 z-10 bg-white px-6 py-3 border-b flex justify-between items-center">
//             <h3 className="text-lg font-semibold text-gray-800">Cover Image</h3>
//             <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
//               <X className="w-5 h-5 text-gray-600" />
//             </button>
//           </div>

//           {/* Body */}
//           <div className="flex-1 overflow-y-auto custom-scroll py-4">
//             <ImageEditor
//               ref={editorRef}
//               initialImage={image}
//               mode={mode}
//               activeTool={editorStep} // Pass the active tool state down
//               onToolChange={handleToolClick}
//             />
//           </div>

//           {/* Footer */}
//           <div className="sticky bottom-0 bg-white px-6 py-4 border-t flex justify-between items-center">
//             {/* Left Side */}
//             <div>
//               {editorStep === "idle" && (
//                 <Buttonborder
//                   name="Remove"
//                   onClick={() => { onSave(null); onClose(); }}
//                 />
//               )}
//             </div>

//             {/* Right Side */}
//             <div className="flex gap-3">
//               {editorStep === "idle" && (
//                 <>
//                   <input type="file" ref={fileRef} className="hidden" 
//                   onChange={handleInternalFileChange} />
//                   <Button2 name="Change photo" onClick={() => fileRef.current?.click()} />
//                 </>
//               )}
              
//               {/* This Button handles both "Apply" (internal) and "Save" (final) */}
//               <Buttonborder 
//                 name={editorStep === "idle" ? "Save Photo" : "Apply"} 
//                 onClick={handleSave} 
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>,
//     document.body
//   );
// }


export default function ImageEditorModal({
  show,
  onClose,
  image,
  onSave,
  mode = "auto",
}) {
  const [mounted, setMounted] = useState(false);
  const editorRef = useRef(null);
  const fileRef = useRef(null);
  
  // State to track if we are in main menu ("idle") or using a tool
  const [activeTool, setActiveTool] = useState("idle"); 
  
  // Internal state for the image (allows changing it inside modal)
  const [currentImage, setCurrentImage] = useState(image);

  useEffect(() => setMounted(true), []);

  // Reset internal image when the modal opens with a new prop
  useEffect(() => {
    setCurrentImage(image);
    setActiveTool("idle");
  }, [image, show]);

  // Handle "Change Photo" inside the modal
  const handleInternalFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCurrentImage(url); // Update the preview
      // setActiveTool("crop"); // Optionally go straight to crop
    }
  };

  // 🔥 CORE LOGIC FIX
  const handleMainButtonClick = async () => {
    // Case 1: If we are INSIDE a tool (Crop/Filter), just go back to Main Menu
    if (activeTool !== "idle") {
      setActiveTool("idle");
      return; 
    }

    // Case 2: If we are in Main Menu ("idle"), SAVE and CLOSE.
    if (!editorRef.current) return;
    const result = await editorRef.current.exportImage();
    if (!result?.blob) return;

    onSave(URL.createObjectURL(result.blob)); // Send to parent
    onClose(); // Close modal
  };

  if (!mounted || !show) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 bg-[#00000028] z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex justify-center items-center ">
        <div className="w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
          
          {/* Header */}
          <div className="flex-none px-6 py-4 border-b flex justify-between items-center bg-white z-10">
            <h3 className="text-xl font-semibold text-gray-800">Edit Image</h3>
            <button onClick={onClose} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto custom-scroll ">
            <ImageEditor
              ref={editorRef}
              initialImage={currentImage} // 🔥 FIXED: Pass internal state, not prop
              mode={mode}
              activeTool={activeTool} 
              onToolChange={setActiveTool}
            />
          </div>

          {/* Footer */}
          <div className="flex-none px-6 py-4 border-t  border-[#cccccc] bg-white flex justify-between items-center">
            
            {/* Left Side: Change/Remove (Only visible in IDLE) */}
            <div className="flex gap-2">
                 {activeTool === "idle" && (
                   <>
                     <input 
                        type="file" 
                        ref={fileRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleInternalFileChange} 
                      />
                      <Buttonborder 
                        name="Change photo" 
                        variant="secondary"
                        onClick={() => fileRef.current?.click()} 
                      />
                      <Button2 
                        name="Remove" 
                        onClick={() => { onSave(null); }} 
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full px-4 py-2" 
                      />
                   </>
                 )}
            </div>

            {/* Right Side: Main Action Button */}
            <div>
              <Buttonborder 
                // 🔥 Text changes based on state
                name={activeTool === "idle" ? "Save Photo" : "Apply"} 
                variant="primary"
                onClick={handleMainButtonClick} 
              />
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

const stepspost = [
  { label: "Crop", icon: <Crop size={18} /> },
  { label: "Filters", icon: <Zap size={18} /> },
  { label: "Adjust", icon: <SlidersHorizontal size={18} /> },
];



export function ImageEditorModalPost({
  show,
  onClose,
  image,
  onSave,
}) {
  const [step, setStep] = useState(0);
  const [openSection, setOpenSection] = useState("alt"); // Start with alt section
  const [text, setText] = useState("");
  const [cropType, setCropType] = useState("original");
  const [tags, setTags] = useState([]);
  const textareaRef = useRef(null);
  // Auto-focus on textarea when alt section opens
  useEffect(() => {
    if (openSection === "alt" && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 300);
    }
  }, [openSection]);

  // Step navigation
  const steps = [
    { label: "Add alt", section: "alt" },
    { label: "Edit Image", section: "edit" },
    { label: "Add Tags", section: "tag" }
  ];

const handleNext = async () => {
  if (editorRef.current?.exportImage) {
    const result = await editorRef.current.exportImage();
    if (result?.blob) {
      const url = URL.createObjectURL(result.blob);
      onSave(url);
    }
  }

  // Step control
  if (editorStep === "crop") {
    setEditorStep("filter");
    return;
  }

  if (editorStep === "filter") {
    setEditorStep("idle");
    onClose();
  }
};



  return (
    <Modal
      show={show}
      onClose={onClose}
      title={`Edit Image — ${steps[step]?.label || "Edit"}`}
      widthClass="!w-[700px]"
      backdropClass="backdrop-blur-md"
    >
      {/* Progress Steps */}
      <div className="flex justify-center gap-8 py-4 border-b">
        {steps.map((s, idx) => (
          <button
            key={s.section}
            onClick={() => {
              setOpenSection(s.section);
              setStep(idx);
            }}
            className={`flex flex-col items-center font-semibold ${idx <= step ? "text-blue-600 border-b-2 px-1" : "text-gray-400"}`}
          >
         
            <span className="text-sm font-semibold">{s.label}</span>
           
          </button>
        ))}
      </div>

      {/* Content based on openSection */}
      <div className="p-6">
        {openSection === "alt" && (
          <div className="space-y-4">
            <div className="flex max-w-xl h-[370px] justify-center mb-4">
              <img 
                src={image} 
                alt="Preview" 
                className="max-h-fll ma-w-full rounded-lg object-cover"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Description (Alt Text)
              </label>
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Describe your image for accessibility and SEO..."
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">
                {text.length}/500 characters
              </p>
            </div>
          </div>
        )}

        {openSection === "edit" && (
          <ImageEditorPost
            initialImage={image}
            mode="editor"
          />
        )}

        {openSection === "tag" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Tags
              </label>
              <p className="text-sm text-gray-500 mb-3">
                Tags help categorize your image (max 10)
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full"
                  >
                    <span className="text-sm font-medium">#{tag}</span>
                    <button
                      onClick={() => setTags(tags.filter((_, i) => i !== index))}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              
              <input
                type="text"
                placeholder="Type a tag and press Enter or comma"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ',') && e.target.value.trim()) {
                    e.preventDefault();
                    const value = e.target.value.trim();
                    if (!tags.includes(value) && tags.length < 10) {
                      setTags([...tags, value]);
                      e.target.value = '';
                    }
                  }
                }}
              />
              
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Suggested Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {['Nature', 'Travel', 'Portrait', 'Landscape', 'Urban', 'Food', 'Art', 'Business', 'Technology', 'Education'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => {
                        if (!tags.includes(tag) && tags.length < 10) {
                          setTags([...tags, tag]);
                        }
                      }}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

     
        <div className="sticky bottom-0 bg-white border-t mt-8 pt-4 pb-4 px-6 -mx-6 flex justify-between items-center shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
  <div>
    {step > 0 && (
      <button
        onClick={handlePrev}
        className="px-5 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition"
      >
        ← Back
      </button>
    )}
  </div>

  <div className="flex gap-3">
    <button
      onClick={onClose}
      className="px-5 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition"
    >
      Cancel
    </button>

    <button
      onClick={handleNext}
      className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
    >
      {step === steps.length - 1 ? "Save & Continue" : "Next →"}
    </button>
  </div>
</div>

      </div>
    </Modal>
  );
}
