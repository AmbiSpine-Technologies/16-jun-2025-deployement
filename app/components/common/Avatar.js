import { useState } from "react";
import Link from "next/link";

export const Avatar = ({
  src,
  avatar,
  username,
  className = "",
  size = "md",
}) => {
  const defaultImage = "/default-user-profile.svg";
  const imageUrl = src || avatar || defaultImage;

  const [imgSrc, setImgSrc] = useState(imageUrl);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const avatarImage = (
    <img
      src={imgSrc}
      alt="User avatar"
      className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
      onError={() => setImgSrc(defaultImage)}
    />
  );

  if (username) {
    return (
      <Link href={`/profile/${username}`} onClick={(e) => e.stopPropagation()}>
        {avatarImage}
      </Link>
    );
  }

  return avatarImage;
};
