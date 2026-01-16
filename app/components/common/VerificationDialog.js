import React, { useRef, useEffect } from "react";

const VerificationDialog = ({ open, setOpen, title, message, onSubmit }) => {
  const dialogRef = useRef(null);

  // Close dialog when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20  z-50">
      <div
        ref={dialogRef}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center"
      >
        <h2 className="text-xl  text-gray-800 font-semibold mb-3">{title}</h2> 
        <p className="text-gray-800 mb-6 text-sm">{message}</p>
        <input
          type="text"
          placeholder="Enter Code"
          className="w-full border border-[#0033d9] text-gray-800 rounded-full px-4 py-2 mb-3 focus:outline-none"
        />
        <p className="text-xs text-gray-800 mb-4">
          Didn’t receive the code?{" "}
          <span className="text-[#0033d9] cursor-pointer hover:underline">
            Resend Code
          </span>
        </p>
        <button
          onClick={() => onSubmit()}
          className="bg-[#0033d9] text-white rounded-full px-6 py-2 font-medium hover:bg-[#002bb8] transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default VerificationDialog;