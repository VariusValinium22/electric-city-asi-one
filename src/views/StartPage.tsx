import { TextButton } from "../components/TextButton/TextButton";

import { useABButtons } from "../hooks/useABButtons";

import { observer } from "mobx-react-lite";

// import { useStore } from "../store";

import "./StartPage.css";
import SharkCounter from "../components/SharkCounter/SharkCounter";
import VideoBackground from "../components/VideoBackground/VideoBackground";
import SharkTitle from "../components/SharkTitle/SharkTitle";
import StartButton from "../components/StartButton/StartButton";
import LogoCircle from "../components/LogoCircle/LogoCircle"; 
import InactivityManager from "../components/InactivityManager/InactivityManager";

export const StartPage = observer(() => {
  // const { mainStore } = useStore();

  const { clickButton, buttonLinks, promptState, resetInactivity } = useABButtons();

  function onButtonAClick() {
    buttonLinks.a = "/";
    clickButton("a");
  }

  return (
    <div className="start-view-page-container relative flex flex-col items-center justify-center min-h-screen overflow-hidden z-9">
      <VideoBackground />
      <SharkTitle />
      <StartButton />
      <LogoCircle />
      <div className="sr-only">
        <h1>Welcome to Electric City</h1>
        <TextButton label="A" id="a-button" onClick={onButtonAClick} />
      </div>
      <SharkCounter />
      <InactivityManager promptState={promptState} clickButton={clickButton} resetInactivity={resetInactivity} />
    </div>
  );
});
