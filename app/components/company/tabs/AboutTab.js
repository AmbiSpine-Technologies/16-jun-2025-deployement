import { MapPin, Globe, } from 'lucide-react';

export const AboutTab = ({ data }) => (
  <div className="space-y-4">
    <div className="bg-white  p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
      <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-line mb-4">
        {data.description}
      </p>
      <p className="text-sm text-gray-900 leading-relaxed mb-4">
        We are actively working across key areas such as AI-powered IT solutions, IT consulting services, and end-to-end product development.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
           <h3 className="text-sm font-bold text-gray-900 mb-1">Website</h3>
           <a href={data.website} className="text-sm text-[#0a66c2] hover:underline font-semibold block mb-4">{data.website}</a>

           <h3 className="text-sm font-bold text-gray-900 mb-1">Industry</h3>
           <p className="text-sm text-gray-900 mb-4">{data.industry}</p>

           <h3 className="text-sm font-bold text-gray-900 mb-1">Company size</h3>
           <p className="text-sm text-gray-900 mb-1">{data.companySize}</p>
           <p className="text-xs text-gray-500 mb-4">10 associated members</p>

           <h3 className="text-sm font-bold text-gray-900 mb-1">Headquarters</h3>
           <p className="text-sm text-gray-900 mb-4">{data.headquarters}</p>
        </div>
        <div>
           <h3 className="text-sm font-bold text-gray-900 mb-1">Founded</h3>
           <p className="text-sm text-gray-900 mb-4">{data.founded}</p>

           <h3 className="text-sm font-bold text-gray-900 mb-1">Specialties</h3>
           <p className="text-sm text-gray-900 mb-4">{data.specialties}</p>
        </div>
      </div>
    </div>

  
  </div>
);