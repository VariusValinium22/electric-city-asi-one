/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import InactivityModal from "../InactivityModal/InactivityModal";
import { useStore } from "../../store";
import { GameStage } from "../../types/game";

const COUNTDOWN_START = 30;

interface InactivityManagerProps {
  promptState: number;
  resetInactivity: () => void;
}

const InactivityManager: React.FC<InactivityManagerProps> = ({ promptState, resetInactivity }) => {
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_START);
  const { mainStore } = useStore();

  // inactivity should be disabled on start stage, enabled on all other stages
  const inactivityEnabled = mainStore.gameStage !== GameStage.START;

  const handleContinueGame = () => {
    resetInactivity();
  };
  // Handle countdown when modal is visible
  useEffect(() => {
    if (!inactivityEnabled) return;

    let interval: NodeJS.Timeout | null = null;

    if (promptState === 1) {
      // Modal Active - start countdown from 30 seconds
      setSecondsLeft(COUNTDOWN_START);
      interval = setInterval(() => {
        setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      // reset countdown when modal is not active
      setSecondsLeft(COUNTDOWN_START);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [promptState, inactivityEnabled]);

  // Handle when timeout occurs
  useEffect(() => {
    if (!inactivityEnabled) return;

    if (promptState === 2) {
      mainStore.resetGame();
      resetInactivity();
    }
  }, [promptState, inactivityEnabled, resetInactivity]);

  return (
    <>
      {inactivityEnabled && promptState === 1 && (
        <InactivityModal
          isVisible={true}
          secondsLeft={secondsLeft}
          onContinue={handleContinueGame}
        />
      )}
    </>
  );
};

export default InactivityManager;
