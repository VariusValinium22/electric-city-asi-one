import { render, screen, fireEvent } from "@testing-library/react";
import InactivityModal from "./InactivityModal";
import { describe, it, expect, vi } from "vitest";

describe("InactivityModal", () => {
  it("renders countdown text", () => {
    render(<InactivityModal isVisible={true} secondsLeft={25} onContinue={() => {}} />);
    expect(screen.getByText(/Restarting in 25 sec/i)).toBeInTheDocument();
  });

  it("calls onContinue when button is clicked", () => {
    const mockContinue = vi.fn();
    render(<InactivityModal isVisible={true} secondsLeft={25} onContinue={mockContinue} />);
    fireEvent.click(screen.getByText("A"));
    expect(mockContinue).toHaveBeenCalledTimes(1);
  });

  it("does not render when isVisible is false", () => {
    const { container } = render(<InactivityModal isVisible={false} secondsLeft={25} onContinue={() => {}} />);
    expect(container.firstChild).toBeNull();
  });
});
