import { TextButton } from "../components/TextButton/TextButton";

import { useABButtons } from "../hooks/useABButtons";

import { observer } from "mobx-react-lite";

// import { useStore } from "../store";

import "./StartPage.css";
import SharkCounter from "../components/SharkCounter/SharkCounter";
import VideoBackground from "../components/VideoBackground/VideoBackground";
import SharkTitle from "../components/SharkTitle/SharkTitle";
import LogoCircle from "../components/LogoCircle/LogoCircle";

export const StartPage = observer(() => {
  // const { mainStore } = useStore();

  const { clickButton, buttonLinks } = useABButtons();

  function onButtonAClick() {
    buttonLinks.a = "/";
    clickButton("a");
  }

  return (
    <div className="start-view-page-container relative flex flex-col items-center justify-center min-h-screen overflow-hidden z-9">
      <VideoBackground />
      <SharkTitle />
      <LogoCircle />
      <div className="z-9">
        <TextButton label="A" id="a-button" onClick={onButtonAClick} />
      </div>
      <SharkCounter />
    </div>
  );
});
