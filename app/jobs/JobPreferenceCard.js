
import { Plus, Pencil } from "lucide-react";
import { Bookmark, Briefcase } from "lucide-react";
import Link  from "next/link";
export default function JobPreferenceCard({ preferences }) {
  const { role, locations, industry, salary } = preferences;

  return (
    <div className=" bg-[#fff] text-center border border-[#cccccc] rounded-2xl p-5 ">
      
      {/* Header */}
      <h2 className="text-base text-left font-semibold text-gray-900 mb-4">
        Add preferences
      </h2>

      {/* Preferred Role */}
      <PreferenceRow
        label="Preferred job role"
        value={role}
      />

      {/* Preferred Location */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-500">Preferred work location</p>
          <Pencil className="w-4 h-4 text-blue-600 cursor-pointer" />
        </div>

        <div className="flex flex-wrap gap-2">
          {locations.map((city) => (
            <span
              key={city}
              className="px-3 py-1 text-xs rounded-full border border-gray-300  font-medium text-gray-700"
            >
              {city}
            </span>
          ))}
        </div>
      </div>

      {/* Preferred Industry */}
      <PreferenceRow
        label="Preferred industry"
        value={industry}
      />

      {/* Preferred Salary */}
      <PreferenceRow
        label="Preferred salary"
        value={salary}
      />
    </div>
  );
}

/* Reusable row */
function PreferenceRow({ label, value }) {
  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-sm text-gray-500">{label}</p>

      {value ? (
        <p className="text-xs font-semibold text-gray-800">
          {value}
        </p>
      ) : (
        <button className="flex items-center gap-1 text-blue-600 text-sm font-medium">
          <Plus className="w-4 h-4" />
          Add
        </button>
      )}
    </div>
  );
}



export function ManageJobsTabs({ active, setActive }) {
  return (
    <div className="border border-[#cccccc] rounded-2xl p-5  bg-white">

      {/* Heading */}
      <h3 className="text-base font-bold text-gray-900 mb-4">
        Manage Jobs
      </h3>

      {/* Tabs */}
      <div className="flex flex-col gap-2">
        <Link href="/save-items"
        className="flex items-center gap-3 px-4 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition"
      >
        <Bookmark className="w-4 h-4" />
        Saved Jobs
      </Link>

      {/* Posted Jobs */}
      <Link href="/company/hiring-talent"
        className="flex items-center gap-3 px-4 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition"
      >
        <Briefcase className="w-4 h-4" />
        Posted Jobs
      </Link>
      </div>
    </div>
  );
}
