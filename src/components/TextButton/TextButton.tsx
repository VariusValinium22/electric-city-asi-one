import React from "react";

interface TextButtonProps {
  /**
   * The text content of the button
   */
  label: string;
  /**
   * The id of the button
   */
  id: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Variant prop for style differences in A/B buttons
   * Reserved for future use in visual styling
   */
  variant?: "a" | "b";
}

export const TextButton: React.FC<TextButtonProps> = ({ label, id, onClick }) => {
  return (
    /**
     * Tailwind styles applied to match the Figma design
     */
    <button
      onClick={onClick}
      id={id}
      data-testid="text-button"
      className="
        w-16 h-16
        rounded-[20px]
        opacity-100
        pb-[7px] pt-[10px] px-[10px]
        border-b-[3px] border-b-[#00000080]
        shadow-[inset_-2px_2px_4px_0px_#ffffff]
        bg-[#FCBB23] text-white font-semibold
        hover:bg-[#274c8b]
        transition-colors
      "
    >
      {label}
    </button>
  );
};
