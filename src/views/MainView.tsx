import { observer } from "mobx-react-lite";
import { useStore } from "../store";
import { GameStage } from "../types/game";
import { StartView } from "./StartView/StartView";
import { ChoiceView } from "./ChoiceView/ChoiceView";
// import { ChoiceCardView } from "./ChoiceCardView/ChoiceCardView";
import { OutcomeView } from "./OutcomeView/OutcomeView";

export const MainView = observer(() => {
  const { mainStore } = useStore();
  const currentStage = mainStore.gameStage;

  // render appropriate view based on the current game stage
  return (
    <>
      {currentStage === GameStage.START && <StartView />}
      {currentStage === GameStage.CHOICE && <ChoiceView />}
      {(currentStage === GameStage.OUTCOME || currentStage === GameStage.FINAL) && <OutcomeView />}
    </>
  );
});
