import Link from "next/link";
import { footerLinks, footerPolicies, socials } from "../constents/constents";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-[#f9fafc] ">
      <hr className="text-gray-300 " />
      <footer className="max-w-7xl lg:mx-auto sm:mx-25  text-gray-800 px-5 py-10  ">
        <div className="border-b-2 pb-2 border-gray-300">
          <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="space-y-4 p-2">
              <div className="text-center">
                <Image
                  src="/spreads.svg"
                  alt="Spreads Logo"
                  width={64}
                  height={64}
                  className="object-cover m-auto"
                />
                <h1 className="text-xl my-2 font-bold">Spreads</h1>
              </div>

              <div className="flex items-center justify-center space-x-3 mt-4 me-2">
                {socials.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-md hover:scale-110 transition`}
                  >
                    <span className={`${item.bg}`}>{item.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Dynamic Footer Sections with Routing */}
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h5 className="font-semibold text-lg text-black font-['Inter'] mb-2">
                  {section.title}
                </h5>
                <ul className="space-y-1">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.href}
                        className="font-['Inter'] text-sm hover:underline "
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-2 justify-center gap-3">
            {footerPolicies.map((item, i) => (
              <span key={i}>
                <Link href={item.href} className="text-[12px] hover:underline">
                  {item.name}
                </Link>
                {i < footerPolicies.length - 1 && " | "}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Links */}
        <div className=" mt-3">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Left Side */}
            <div className="text-center  text-[12px] md:text-left">
              <p>Spreads © 2025 — All rights reserved.</p>
              <p className="mt-1">Made in Bharat, Built for the World.</p>
            </div>

            {/* Right Side */}
            <div className="text-center text-[12px] md:text-right">
              <p className=" ">
                Contact Us:{" "}
                <a href="mailto:support@spreads.in" className="hover:underline">
                  support@spreads.in
                </a>{" "}
                | Rewa HQ
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
