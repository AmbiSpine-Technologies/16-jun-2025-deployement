
// "use client";
// import React, { useMemo, useState } from "react";
// import InputForm from "../components/InputWithCount";

// export default function LocationFilter({ value, onChange, suggestions = [] }) {
//   const [showSuggestions, setShowSuggestions] = useState(false);

//   const handleChange = (e) => {
//     const newValue = e.target.value;
//     onChange(newValue);

//     if (
//       suggestions.some(
//         (loc) => loc.toLowerCase() === newValue.toLowerCase()
//       )
//     ) {
//       setShowSuggestions(false);
//     } else {
//       setShowSuggestions(true);
//     }
//   };

//   const handleSelect = (option) => {
//     onChange(option);
//     setShowSuggestions(false);
//   };

//   // optimized filtering
//   const filteredOptions = useMemo(() => {
//     if (!value) return [];
//     return suggestions.filter(
//       (option) =>
//         option.toLowerCase().includes(value.toLowerCase()) &&
//         option.toLowerCase() !== value.toLowerCase()
//     );
//   }, [value, suggestions]);

//   return (
//     <div className="relative w-full">
//       <InputForm
//         label="Location"
//         value={value}
//         onChange={handleChange}
//         placeholder="Search location..."
//         InputWithCountClass="text-sm !py-1.5"
//       />

//       {showSuggestions && filteredOptions.length > 0 && (
//         <ul className="absolute z-10 bg-white border border-gray-200 w-full mt-1 rounded-md shadow-md max-h-40 overflow-y-auto">
//           {filteredOptions.map((option, idx) => (
//             <li
//               key={idx}
//               className="px-3 py-1 cursor-pointer hover:bg-gray-100"
//               onClick={() => handleSelect(option)}
//             >
//               {option}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }



"use client";
import React, { useMemo, useState } from "react";
import {InputWithCount} from "../components/FormInput";

export default function LocationFilter({ value, onChange, suggestions = [] }) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);

    if (
      suggestions.some(
        (loc) => loc.toLowerCase() === newValue.toLowerCase()
      )
    ) {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
    }
  };

  const handleSelect = (option) => {
    onChange(option);
    setShowSuggestions(false);
  };

  // optimized filtering
  const filteredOptions = useMemo(() => {
    if (!value) return [];
    return suggestions.filter(
      (option) =>
        option.toLowerCase().includes(value.toLowerCase()) &&
        option.toLowerCase() !== value.toLowerCase()
    );
  }, [value, suggestions]);

  return (
    <div className="relative w-full">
      <InputWithCount
        label="Location"
        value={value}
        onChange={handleChange}
        placeholder="Search location..."
        InputWithCountClass="text-sm !py-1.5"
      />

      {showSuggestions && filteredOptions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-200 w-full mt-1 rounded-md shadow-md max-h-40 overflow-y-auto">
          {filteredOptions.map((option, idx) => (
            <li
              key={idx}
              className="px-3 py-1 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
