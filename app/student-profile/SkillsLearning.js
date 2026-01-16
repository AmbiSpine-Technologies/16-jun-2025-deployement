"use client";

import { BookOpen, Award, CheckCircle } from "lucide-react";

export default function ProfileLearning() {
  const learningItems = [
    {
      icon: CheckCircle,
      text: "Hands-on Learning sessions with industry experts",
      color: "text-green-600",
    },
    {
      icon: Award,
      text: "Globally recognized certifications after completion",
      color: "text-yellow-600",
    },
    {
      icon: CheckCircle,
      text: "Structured Roadmaps: Beginner → Advanced",
      color: "text-green-600",
    },
    {
      icon: CheckCircle,
      text: "Access to exclusive learning resources & community",
      color: "text-green-600",
    },
  ];

  return (
    <section className="bg-white rounded-sm  p-5 border border-gray-300 my-2">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-blue-600" />
        Learning & Certification
      </h3>

      <ul className="space-y-3 text-sm text-gray-700">
        {learningItems.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <item.icon className={`w-4 h-4 ${item.color} mt-0.5`} />
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
