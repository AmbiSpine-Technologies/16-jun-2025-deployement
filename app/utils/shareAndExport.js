// // ✅ 1. Unique profile link
// export function generateShareLink(userId) {
//   if (!userId) throw new Error("User ID required");
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/";
//   const uniqueRef = Math.random().toString(36).substring(2, 8); // optional
//   return `${baseUrl}/in/${encodeURIComponent(userId)}?ref=${uniqueRef}`;
// }

// // ✅ 2. QR Code without library (Google API)
// export function getQRUrl(link) {
//   const encoded = encodeURIComponent(link);
//   return `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encoded}`;
// }

// ✅ 3. Export to PDF (lightweight)
export function exportProfilePDF() {
  window.print();
}

import QRCode from "qrcode";

// ✅ 1. Generate unique profile link
export function generateShareLink(userId) {
  if (!userId) throw new Error("User ID required");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const uniqueRef = Math.random().toString(36).substring(2, 8);
  return `${baseUrl}/in/${encodeURIComponent(userId)}?ref=${uniqueRef}`;
}

export async function getQRUrl(link) {
  try {
    const dataUrl = await QRCode.toDataURL(link);
    return dataUrl;
  } catch (err) {
    console.error("QR generation failed:", err);
    return null;
  }
}
