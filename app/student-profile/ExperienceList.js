"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Calendar1, MapPin, CheckCircle2 } from "lucide-react";
import { useSelector } from "react-redux";
import EmptyState from "../components/EmptyState";

export default function ExperienceList({
  experiences,
  onAdd,
  onEdit,
  onDelete,
  profileUser,
}) {
  const [showAll, setShowAll] = useState(false);
  const currentUser = useSelector((s) => s.users?.currentUser);
  const isOwner = currentUser?.id === profileUser?.id;

  if (!experiences?.length) {
    return (
      <EmptyState
        image="/Happy Girl.png"
        alt="certificate"
        message="No experience added yet."
      />
    );
  }

  return (
    <div>
      <div className="relative border-l-2 border-gray-300 ml-2 mt-4 space-y-8">
        {(showAll ? experiences : experiences.slice(0, 2)).map((exp, idx) => (
          <div key={idx} className="relative pl-6">
            {/* Logo */}
            <div className="absolute -left-[30px] ms-1 flex items-center justify-center">
              {exp.logo ? (
                <Image
                  src={exp.logo}
                  alt={exp.company}
                  width={50}
                  height={50}
                  className="rounded-2xl object-cover"
                />
              ) : (
                <span className="w-[50px] h-[50px] flex items-center justify-center bg-[#077bda] text-white rounded-2xl text-sm font-bold">
                  {exp.company?.charAt(0)?.toUpperCase() || "C"}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="flex justify-between gap-10 items-start">
              <div className="ms-6">
                <h4 className="font-semibold text-lg text-white">
                  {exp.jobTitle}
                </h4>
                <p className="text-gray-200 text-xs">{exp.company}</p>

                <p className="text-sm mt-2 flex items-center flex-wrap gap-2">
                  <span className="border rounded-2xl border-gray-100 text-[10px] py-0.5 px-1 text-white">
                    {exp.employmentType}
                  </span>
                  <span className="text-gray-100 text-[12px] flex gap-1 items-center">
                    <Calendar1 className="w-4 h-4" />
                    {exp.startDate.month} {exp.startDate.year} -{" "}
                    {exp.currentlyWorking
                      ? "Present"
                      : `${exp.endDate.month} ${exp.endDate.year}`}
                  </span>
                  <span className="flex gap-1 text-gray-100 text-[12px]">
                    <MapPin className="w-4 h-4" /> {exp.location}
                  </span>
                </p>

                <p className="text-white my-2 text-sm">{exp.description}</p>

                {/* Skills */}
                {exp.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {exp.skills.slice(0, 3).map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 border border-gray-400 pt-1 text-white text-[10px] rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {exp.skills.length > 3 && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 border text-sm rounded-full">
                        +{exp.skills.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Achievements */}
                {exp.keyAchievements?.length > 0 && (
                  <div className="mt-3">
                    <h4 className="font-semibold text-white">
                      Key Achievements:
                    </h4>
                    <ul className="pl-1 mt-2 space-y-2">
                      {exp.keyAchievements.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 text-gray-200" />
                          <span className="text-gray-200">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Media */}
                {exp.media && (
                  <div className="mt-2">
                    <a
                      href={
                        typeof exp.media === "string"
                          ? exp.media
                          : URL.createObjectURL(exp.media)
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={
                          typeof exp.media === "string"
                            ? exp.media
                            : URL.createObjectURL(exp.media)
                        }
                        alt="Work sample"
                        width={160}
                        height={100}
                        className="object-cover rounded-md hover:shadow-lg transition"
                      />
                    </a>
                  </div>
                )}
              </div>

              {/* Actions only for owner */}
              {currentUser && (
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(idx)}
                    className="p-1 border rounded-lg border-blue-300 text-white"
                  >
                    <CiEdit />
                  </button>
                  <button
                    onClick={() => onDelete(idx)}
                    className="p-1 border rounded-lg border-red-300 text-red-700"
                  >
                    <MdDelete />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {experiences.length > 2 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 font-semibold hover:underline"
          >
            {showAll
              ? "Show less"
              : `Show all ${experiences.length} experiences`}
          </button>
        </div>
      )}
    </div>
  );
}
