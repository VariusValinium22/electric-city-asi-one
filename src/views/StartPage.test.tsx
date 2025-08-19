import { render, fireEvent } from "@testing-library/react";
import { StartPage } from "./StartPage";
import { expect, describe, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { StoreProvider } from "../store";

describe("StartPage", () => {
  it("renders without crashing", () => {
    render(
      <StoreProvider>
        <MemoryRouter>
          <StartPage />
        </MemoryRouter>
      </StoreProvider>
    );
  });

  it("has the right background color", () => {
    const { container } = render(
      <StoreProvider>
        <MemoryRouter>
          <StartPage />
        </MemoryRouter>
      </StoreProvider>
    );
    expect(container.firstChild).toHaveClass("start-view-page-container");
  });
});

const mockResetInactivity = vi.fn();

vi.mock("../hooks/useABButtons", () => ({
  useABButtons: () => ({
    promptState: 0,
    resetInactivity: () => mockResetInactivity(),
  }),
}));

describe("onButtonAClick", () => {
  it("resets activity when pressing the a button", () => {
    const { container } = render(
      <StoreProvider>
        <MemoryRouter>
          <StartPage />
        </MemoryRouter>
      </StoreProvider>
    );

    const buttonContainer = container.querySelector("#a-button");
    expect(buttonContainer).toBeDefined();
    if (!buttonContainer) {
      return;
    }
    fireEvent.click(buttonContainer);
    expect(mockResetInactivity).toHaveBeenCalledOnce();
  });
});
