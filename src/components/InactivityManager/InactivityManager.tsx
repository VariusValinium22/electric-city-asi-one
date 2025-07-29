import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InactivityModal from "../InactivityModal/InactivityModal";

const COUNTDOWN_START = 30;

interface InactivityManagerProps {
    promptState: number;
    clickButton: (button: "a" | "b") => void;
    resetInactivity: () => void;
}

const InactivityManager: React.FC<InactivityManagerProps> = ({ promptState, clickButton, resetInactivity }) => {
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_START);
  const location = useLocation();

  // Pages where inactivity timer should be active
  const inactivityEnabled = location.pathname !== "/";

  const navigate = useNavigate();

  // Handle countdown when modal is visible
  useEffect(() => {
    if (!inactivityEnabled) return;

    let interval: NodeJS.Timeout | null = null;

    if (promptState === 1) {
      // Modal Active
      setSecondsLeft(COUNTDOWN_START);
      interval = setInterval(() => {
        setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [promptState, inactivityEnabled]);

  // Handle when timeout occurs
  useEffect(() => {
    if (!inactivityEnabled) return;

    if (promptState === 2) {
      navigate("/");
      resetInactivity();
    }
  }, [promptState, inactivityEnabled, navigate, resetInactivity]);

  return (
    <>
      {inactivityEnabled && promptState === 1 && (
        <InactivityModal
          isVisible={true}
          secondsLeft={secondsLeft}
          onContinue={() => clickButton("a")}
        />
      )}
    </>
  );
};

export default InactivityManager;