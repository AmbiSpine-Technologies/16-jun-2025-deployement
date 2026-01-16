"use client";
import { useState } from "react";
import ResumePricing from "@/app/pricing/ResumePricing";
import { X, Download } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DownloadPopup({
  isOpen,
  onClose,
  onDownloadWithWatermark,
}) {
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-xl rounded-xl bg-white p-6 shadow-lg">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#cccccc] pb-3 text-gray-700">
          <h2 className="text-lg font-semibold">Download</h2>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col items-center py-8 text-center">
          <img
            src="/downloadImg.png"
            className="mb-4 h-32"
            alt="download"
          />

          <p className="mb-6 text-md text-blue-800 font-jost">
            Subscribe to explore unlimited download
          </p>

          <div className="flex gap-12">
            {/* WITH WATERMARK */}
            <button
              onClick={() => {
                onDownloadWithWatermark();
                onClose();
              }}
              className="flex flex-col items-center gap-2 text-blue-600  hover:text-blue-700 font-jost"
            >
              <Download size={22} />
              <span className="text-xs ">Download with watermark</span>
            </button>

            {/* WITHOUT WATERMARK */}
            <button
              onClick={() => setIsPricingOpen(true)}
              className="flex flex-col items-center gap-2 text-blue-600  hover:text-blue-700 font-jost"
            >
              <Download size={22} />
              <span className="text-xs">Download without watermark</span>
            </button>
          </div>
        </div>
      </div>
      {/* Modal */}
      <ResumePricing
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />
    </div>
  );
}
