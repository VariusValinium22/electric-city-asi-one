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
    <div className="flex items-center justify-center gap-4 z-10">
      <p className="h-[67px] w-fit px-4 text-[40px] leading-[40px] font-bold bg-white rounded-lg flex items-center justify-center">
        {sharkCount}
      </p>
      <p className="text-white text-[40px] leading-[40px] font-medium whitespace-nowrap">
        {sharkCount === 1 ? "Shark already made" : "Sharks already made"}
      </p>
    </div>
  );
};
export default SharkCounter;
