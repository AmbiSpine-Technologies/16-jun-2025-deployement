import Link from 'next/link';
import { Building2, GraduationCap, ArrowRight } from "lucide-react";
import { GlobalLoader } from '../Loader';
import ActionTrigger from "@/app/components/common/ActionTrigger";
const SelectionCard = ({ title, description, logo, onClose, link }) => {
  return (
    <Link  href={link} onClick={() => onClose()} className="flex flex-col items-center p-6 border border-gray-300 rounded-2xl  group">
      
      {/* Icon */}
      <div className="w-20 h-20 flex items-center justify-center mb-4">
        <img
          src={logo}
          alt={title}
          className="w-20 h-20 object-contain"
        />
      </div>

      {/* Text (CENTERED) */}
      <h4 className="font-semibold text-gray-900 text-lg text-center">
        {title}
      </h4>

      <p className="text-gray-500 text-sm text-center mt-2 max-w-[260px]">
        {description}
      </p>


    </Link>
  );
};

export default function CreateSelection({onClose}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 pb-10 gap-5">
      <SelectionCard 
        icon={GraduationCap}
        title="Institute Page"
        logo="/college icon.svg"
        onClose={onClose}
        description="Add your institution details, courses, and campus facilities."
        link="/college/create-college-page"
      />
      
      <SelectionCard 
        icon={Building2}
        title="Company Profile"
        logo="/Company's icon.svg"
        onClose={onClose}
        description="Showcase your company culture, jobs, and employee benefits."
        link="/company/create-company-page"
      />
    </div>
  );
}