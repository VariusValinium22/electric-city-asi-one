import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { Outcome } from "../../types/game";
import { useABButtons } from "../../hooks/useABButtons";
import { Header } from "../../components/Header/Header";
import { TextButton } from "../../components/TextButton/TextButton";

import InactivityManager from "../../components/InactivityManager/InactivityManager";
import Card from "../../components/Card/Card";
import { useTranslation } from "react-i18next";
import { LargeSizeCard, SmallSizeCard } from "../../components/SizeCard/SizeCard";

export const OutcomeView = observer(() => {
  const { mainStore } = useStore();
  const currentNode = mainStore.getCurrentNode();
  const { promptState, resetInactivity } = useABButtons();
  const { t } = useTranslation();

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

  const { id, title, description, image } = node as Outcome;

  const isSizeOutcome = ["small-shark-outcome", "large-shark-outcome"].includes(id);
  const isSmallSizeOutcome = title.includes("Small");


  const stepCount = mainStore.getCurrentStepCount;
  let legend = "";
  let showBButton = true;

  if (stepCount !== 4) {
    legend = t("step", { stepCount: stepCount.toString() });
  } else {
    legend = t("yourShark");
    showBButton = false;
  }

  const mainContainerStyle = "w-full h-screen p-[52px_100px] bg-[#1B3567]";
  const infoContainerStyle = "flex flex-col gap-[60px] text-red-500";
  const headerStyle = "flex flex-col";
  const descriptionStyle = "text-[40px] leading-[100%] text-inter text-white";
  const descriptionContainerStyle = "flex flex-col gap-[20px]";
  const boldStyle = "font-bold";
  const bottomContainerStyle = "grid grid-flow-row grid-cols-2 gap-[80px]";
  const buttonContainerStyle = "flex gap-[20px] items-center absolute";
  const aButtonContainerStyle = `${buttonContainerStyle} bottom-[52px] right-[52px]`;
  const bButtonContainerStyle = `${buttonContainerStyle} left-[52px] top-[52px]`;
  const bButtonTextStyle = "text-[#F3F3F199] text-[32px] leading-[100%]";
  const aButtonTextStyle = "text-[#F3F3F1] text-[40px] leading-[100%]";

  return (
    <div>
      <section className={mainContainerStyle} id={id}>
        {showBButton && (
          <div className={bButtonContainerStyle}>
            <TextButton label="B" id="b-button" onClick={onButtonBClick} />
            <p className={bButtonTextStyle}>{t("restart")}</p>
          </div>
        )}
        <div className={infoContainerStyle}>
          <Header
            legend={legend}
            title={!showBButton ? t(`${id}.name`) : t(title)}
            className={headerStyle}
          />
          <div className={bottomContainerStyle}>
            {image && !isSizeOutcome ? <Card title="" imageUrl={image} size="lg" /> :
            isSizeOutcome && isSmallSizeOutcome ? <SmallSizeCard /> : <LargeSizeCard />}
            {typeof description === "string" ? (
              <p className={descriptionStyle}>{t(description)}</p>
            ) : (
              <div className={descriptionContainerStyle}>
                <p className={descriptionStyle}>
                  <span className={boldStyle}>{t("range")}</span>
                  {t(`${id}.description.range`)}
                </p>
                <p className={descriptionStyle}>
                  <span className={boldStyle}>{t("size")}</span>
                  {t(`${id}.description.size`)}
                </p>
                <p className={descriptionStyle}>
                  <span className={boldStyle}>{t("funFact")}</span>
                  {t(`${id}.description.fact`)}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className={aButtonContainerStyle}>
          <TextButton label="A" id="a-button" onClick={onButtonAClick} />
          <p className={aButtonTextStyle}>{showBButton ? t("continue") : t("restart")}</p>
        </div>
      </section>

      <InactivityManager promptState={promptState} resetInactivity={resetInactivity} />
    </div>
  );
});
