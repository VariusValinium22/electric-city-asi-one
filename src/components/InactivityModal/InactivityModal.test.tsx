import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { I18nextProvider } from "react-i18next";
import InactivityModal from "./InactivityModal";
import i18n from "../../i18n";

const renderWithI18n = (ui: React.ReactNode) => {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);
};

describe("InactivityModal", () => {
  it("renders countdown text", () => {
    renderWithI18n(<InactivityModal isVisible={true} secondsLeft={25} onContinue={() => {}} />);
    expect(screen.getByText(/Restarting in 25 sec/i)).toBeInTheDocument();
  });

  it("calls onContinue when button is clicked", () => {
    const mockContinue = vi.fn();
    renderWithI18n(<InactivityModal isVisible={true} secondsLeft={25} onContinue={mockContinue} />);
    fireEvent.click(screen.getByText("A"));
    expect(mockContinue).toHaveBeenCalledTimes(1);
  });

  it("does not render when isVisible is false", () => {
    const { container } = renderWithI18n(<InactivityModal isVisible={false} secondsLeft={25} onContinue={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the 'Press A to continue playing' instruction", () => {
    renderWithI18n(<InactivityModal isVisible={true} secondsLeft={15} onContinue={() => {}} />);
    expect(screen.getByText(/Press/i)).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText(/to continue playing/i)).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    renderWithI18n(<InactivityModal isVisible={true} secondsLeft={10} onContinue={() => {}} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });
});



