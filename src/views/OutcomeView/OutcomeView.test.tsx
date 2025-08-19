import { describe, it, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { StoreProvider } from "../../store";
import { OutcomeView } from "./OutcomeView";

const renderOutcome = () => {
  return render(
    <StoreProvider>
      <OutcomeView />
    </StoreProvider>
  );
};

describe("Outcome", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders without crashing", () => {
    renderOutcome();
  });
});
