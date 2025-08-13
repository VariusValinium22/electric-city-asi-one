import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "../../store";

const SharkCounter: React.FC = () => {
  const { t } = useTranslation();
  const [sharkCount, setSharkCount] = useState(0);
  const { mainStore } = useStore()

  useEffect(() => {
    setSharkCount(mainStore.currentSharkCount);
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

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
          {sharkCount === 1 ? t('counter.sharkAlreadyMade') : t('counter.sharksAlreadyMade')}
        </p>
      </div>
    </div>
  );
};

export default SharkCounter;