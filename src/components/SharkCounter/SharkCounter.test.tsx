import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, act } from "@testing-library/react";
import SharkCounter from "./SharkCounter";
import { mainStore } from "../../store";

vi.mock("../../store", () => ({
  mainStore: {
    currentSharkCount: 0,
    increment: vi.fn(),
  },
}));

describe("SharkCounter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    vi.clearAllMocks();
    vi.mocked(mainStore).currentSharkCount = 0;
  });
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("increments from 0 to 1 after 2 user ticks and update the counter", async () => {
    vi.mocked(mainStore).currentSharkCount = 0;
    render(<SharkCounter />);

    expect(screen.getByText("0")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2500);
    });
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(vi.mocked(mainStore).increment).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(2500);
    });
    expect(vi.mocked(mainStore).increment).toHaveBeenCalledTimes(1);
  });

  /*   it("increment the shark count after 2 user ticks", async () => {
    vi.useFakeTimers();
    localStorage.setItem("created-shark-count", "0");
    rootStore.mainStore.count = 0;

    render(
      <StoreProvider>
        <SharkCounter />
      </StoreProvider>
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2500);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2500);
    });

    await waitFor(() => {
      expect(screen.getByText("1")).toBeInTheDocument();
    }, { timeout: 8000 });
  }); */
});
