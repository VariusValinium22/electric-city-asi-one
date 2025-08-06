// import React from "react";
// import "../../global/default.css"
// import "./Card.css"

// // Define props Card can accept
//  export interface CardProps {
//   title: string;
//   description?: string;
//   imageUrl?: string;
//   onClick?: () => void;
//   disabled?: boolean;
//   children?: React.ReactNode;
//   className?: string; // Allow custom styling
//   size?: 'sm' | 'md' | 'lg'; // Predefined sizes
// }

// const Card: React.FC<CardProps> = ({
//   title,
//   description,
//   imageUrl,
//   onClick,
//   disabled = false,
//   children,
//   className = "", // Default to empty string 
//   size = "md",    // Default to "md" 
// }) => {

//   // Handle click events only if Card is not disabled 
//     const handleClick = () => {
//     if (!disabled && onClick) {
//       onClick();
//     }
//   };

//   // Define size based width and height options
//   const sizeClasses = {
//     sm: "w-64 h-40",              // Small card
//     md: "w-96 h-60",              // Medium card (default)
//     lg: "w-[clamp(240px,80vw,820px)] h-[clamp(160px,55vw,553px)]"
//     // "w-[clamp(320px,80vw,820px)] h-[clamp(200px,55vw,553px)]",    // Large card (matches Figma)
//   };

//   return (
//     <div
//       // Apply all styles:
//       // - sizeClasses[size] for dynamic sizing
//       // - disabled styles if needed
//       // - allow parent to inject custom styles with className
//       className={`card-container ${sizeClasses[size]} font-lilita rounded-[32px] border-none shadow-md p-4 bg-white hover:shadow-lg transition-all cursor-pointer bg-[var(--aqua-green)] ${
//         disabled ? "opacity-50 pointer-events-none" : "opacity-100"
//       } ${className}`}
//       onClick={handleClick}
//     >
//       {/* Optional image rendering if imageUrl is provided */}
//       {imageUrl && (
//         <img
//           src={imageUrl}
//           alt={title}
//           className="card-image w-full h-40 object-cover rounded-xl mb-3"
//         />
//       )}
//       {/* <h3
//   className={`
//     card-title text-center font-semibold font-lilita
//     text-[clamp(24px,4vw,48px)]
//     w-[clamp(300px,40vw,448px)]
//     h-[clamp(48px,9vw,73px)]
//     flex items-center justify-center
//   `}
// >
//   {title}
// </h3> */}

//       {description && <p className="text-gray-600 mb-2">{description}</p>}
//       {children}
//     </div>
//   );
// };

// export default Card;


import React from "react";
import "../../global/default.css";
import "./Card.css";

// Define props Card can accept
export interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
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
    sm: "w-64 h-40",
    md: "w-96 h-60",
    lg: "w-[clamp(240px,80vw,820px)] h-[clamp(160px,55vw,553px)]",
  };

  return (
    <div
      className={`
        card-container
        font-lilita
        rounded-[32px]
        border-none
        shadow-md
        p-4
        bg-white
        hover:shadow-lg
        transition-all
        cursor-pointer
        bg-[var(--aqua-green)]
        ${sizeClasses[size]}
        ${disabled ? "opacity-50 pointer-events-none" : "opacity-100"}
        relative flex flex-col justify-start
        ${className}
      `}
      onClick={handleClick}
    >
      {/* Optional image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="card-image w-full h-40 object-cover rounded-xl mb-3"
        />
      )}

      {/* Optional title */}
      {/* Remove if GridCard handles title elsewhere */}
      {/* <h3 className="text-[clamp(24px,4vw,48px)] text-center font-semibold mb-2">
        {title}
      </h3> */}

      {/* Optional description */}
      {description && <p className="text-gray-600 mb-2">{description}</p>}

      {/* Children (usually GridCard content) */}
      {children}
    </div>
  );
};

export default Card;
