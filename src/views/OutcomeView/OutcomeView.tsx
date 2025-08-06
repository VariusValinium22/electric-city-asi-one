import { observer } from "mobx-react-lite";
// import { useStore } from "../../store";
// import { Outcome } from "../../types/game";
import { useABButtons } from "../../hooks/useABButtons";


import InactivityManager from "../../components/InactivityManager/InactivityManager";


export const OutcomeView = observer(() => {
//   const { mainStore } = useStore();
  const { promptState, resetInactivity } = useABButtons();

//   function onButtonAClick() {

//     resetInactivity();
//   }

//   function onButtonBClick() {
 
//     resetInactivity();
//   }

  return (
    <div>
      <div></div>

      <InactivityManager promptState={promptState} resetInactivity={resetInactivity} />
    </div>
  );
});
