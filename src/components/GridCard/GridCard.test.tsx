import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GridCard } from "./GridCard";

describe("GridCard", () => {
  it("renders the small grid card", () => {
    render(<GridCard size="small" />);
    expect(screen.getByText(/6 inches/)).toBeInTheDocument();
    expect(screen.getAllByRole("img").length).toBe(3);
  });

  it("renders the large grid card", () => {
    render(<GridCard size="large" />);
    expect(screen.getByText(/62 feet/)).toBeInTheDocument();
    expect(screen.getAllByRole("img").length).toBe(3);
  });
});
