import React from "react";

interface SizeChoiceCardProps {
  header: string;
  headerSize?: string;
  leftIcon?: string;
  rightIcons?: string[];
  iconSizes?: {
    left?: string;
    right?: string[];
  };
  onClick: () => void;
  isSelected?: boolean;
}

export const SizeChoiceCard: React.FC<SizeChoiceCardProps> = ({
  header,
  headerSize = "text-2xl font-bold",
  leftIcon,
  rightIcons,
  iconSizes = {
    left: "w-[clamp(40px,6vw,80px)] h-auto",
    right: ["w-[clamp(80px,8vw,120px)] h-auto"]
  },
  onClick,
  isSelected = false
}) => {
  return (
    <div 
      className={`bg-(--color-shamrock) w-[575px] h-[425px] rounded-[32px] border-4 shadow-md hover:shadow-lg transition-all cursor-pointer ${
        isSelected 
          ? 'opacity-100 scale-105' 
          : 'opacity-100 hover:scale-102'
      }`}
      onClick={onClick}
    >

      <div className={`text-center text-(--color-biscay) mb-6 pt-6 ${headerSize}`}>
        {header}
      </div>
      

      <div className="flex items-center justify-between px-8 h-[300px]">

        {leftIcon && (
          <div className="flex-shrink-0">
            <img 
              src={leftIcon} 
              alt="Left Icon" 
              className={iconSizes.left || "w-[clamp(40px,6vw,80px)] h-auto"}
            />
          </div>
        )}
        

        {rightIcons && rightIcons.length > 0 && (
          <div className="flex flex-col gap-4 flex-shrink-0">
            {rightIcons.map((icon, index) => (
              <img 
                key={index}
                src={icon} 
                alt={`Right Icon ${index + 1}`} 
                className={
                  iconSizes.right && iconSizes.right[index] 
                    ? iconSizes.right[index] 
                    : "w-[clamp(80px,8vw,120px)] h-auto"
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 