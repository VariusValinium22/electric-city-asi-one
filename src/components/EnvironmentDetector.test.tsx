import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EnvironmentDetector } from "./EnvironmentDetector";

describe("EnvironmentDetector", () => {
  it("renders", () => {
    render(<EnvironmentDetector children={<div />} />);
    expect(screen.getByTestId("environment-detector")).toBeDefined();
  });

  it("renders with the given children", () => {
    const id = "text";
    render(<EnvironmentDetector children={<p data-testid={id}></p>} />);
    expect(screen.getByTestId(id)).toBeDefined();
  });
});
