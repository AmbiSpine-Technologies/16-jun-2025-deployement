"use client";
import Button from "../components/Button";

export function CompanyCard({ logo, name, followers }) {
  return (
    <div className="bg-white  p-4 rounded-2xl">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={logo}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-gray-500">{followers} Followers</p>
        </div>
      </div>
      <Button buttonclass="w-full border !bg-transparent border-gray-300 p-2 rounded-md text-sm hover:!text-gray-900">
        Follow
      </Button>
    </div>
  );
}

export default function CompanySuggestions() {
  const companies = [
    {
      id: 1,
      logo: "/google.svg",
      name: "Amazon Pay India",
      followers: "11M",
    },
    {
      id: 2,
      logo: "/amazon.png",
      name: "Microsoft India",
      followers: "9M",
    },
     {
      id: 3,
      logo: "/google.svg",
      name: "Amazon Pay India",
      followers: "11M",
    },
  ];

  return (
    <div className="py-6">
      <h2 className="font-semibold mb-4 text-[20px] ">Companies to Follow</h2>
      <div className="flex flex-col gap-4">
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            logo={company.logo}
            name={company.name}
            followers={company.followers}
          />
        ))}
      </div>
    </div>
  );
}