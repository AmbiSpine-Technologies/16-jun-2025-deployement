import React from "react";

export default function FormField({ label, formField, icon, children }) {
  return (
    <div className={`space-y-1 w-full ${formField}`}>
      {label && (
        <label className="form-label flex items-center gap-2 text-[#717171]">
          {icon && <span className="text-blue-600">{icon}</span>}
          {label}
        </label>
      )}
      {children}
    </div>
  );
}
