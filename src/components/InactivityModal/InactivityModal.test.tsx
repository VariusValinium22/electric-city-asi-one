import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import InactivityModal from "./InactivityModal";

describe("InactivityModal", () => {
  it("renders the countdown text with seconds left", () => {
    render(<InactivityModal secondsLeft={30} />);
    expect(screen.getByText(/Restarting in 30 sec/i)).toBeInTheDocument();
  });

  it("renders the 'Press A to continue playing' instruction", () => {
    render(<InactivityModal secondsLeft={15} />);
    expect(screen.getByText(/Press/i)).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText(/to continue playing/i)).toBeInTheDocument();
  });
});