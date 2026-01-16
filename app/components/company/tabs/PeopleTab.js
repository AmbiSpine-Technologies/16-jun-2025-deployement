import { 
  MapPin, Globe, Plus, MoreHorizontal, CheckCircle, 
  Search, Briefcase, Map, ChevronRight, ChevronLeft 
} from 'lucide-react';

export const PeopleTab = ({ stats }) => {
   const companyData = {
  people: [
    {
      id: 1,
      name: "Amit Sharma",
      role: "Founder & CEO",
      department: "Leadership"
    },
    {
      id: 2,
      name: "Neha Verma",
      role: "Chief Technology Officer",
      department: "Engineering"
    },
    {
      id: 3,
      name: "Rahul Singh",
      role: "Senior Frontend Engineer",
      department: "Engineering"
    },
    {
      id: 4,
      name: "Pooja Mehta",
      role: "Backend Engineer",
      department: "Engineering"
    },
    {
      id: 5,
      name: "Sandeep Kumar",
      role: "Product Manager",
      department: "Product"
    },
    {
      id: 6,
      name: "Anjali Gupta",
      role: "UI/UX Designer",
      department: "Design"
    },
    {
      id: 7,
      name: "Rohit Yadav",
      role: "HR Manager",
      department: "Human Resources"
    },
    {
      id: 8,
      name: "Sneha Patel",
      role: "Talent Acquisition Lead",
      department: "Human Resources"
    }
  ]
};

  const StatBar = ({ label, count, percent }) => (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center justify-between text-sm mb-1">
         <span className="font-semibold text-gray-700 truncate max-w-[80%]">{label}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-sm h-12 relative flex items-center px-2 overflow-hidden group cursor-pointer hover:bg-gray-200 transition">
          {/* Progress Bar Background */}
          <div 
            className="absolute left-0 top-0 h-full bg-[#466a6e] transition-all duration-500" 
            style={{ width: `${percent}%` }}
          ></div>
          <span className="relative z-10 font-bold text-gray-700 ml-1">{count}</span>
          <span className="relative z-10 text-gray-500 ml-2 text-xs truncate">| {label}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-gray-300 p-6 shadow-sm">
       <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">10 associated members <span className="text-gray-500 text-sm font-normal">ⓘ</span></h2>
          <div className="flex gap-2">
             <button className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-30"><ChevronLeft size={20}/></button>
             <button className="p-1 rounded-full hover:bg-gray-100"><ChevronRight size={20}/></button>
          </div>
       </div>

       <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
          <input 
             type="text" 
             placeholder="Search employees by title, keyword or school" 
             className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-sm text-sm focus:border-black focus:ring-1 focus:ring-black outline-none bg-white"
          />
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Where they live */}
          <div className="border border-gray-200 rounded-lg p-4">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900">Where they live</h3>
                <button className="text-gray-600 hover:bg-gray-100 p-1 rounded"><Plus size={16} className="inline"/> Add</button>
             </div>
             {stats.whereTheyLive.map((item, i) => <StatBar key={i} {...item} />)}
             <button className="w-full mt-2 py-1 text-gray-500 hover:bg-gray-100 text-sm font-semibold rounded">Show all</button>
          </div>

          {/* Where they studied */}
          <div className="border border-gray-200 rounded-lg p-4">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900">Where they studied</h3>
                <button className="text-gray-600 hover:bg-gray-100 p-1 rounded"><Plus size={16} className="inline"/> Add</button>
             </div>
             {stats.whereTheyStudied.map((item, i) => <StatBar key={i} {...item} />)}
             <button className="w-full mt-2 py-1 text-gray-500 hover:bg-gray-100 text-sm font-semibold rounded">Show all</button>
          </div>
       </div>

          <div className="bg-white rounded-xl border border-gray-300 p-6 shadow-sm">
         <h2 className="text-lg font-bold text-gray-900 mb-4">Leadership & Employees</h2>
         <div className="space-y-3">
            {companyData.people.map(person => (
               <div key={person.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">{person.name.split(' ').map(n => n[0]).join('')}</div>
                  <div className="flex-1"><h3 className="font-bold text-gray-900 text-sm">{person.name}</h3><p className="text-xs text-gray-600">{person.role} • {person.department}</p></div>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">Connect</button>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}
