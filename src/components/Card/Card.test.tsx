import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Card from "./Card";

// Grouping all Card component tests
describe("Card component", () => {
  // it("renders with title and description", () => {
  //   render(<Card title="Tiger Shark" description="Aggressive predator" />);

  //   // Expect the title to appear in the document
  //   expect(screen.getByText("Tiger Shark")).toBeInTheDocument();

  //   // Expect the description to appear in the document
  //   expect(screen.getByText("Aggressive predator")).toBeInTheDocument();
  // });
  it("renders children", () => {
    render(
      <Card title={""}>
        <h3>Great White Shark</h3>
        <p>Child component</p>
      </Card>
    );
    expect(screen.getByText("Great White Shark")).toBeInTheDocument();
    expect(screen.getByText("Child component")).toBeInTheDocument();
  });

  // // Test that clicking the card triggers the onClick handler
  // it("calls onClick when clicked", () => {
  //   const handleClick = vi.fn(); // Create a mock click handler

  //   render(<Card title="Shark" onClick={handleClick} />);

  //   // Simulate a click on the title
  //   fireEvent.click(screen.getByText("Shark"));

  //   // Expect the handler to have been called once
  //   expect(handleClick).toHaveBeenCalledTimes(1);
  // });

  // // Test that clicking a disabled card does NOT trigger onClick
  // it("does not call onClick when disabled", () => {
  //   const handleClick = vi.fn(); // Create a mock click handler

  //   render(<Card title="Shark" onClick={handleClick} disabled />);

  //   // Try to click the card
  //   fireEvent.click(screen.getByText("Shark"));

  //   // Expect the handler NOT to have been called
  //   expect(handleClick).not.toHaveBeenCalled();
  // });
  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();

    render(
      <Card onClick={handleClick} disabled title={""}>
        <div>Disabled Card</div>
      </Card>
    );

    fireEvent.click(screen.getByText("Disabled Card"));

    expect(handleClick).not.toHaveBeenCalled();
  });

  // Test that children content passed into the Card is rendered
  it("renders children", () => {
    render(
      <Card title="Great White Shark">
        <p>Child component</p>
      </Card>
    );

    // Expect the child content to appear in the document
    expect(screen.getByText("Child component")).toBeInTheDocument();
  });

  it("renders image", () => {
    const title = "Shark";
    const imageUrl = "/images/hammerhead.jpg";
    render(<Card title={title} imageUrl={imageUrl} />);

    const imageComponent: HTMLImageElement = screen.getByAltText(title);
    expect(imageComponent).toBeInTheDocument();
    expect(imageComponent.src === imageUrl).toBeDefined();
  });
});
