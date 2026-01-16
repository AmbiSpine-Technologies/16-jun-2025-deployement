"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CiCircleChevUp } from "react-icons/ci";
import Chart from "chart.js/auto";
import { Button2 } from "../components/button/Button2";
import { useRouter } from "next/navigation";


// ===== Helper: calculate profile completion =====
function calculateCompletion(user) {
  const fields = [
    "name",
    "email",
    "phone",
    "avatar",
    "cover",
    "headline",
    "about",
    "location",
    "avatar",
    "skills",
    "about",
    "experiences",
    "educations",
    "projects",
    "certifications",
  ];
  let complete = 0;
  fields.forEach((f) => {
    const val = user?.[f];
    if (Array.isArray(val) && val.length > 0) complete++;
    else if (typeof val === "string" && val.trim() !== "") complete++;
  });
  return Math.round((complete / fields.length) * 100);
}

// ===== Helper: calculate post impressions =====
function calculatePostImpressions(posts = []) {
  if (!posts.length) return 0;
  return posts.reduce((sum, post) => {
    const likeScore = (post.likes || 0) * 10;
    const repostScore = (post.reposts || 0) * 5;
    const commentScore = (post.comments?.length || 0) * 2;
    return sum + likeScore + repostScore + commentScore;
  }, 0);
}

export default function ProfileAnalyticsCard() {
  const router = useRouter();
  const chartRef = useRef(null);
  const currentUser = useSelector((state) => state.users?.currentUser);

  // Default sab 0 se start
  const [analytics, setAnalytics] = useState({
    completion: 0,
    impressions: 0,
    views: 0,
    searchAppearances: 0,
  });

  // ===== Calculate Analytics Dynamically =====
  useEffect(() => {
    if (!currentUser) return;

    const completion = calculateCompletion(currentUser);

    const impressions = currentUser?.posts?.length
      ? calculatePostImpressions(currentUser.posts)
      : 0;

    const searchAppearances =
      impressions > 0 ? Math.floor((completion / 100) * 20 + impressions / 50) : 0;

    const views =
      impressions > 0 ? Math.floor(impressions / 10 + completion * 0.5) : 0;

    setAnalytics({
      completion,
      impressions,
      views,
      searchAppearances,
    });
  }, [currentUser]);

  // ===== Render Half-Circle Chart =====
  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");

    if (chartRef.current._chart) chartRef.current._chart.destroy();

    chartRef.current._chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Completed", "Remaining"],
        datasets: [
          {
            data: [analytics.completion, 100 - analytics.completion],
            backgroundColor: [
              analytics.completion < 60 ? "#F87171" : "#22C55E",
              "#1E293B",
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        rotation: -90,
        circumference: 180,
        cutout: "70%",
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${ctx.raw}%`,
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }, [analytics.completion]);

  return (
    <div className=" p-5 bg-white  border-[0.3px] border-[#cccccc] rounded-2xl sm:w-full lg:max-w-[350px]">

      {/* Profile Fitness - Half Circle Chart */}
      <div className="relative h-20 w-full mb-3 text-gray-800">
        <canvas ref={chartRef}></canvas>
        <div className="absolute inset-0 flex items-center justify-center mt-6">
          <span className="text-xl font-bold">{analytics.completion}%</span>
        </div>
      </div>

      <p className="text-center text-sm text-gray-700">
        Profile Fitness
      </p>

      {/* Metrics Section */}
      <div className="flex flex-col gap-1 text-xs font-medium font-poppins justify-center border-gray-600 pt-4">
        <MetricRow
          label="Search Appearances"
          value={analytics.searchAppearances || 0}
          trend="up"
        />
        <MetricRow label="View in last 30 days" value={analytics.views || 0} trend="up" />
        <MetricRow
          label="Post Impressions"
          value={analytics.impressions || 0}
          trend="up"
        />
      </div>
      <div className="mt-5 justify-center flex items-center">
        <Button2
          onClick={() => router.push("/student-profile/profile-analytics")}
          showIcon={false} name="View All" />
      </div>
    </div>
  );
}

// ===== Reusable Row Component =====
function MetricRow({ label, value, trend }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-gray-800">{label}</p>
      <div className="flex items-center gap-1 font-medium text-gray-600">
        <span>{value}</span>
        {trend === "up" && <CiCircleChevUp className="text-green-600" />}
      </div>
    </div>
  );
}
