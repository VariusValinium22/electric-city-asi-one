import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SharkCounter from "./SharkCounter";

describe("SharkCounter", () => {
  it("renders with an initial count of 0", () => {
    render(<SharkCounter />);
    const counterText = screen.getByText("0");
    expect(counterText).toBeInTheDocument();
  });
});