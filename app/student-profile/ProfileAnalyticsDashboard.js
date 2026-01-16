"use client"
import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, TrendingUp, Eye, Users, FileText, UserPlus } from 'lucide-react';

// Mock Data Generator
const generateMockData = (days) => {
  const data = {
    dailyActivity: [],
    visibility: {
      postImpressions: 3450,
      profileViewers: 2130,
      connections: 890,
      searchAppearances: 1680
    },
    contentInsights: [],
    views: {
      feeds: 8920,
      posts: 5640,
      profile: 4230,
      followers: 2890,
      nonFollowers: 6030
    },
    feedsCount: 354,
    storiesCount: 354
  };

  // Generate daily activity data
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  for (let i = 0; i < 7; i++) {
    data.dailyActivity.push({
      day: daysOfWeek[i],
      minutes: Math.floor(Math.random() * 400) + 100,
      highlighted: i === 2 // Wednesday highlighted
    });
  }

  // Generate content insights data (last 30 days)
  const months = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  for (let i = 0; i < 7; i++) {
    data.contentInsights.push({
      day: months[i],
      views: Math.floor(Math.random() * 8000) + 3000
    });
  }

  return data;
};

const AnalyticsDashboard = ({ userData = null }) => {
  const [dateRange, setDateRange] = useState('30');
  const mockData = useMemo(() => generateMockData(parseInt(dateRange)), [dateRange]);

  // Calculate daily average
  const dailyAverage = useMemo(() => {
    const total = mockData.dailyActivity.reduce((acc, day) => acc + day.minutes, 0);
    const avg = Math.floor(total / mockData.dailyActivity.length);
    const hours = Math.floor(avg / 60);
    const mins = avg % 60;
    return { hours, mins, total: avg };
  }, [mockData.dailyActivity]);

  // Visibility data for donut chart
  const visibilityData = [
    { name: 'Post impressions', value: mockData.visibility.postImpressions, color: '#ef4444' },
    { name: 'Profile viewers', value: mockData.visibility.profileViewers, color: '#ec4899' },
    { name: 'Connections', value: mockData.visibility.connections, color: '#22c55e' },
    { name: 'Search appearances', value: mockData.visibility.searchAppearances, color: '#a855f7' }
  ];

  const totalViews = visibilityData.reduce((acc, item) => acc + item.value, 0);

  // Custom tooltip for bar chart
  const CustomBarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const hours = Math.floor(payload[0].value / 60);
      const mins = payload[0].value % 60;
      return (
        <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm">
          <p className="font-medium">{hours}h {mins}m</p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for area chart
  const CustomAreaTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm ">
          <p className="font-medium">{payload[0].value.toLocaleString()} views</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-white p-3 sm:p-4 md:p-6 overflow-hidden rounded-xl sm:rounded-2xl">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 border-b border-[#cccccc] pb-3 sm:pb-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
          <div className="flex items-center gap-2 bg-white border border-[#cccccc] rounded-lg px-3 sm:px-4 py-2 cursor-pointer hover:bg-gray-50 w-fit">
            <Calendar size={16} className="text-gray-600 flex-shrink-0" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="text-sm text-gray-700 bg-transparent border-none outline-none cursor-pointer"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
            </select>
          </div>
        </div>

        {/* Daily Average Section */}
        <div className="bg-white p-4 sm:p-6 border-b border-[#cccccc]">
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
              {dailyAverage.hours} hr {dailyAverage.mins} min daily average
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              15 April - 21 April
            </p>
          </div>

          <div className="relative">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={mockData.dailyActivity}>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                />
                <YAxis hide />
                <Tooltip content={<CustomBarTooltip />} cursor={false} />
                <Bar
                  dataKey="minutes"
                  radius={[4, 4, 0, 0]}
                  fill="#d1d5db"
                >
                  {mockData.dailyActivity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.highlighted ? '#3b82f6' : '#d1d5db'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            {/* 10 Hours label */}
            <div className="absolute top-0 left-2 sm:left-6">
              <span className="text-xs font-medium text-gray-600">10 Hours</span>
            </div>
          </div>

          <div className="text-center mt-3 sm:mt-4">
            <p className="text-xs text-gray-500">Last 30 days 40h 30m</p>
          </div>
        </div>

        {/* Visibility and Content Insights Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6">

          {/* Visibility Section */}
          <div className="bg-white p-4 sm:p-6 border-b border-[#cccccc]">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Visibility</h3>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6 sm:mb-8">
              {/* Donut Chart */}
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={visibilityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={2}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {visibilityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">views</p>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2 sm:space-y-3 flex-1 w-full md:ml-8">
                {visibilityData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className={`w-3 h-3 rounded-full flex-shrink-0`} style={{ backgroundColor: item.color }}></div>
                      <span className="text-xs sm:text-sm text-gray-700 truncate">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <span className="text-xs sm:text-sm font-medium text-gray-900">{item.value.toLocaleString()}</span>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-50 flex items-center justify-center">
                        <span className="text-[10px] sm:text-xs text-blue-600 font-medium">+{Math.floor(Math.random() * 20)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend dots */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-[10px] sm:text-xs text-gray-600 whitespace-nowrap">Post impressions</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                <span className="text-[10px] sm:text-xs text-gray-600 whitespace-nowrap">Profile viewers</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-[10px] sm:text-xs text-gray-600 whitespace-nowrap">Connections</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-[10px] sm:text-xs text-gray-600 whitespace-nowrap">Search appearances</span>
              </div>
            </div>
          </div>

          {/* Content Insights Section */}
          <div className="bg-white p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Content Insights</h3>

            {/* Area Chart */}
            <div className="mb-4 sm:mb-6 border-b border-[#cccccc] pb-4">
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={mockData.contentInsights}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 10 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 10 }}
                    tickFormatter={(value) => `${Math.floor(value / 1000)}K`}
                  />
                  <Tooltip content={<CustomAreaTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#colorViews)"
                    dot={{ fill: '#3b82f6', r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Views Breakdown */}
            <div className="space-y-2 sm:space-y-3 bg-gray-50 rounded-xl p-3 sm:p-4">
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <h4 className="text-xs sm:text-sm font-semibold text-gray-700">Views</h4>
              </div>

              {[
                { label: 'Feeds', value: mockData.views.feeds, color: '#3b82f6', percentage: 100 },
                { label: 'Posts', value: mockData.views.posts, color: '#3b82f6', percentage: 63 },
                { label: 'Profile', value: mockData.views.profile, color: '#3b82f6', percentage: 47 },
                { label: 'Followers', value: mockData.views.followers, color: '#3b82f6', percentage: 32 },
                { label: 'Non-Followers', value: mockData.views.nonFollowers, color: '#3b82f6', percentage: 68 }
              ].map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs text-gray-600">{item.label}</span>
                    <span className="text-[10px] sm:text-xs font-medium text-gray-900">{item.value.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full transition-all duration-500"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Feeds and Stories Count */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 transform -rotate-90">
                      <circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke="#e5e7eb"
                        strokeWidth="2.5"
                        fill="none"
                      />
                      <circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke="#3b82f6"
                        strokeWidth="2.5"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 14 * 0.75} ${2 * Math.PI * 14}`}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{mockData.feedsCount}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">Feeds</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 transform -rotate-90">
                      <circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke="#e5e7eb"
                        strokeWidth="2.5"
                        fill="none"
                      />
                      <circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke="#3b82f6"
                        strokeWidth="2.5"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 14 * 0.65} ${2 * Math.PI * 14}`}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{mockData.storiesCount}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">Stories</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;