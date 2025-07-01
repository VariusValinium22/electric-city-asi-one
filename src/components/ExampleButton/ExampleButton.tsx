import React from 'react';

interface ExampleButtonProps {
  /**
   * The text content of the button
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Optional variant for different button styles
   */
  variant?: 'primary' | 'secondary';
  /**
   * Optional disabled state
   */
  disabled?: boolean;
}

export const ExampleButton: React.FC<ExampleButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
}) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors duration-200';
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]}`}
      data-testid="example-button"
    >
      {label}
    </button>
  );
};
