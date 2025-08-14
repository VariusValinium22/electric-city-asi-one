import { Header } from "./Header";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("HeaderComponent", () => {
  it("renders the title and the legend", () => {
    render(<Header title="Test title" />);
    expect(screen.getByText("Test title")).toBeInTheDocument();
  });

  it("renders the legend", () => {
    render(<Header title="Test title" legend="Test legend" />);
    expect(screen.getByText("Test legend")).toBeInTheDocument();
  });

  it("applies custom class when variant is provided", () => {
    render(<Header title="Custom Header" legend="Custom Legend" />);
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toHaveClass("header");
  });
});
