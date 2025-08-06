import { observer } from "mobx-react-lite";

import SharkCounter from "../../components/SharkCounter/SharkCounter";
import VideoBackground from "../../components/VideoBackground/VideoBackground";
import SharkTitle from "../../components/SharkTitle/SharkTitle";
import StartButton from "../../components/StartButton/StartButton";
import LogoCircle from "../../components/LogoCircle/LogoCircle";
import InactivityManager from "../../components/InactivityManager/InactivityManager";

import { useABButtons } from "../../hooks/useABButtons";
import { useStore } from "../../store";

export const StartView = observer(() => {
  const { promptState, resetInactivity } = useABButtons();
  const { mainStore } = useStore();
  const currentNode = mainStore.getCurrentNode();
  // function onButtonAClick() {
  
  //   resetInactivity();
  // }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden z-9">
      <VideoBackground />
      <SharkTitle title={currentNode.title} />
      <StartButton />
      <LogoCircle />
      <SharkCounter />
      <InactivityManager
        promptState={promptState}
        resetInactivity={resetInactivity}
      />
    </div>
  );
});
