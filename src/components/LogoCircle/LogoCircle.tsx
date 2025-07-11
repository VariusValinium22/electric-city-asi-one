const LogoCircle = () => (
  <div className="absolute z-10 flex items-center justify-center 
                 w-[clamp(128px,15vw,224px)] h-[clamp(128px,15vw,224px)]
                 right-[clamp(16px,5vw,70px)] bottom-[clamp(16px,4vh,50px)]
                 2xl:w-[224px] 2xl:h-[224px] 2xl:right-[70px] 2xl:bottom-[50px]
                 bg-[#E4E4E4] rounded-full opacity-100
                 will-change-transform">
    <img
      src="/logo-circle.svg"
      alt="Logo"
      className="w-full h-auto"
    />
  </div>
);

export default LogoCircle;