import { useState, useEffect, useRef } from "react";
import { getSeconds } from "../utils/timeConversion";

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
  timer.start(() => {
    setPromptState(PromptState.TimedOut);
  }, getSeconds(30));
}

function startPromptTimer(setPromptState: setPromptState, timer: Timer) {
  setPromptState(PromptState.Inactive);
  timer.start(startTimeoutTimer, getSeconds(90), setPromptState, timer); // 1.5 minutes = 90 seconds
}

export const useABButtons = () => {
  const [promptState, setPromptState] = useState(PromptState.Inactive);

  const timerRef = useRef(new Timer());

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
    resetInactivity,
    promptState,
  };
};
