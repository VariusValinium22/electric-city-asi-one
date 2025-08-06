import React, { useEffect, useState } from "react";
import { mainStore } from "../../store";

const SharkCounter: React.FC = () => {
  const [sharkCount, setSharkCount] = useState(0);
  const [userTickTotal, setUserTickTotal] = useState(2);

  useEffect(() => {
    setSharkCount(mainStore.currentSharkCount);
  }, []);

  const testCounterIncrement = () => {
    console.log("testCounterIncrement: ", userTickTotal);
    setTimeout(() => {
      const newUserTickTotal = userTickTotal - 1;
      setUserTickTotal(newUserTickTotal);
    }, 2500);
  };

  useEffect(() => {
    console.log("userTickTotal: ", { userTickTotal, sharkCount });
    if (userTickTotal > 0) {
      testCounterIncrement();
    } else if (userTickTotal === 0 && sharkCount === mainStore.currentSharkCount) {
      mainStore.increment();
      setSharkCount(mainStore.currentSharkCount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTickTotal]);

 return (
    <div className="flex justify-center absolute bottom-12 w-full" aria-live="polite" aria-atomic="true">
      <div className="flex items-center justify-center gap-4 z-10">
        <p
          className="flex items-center justify-center
                     font-lilita font-normal bg-white text-[#1B1C38] rounded-lg w-fit
                     h-[clamp(42px,5.5vw,67px)] 
                     text-[clamp(26px,3.5vw,52px)]
                     leading-[clamp(28px,4.2vw,52px)]
                     px-[clamp(.2px,4vw,14px)]"
        >
          {sharkCount}
        </p>
        <p
          className="text-white  
                     font-inter font-medium whitespace-nowrap
                     text-[clamp(16px,3.5vw,40px)]
                     leading-[clamp(28px,4.2vw,52px)]"
        >
          {sharkCount === 1 ? "Shark already made" : "Sharks already made"}
        </p>
      </div>
    </div>
  );
};

export default SharkCounter;