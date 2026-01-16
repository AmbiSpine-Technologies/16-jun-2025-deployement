"use client";

import { useState } from "react";
import { Briefcase } from "lucide-react";
import Button from "../components/Button";

/* ================= DUMMY DATA (BACKEND READY) ================= */
const initialExperience = [
  {
    id: 1,
    company: "Spreadnext Inc",
    companyLogo: "/Spreads.svg",
    type: "Full Time · On Site",
    duration: "1 yr 3 months",
    roles: [
      {
        id: 11,
        title: "Project Director",
        duration: "1 yr 3 months · Current",
        description:
          "We are building the future with purpose — driven by a vision to blend human connection with intelligent technology.",
        media: ["/exp1.jpg", "/exp2.jpg"],
      },
      {
        id: 12,
        title: "Director",
        duration: "8 months",
        description:
          "Leading cross-functional teams and scaling product innovation across platforms.",
        media: [],
      },
    ],
  },
];

export default function Experience() {
  const [experience, setExperience] = useState(initialExperience);

  /* ================= REUSABLE RENDER ================= */
  const renderTimeline = (items, isEducation = false) => (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.id} className="flex gap-4">
          {/* Logo */}
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gray-100">
            <img
              src={item.companyLogo || item.logo}
              alt={item.company || item.institute}
              className="h-8 w-8 object-contain"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900">
              {item.company || item.institute}
            </h3>
            <p className="text-xs text-gray-500">
              {item.type} · {item.duration}
            </p>

            {/* Roles / Degrees */}
            <div className="mt-3 border-l pl-4 space-y-4">
              {(item.roles || item.degrees).map((sub) => (
                <div key={sub.id} className="relative">
                  <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-gray-400" />

                  <h4 className="text-sm font-medium text-gray-900">
                    {sub.title}
                  </h4>
                  <p className="text-xs text-gray-500">{sub.duration}</p>
                  <p className="mt-1 text-xs text-gray-600">
                    {sub.description}
                  </p>

                  {/* Media */}
                  {sub.media?.length > 0 && (
                    <div className="mt-2 flex gap-2">
                      {sub.media.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="media"
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="w-full bg-white pb-8 mt-5">
      {/* ================= EXPERIENCE ================= */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg text-gray-800 font-semibold flex items-center gap-2">
            <Briefcase size={18} /> Experience
          </h2>
          <Button name="Add" className="!text-xs" />
        </div>

        <div className="mt-5">{renderTimeline(experience)}</div>
      </div>
    </section>
  );
}
