import { TextButton } from "../TextButton/TextButton";

const StartButton = () => {
  return (
    <div
      className="absolute 
                 top-[clamp(140px,25vw,350px)]
                 left-1/2 -translate-x-1/2
                 flex items-center justify-center gap-4  
                 will-change-transform"
    >
      <p
        className="text-white font-inter font-medium whitespace-nowrap
                     text-[clamp(16px,3vw,40px)] 
                     leading-none"
      >
        Press
      </p>
      <TextButton label="A" id="start-button" variant="a" />
      <p
        className="text-white font-inter font-medium whitespace-nowrap
                    text-[clamp(16px,3vw,40px)] 
                    leading-none"
      >
        to start
      </p>
    </div>
  );
};

export default StartButton;
