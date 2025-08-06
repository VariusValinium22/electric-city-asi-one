import { render } from "@testing-library/react";
import { StartView } from "./StartView";
import { StoreProvider } from "../../store";
import { describe, it } from "vitest";
import { MemoryRouter } from "react-router-dom";

describe("StartView", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <StoreProvider>
          <StartView />
        </StoreProvider>
      </MemoryRouter>
    );
  });
});
