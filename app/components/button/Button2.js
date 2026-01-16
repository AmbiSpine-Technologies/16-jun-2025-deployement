import React from "react";

export default function Button({
  children,
  type = "button",
  buttonclass = "",
  onClick,
  icon: Icon, // icon component (optional)
  showicon = false, // only show icon when true
  ...props
}) {
  return (
    <button
      type={type}
      className={`flex items-center gap-2 px-2 py-1.5 rounded-3xl hover:cursor-pointer transition text-[#2d53fb] hover:text-[#0331fc] ${buttonclass}`}
      onClick={onClick}
      {...props}
    >
      {showicon && Icon && <Icon className="text-lg" />}
      {children}
    </button>
  );
}

export function Button2({
  type = "button",
  name,
  onClick,
  classNameborder = "",
  icon: Icon,
  showIcon,   
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      {...props}
      className={`text-sm flex justify-center items-center gap-1 px-3 py-1.5 rounded-full bg-[#fff] border border-[#0668E0] font-semibold text-[#0668E0] hover:cursor-pointer ${classNameborder}`}
    >
      <span className="text-[12px]">{name}</span>
      {showIcon && Icon && <Icon className="w-5 h-5" />}
    </button>
  );
}
