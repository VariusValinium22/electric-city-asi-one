import React from "react";
import { useTranslation } from "react-i18next";
import { TextButton } from "../TextButton/TextButton";

interface InactivityModalProps {
  secondsLeft: number;
  isVisible: boolean;
  onContinue: () => void;
}

const InactivityModal: React.FC<InactivityModalProps> = ({
  secondsLeft,
  isVisible,
  onContinue,
}) => {
  const { t } = useTranslation();
  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-69 backdrop-blur-lg bg-black/20 flex items-center justify-center font-lilita"
    >
      <div className="-translate-y-[10vh] flex flex-col items-center text-center">
        <h2
          className="text-white
                     text-[clamp(32px,8vw,96px)]
                     max-w-[95vw] px-4"
        >
          {t("inactivity.restarting", { seconds: secondsLeft })}
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-4 px-4">
          <p className="text-white leading-none text-[clamp(32px,8vw,96px)]">
            {t("inactivity.press")}
          </p>
          <TextButton id="inactivity-button" label="A" onClick={onContinue} />
          <p className="text-white leading-none text-[clamp(32px,8vw,96px)]">
            {t("inactivity.toContinue")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InactivityModal;
