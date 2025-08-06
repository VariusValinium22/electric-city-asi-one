import React from "react";
import { Header } from "../Header/Header";
import { TextButton } from "../TextButton/TextButton";

interface OutcomeProps {
  // The page header text
  headerText: string;
  // The top text depicting the view location
  legendText: string;
  // Description text shown on the right side
  descriptionText: string;
  // Whether the B button shows
  showBButton?: boolean;
  // Image component on the left side
  imageView?: React.ReactNode;
}

export const Outcome: React.FC<OutcomeProps> = ({
  headerText,
  legendText,
  descriptionText,
  showBButton = true,
  imageView,
}) => {
  const mainContainerStyle = "w-full h-screen p-[52px_100px] bg-[#1B3567]";
  const infoContainerStyle = "flex flex-col gap-[60px] text-red-500";
  const headerStyle = "flex flex-col-reverse";
  const imageViewStyle = "h-[553px] bg-black rounded-[32px]";
  const descriptionStyle = "text-[40px] leading-[100%] text-inter text-[#F3F3F1]";
  const bottomContainerStyle = "grid grid-flow-row grid-cols-2 gap-[80px]";
  const buttonContainerStyle = "flex gap-[20px] items-center absolute";
  const aButtonContainerStyle = `${buttonContainerStyle} bottom-[52px] right-[52px]`;
  const bButtonContainerStyle = `${buttonContainerStyle} left-[52px] top-[52px]`;
  const bButtonTextStyle = "text-[#F3F3F199] text-[32px] leading-[100%]";
  const aButtonTextStyle = "text-[#F3F3F1] text-[40px] leading-[100%]";

  return (
    <section className={mainContainerStyle}>
      {showBButton && (
        <div className={bButtonContainerStyle}>
          <TextButton label="B" id="b-button" />
          <p className={bButtonTextStyle}>Restart</p>
        </div>
      )}
      <div className={infoContainerStyle}>
        <Header legend={headerText} title={legendText} className={headerStyle} />
        <div className={bottomContainerStyle}>
          <div className={imageViewStyle}>{imageView}</div>
          <p className={descriptionStyle}>{descriptionText}</p>
        </div>
      </div>
      <div className={aButtonContainerStyle}>
        <TextButton label="A" id="a-button" />
        <p className={aButtonTextStyle}>{showBButton ? "Continue" : "Restart"}</p>
      </div>
    </section>
  );
};
