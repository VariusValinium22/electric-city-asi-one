import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
// import { Choice } from "../../types/game";
import { useABButtons } from "../../hooks/useABButtons";
import { TextButton } from "../../components/TextButton/TextButton";


import InactivityManager from "../../components/InactivityManager/InactivityManager";


export const ChoiceView = observer(() => {
  const { mainStore } = useStore();
  const { promptState, resetInactivity } = useABButtons();


  function onButtonAClick() {
    mainStore.makeChoice("a");
    resetInactivity();
  }

  function onButtonBClick() {
    mainStore.makeChoice("b");
    resetInactivity();
  }


  return (
    <div>
      <TextButton label="B" id="b-button" onClick={onButtonBClick} />
      <TextButton label="A" id="a-button" onClick={onButtonAClick} />

      <InactivityManager promptState={promptState} resetInactivity={resetInactivity} />
    </div>
  );
});
