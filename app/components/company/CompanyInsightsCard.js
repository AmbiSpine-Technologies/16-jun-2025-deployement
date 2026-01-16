"use client";
import React from "react";
import { ArrowUpRight } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

// Custom Dot to match the design (White fill, Dark stroke)
const CustomDot = (props) => {
  const { cx, cy, stroke, payload } = props;
  return (
    <circle 
      cx={cx} 
      cy={cy} 
      r={4} 
      stroke="#475569" 
      strokeWidth={2} 
      fill="white" 
    />
  );
};

export default function CompanyInsightsCard({
  companyName = "AmbiSpine Technologies",
  growthRate = 11,
  recentHires = [],
  chartData = [], // Dynamic Data Prop
  price = "₹0",
}) {
  return (
    <div className="w-full bg-white p-6 ">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Unlock insights on {companyName}
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        
        {/* --- Section 1: Dynamic Recharts Area Chart --- */}
        <div className="flex flex-col justify-between h-full min-h-[140px]">
          <p className="text-sm font-medium text-gray-900">
            The latest hiring trends
          </p>
          
          <div className="flex-1 w-full mt-2 min-h-[100px]">
           <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#E8F0F9" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#E8F0F9" stopOpacity={0}/>
          </linearGradient>
        </defs>
        
        {/* XAxis Labels: Black color ke liye fill: '#000000' use kiya gaya hai */}
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: "10px", fill: '#000000', fontWeight: '500'  }} 
          dy={10}
        />

        {/* Tooltip: Label black aur Value blue */}
        <Tooltip 
          contentStyle={{ 
            borderRadius: '12px', 
            border: 'none', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            padding: '8px'
          }}
          labelStyle={{ color: '#000000', fontWeight: 'bold', marginBottom: '4px' }} // "Jan 2025" text black
          itemStyle={{ color: '#0013E3', fontWeight: 'bold', fontSize: '10px' }}    // "Value: 30" text blue
          cursor={{ stroke: '#cccccc', strokeWidth: 1 }}
        />

        <Area
          type="monotone"
          dataKey="value"
          stroke="#475569" 
          strokeWidth={2}
          fill="url(#colorValue)" // Gradient fill apply kiya
          dot={<CustomDot />} 
          activeDot={{ r: 6, fill: "#0013E3", stroke: "white", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
          </div>
        </div>

        {/* --- Section 2: Growth Trends --- */}
        <div className="flex flex-col border-l ps-10 border-transparent md:border-gray-200 md:pl-6">
          <p className="text-sm font-medium text-gray-900 mb-2">Growth trends</p>
          <div className="flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-4 h-4 text-green-700" />
            <span className="text-lg font-bold text-green-700">{growthRate}%</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Employee growth</p>
          <button className="text-xs text-gray-500 mt-3 hover:underline text-left transition-colors hover:text-[#0013E3]">
            And more hiring trends
          </button>
        </div>

        {/* --- Section 3: Recent Hires --- */}
        <div className="flex flex-col md:pl-2">
          <p className="text-sm font-medium text-gray-900 mb-3">Recent hires</p>
          
          <div className="flex -space-x-3 overflow-hidden mb-2">
            {recentHires.slice(0, 3).map((hire, index) => (
              <img
                key={index}
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover bg-gray-200"
                src={hire.avatar || "/default-avatar.png"}
                alt={hire.name}
              />
            ))}
          </div>
          
          <p className="text-xs text-gray-500 mt-1">
            {recentHires.length > 0 ? (
               <>
                 <span className="uppercase font-medium text-gray-700">{recentHires[0]?.name.split(' ')[0]}</span>
                 {recentHires.length > 1 && ` and ${recentHires.length - 1} others`}
               </>
            ) : "No recent hires"}
          </p>
        </div>
      </div>

    </div>
  );
}