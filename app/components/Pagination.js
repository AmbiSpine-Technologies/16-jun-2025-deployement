"use client";
export default function Pagination({
  page,
  total,
  perPage = 50,
  onPageChange,
}) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null; // agar ek hi page hai to pagination ki zaroorat nahi

  return (
    <div className="flex gap-2 justify-center mt-6">
      {/* Prev button */}
      {page > 1 && (
        <button
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-1 border rounded text-sm text-white hover:bg-gray-800"
        >
          Prev
        </button>
      )}

      {/* Page numbers (optional, SEO-friendly + user friendly) */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 border rounded text-sm ${
            num === page
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-gray-800"
          }`}
        >
          {num}
        </button>
      ))}

      {/* Next button */}
      {page < totalPages && (
        <button
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-1 border rounded text-sm text-white hover:bg-gray-800"
        >
          Next
        </button>
      )}
    </div>
  );
}
