import React from "react";
import "../../global/default.css";
import Card from "../Card/Card";

// small or large card
type CardSize = "small" | "large";

export const SizeCard = ({ size }: { size: CardSize }) => {
  const isSmall = size === "small";

  return (
    <Card
      title={isSmall ? "6 inches – 7 feet" : "7 feet – 62 feet"}
      size="lg"
      className={`
    text-[#1B3567] text-[clamp(24px,4vw,64px)] leading-none
    font-lilita
    border-4px border-white/50
    flex flex-col pt-6 pb-4 justify-start
  `}
    >
      {/* Background image */}
      {/* Grid Lines Background */}
      {/* Title */}
      <div className="relative z-10 w-full text-center ">
        {isSmall ? "6 inches – 7 feet" : "7 feet – 62 feet"}
      </div>
      {/* Absolute layout wrapper */}
      <div className="relative z-10 w-full h-full flex-1">
        {/* {human} */}
        <img
          src={`/human-option_${isSmall ? "small" : "large"}.svg`}
          alt="human"
          className={`absolute object-contain ${
            isSmall
              ? "left-[clamp(40px,7vw,152px)] bottom-[clamp(20px,5vw,52px)] w-[clamp(43px,12vw,110px)] h-[clamp(110px,25vw,311px)]"
              : "left-[clamp(20px,2vw,70px)] bottom-[clamp(10px,2vw,41px)] w-[clamp(15px,1.5vw,43px)] h-[clamp(40px,4vw,110px)]"
          }`}
        />
        {/* {large shark} */}
        <img
          src={`/shark-${size}-option_large.svg`}
          alt="shark large"
          className={`absolute object-contain ${
            isSmall
              ? "right-[clamp(54px,8vw,117px)] bottom-[clamp(64px,12vw,213px)] w-[clamp(110px,22vw,337px)] h-[clamp(60px,9vw,110px)]"
              : "right-[clamp(20px,3vw,51px)] bottom-[clamp(56px,10vw,194px)] w-[clamp(202px,40vw,619px)] h-[clamp(100px,12vw,202px)]"
          }`}
        />
        {/* {small shark} */}
        <img
          src={`/shark-${size}-option_small.svg`}
          alt="shark small"
          className={`grid-card__shark absolute object-contain ${
            isSmall
              ? "right-[clamp(96px,10vw,250px)] bottom-[clamp(50px,8vw,180px)] w-[clamp(40px,5vw,94px)] h-[clamp(15px,2vw,30px)]"
              : "right-[clamp(80px,5vw,255px)] bottom-[clamp(20px,3vw,60px)] w-[clamp(101px,20vw,307px)] h-[clamp(40px,6vw,101px)]"
          }`}
        />
      </div>
    </Card>
  );
};
