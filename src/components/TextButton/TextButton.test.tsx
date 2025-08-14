import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TextButton } from "./TextButton";

describe("TextButton", () => {
  let originalInnerWidth: number;

  // Resets window.innerWidth to its original value before every test
  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  // Checks button display
  it("renders with the provided label", () => {
    render(<TextButton label="A" id="text-button" />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("applies variant B styles", () => {
    render(<TextButton label="B" variant="b" id="text-button" />);
    const btn = screen.getByTestId("text-button");
    expect(btn).toHaveClass("bg-[#28A9B4]");
  });

  it("calls onClick handler when clicked", () => {
    // Use mock function vi.fn()
    const handleClick = vi.fn();
    render(<TextButton label="Click Me" id="text-button" onClick={handleClick} />);

    fireEvent.click(screen.getByTestId("text-button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Disabled state test
  it("renders with disabled styling and attributes", () => {
    render(<TextButton label="A" disabled id="text-button" />);
    const btn = screen.getByTestId("text-button");
    expect(btn).toHaveAttribute("aria-disabled", "true");
    expect(btn).toBeDisabled();
    expect(btn).toHaveClass("opacity-50");
  });

  // Simulate small screen for mobile rendering
  it("renders correctly at small viewport (simulated)", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 390,
    });
    window.dispatchEvent(new Event("resize"));

    render(<TextButton label="A" id="text-button" />);
    const btn = screen.getByTestId("text-button");
    expect(btn).toBeInTheDocument(); // Simple render check
  });

  // when ariaLabel passed correctly replaces default label for accessibility
  it("uses aria-label when provided", () => {
    render(<TextButton label="X" ariaLabel="Press A" id="text-button" />);
    const btn = screen.getByLabelText("Press A");
    expect(btn).toBeInTheDocument();
  });

  // validates custom styling
  it("applies custom className when provided", () => {
    render(<TextButton label="C" id="text-button" className="custom-class" />);
    const btn = screen.getByTestId("text-button");
    expect(btn).toHaveClass("custom-class");
  });
});
