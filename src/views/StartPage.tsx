import { observer } from "mobx-react-lite";
import "./StartPage.css";
import SharkCounter from "../components/SharkCounter/SharkCounter";
import VideoBackground from "../components/VideoBackground/VideoBackground";
import SharkTitle from "../components/SharkTitle/SharkTitle";
import LogoCircle from "../components/LogoCircle/LogoCircle";

export const StartPage = observer(() => {
  return (
    <div className="start-view-page-container relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <VideoBackground />
      <SharkTitle />
      <LogoCircle />
      <div className="sr-only">
        <h1>Welcome to Electric City</h1>
      </div>
      <SharkCounter />
    </div>
  );
});
