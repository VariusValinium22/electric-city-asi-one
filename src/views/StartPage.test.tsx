import { render } from "@testing-library/react";
import { StartPage } from "./StartPage";
import { StoreProvider } from "../store";
import { expect, describe, it } from "vitest";
import { MemoryRouter } from "react-router-dom";

describe("StartPage", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <StoreProvider>
          <StartPage />
        </StoreProvider>
      </MemoryRouter>
    );
  });

  it("has the right background color", () => {
    const { container } = render(
      <MemoryRouter>
        <StoreProvider>
          <StartPage />
        </StoreProvider>
      </MemoryRouter>
    );
    expect(container.firstChild).toHaveClass("start-view-page-container");
  });
});
