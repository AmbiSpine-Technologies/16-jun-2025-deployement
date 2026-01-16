"use client";
import { BadgeCheck, Icon } from "lucide-react";
import React from "react";

export default function AdvertisementCard({ companyName, tagline, logo, link }) {
    const handleClick = () => {
        console.log(`Ad clicked: ${companyName}`);
        if (link) window.open(link, "_blank");
    };

    return (
        <div
            onClick={handleClick}
            className="bg-white w-full  mt-4  border-[0.3px] border-[#cccccc] rounded-4xl shadow-md px-6 py-6 flex flex-col gap-2 hover:scale-[1.01] transition cursor-pointer"
        >
            <div className="flex justify-between">
                {/* square logo avatar */}
                <img
                    src={"/spreads.svg"}
                    alt={companyName}
                    className="start h-10 w-10 rounded-lg object-cover"
                />

                <h2 className="text-xs mb-4 text-gray-700 text-end">
                    Promoted Ads.
                </h2>
            </div>

            <h2 className="text-sm font-semibold text-gray-800 text-start">
                {companyName}
                {Icon && <BadgeCheck className="inline-block ml-1 w-4 h-4 text-blue-700" />}
            </h2>

            <p className="text-xs text-gray-500 text-start leading-tight">
                {tagline}
            </p>


            <div className="w-full py-2 flex flex-col items-start">
                <p className="text-black leading-relaxed text-start text-xs mt-2 mb-0 ">
                    <b>Sudeep </b>
                    & other 164 other connections also follow.
                </p>

                <button className="px-2 py-1 mt-2 border-2 border-blue-600 text-blue-600 text-xs rounded-full hover:border-blue-700 transition">
                    Learn More
                </button>
            </div>

        </div>
    );
}