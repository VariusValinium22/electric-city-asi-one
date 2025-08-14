import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import InactivityManager from "./InactivityManager";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import i18n from "../../i18n";
import { StoreProvider } from "../../store/StoreProvider";
import { GameStage } from "../../types/game";

vi.mock("../../store", () => ({
  useStore: () => ({
    mainStore: {
      gameStage: GameStage.CHOICE,
      resetGame: vi.fn(),
    },
  }),
}));

describe("InactivityManager", () => {
  const mockResetInactivity = vi.fn();

  const renderWithRouterAndI18n = (ui: React.ReactNode) => {
    return render(
      <MemoryRouter initialEntries={["/test"]}>
        <I18nextProvider i18n={i18n}>
          <StoreProvider>{ui}</StoreProvider>
        </I18nextProvider>
      </MemoryRouter>
    );
  };

  it("renders InactivityModal when promptState = 1", () => {
    renderWithRouterAndI18n(
      <InactivityManager promptState={1} resetInactivity={mockResetInactivity} />
    );
    expect(screen.getByText(/Restarting in/i)).toBeInTheDocument();
  });

  it("does not render modal when promptState = 0", () => {
    const { container } = renderWithRouterAndI18n(
      <InactivityManager promptState={0} resetInactivity={mockResetInactivity} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("calls resetInactivity when promptState = 2", () => {
    renderWithRouterAndI18n(
      <InactivityManager promptState={2} resetInactivity={mockResetInactivity} />
    );
    expect(mockResetInactivity).toHaveBeenCalledTimes(1);
  });
});
