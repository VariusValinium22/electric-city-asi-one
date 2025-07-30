const LogoCircle: React.FC = () => (
  <div
    className={`z-10 flex items-center justify-center 
                  absolute bottom-[100px] md:right-[70px] md:bottom-[50px]
                  w-[clamp(128px,15vw,224px)] h-[clamp(128px,15vw,224px)]
                  bg-[#E4E4E4] rounded-full opacity-100
                  will-change-transform`}
  >
    <img src="/logo-circle.svg" alt="Logo" className="w-full h-auto" />
  </div>
);

export default LogoCircle;
