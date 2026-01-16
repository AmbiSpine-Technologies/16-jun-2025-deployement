"use client";
import { useState, useEffect, useRef } from "react";
import { FileText, X } from "lucide-react";

export default function PDFViewer({ file, onRemove }) {
  const [pdfUrl, setPdfUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    let url;

    if (file) {
      try {
        url = URL.createObjectURL(file);
        setPdfUrl(url);
        generateThumbnail(url);
      } catch (err) {
        console.error("Failed to create PDF URL:", err);
        setIsGenerating(false);
      }
    }

    return () => {
      if (url) URL.revokeObjectURL(url);
      if (thumbnailUrl) URL.revokeObjectURL(thumbnailUrl);
    };
  }, [file]);

  const generateThumbnail = async (url) => {
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const pdf = await pdfjsLib.getDocument(url).promise;
      setPageCount(pdf.numPages);

      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;

      canvas.toBlob((blob) => {
        if (blob) {
          const thumbUrl = URL.createObjectURL(blob);
          setThumbnailUrl(thumbUrl);
        }
        setIsGenerating(false);
      });
    } catch (error) {
      console.log("PDF thumbnail generation skipped");
      setIsGenerating(false);
    }
  };

  const handleClick = () => {
    window.open(pdfUrl, "_blank");
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onRemove();
  };

  return (
    <div className="relative w-full max-w-sm">
      {/* Remove button */}
      {/* <button
        onClick={handleRemove}
        className="absolute -top-2 -right-2 z-20 bg-gray-900 text-white rounded-full p-1.5 hover:bg-black transition-all shadow-lg"
        aria-label="Remove PDF"
      >
        <X size={16} />
      </button> */}

      {/* PDF Card */}
      <div
        onClick={handleClick}
        className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all cursor-pointer group"
      >
        {/* Thumbnail Preview - Fixed height */}
        <div className="relative bg-gray-100 h-80 overflow-hidden">
          {isGenerating ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mb-2"></div>
              <p className="text-xs text-gray-500">Generating preview...</p>
            </div>
          ) : thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt="PDF Preview"
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <FileText className="w-16 h-16 text-gray-300 mb-2" />
              <p className="text-xs text-gray-400">PDF Document</p>
            </div>
          )}

          {/* Page count badge */}
          {pageCount > 0 && (
            <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
              {pageCount} {pageCount === 1 ? "page" : "pages"}
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
              Click to view
            </div>
          </div>
        </div>

        {/* File info */}
        <div className="p-3 border-t border-gray-100">
          <div className="flex items-start gap-2">
            <FileText className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {file?.name || "document.pdf"}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                PDF Document • {((file?.size || 0) / 1024).toFixed(0)} KB
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden canvas for thumbnail generation */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}