"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import EmptyState from "../components/EmptyState";

export default function EducationList({
  educations,
  onAdd,
  onEdit,
  onDelete,
  profileUser,
}) {
  const [showAll, setShowAll] = useState(false);
  const currentUser = useSelector((s) => s.users?.currentUser);
  const isOwner = currentUser?.id === profileUser?.id;

  if (!educations?.length) {
    return (
      <EmptyState
        image="/Happy Girl.png"
        alt="certificate"
        message="No education added yet."
      />
    );
  }
  const displayed = showAll ? educations : educations.slice(0, 2);

  return (
    <div className="relative">
      <div className="border-l-2 border-gray-300 ml-6 mt-4 relative">
        {displayed.map((edu, idx) => (
          <div key={idx} className="relative mb-12 pl-8">
            {/* Logo */}
            <div className="absolute -left-[30px] ms-1 flex items-center justify-center">
              {edu.logo ? (
                <Image
                  src={edu.logo}
                  alt={edu.institution}
                  width={50}
                  height={50}
                  className="rounded-2xl object-cover"
                />
              ) : (
                <span className="w-[50px] h-[50px] flex items-center justify-center bg-[#31298a] text-white rounded-2xl text-sm font-bold">
                  {edu.institution?.charAt(0)?.toUpperCase() || "E"}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-lg">
                    {edu.educationLevel} in {edu.fieldOfStudy}
                  </h4>
                  <p className="text-gray-300 text-xs">
                    {edu.institution}
                    {edu.university && `, ${edu.university}`}
                  </p>
                  <p className="text-gray-300 text-[12px]">
                    {edu.startDate?.month}/{edu.startDate?.year} -{" "}
                    {edu.currentlyStudying
                      ? edu.expectedGraduation?.month &&
                        edu.expectedGraduation?.year
                        ? `${edu.expectedGraduation.month}/${edu.expectedGraduation.year}`
                        : "Present"
                      : edu.endDate?.month && edu.endDate?.year
                      ? `${edu.endDate.month}/${edu.endDate.year}`
                      : "N/A"}
                  </p>

                  {edu.grade && (
                    <p className="text-gray-300 text-[12px]">
                      Grade: {edu.grade}
                    </p>
                  )}
                  {edu.achievements && (
                    <p className="text-gray-300 text-[12px] mt-1">
                      Achievements: {edu.achievements}
                    </p>
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

              {/* Certificate/Media */}
              {edu.media && (
                <div className="mt-2">
                  <a
                    href={
                      typeof edu.media === "string"
                        ? edu.media
                        : URL.createObjectURL(edu.media)
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Image
                      src={
                        typeof edu.media === "string"
                          ? edu.media
                          : URL.createObjectURL(edu.media)
                      }
                      alt="Certificate"
                      width={160}
                      height={100}
                      className="object-cover rounded-md hover:shadow-lg transition"
                    />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Show more/less */}
      {educations.length > 2 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-white font-semibold hover:underline"
          >
            {showAll ? "Show less" : `Show all ${educations.length} records`}
          </button>
        </div>
      )}
    </div>
  );
}
