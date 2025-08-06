import { render, screen } from "@testing-library/react";
import InactivityManager from "./InactivityManager";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { StoreProvider } from "../../store/StoreProvider";
import { GameStage } from "../../types/game";

describe("InactivityManager", () => {
  const mockResetInactivity = vi.fn();

  vi.mock("../../store", () => ({
    useStore: () => ({
      mainStore: {
        gameStage: GameStage.CHOICE,
        resetGame: vi.fn(),
      },
    }),
  }));

  const renderWithRouter = (ui: React.ReactNode) => {
    return render(
      <StoreProvider>
        <MemoryRouter initialEntries={["/test"]}>{ui}</MemoryRouter>
      </StoreProvider>
    );
  };

  it("renders InactivityModal when promptState = 1", () => {
    renderWithRouter(<InactivityManager promptState={1} resetInactivity={mockResetInactivity} />);
    expect(screen.getByText(/Restarting in/i)).toBeInTheDocument();
  });

  it("does not render modal when promptState = 0", () => {
    const { container } = renderWithRouter(
      <InactivityManager promptState={0} resetInactivity={mockResetInactivity} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("calls resetInactivity when promptState = 2", () => {
    renderWithRouter(<InactivityManager promptState={2} resetInactivity={mockResetInactivity} />);
    expect(mockResetInactivity).toHaveBeenCalled();
  });
});
