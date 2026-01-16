"use client";

import { useMemo } from "react";
import { Phone, MapPin, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button2 } from "../components/button/Button2";

export default function ProfileCompletionCard({ profile }) {
  const router = useRouter();

  // Dummy profile completion logic (backend-ready)
  const completionItems = useMemo(() => {
    return [
      {
        id: "mobile",
        label: "Verify mobile number",
        icon: Phone,
        completed: profile?.mobileVerified ?? false,
        increment: 10,
        redirect: "/profile/edit/contact",
      },
      {
        id: "location",
        label: "Add preferred location",
        icon: MapPin,
        completed: Boolean(profile?.location),
        increment: 2,
        redirect: "/profile/edit/location",
      },
      {
        id: "resume",
        label: "Add resume",
        icon: FileText,
        completed: Boolean(profile?.resumeUrl),
        increment: 10,
        redirect: "/profile/edit/resume",
      },
    ];
  }, [profile]);

  const missingItems = completionItems.filter(item => !item.completed);

  const handleRedirect = () => {
    if (missingItems.length > 0) {
      router.push(missingItems[0].redirect);
    }
  };

  return (
    <section className="rounded-2xl border border-[#aeadad] bg-white p-4 mt-3">
      <div className="rounded-xl bg-[#FFF2E5] p-4 space-y-4">
        {missingItems.map(item => (
          <div
            key={item.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center border">
                <item.icon className="h-4 w-4 text-gray-700" />
              </div>
              <p className="text-sm font-medium text-gray-800">
                {item.label}
              </p>
            </div>
            <span className="text-xs font-semibold text-green-600 bg-white rounded-2xl px-2 py-1 border border-green-200">
              ↑ {item.increment}%
            </span>
          </div>
        ))}

        <button
          onClick={handleRedirect}
          className="h-10 px-2 rounded-full bg-[#F15A29] hover:bg-[#e04f21] text-white text-sm font-medium font-poppins w-full"
        >
          Add {missingItems.length} missing details
        </button>
      </div>
    </section>
  );
}
