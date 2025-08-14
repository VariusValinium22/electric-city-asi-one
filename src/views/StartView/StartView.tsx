import { observer } from "mobx-react-lite";

import SharkCounter from "../../components/SharkCounter/SharkCounter";
import VideoBackground from "../../components/VideoBackground/VideoBackground";
import SharkTitle from "../../components/SharkTitle/SharkTitle";
import { TextButton } from "../../components/TextButton/TextButton";
import LogoCircle from "../../components/LogoCircle/LogoCircle";
import InactivityManager from "../../components/InactivityManager/InactivityManager";

import { useABButtons } from "../../hooks/useABButtons";
import { useStore } from "../../store";
import { useTranslation } from "react-i18next";

export const StartView = observer(() => {
  const { t } = useTranslation();
  const { promptState, resetInactivity } = useABButtons();
  const { mainStore } = useStore();
  const currentNode = mainStore.getCurrentNode();

  function onButtonAClick() {
    mainStore.makeChoice("a");
    resetInactivity();
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden z-9">
      <VideoBackground src="/SharkBackgroundVideo.mp4" />
      <SharkTitle title={currentNode.title} />
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
          {t("start.press")}
        </p>
        <TextButton label="A" id="start-button" variant="a" onClick={onButtonAClick} />
        <p
          className="text-white font-inter font-medium whitespace-nowrap
                    text-[clamp(16px,3vw,40px)] 
                    leading-none"
        >
          {t("start.toStart")}
        </p>
      </div>
      <LogoCircle />
      <SharkCounter />
      <InactivityManager promptState={promptState} resetInactivity={resetInactivity} />
    </div>
  );
});
