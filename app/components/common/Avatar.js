// import Link from "next/link";

// export const Avatar = ({ 
//   name = "", 
//   src, // Using src instead of avatar for consistency
//   avatar, // Keeping for backward compatibility
//   username,
//   className = "",
//   size = "md" 
// }) => {
//   const imageUrl = src || avatar  || "/default-user-profile.svg";
  
//   const sizeClasses = {
//     sm: "w-8 h-8 text-xs",
//     md: "w-10 h-10 text-sm",
//     lg: "w-12 h-12 text-base"
//   };

//   const avatarContent = imageUrl ? (
//     <img
//       src={imageUrl}
//       alt={`${name}'s avatar`}
//       className={`rounded-full cursor-pointer hover:opacity-90 object-cover ${sizeClasses[size]} ${className}`}
//       onError={(e) => {
//         // Fallback to initials if image fails to load
//         e.target.style.display = 'none';
//       }}
//     />
//   ) : (
//     <div
//       className={`rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold cursor-pointer hover:opacity-90 ${sizeClasses[size]} ${className}`}
//     >
//       {getInitials(name)}
//     </div>
//   );

//   if (username) {
//     return (
//       <Link href={`/profile/${username}`} onClick={(e) => e.stopPropagation()}>
//         {avatarContent}
//       </Link>
//     );
//   }

//   return avatarContent;
// };

// const getInitials = (name) => {
//   if (!name || typeof name !== 'string') return '??';
  
//   return name
//     .trim()
//     .split(' ')
//     .map((n) => n[0] || '')
//     .join('')
//     .toUpperCase()
//     .slice(0, 2);
// };




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
