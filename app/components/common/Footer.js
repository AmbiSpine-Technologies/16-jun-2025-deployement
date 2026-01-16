"use client";

import Link from "next/link";

export default function Footer() {
  const links = [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Accessibility", href: "/accessibility" },
    { name: "Ads Info", href: "/ads" },
  ];

  return (
    <footer className="w-full bg-transparent ">
      <div className="max-w-7xl mx-auto px-4 py-2 mt-3">
        
        {/* Footer Cards */}
        <div className="flex flex-wrap justify-center ">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="
               
                text-xs
               text-[#888888]
                hover:cursor-pointer
                transition-all
                duration-200
                border-r border-[#929292] px-1 not-last:border-r
              "
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Company Text */}
        <p className="mt-1 text-center    text-xs  text-[#888888]">
          © 2025 AmbiSpine Technologies Pvt. Ltd.
        </p>
      </div>
    </footer>
  );
}
