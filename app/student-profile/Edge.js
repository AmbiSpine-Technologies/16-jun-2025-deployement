"use client";
import React, { useState } from "react";
import { Buttonborder } from "../components/Button";
import { useSelector } from "react-redux";
import { IoFilterOutline, IoLockClosedOutline } from "react-icons/io5";
import { GoBook } from "react-icons/go";
import { MdMenuBook } from "react-icons/md";
import {
  FaUserGraduate,
  FaFileAlt,
  FaStar,
  FaChevronRight,
} from "react-icons/fa";
import { HiOutlineStar } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import SkillsSection from "./SkillProfile";
import ProfileSkillSection from "./ProfileSkillSection";
import { FaRegAddressCard } from "react-icons/fa";
import EdgeOverView from "./EdgeOverView";
import MentorsSection from "../components/MentorsSection";
import { Button2 } from "../components/button/Button2";

export default function Edge({ user }) {
  const currentUser = useSelector((state) => state.users?.currentUser);
  const isOwner = currentUser?.id === user?.id;
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("overview");
  const [hoveredService, setHoveredService] = useState(null);

  const tabs = [
    { id: "overview", label: "Overview", icon: FaUserGraduate },
    { id: "skills", label: "Skills", icon: FaStar },
    { id: "mentors", label: "Mentors", icon: IoFilterOutline },
  ];

  const premiumServices = [
    {
      id: 1,
      title: "Premium Courses",
      desc: "Industry-curated learning paths",
      hoverDesc: [
        "50+ Expert-led Courses",
        "Career-focused Content",
        "Certification Included",
        "Lifetime Access",
      ],
      tag: "Most Popular",
      action: "Explore Now",
      Icon: GoBook,
      type: "course",
    },
    {
      id: 2,
      title: "Resume Building",
      desc: "ATS-optimized resume creation",
      hoverDesc: [
        "AI Resume Score",
        "Keyword Optimization",
        "Preview Before Export",
      ],
      tag: "Limited Access",
      action: "Preview",
      Icon: MdMenuBook,
      type: "resume",
    },
    {
      id: 3,
      title: "Mentor Support",
      desc: "1-on-1 guidance from professionals",
      hoverDesc: [
        "Personalized Career Guidance",
        "Industry Expert Sessions",
        "Career Path Planning",
      ],
      tag: "Premium",
      action: "Coming Soon",
      disabled: true,
      type: "mentor",
    },
  ];

  const handleAction = (service) => {
    if (service.disabled) return;
    if (service.type === "mentor") router.push("/mentor-support");
    else if (service.type === "course") router.push("/courses");
    // else if (service.type === "resume") router.push("/resume-builder");
  };

  return (
    <div className=" relative p-6  border-t-[0.3px] border-[#cccccc]  bg-white">

      {/* Tabs Header */}
      <div className="flex justify-between items-center pb-6 flex-wrap gap-3">
        <h1 className="mb-2.5 font-semibold text-2xl text-gray-700">Edge</h1>
        
        <div className="flex flex-wrap space-x-2.5 gap-3">
          {tabs.map((tab) => (
            <Button2
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              // icon={tab.icon}
              name={tab.label}
              classNameborder={`capitalize transition ${activeTab === tab.id
                ? "text-white !bg-[#0668E0] !font-bold"
                : "text-[#0668E0] "
                }`}
            />
          ))}
        </div>
      </div>

      {activeTab === "overview" && <EdgeOverView />}
      {activeTab === "skills" && <ProfileSkillSection />}
      {activeTab === "mentors" && <MentorsSection />}
      {/* project */}

      {/* Premium Services */}
      {activeTab === "premium" && (
        <div className="mt-10 space-y-6">
          {premiumServices.map((service, index) => {
            const isHovered = hoveredService === service.id;
            const ServiceIcon = service.Icon;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                className={`relative border border-[#aeadad] rounded-xl p-6 transition-all duration-300 group hover:border-[#2A2B32] ${service.disabled ? "opacity-60" : "opacity-100"
                  }`}
              >
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    {ServiceIcon && (
                      <ServiceIcon className="text-3xl border border-text-black p-1 text-gray-700" />
                    )}
                    {/* <h1 className="text-3xl font-bold text-[#7AA2FF]">
                      {String(index + 1).padStart(2, "0")}
                    </h1> */}
                    <div>
                      <h3 className="text-lg font-semibold">{service.title}</h3>
                      <p className="text-gray-400 text-sm">{service.desc}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="text-sm border border-gray-200 px-2 py-0.5  text-gray-400">
                      {service.tag}
                    </span>
                    <FaChevronRight className="text-gray-500 transform transition-all mt-2 duration-300 group-hover:translate-y-1 group-hover:rotate-90" />
                  </div>
                </div>

                {/* Hover Details */}
                {isHovered && service.hoverDesc && !service.disabled && (
                  <div className="mt-4 transition-all duration-300 ease-in-out animate-fadeIn">
                    <ul className="grid grid-cols-1 md:grid-cols-2 list-disc list-inside text-sm text-gray-300 space-y-1">
                      {service.hoverDesc.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>

                    {/* Conditional Buttons */}
                    {service.type === "course" && (
                      <div className="mt-4">
                        <Buttonborder
                          name="Explore Now"
                          classNameborder="!bg-white !text-black !font-semibold"
                          onClick={() => handleAction(service)}
                        />
                      </div>
                    )}

                    {service.type === "resume" && (
                      <div className="mt-4 text-gray-400 text-sm italic">
                        Hover to preview (no button available)
                      </div>
                    )}
                  </div>
                )}

                {/* Button */}
                <div className="mt-4">
                  {service.disabled && (
                    <div className="flex items-center gap-1 text-gray-500 text-sm border border-[#aeadad] rounded-md px-3 py-1">
                      <IoLockClosedOutline className="w-4 h-4" /> Coming Soon
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Notify Section */}
          <div className="border border-[#aeadad] p-5 flex gap-3 items-start rounded-xl">
            <HiOutlineStar className="text-gray-700 text-xl mt-1" />
            <div>
              <h3 className="text-sm text-gray-400">
                More premium services in Pipeline
              </h3>
              <p className="text-gray-500 text-xs mt-1">
                We're building something special. Additional career-boosting
                services will be revealed soon. Be the first to know when they
                launch.
              </p>
              <Buttonborder
                name="Notify Me"
                classNameborder="mt-3 !rounded-none !bg-transparent border-2 border-gray-400"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
