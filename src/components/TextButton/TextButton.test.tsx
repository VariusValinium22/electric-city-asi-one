import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TextButton } from "./TextButton";

describe("TextButton", () => {

  it("renders with the provided label", () => {
    render(<TextButton label="Test Button" id="test-button" />);
    expect(screen.getByText("Test Button")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<TextButton label="Click Me" id="test-button" onClick={handleClick} />);

    fireEvent.click(screen.getByTestId("text-button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  });
