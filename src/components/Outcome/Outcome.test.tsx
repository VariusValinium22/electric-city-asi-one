import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Outcome } from "./Outcome";

describe("Outcome", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders with the provided text", () => {
    const headerText = "Test page";
    const legendText = "Test legend";
    const descriptionText = "Test description";

    render(
      <Outcome headerText={headerText} legendText={legendText} descriptionText={descriptionText} />
    );

    expect(screen.getByText(headerText)).toBeDefined();
    expect(screen.getByText(legendText)).toBeDefined();
    expect(screen.getByText(descriptionText)).toBeDefined();
  });

  it("renders the provided child", () => {
    const childText = "Howdy";

    render(
      <Outcome
        headerText=""
        legendText=""
        descriptionText=""
        showBButton={true}
        imageView={<div>{childText}</div>}
      />
    );

    expect(screen.getByText(childText)).toBeDefined();
  });

  it("renders the b and a buttons", () => {
    const outcome = render(
      <Outcome headerText="" legendText="" descriptionText="" showBButton={true} />
    );

    expect(outcome.container.querySelector("#a-button")).toBeDefined();
    expect(outcome.container.querySelector("#b-button")).toBeDefined();
  });

  it("doesn't render the button B button when disabled", () => {
    const outcome = render(
      <Outcome headerText="" legendText="" descriptionText="" showBButton={false} />
    );
    expect(outcome.container.querySelector("#b-button")).toBeNull();
  });
});
