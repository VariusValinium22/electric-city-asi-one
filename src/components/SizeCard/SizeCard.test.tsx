import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SizeCard } from "./SizeCard";

describe("GridCard", () => {
  it("renders the small grid card", () => {
    render(<SizeCard size="small" />);
    expect(screen.getByText(/6 inches/)).toBeInTheDocument();
    expect(screen.getAllByRole("img").length).toBe(3);
  });

  it("renders the large grid card", () => {
    render(<SizeCard size="large" />);
    expect(screen.getByText(/62 feet/)).toBeInTheDocument();
    expect(screen.getAllByRole("img").length).toBe(3);
  });
});
