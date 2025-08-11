import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { Choice } from "../../types/game";
import { useABButtons } from "../../hooks/useABButtons";
import { TextButton } from "../../components/TextButton/TextButton";
import { Header } from "../../components/Header/Header";
// import { SizeChoiceCard } from "../../components/SizeChoiceCard/SizeChoiceCard";
import { SizeCard } from "../../components/SizeCard/SizeCard";
import Card from "../../components/Card/Card";

import InactivityManager from "../../components/InactivityManager/InactivityManager";

export const ChoiceView = observer(() => {
  const { mainStore } = useStore();
  const currentNode = mainStore.getCurrentNode();
  const { promptState, resetInactivity } = useABButtons();

  function onButtonAClick() {
    mainStore.makeChoice("a");
    resetInactivity();
  }

  function onButtonBClick() {
    mainStore.makeChoice("b");
    resetInactivity();
  }

  const node = currentNode;
  if (!node) {
    return null;
  }

  const { id, optionA, optionB } = node as Choice;

  const isSizeChoice = optionA.cardHeader && optionB.cardHeader;

  const stepCount = mainStore.getCurrentStepCount;
  let legend = "";

  if (stepCount !== 4) {
    legend = `${stepCount.toString()}/3 steps`;
  } else {
    legend = "Last detail";
  }

  const choiceCardOptionClass = "min-h-screen bg-[#1B3567]";
  const choiceCardOptionCardClass = "flex mt-[15vh] items-center gap-20 justify-center";
  const choiceCardSubClass = "flex items-center gap-20 justify-center";
  const choiceCardOptionCardsandButtonsClass = "flex flex-col items-center justify-center gap-10";

  return (
    <div className={choiceCardOptionClass} id={id}>
      <Header legend={legend} title={currentNode.title} />
      <div className={choiceCardOptionCardClass}>
        {isSizeChoice ? (
          <div className={choiceCardSubClass}>
            <div className={choiceCardOptionCardsandButtonsClass}>
              <SizeCard size="small" />
              <div className="">
                <TextButton
                  label="A"
                  id="a-button"
                  text={(currentNode as Choice).optionA.text}
                  onClick={onButtonAClick}
                />
              </div>
            </div>

            <div className={choiceCardOptionCardsandButtonsClass}>
              <SizeCard size="large" />
              <div className="">
                <TextButton
                  label="B"
                  id="b-button"
                  text={(currentNode as Choice).optionB.text}
                  onClick={onButtonBClick}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div>
              <div className={choiceCardOptionCardsandButtonsClass}>
                <Card
                  title={""}
                  description={""}
                  imageUrl={(currentNode as Choice).optionA.image || ""}
                  onClick={onButtonAClick}
                  size="lg"
                />
                <div>
                  <TextButton
                    label="A"
                    id="a-button"
                    text={stepCount !== 4 ? (currentNode as Choice).optionA.text : ""}
                    onClick={onButtonAClick}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className={choiceCardOptionCardsandButtonsClass}>
                <Card
                  title={""}
                  description={""}
                  imageUrl={(currentNode as Choice).optionB.image || ""}
                  onClick={onButtonBClick}
                  size="lg"
                />
                <div>
                  <TextButton
                    label="B"
                    id="b-button"
                    text={stepCount !== 4 ? (currentNode as Choice).optionA.text : ""}
                    onClick={onButtonBClick}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        <InactivityManager promptState={promptState} resetInactivity={resetInactivity} />
      </div>
    </div>
  );
});
