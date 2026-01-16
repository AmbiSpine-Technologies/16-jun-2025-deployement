import React from "react";

export default function Button({
  children,
  type = "button",
  buttonclass = "",
  onClick,
  icon: Icon, 
  showIcon = false,
  ...props
}) {
  // Aapki batayi hui default styling
  const defaultClasses = "rounded-full py-1.5 px-8 font-semibold bg-[#0013E3] text-white hover:bg-blue-800 transition-colors";

  return (
    <button type={type}
      onClick={onClick}
      {...props}
      // defaultClasses ke saath buttonclass ko merge kiya hai
      className={`flex items-center hover:cursor-pointer justify-center ${defaultClasses} ${buttonclass}`}
    >
      {showIcon && Icon && <Icon className="text-lg" />}
      
      {children && <span className={showIcon ? "ml-2" : ""}>{children}</span>}
    </button>
  );
}
export function Buttonborder({
  type = "button",
  name,
  onClick,
  classNameborder = "",
  icon: Icon,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      {...props}
      className={`text-[13px] flex justify-center items-center gap-1 px-4 py-1.5 rounded-full bg-[#0418f8fe] font-medium text-white hover:cursor-pointer  ${classNameborder}`}
    >
      {name} {Icon && <Icon className="w-5 h-5" />}
    </button>
  );
}
