import React from "react";
import "../../global/default.css"
import "./Card.css"

// Define props Card can accept
 export interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string; // Allow custom styling
  size?: 'sm' | 'md' | 'lg'; // Predefined sizes
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  onClick,
  disabled = false,
  children,
  className = "", // Default to empty string 
  size = "md",    // Default to "md" 
}) => {

  // Handle click events only if Card is not disabled 
    const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  // Define size based width and height options
  const sizeClasses = {
    sm: "w-64 h-40",              // Small card
    md: "w-96 h-60",              // Medium card (default)
    lg: "w-[820px] h-[553px]",    // Large card (matches Figma)
  };

  return (
    <div
      // Apply all styles:
      // - sizeClasses[size] for dynamic sizing
      // - disabled styles if needed
      // - allow parent to inject custom styles with className
      className={`card-container ${sizeClasses[size]} rounded-[32px] border-4 shadow-md p-4 bg-white hover:shadow-lg transition-all cursor-pointer bg-[var(--aqua-green)] ${
        disabled ? "opacity-50 pointer-events-none" : "opacity-100"
      } ${className}`}
      onClick={handleClick}
    >
      {/* Optional image rendering if imageUrl is provided */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="card-image w-full h-40 object-cover rounded-xl mb-3"
        />
      )}
      <h3 className="card-title text-xl font-semibold mb-1">{title}</h3>
      {description && <p className="text-gray-600 mb-2">{description}</p>}
      {children}
    </div>
  );
};

export default Card;
