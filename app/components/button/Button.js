import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function LinkButton({
  href,
  name,
  icon: IconComponent, // optional custom icon
  showIcon = true,      // control to show/hide icon
  linkclassname = "",
  centerText = false,
}) {
  const FinalIcon = IconComponent || MoveRight; // fallback to MoveRight

  return (
    <Link
      href={href}
      className={`bg-[#0A66C2] text-[15px] hover:bg-blue-700 text-white font-jost font-extrabold 
                  py-1.5 px-4 md:py-2 md:px-5 rounded-full transition-colors duration-200 
                  ${centerText ? "flex justify-center items-center" : "inline-flex items-center"}  hover:cursor-pointer gap-2 ${linkclassname}`}
    >
      <span>{name}</span>
      {showIcon && <FinalIcon className="w-5 h-5" />}
    </Link>
  );
}


export function NavLinkButton({
  href,
  text,
  icon: Icon, // optional icon component
  linkclassname = "",
}) {
  return (
    <Link
      href={href}
      className={`group relative text-white font-medium px-3 lg:px-4 py-1.5 lg:py-2 
                  rounded-full transition-all duration-300 hover:shadow-sm  hover:cursor-pointer
                  text-sm lg:text-base  ${linkclassname}`}
    >
      <span className="relative z-10 flex items-center space-x-1">
        {Icon && <Icon size={16} />} {/* Only render if icon passed */}
        <span>{text}</span>
      </span>
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#1200B1] 
                      transition-all duration-300 group-hover:w-full rounded-full"></span>
    </Link>
  );
}