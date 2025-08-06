import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getSecounds, getMinutes } from "../utils/timeConversion";

// Note: Might be better to put this Timer class into util.
type timerID = NodeJS.Timeout | undefined;

class Timer {
  private _id: timerID;

  // Check if timer is playing and stop it if so
  stop(): void {
    if (this._id === undefined) return;

    clearTimeout(this._id);
    this._id = undefined;
  }

  // Start the timer and run the function after it finishes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  start(fn: (...args: any[]) => void, duration: number, ...args: any[]): void {
    this.stop();
    this._id = setTimeout(fn, duration, ...args);
  }
}

// Functions for controlling the prompt state
enum PromptState {
  Inactive,
  Active,
  TimedOut,
}

type setPromptState = React.Dispatch<React.SetStateAction<PromptState>>;

function startTimeoutTimer(setPromptState: setPromptState, timer: Timer) {
  setPromptState(PromptState.Active);
  timer.start(setPromptState, getSecounds(30), PromptState.TimedOut);
}

function startPromptTimer(setPromptState: setPromptState, timer: Timer) {
  setPromptState(PromptState.Inactive);
  timer.start(startTimeoutTimer, getMinutes(2), setPromptState, timer);
}

// AB button hooks
type buttons = "a" | "b";

export const useABButtons = () => {
  const [promptState, setPromptState] = useState(PromptState.Inactive);

  const buttonLinks = {
    a: "",
    b: "",
  };

  const timerRef = useRef(new Timer());
  const navigate = useNavigate();

  function clickButton(button: buttons) {
    navigate(buttonLinks[button]);
    startPromptTimer(setPromptState, timerRef.current);
  }

  function resetInactivity() {
    startPromptTimer(setPromptState, timerRef.current);
  }

  // Stop the timer when component unmounts
  useEffect(() => {
    const timer = timerRef.current;

    return () => {
      timer.stop();
    };
  }, []);

  // Start the inactivity timer automatically when component mounts
useEffect(() => {
  startPromptTimer(setPromptState, timerRef.current);
}, []);

  return {
    clickButton,
    resetInactivity,
    buttonLinks,
    promptState,
  };
};