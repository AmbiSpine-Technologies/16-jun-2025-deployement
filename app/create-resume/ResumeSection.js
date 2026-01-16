"use client";
import { FiChevronDown, FiChevronUp, FiPlus } from "react-icons/fi";

const ResumeSection = ({ 
  title, 
  isCollapsed, 
  onToggle, 
  onAdd,
  hasContent,
  children 
}) => {
  return (
    <div className="border-b border-gray-200">
      {/* Section Header */}
      <div className="flex items-center justify-between py-4 px-4 transition-colors">
        {/* Left side - Title with toggle */}
        <button
          suppressHydrationWarning
          onClick={onToggle}
          className="flex items-center gap-2 flex-1 text-left"
        >
          <span className="font-medium text-gray-900 text-[15px]">
            {title}
          </span>
          
          {/* Content count badge */}
          {hasContent && (
            <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {hasContent}
            </span>
          )}
        </button>

        {/* Right side - Add button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onAdd) {
              onAdd();
            }
          }}
          className="flex items-center gap-1 text-[13px] text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Add
          <FiPlus size={16} strokeWidth={2.5} />
        </button>
      </div>

      {/* Section Content - Only visible when NOT collapsed */}
      {!isCollapsed && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default ResumeSection;