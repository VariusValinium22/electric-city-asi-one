import React from "react";
// Define props Card can accept
export interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  onClick,
  disabled = false,
  children,
  className = "",
  size = "md",
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const sizeClasses = {
    sm: "w-[25vw] h-[16vh]", // Small card
    md: "w-[30vw] h-[20vh]", // Medium card (default)
    lg: "w-[43.8vw] h-[51.2vh]", // Large card (matches Figma) "w-[820px] h-[553px]"
  };

  return (
    <div
      // Apply all styles:
      // - sizeClasses[size] for dynamic sizing
      // - disabled styles if needed
      // - allow parent to inject custom styles with className
      className={`bg-(--color-shamrock) ${sizeClasses[size]} rounded-[32px] shadow-md cursor-pointer] ${
        disabled ? "opacity-50 pointer-events-none" : "opacity-100"
      } ${className}`}
      // className={`card-container ${sizeClasses[size]} rounded-[32px] border-4 shadow-md p-4 bg-white hover:shadow-lg transition-all cursor-pointer bg-[var(--aqua-green)] ${
      //   disabled ? "opacity-50 pointer-events-none" : "opacity-100"
      // } ${className}`}
      onClick={handleClick}
    >
      {/* Optional image */}
      {imageUrl && !imageUrl.includes(".mp4") && (
        <img
          src={imageUrl}
          alt={title}
          className="card-image w-full h-full object-cover rounded-[32px]" // "card-image w-full h-full object-cover rounded-xl mb-3"
        />
      )}
      {imageUrl && imageUrl.includes(".mp4") && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="card-video w-full h-full object-cover rounded-[32px]"
        >
          <source src={imageUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Optional title */}
      {/* Remove if GridCard handles title elsewhere */}
      {/* <h3 className="text-[clamp(24px,4vw,48px)] text-center font-semibold mb-2">
        {title}
      </h3> */}

      {/* Optional description */}
      {description && <p className="text-white mb-2">{description}</p>}

      {/* Children (usually GridCard content) */}
      {children}
    </div>
  );
};

export default Card;
