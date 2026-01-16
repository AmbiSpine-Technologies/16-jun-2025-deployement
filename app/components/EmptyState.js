"use client";
import Image from "next/image";

export default function EmptyState({ 
  image = "/empty.png", 
  alt = "empty", 
  message = "No data available.", 
  className = "" 
}) {
  return (
    <div className={`text-center flex flex-col mt-6 items-center justify-center ${className}`}>
      <Image src={image} alt={alt} width={147} height={180} />
      <p className="text-gray-400 py-4 text-sm">{message}</p>
    </div>
  );
}
