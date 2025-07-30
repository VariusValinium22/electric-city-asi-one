const SharkTitle = () => (
  <>
    {/* White Outline */}
    <h2
      className="absolute left-1/2 -translate-x-1/2 
                 top-[30px] sm:top-[40px] md:top-[60px] lg:top-[80px] xl:top-[90px]
                 text-[clamp(60px,12vw,180px)]
                 font-lilita leading-none text-[#1B3567] z-10 
                 whitespace-nowrap max-w-[95vw] px-2
                 will-change-transform
                 2xl:text-[180px] 2xl:w-[1167px] 2xl:h-[229px]"
      style={{
        WebkitTextStroke: "clamp(15px, 3vw, 45px) white",
      }}
    >
      Make a Shark!
    </h2>

    {/* Blue Fill */}
    <h2
      className="absolute left-1/2 -translate-x-1/2 
                 top-[30px] sm:top-[40px] md:top-[60px] lg:top-[80px] xl:top-[90px]
                 text-[clamp(60px,12vw,180px)]
                 font-lilita leading-none text-[#1B3567] z-20 
                 whitespace-nowrap max-w-[95vw] px-2
                 will-change-transform
                 2xl:text-[180px] 2xl:w-[1167px] 2xl:h-[229px]"
    >
      Make a Shark!
    </h2>
  </>
);

export default SharkTitle;
