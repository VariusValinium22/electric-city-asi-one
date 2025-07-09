import { observer } from "mobx-react-lite";
import "./StartPage.css";
import SharkCounter from "../components/SharkCounter/SharkCounter";

export const StartPage = observer(() => {
  return (
    <div className="start-view-page-container flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome to Electric City</h1>
    <div>
      <SharkCounter />
    </div>
    </div>
    
  );
});
