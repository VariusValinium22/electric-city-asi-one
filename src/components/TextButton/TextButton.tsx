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
}

export const TextButton: React.FC<TextButtonProps> = ({ label, id, onClick }) => {
  return (
    <button onClick={onClick} id={id} data-testid="text-button">
      {label}
    </button>
  );
};
