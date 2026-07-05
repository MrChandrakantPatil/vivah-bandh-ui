import { useState } from "react";
import { twMerge } from "tailwind-merge";

export function Avatar({
  name,
  image,
  className = "",
}) {
  const [imageError, setImageError] = useState(false);
  
  const defaultClasses = twMerge("w-10 h-10 rounded-full bg-pink-400 text-white", className);

  if (image && !imageError) {
    return (
      <img
        src={image}
        alt={name}
        onError={() => setImageError(true)}
        className={twMerge(defaultClasses, "object-cover border-2 border-slate-600")}
      />
    );
  }

  return (
    <div className={twMerge(defaultClasses, "flex items-center justify-center font-semibold")} >
      {name?.trim()?.[0]?.toUpperCase() ?? "?"}
    </div>
  );
}