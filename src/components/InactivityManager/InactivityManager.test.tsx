import { render, screen } from "@testing-library/react";
import InactivityManager from "./InactivityManager";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";

describe("InactivityManager", () => {
  const mockClickButton = vi.fn();
  const mockResetInactivity = vi.fn();

  const renderWithRouter = (ui: React.ReactNode) => {
    return render(<MemoryRouter initialEntries={["/test"]}>{ui}</MemoryRouter>);
  };

  it("renders InactivityModal when promptState = 1", () => {
    renderWithRouter(
      <InactivityManager
        promptState={1}
        clickButton={mockClickButton}
        resetInactivity={mockResetInactivity}
      />
    );
    expect(screen.getByText(/Restarting in/i)).toBeInTheDocument();
  });

  it("does not render modal when promptState = 0", () => {
    const { container } = renderWithRouter(
      <InactivityManager
        promptState={0}
        clickButton={mockClickButton}
        resetInactivity={mockResetInactivity}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("calls resetInactivity when promptState = 2", () => {
    renderWithRouter(
      <InactivityManager
        promptState={2}
        clickButton={mockClickButton}
        resetInactivity={mockResetInactivity}
      />
    );
    expect(mockResetInactivity).toHaveBeenCalledTimes(1);
  });
  }); 

