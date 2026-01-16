// "use client";
// import { useState, useRef, useEffect } from "react";
// import { IoChevronDown } from "react-icons/io5";

// export default function FormDropdown({ label, value, onChange, options, name }) {
//   const [open, setOpen] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);
//   const wrapperRef = useRef(null);

//   // Show floating label only when focused AND no value selected
//   const showFloatingLabel = isFocused && !value;

//   // Close dropdown on outside click
//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
//         setOpen(false);
//         setIsFocused(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleToggle = () => {
//     setOpen(!open);
//     setIsFocused(true);
//   };

//   const handleOptionClick = (opt) => {
//     onChange({
//       target: {
//         name,
//         value: opt,
//         type: "select-one",
//       },
//     });
//     setOpen(false);
//     setIsFocused(false);
//   };

//   return (
//     <div className="relative w-full" ref={wrapperRef}>
//       {/* Input box with floating label */}
//       <div
//         onClick={handleToggle}
//         className="w-full border-2 border-[#1442dc] h-12 rounded-full px-6 cursor-pointer flex justify-between items-center relative bg-white"
//       >
//         {/* Floating label - only shows when focused and no value */}
//         {showFloatingLabel && (
//           <label className="absolute left-6 top-2 text-xs text-blue-600 font-semibold bg-white px-2 pointer-events-none">
//             {label}
//           </label>
//         )}

//         {/* Selected value or static placeholder */}
//         <span className={`${value ? "text-gray-900" : "text-gray-400"} ${showFloatingLabel ? "mt-3" : ""}`}>
//           {value || (showFloatingLabel ? "" : label)}
//         </span>

//         <IoChevronDown className="text-gray-500" />
//       </div>

//       {/* Dropdown menu */}
//       {open && (
//         <div
//           className="absolute left-0 max-h-48 overflow-y-auto right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {options.map((opt, index) => (
//             <div
//               key={index}
//               className="py-2 px-4 text-gray-500 hover:bg-gray-100 cursor-pointer"
//               onClick={() => handleOptionClick(opt)}
//             >
//               {opt}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
// ---------------------------
// "use client";
// import { useState, useRef, useEffect } from "react";
// import { IoChevronDown } from "react-icons/io5";

// export default function FormDropdown({ label, value, onChange, options, name }) {
//   const [open, setOpen] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);
//   const wrapperRef = useRef(null);

//   // Floating label should show only when focused OR value is not empty
//   const showFloatingLabel = isFocused || value !== "";

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
//         setOpen(false);
//         setIsFocused(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const selectedLabel = options.find((o) => o.value === value)?.label || label;

//   return (
//     <div className="relative w-full" ref={wrapperRef}>

//       {/* Wrapper */}
//       <div
//         onClick={() => {
//           setOpen(!open);
//           setIsFocused(true);
//         }}
//         className="relative w-full border-2 border-[#1442dc] h-12 rounded-full px-6 cursor-pointer bg-white flex items-center"
//       >

//         {/* Floating Label */}
//         {showFloatingLabel && (
//           <label className="absolute top-[-10px] left-5 bg-white px-2 text-xs font-semibold text-blue-600 transition-all">
//             {label}
//           </label>
//         )}

//         {/* Selected text */}
//         <span
//           className={`text-sm ${
//             value ? "text-gray-900" : "text-gray-400"
//           } ${showFloatingLabel ? "mt-3" : ""}`}
//         >
//           {selectedLabel}
//         </span>

//         <IoChevronDown className="ml-auto text-gray-500" />
//       </div>

//       {/* Dropdown Menu */}
//       {open && (
//         <div className="absolute left-0 right-0 mt-2 bg-white max-h-48 overflow-y-auto border rounded-xl shadow-lg z-50">
//           {options.map((opt, i) => (
//             <div
//               key={i}
//               className="py-2 px-4 text-gray-700 hover:bg-gray-100 cursor-pointer"
//               onClick={() => {
//                 onChange({
//                   target: { name, value: opt.value, type: "select-one" },
//                 });
//                 setOpen(false);
//                 setIsFocused(false);
//               }}
//             >
//               {opt.label}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// jjjjjjjjjjjjj

"use client";
import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

export default function FormDropdown({
  label,
  value,
  onChange,
  options,
  name,
}) {
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef(null);

  // Floating label should show only when focused OR value is not empty AND not the default placeholder
  const showFloatingLabel = isFocused || (value && value !== "");

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label || label;

  return (
    <div className="relative w-full" ref={wrapperRef}>
      {/* Wrapper */}
      <div
        onClick={() => {
          setOpen(!open);
          setIsFocused(true);
        }}
        className="relative w-full border-2 border-[#1442dc] h-12 rounded-full px-6 cursor-pointer bg-white flex items-center"
      >
        {/* Floating Label */}
        {showFloatingLabel && (
          <label className="absolute top-[-10px] left-5 bg-white px-2 text-xs font-semibold text-blue-600 transition-all">
            {label}
          </label>
        )}

        {/* Selected text */}
        <span
          className={`text-sm ${
            value && value !== "" ? "text-gray-900" : "text-gray-400"
          } ${showFloatingLabel ? "" : ""}`}
        >
          {value && value !== "" ? selectedLabel : label}
        </span>

        <IoChevronDown className="ml-auto text-gray-500" />
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute left-0 right-0 mt-2 bg-white max-h-48 overflow-y-auto border rounded-xl shadow-lg z-50">
          {options.map((opt, i) => (
            <div
              key={i}
              className="py-2 px-4 text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange({
                  target: { name, value: opt.value, type: "select-one" },
                });
                setOpen(false);
                setIsFocused(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
