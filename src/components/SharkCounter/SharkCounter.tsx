import React, { useState } from "react";

const SharkCounter: React.FC = () => {
  const [count] = useState(0);

  return (
    <div className="flex items-center justify-center gap-4">
      <p className="h-[67px] w-fit px-4 text-[40px] leading-[40px] font-bold bg-white rounded-lg flex items-center justify-center">
        {count}
      </p>
      <p className="text-white text-[40px] leading-[40px] font-medium whitespace-nowrap">
        Sharks already made
      </p>
    </div>
  );
};

export default SharkCounter;
