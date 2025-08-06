// what does this component render? A start button
// Test:Render the StartButton component without crashing. Includes static text tests.
//      Renders the TextButton with the label 'A'
//      Verifies correct aria-label(TextButton) for accessibility
//      Ensures there is only one button rendered
//      Confirms correct layout classes on the wrapper element(parent container)

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StartButton from "./StartButton";

describe("StartButton", () => {
    it("renders without crashing", () => {
        render(<StartButton />);
        expect(screen.getByText("Press")).toBeInTheDocument();
        expect(screen.getByText("to start")).toBeInTheDocument();
    });

    it("renders the TextButton with the label 'A'", () => {
        render(<StartButton />);
        const button = screen.getByText("A");
        expect(button).toBeInTheDocument();
        expect(button.tagName).toBe("BUTTON");
    });

    it("has correct aria-label(of the TextButton) for accessibility", () => {
        render(<StartButton />);
        const button = screen.getByRole("button");
        expect(button).toHaveAccessibleName("A");
    });

    it("does not render more than one button", () => {
        render(<StartButton />);
        const buttons = screen.getAllByRole("button");
        expect(buttons).toHaveLength(1);
    });

    it("renders wrapper with correct layout classes", () => {
        render(<StartButton />);
        const wrapper = screen.getByText("Press").parentElement;
        expect(wrapper).toHaveClass("absolute");
        expect(wrapper).toHaveClass("top-[clamp(140px,25vw,350px)]");
    });
})