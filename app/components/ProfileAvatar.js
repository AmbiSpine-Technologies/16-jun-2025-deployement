import React, { useState } from 'react'

export function ProfileAvatar({ name, image, className=""}) {
  const [imgError, setImgError] = useState(false);

  if (!image || imgError) {
    return (
      <div className={`w-50px] h-[50px] flex items-center justify-center bg-gray-200 text-gray-600 font-semibold rounded-full ${className} `}>
        {name ? name.charAt(0).toUpperCase() : "?"}
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={name}
      width={50}
      height={50}
      className={`rounded-full w-[55px] h-[55px] object-cover border ${className} `}
      onError={() => setImgError(true)}
    />
  );
}