"use client";
import React, { useState } from "react";
import Dropdown from "../components/Dropdown";
import { Buttonborder } from "../components/Button";
import QRCode from "qrcode";
import { CheckCircle } from "lucide-react";
import { FiDownload } from "react-icons/fi";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaShare } from "react-icons/fa6";
import { MdOutlineBookmark, MdReport, MdBlock } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { RiHistoryLine } from "react-icons/ri";
import { BsFillPersonLinesFill } from "react-icons/bs";
import Link from "next/link";
export default function ProfileActionDropdown({ user, isOwner }) {
  const [shareData, setShareData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate share link
  const generateShareLink = (userId) => {
    if (!userId) throw new Error("User ID required");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const uniqueRef = Math.random().toString(36).substring(2, 8);
    return `${baseUrl}/in/${encodeURIComponent(userId)}?ref=${uniqueRef}`;
  };

  // Generate QR from link
  const getQRUrl = async (link) => {
    try {
      return await QRCode.toDataURL(link);
    } catch (err) {
      console.error("QR generation failed:", err);
      return null;
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleShareProfile = async () => {
    const link = generateShareLink(user.id);
    const qr = await getQRUrl(link);
    setShareData({ url: link, qrDataUrl: qr });
    setModalOpen(true);
  };

  const handleExport = () => window.print();

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = shareData.qrDataUrl;
    a.download = "profile-qr.png";
    a.click();
  };

  const handleShareImage = async () => {
    try {
      const res = await fetch(shareData.qrDataUrl);
      const blob = await res.blob();
      const file = new File([blob], "profile-qr.png", { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "My Profile QR",
          text: "Scan this to view my profile",
        });
      } else {
        alert("Direct image sharing not supported on this device.");
      }
    } catch (err) {
      console.error("Sharing failed:", err);
    }
  };

  return (
    <div className="relative flex gap-3">
      {/* VIEW DROPDOWN */}
      <Dropdown
        button={<Buttonborder name="View As" />}
        className="w-52 absolute left-0 top-8 z-50 bg-[#10151B]  text-white rounded-lg shadow-lg border border-gray-700 p-2"
      >
        {({ close }) => (
          <div className="text-sm">
            {/* Visitor + Owner Actions */}
            {isOwner ? (
              <>
                <button
                  onClick={async () => {
                    await handleShareProfile();
                    close();
                  }}
                  className="flex gap-2 items-center w-full text-left px-4 py-2 hover:bg-gray-800"
                >
                  <IoShareSocialSharp /> Share Profile QR
                </button>
                <button
                  onClick={async () => {
                    await handleShareProfile();
                    close();
                  }}
                  className="flex gap-2 items-center w-full text-left px-4 py-2 hover:bg-gray-800"
                >
                  <IoShareSocialSharp /> Share Profile in Side Spreadnext
                </button>
                <button
                  onClick={() => {
                    handleExport();
                    close();
                  }}
                  className="flex gap-2 items-center w-full text-left px-4 py-2 hover:bg-gray-800"
                >
                  <FiDownload /> Save to PDF
                </button>

                <Link
                  href="/save-items"
                  className="flex gap-2 items-center w-full text-left px-4 py-2 hover:bg-gray-800"
                >
                  <MdOutlineBookmark /> Saved Items
                </Link>

                <button
                  onClick={() => {
                    alert("Activity & history coming soon!");
                    close();
                  }}
                  className="flex gap-2 items-center w-full text-left px-4 py-2 hover:bg-gray-800"
                >
                  <RiHistoryLine /> Activity
                </button>
                <button
                  onClick={() => {
                    alert("Activity & history coming soon!");
                    close();
                  }}
                  className="flex gap-2 items-center w-full text-left px-4 py-2 hover:bg-gray-800"
                >
                  <RiHistoryLine /> About This Profile
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    alert("Report / Block / Restrict");
                    close();
                  }}
                  className="flex gap-2 items-center w-full text-left px-4 py-2 hover:bg-gray-800"
                >
                  <MdReport /> Report / <MdBlock /> Block / Restrict
                </button>
                <button
                  onClick={async () => {
                    await handleShareProfile();
                    close();
                  }}
                  className="flex gap-2 items-center w-full text-left px-4 py-2 hover:bg-gray-800"
                >
                  <FaShare /> Share Profile
                </button>
                <button
                  onClick={() => {
                    alert("About this account");
                    close();
                  }}
                  className="flex gap-2 items-center w-full text-left px-4 py-2 hover:bg-gray-800"
                >
                  <AiOutlineInfoCircle /> About This account
                </button>
                <button
                  onClick={() => {
                    alert("Saved / Bookmark");
                    close();
                  }}
                  className="flex gap-2 items-center w-full text-left px-4 py-2 hover:bg-gray-800"
                >
                  <MdOutlineBookmark /> Save / Bookmark
                </button>
              </>
            )}
          </div>
        )}
      </Dropdown>

      {/* ACTION DROPDOWN */}
      <Dropdown
        button={<Buttonborder name="Action" />}
        className="w-52 bg-[#0F172A] text-white rounded-lg shadow-lg border border-gray-700 p-2"
        align="right"
      >
        {({ close }) => (
          <div className="text-sm">
            {isOwner ? (
              <>
                <button
                  onClick={() => {
                    alert("Send profile in message coming soon!");
                    close();
                  }}
                  className="flex gap-2 items-center w-full text-left px-4 py-2 hover:bg-gray-800"
                >
                  <BsFillPersonLinesFill /> Send Profile in Message
                </button>
                <button
                  onClick={() => {
                    alert("Settings coming soon!");
                    close();
                  }}
                  className="flex gap-2 items-center w-full text-left px-4 py-2 hover:bg-gray-800"
                >
                  ⚙️ Settings
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  alert("Visitor actions coming soon!");
                  close();
                }}
                className="flex gap-2 items-center w-full text-left px-4 py-2 hover:bg-gray-800"
              >
                ⚙️ Actions
              </button>
            )}
          </div>
        )}
      </Dropdown>

      {/* SHARE MODAL */}
      {isModalOpen && shareData && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black/70 backdrop-blur-sm">
          <div className="bg-[#10151B] text-white rounded-2xl shadow-2xl p-6 w-[500px] relative animate-fadeIn border border-gray-700">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:cursor-pointer hover:text-white text-lg"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-1 text-center">
              Share Your Profile
            </h2>
            <p className="text-sm text-gray-300 text-center">
              Scan this QR or use the actions below
            </p>

            <div className="flex justify-center mt-5">
              <img
                src={shareData.qrDataUrl}
                alt="QR Code"
                className="w-72 h-72 rounded-xl border border-gray-700 shadow-md"
              />
            </div>
            <p className="text-center mt-2">
              <a
                href={shareData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#eaeaea] text-[14px] text-center hover:underline break-all"
              >
                {shareData.url}
              </a>
            </p>

            <div className="mt-5 flex gap-4 mx-3">
              <button
                onClick={handleCopy}
                className={`w-full py-2 rounded-full font-medium transition-all duration-300 bg-[#06060c] hover:scale-105 hover:cursor-pointer`}
              >
                {copied ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle size={18} /> Copied!
                  </span>
                ) : (
                  "Copy Link"
                )}
              </button>

              <button
                onClick={handleShareImage}
                className="w-full py-2 rounded-full bg-[#06060c] hover:opacity-90 hover:cursor-pointer font-medium"
              >
                Share QR Image
              </button>
            </div>

            <button
              onClick={handleDownload}
              className="w-full py-2 mt-5 rounded-full bg-[#0013E3] hover:opacity-90 font-medium"
            >
              Download QR
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
