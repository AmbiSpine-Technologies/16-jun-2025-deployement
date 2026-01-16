import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { TrendingDown, Users, Star } from "lucide-react";

export default function EdgeOverView({ skill }) {
  // Default data
  const defaultSkill = {
    rejections: 0,
    mentorConnections: 6,
    proficiency: 70,
    totalInterviews: 10,
  };
  const currentSkill = skill || defaultSkill;

  // ✅ Interview data must include success, failed, and total
  const getInterviewData = () => [
    {
      year: "2025",
      applied: 90,
      success: 8,
      failed: Math.max(currentSkill.rejections, 2),
      total: 8 + Math.max(currentSkill.rejections, 2),
    },
  ];

  // Mentor connections growth
  const getMentorGrowth = () => [
    { month: "Jan", count: 1 },
    { month: "Feb", count: 3 },
    { month: "Mar", count: 5 },
    { month: "Apr", count: currentSkill.mentorConnections },
  ];

  // Skill competency analysis
  const getSkillComparison = () => [
    { skill: "Technical", value: currentSkill.proficiency },
    { skill: "Communication", value: currentSkill.proficiency - 10 },
    { skill: "Problem Solving", value: currentSkill.proficiency + 5 },
    { skill: "Team Work", value: currentSkill.proficiency - 5 },
    { skill: "Leadership", value: currentSkill.proficiency - 15 },
    { skill: "Adaptability", value: currentSkill.proficiency + 10 },
  ];

  // Round-wise failure analysis
  const getRoundFailureData = () => [
    { round: "Technical Screening", failures: 3, attempts: 8, successRate: 63 },
    { round: "Technical Deep Dive", failures: 2, attempts: 5, successRate: 60 },
    { round: "System Design", failures: 4, attempts: 6, successRate: 33 },
    { round: "HR Round", failures: 1, attempts: 7, successRate: 86 },
    { round: "Managerial", failures: 2, attempts: 4, successRate: 50 },
  ];

  // ✅ Fixed Interview Summary Calculation
  const interviewData = getInterviewData();
  const interviewStats = interviewData.reduce(
    (acc, year) => ({
      totalSuccess: acc.totalSuccess + (year.success || 0),
      totalFailed: acc.totalFailed + (year.failed || 0),
      totalInterviews: acc.totalInterviews + (year.total || 0),
    }),
    { totalSuccess: 0, totalFailed: 0, totalInterviews: 0 }
  );

  // ✅ Success Rate (safe from NaN)
  const successRate =
    interviewStats.totalInterviews > 0
      ? (
          (interviewStats.totalSuccess / interviewStats.totalInterviews) *
          100
        ).toFixed(1)
      : "0.0";

  return (
    <div className="space-y-6">
      {/* Interview Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl  border-[0.3px] border-[#cccccc]  text-center">
          <div className="text-2xl font-bold text-gray-600">
            {interviewStats.totalInterviews}
          </div>
          <div className="text-gray-500 text-sm">Total Interviews</div>
        </div>

        <div className="bg-white p-4 rounded-xl  border-[0.3px] border-[#cccccc]  text-center">
          <div className="text-2xl font-bold text-green-600">
            {interviewStats.totalSuccess}
          </div>
          <div className="text-gray-600 text-sm">Successful</div>
        </div>

        <div className="bg-white p-4 rounded-xl  border-[0.3px] border-[#cccccc]  text-center">
          <div className="text-2xl font-bold text-red-600">
            {interviewStats.totalFailed}
          </div>
          <div className="text-gray-600 text-sm">Failed</div>
        </div>

        <div className="bg-white p-4 rounded-xl  border-[0.3px] border-[#cccccc]  text-center">
          <div className="text-2xl font-bold text-blue-600">{successRate}%</div>
          <div className="text-gray-600 text-sm">Success Rate</div>
        </div>
      </div>

      {/* Interview Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl  border-[0.3px] border-[#cccccc] ">
          <h4 className="text-lg font-bold text-gray-600 mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-[#0092bb]" />
            Interview Performance (Yearly)
          </h4>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={getInterviewData()} barGap={50}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="year"
                stroke="#9ca3af"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />
              <YAxis
                stroke="#9ca3af"
                tick={{ fill: "#9ca3af" }}
                domain={[0, 100]}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                content={({ payload }) => {
                  if (!payload || payload.length === 0) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="bg-gray-800 p-3 rounded-md text-sm text-green-500">
                      <div>
                        Applied: <strong>{d.applied}</strong>
                      </div>
                      <div>
                        Successful: <strong>{d.success}</strong>
                      </div>
                      <div>
                        Failed: <strong>{d.failed}</strong>
                      </div>
                    </div>
                  );
                }}
              />
              <Bar
                dataKey="applied"
                fill="#10b981"
                name="Applied"
                barSize={40}
              />
              <Bar
                dataKey="success"
                fill="#005b74"
                name="Successful"
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Mentor Growth */}
        <div className="bg-white p-4 rounded-xl  border-[0.3px] border-[#cccccc] ">
          <h4 className="text-lg font-bold text-gray-600 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-600" />
            Mentor Connections Growth
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={getMentorGrowth()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#10b981"
                strokeWidth={3}
                name="Mentor Connections"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Round Failure Analysis */}
      <div className="bg-white p-4 rounded-xl  border-[0.3px] border-[#cccccc] ">
        <h4 className="text-lg font-bold text-gray-600 mb-4 flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-red-400" />
          Round-wise Failure Analysis
        </h4>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={getRoundFailureData()}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="round"
              stroke="#9ca3af"
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value, name) => {
                if (name === "failures") return [value, "Failures"];
                if (name === "attempts") return [value, "Total Attempts"];
                if (name === "successRate")
                  return [`${value}%`, "Success Rate"];
                return [value, name];
              }}
            />
            <Bar dataKey="attempts" fill="#3b82f6" name="Attempts" />
            <Bar dataKey="failures" fill="#ef4444" name="Failures" />
          </BarChart>
        </ResponsiveContainer>

        {/* Round-wise Statistics */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {getRoundFailureData().map((round, index) => (
            <div key={index} className="p-3 border-[0.3px] border-[#cccccc] rounded-lg">
              <div className="text-gray-700 font-semibold text-sm mb-2">
                {round.round}
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Attempts:</span>
                  <span className="text-white">{round.attempts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Failures:</span>
                  <span className="text-red-400">{round.failures}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Success Rate:</span>
                  <span className="text-green-400">{round.successRate}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overall Competency Analysis */}
      <div className="bg-white p-4 rounded-xl  border-[0.3px] border-[#cccccc] ">
        <h4 className="text-lg font-bold text-gray-600 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-gray-600" />
          Overall Competency Analysis
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={getSkillComparison()}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="skill" stroke="#9ca3af" />
            <PolarRadiusAxis stroke="#9ca3af" />
            <Radar
              name="Competency Level"
              dataKey="value"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.6}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value) => [`${value}%`, "Competency Level"]}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
