import { render, screen } from "@testing-library/react";
import { StartPage } from "./StartPage";
import { expect, describe, it } from "vitest";

describe("StartPage", () => {
  it("renders without crashing", () => {
    render(<StartPage />);
  });

  it("displays welcome header", () => {
    render(<StartPage />);
    expect(screen.getByText(/Welcome to Electric City/i)).toBeInTheDocument();
  });

  it("has the right background color", () => {
    const { container } = render(<StartPage />);
    expect(container.firstChild).toHaveClass("start-view-page-container");
  });
});
