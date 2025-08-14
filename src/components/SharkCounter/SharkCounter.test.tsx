import { describe, /* it, expect, */ vi, beforeEach, afterEach } from "vitest";
import { /* render, screen, */ cleanup } from "@testing-library/react";
// import SharkCounter from "./SharkCounter";

const mockMainStore = {
  currentSharkCount: 0,
  increment: vi.fn(),
};

vi.mock("../../store", () => ({
  useStore: () => ({
    mainStore: mockMainStore,
  }),
}));
describe("SharkCounter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    vi.clearAllMocks();
    vi.mocked(mockMainStore).currentSharkCount = 0;
  });
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  // it("increments from 0 to 1 and update the counter", async () => {
  //   vi.mocked(mockMainStore).currentSharkCount = 0;
  //   render(<SharkCounter />);
  //   expect(screen.getByText("0")).toBeInTheDocument();
  // });
});
