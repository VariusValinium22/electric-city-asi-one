import React from "react";
import "../../global/default.css";

interface TextButtonProps {
  // The text content of the button
  label: string;

  // The id of the button
  id: string;

  // Optional click handler
  onClick?: () => void;

  // Variant prop for style differences in A/B buttons
  variant?: "a" | "b";

  // Whether the button should be disabled visually and semantically
  disabled?: boolean;

  // Optional class override for custom styling
  className?: string;

  // accesible label for screen reader
  ariaLabel?: string;

  // a text props
  text?: string;

  // whether the button is in the choice view
  isChoiceView?: boolean;
}

export const TextButton: React.FC<TextButtonProps> = ({
  label,
  text,
  id,
  onClick,
  variant = "a",
  disabled = false,
  className = "",
  ariaLabel,
  isChoiceView = false,
}) => {
  const wrapperClass = `

    w-[clamp(40px,15vw,64px)]     
    aspect-square                
    rounded-[25%]            
    bg-white                    
    shadow-lg                    
    flex flex-col justify-center items-center 
    border-0
    `;

  // These are the styles for the A | B part
  const baseStyles = `
    w-full h-full
    rounded-[25%]
    border-b-[3px] border-b-[#00000080]
    shadow-[inset_-2px_2px_4px_0px_#ffffff]
    p-[10px]
    gap-[10px]
    flex flex-col justify-center items-center
    text-[#1B1C38] 
    font-lilita font-normal
    text-[clamp(40px,8vw,52px)]   
    leading-[1]                   
    tracking-normal
    transition-colors
    cursor-pointer
    
  `;

  // style for text
  const textStyles = `font-lilita font-bold text-[45px] leading-[1] tracking-[0]`;

  // Applies conditional styles based on "a" or "b"
  const variantStyles =
    variant === "a" ? "bg-[#FCBB23] hover:bg-[#274c8b]" : "bg-[#28A9B4] hover:bg-[#1c6a73]";

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <div
      className={`flex ${isChoiceView ? "justify-between" : "justify-center"} ${text ? "gap-[20px]" : ""} items-center`}
    >
      <div className={wrapperClass}>
        <button
          type="button"
          onClick={onClick}
          id={id}
          data-testid="text-button"
          disabled={disabled}
          aria-disabled={disabled}
          aria-label={ariaLabel || label}
          className={`${baseStyles} ${variantStyles} ${disabledStyles} ${className}`}
        >
          {label}
          {/* {text && <span className="text-[clamp(16px,3vw,20px)]">{text}</span>} */}
        </button>
      </div>
      <p className={textStyles}>{text}</p>
    </div>
  );
};
