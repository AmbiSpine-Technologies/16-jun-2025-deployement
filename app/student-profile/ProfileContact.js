"use client";

import { Mail, Phone, Globe, MapPin, Linkedin, Github } from "lucide-react";

export default function ProfileContact({ contact = {} }) {
  const fields = [
    {
      id: "email",
      label: "Email",
      icon: Mail,
      value: contact.email,
      href: contact.email ? `mailto:${contact.email}` : null,
    },
    {
      id: "phone",
      label: "Phone",
      icon: Phone,
      value: contact.phone,
      href: contact.phone ? `tel:${contact.phone}` : null,
    },
    {
      id: "website",
      label: "Website",
      icon: Globe,
      value: contact.website,
      href: contact.website || null,
    },
    {
      id: "location",
      label: "Location",
      icon: MapPin,
      value: contact.location,
      href: null,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: Linkedin,
      value: contact.linkedin,
      href: contact.linkedin || null,
    },
    {
      id: "github",
      label: "GitHub",
      icon: Github,
      value: contact.github,
      href: contact.github || null,
    },
  ];

  return (
    <section className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="text-lg font-semibold mb-3">Contact</h3>
      <ul className="text-sm text-gray-700">
        {fields.map(({ id, label, icon: Icon, value, href }, i) =>
          value ? (
            <li
              key={id}
              className={`flex items-center gap-2 py-2 ${
                i !== fields.length - 1 ? "border-b border-gray-300" : ""
              }`}
            >
              <Icon className="w-4 h-4 text-gray-500" />
              {href ? (
                <a
                  href={href}
                  target={id === "website" || id === "linkedin" || id === "github" ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {value}
                </a>
              ) : (
                <span>{value}</span>
              )}
            </li>
          ) : null
        )}
      </ul>
    </section>
  );
}
