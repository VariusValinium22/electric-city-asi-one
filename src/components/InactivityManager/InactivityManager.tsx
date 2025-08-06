// Final code — remove conflict markers
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InactivityModal from "../InactivityModal/InactivityModal";

const COUNTDOWN_START = 30;

interface InactivityManagerProps {
  promptState: number;
  clickButton: (button: "a" | "b") => void;
  resetInactivity: () => void;
}

const InactivityManager: React.FC<InactivityManagerProps> = ({
  promptState,
  clickButton,
  resetInactivity,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_START);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const inactivityEnabled = location.pathname !== "/";

  useEffect(() => {
    if (!inactivityEnabled) return;

    if (promptState === 1) {
      setSecondsLeft(COUNTDOWN_START);
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [promptState, inactivityEnabled]);

  useEffect(() => {
    if (!inactivityEnabled || promptState === 1) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [promptState, inactivityEnabled]);

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
