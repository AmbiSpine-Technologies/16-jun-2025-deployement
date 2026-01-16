// "use client";
// import React, { useState, useRef, useEffect } from "react";

// export default function SearchableDropdown({
//   label,
//   value,
//   onChange,
//   options,
//   placeholder = "Type or select...",
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState(value || "");
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     setSearchTerm(value || "");
//   }, [value]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const filteredOptions = (options || []).filter((option) =>
//     String(option)
//       .toLowerCase()
//       .includes(String(searchTerm || "").toLowerCase())
//   );

//   const handleSelect = (option) => {
//     setSearchTerm(option);
//     onChange(option);
//     setIsOpen(false);
//   };

//   const handleInputChange = (e) => {
//     const newValue = e.target.value;
//     setSearchTerm(newValue);
//     onChange(newValue);
//     setIsOpen(true);
//   };

//   const showOptions = isOpen && (filteredOptions.length > 0 || searchTerm);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={handleInputChange}
//         onFocus={() => setIsOpen(true)}
//         placeholder=""
//         className="w-full border-2 border-[#1442dc] rounded-full px-6 h-12 bg-white text-gray-900 focus:outline-none focus:ring-0 peer"
//         style={{
//           outline: "none",
//           boxShadow: "none",
//         }}
//       />
//       <label className="absolute top-[-10px] left-5 bg-white px-2 text-xs font-semibold text-blue-600 transition-all pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:top-[-10px] peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:font-semibold">
//         {label}
//       </label>

//       {showOptions && (
//         <div className="absolute z-50 w-full mt-1 bg-white border-2 border-blue-200 rounded-2xl shadow-lg max-h-60 overflow-y-auto">
//           {filteredOptions.length > 0 ? (
//             filteredOptions.map((option, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleSelect(option)}
//                 className="px-6 py-3 hover:bg-blue-50 cursor-pointer transition-colors first:rounded-t-2xl last:rounded-b-2xl text-gray-900"
//                 style={{
//                   color: "#111827",
//                 }}
//               >
//                 {option}
//               </div>
//             ))
//           ) : (
//             <div
//               className="px-6 py-3 text-gray-500 italic"
//               style={{ color: "#6b7280" }}
//             >
//               {/* Press Enter to use "{searchTerm}" */}
//                {searchTerm}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }



"use client";
import React, { useState, useRef, useEffect } from "react";

export default function SearchableDropdown({
  label,
  value,
  onChange,
  options,
  placeholder = "Type or select...",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || "");
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSearchTerm(value || "");
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = (options || []).filter((option) =>
    String(option)
      .toLowerCase()
      .includes(String(searchTerm || "").toLowerCase())
  );

  const handleSelect = (option) => {
    setSearchTerm(option);
    onChange(option);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    onChange(newValue);
    setIsOpen(true);
  };

  // ✅ New Logic: Handle Enter Key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Form submit hone se rokne ke liye

      if (filteredOptions.length > 0) {
        // Condition 1: Agar match hai, to pehla option select karo
        handleSelect(filteredOptions[0]);
      } else {
        // Condition 2: Agar match nahi hai, to dropdown band karo (typed value wahi rahegi)
        setIsOpen(false);
      }
    }
  };

  const showOptions = isOpen && (filteredOptions.length > 0 || searchTerm);

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        // onKeyDown event yahan add kiya gaya hai
        onKeyDown={handleKeyDown} 
        placeholder=""
        className="w-full border-2 border-[#1442dc] rounded-full px-6 h-12 bg-white text-gray-900 focus:outline-none focus:ring-0 peer"
        style={{
          outline: "none",
          boxShadow: "none",
        }}
      />
      <label className="absolute top-[-10px] left-5 bg-white px-2 text-xs font-semibold text-blue-600 transition-all pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:top-[-10px] peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:font-semibold">
        {label}
      </label>

      {showOptions && (
        <div className="absolute z-50 w-full mt-1 bg-white border-2 border-blue-200 rounded-2xl shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                // className={`px-6 py-3 cursor-pointer transition-colors first:rounded-t-2xl last:rounded-b-2xl text-gray-900 
                //   ${index === 0 ? "bg-blue-50" : "hover:bg-blue-50"} 
                // `} // Optional: First item ko highlight dikhane ke liye bg-blue-50 add kiya
                // style={{
                //   color: "#111827",
                // }}
              className="px-6 py-3 hover:bg-blue-50 cursor-pointer transition-colors first:rounded-t-2xl last:rounded-b-2xl text-gray-900"
                style={{
                  color: "#111827",
                }}
              >
                {option}
              </div>
            ))
          ) : (
            <div
              className="px-6 py-3 text-gray-500 italic cursor-pointer hover:bg-gray-100"
              style={{ color: "#6b7280" }}
              // Agar user "No result" pe click kare to bhi value set ho jaye
              onClick={() => setIsOpen(false)}
            >
              {searchTerm}
            </div>
          )}
        </div>
      )}
    </div>
  );
}