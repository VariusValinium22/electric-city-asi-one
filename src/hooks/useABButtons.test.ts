import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useABButtons } from "./useABButtons";

vi.mock("../utils/timeConversion", () => ({
  getSeconds: (seconds: number) => seconds * 1000,
}));

describe("ABButtons", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Initial state", () => {
    it("Should initialize with inactive prompt state", () => {
      const { result } = renderHook(() => useABButtons());

      expect(typeof result.current.resetInactivity).toBe("function");
    });
  });

  describe("Timer Functionality", () => {
    it("Should transition from active to timed out after 30 seconds", () => {
      const { result } = renderHook(() => useABButtons());

      act(() => {
        vi.advanceTimersByTime(90000);
      });
      expect(result.current.promptState).toBe(1);

      act(() => {
        vi.advanceTimersByTime(30000);
      });
      expect(result.current.promptState).toBe(2);
    });
  });

  describe("Reset inactivity function", () => {
    it("Should reset to inactive state when called", () => {
      const { result } = renderHook(() => useABButtons());

      act(() => {
        vi.advanceTimersByTime(90000);
      });
      expect(result.current.promptState).toBe(1);

      act(() => {
        result.current.resetInactivity();
      });
      expect(result.current.promptState).toBe(0);
    });
  });
});
