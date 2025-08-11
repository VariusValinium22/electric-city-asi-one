// import { describe, it, expect, vi } from "vitest";
// import { render, screen, fireEvent } from "@testing-library/react";
// import { ChoiceView } from "./ChoiceView";
// import { useABButtons } from "../../hooks/useABButtons";

// describe("ChoiceView", () => {
//   it("renders without crashing", () => {
//     render(<ChoiceView />);
//     expect(screen.getByRole("banner")).toBeInTheDocument();
//   });
//   it("displays the correct title and legend", () => {
//     render(<ChoiceView />);
//     expect(screen.getByText("Test title")).toBeInTheDocument();
//     expect(screen.getByText("Test legend")).toBeInTheDocument();
//   });
//   it("renders the choice options", () => {
//     render(<ChoiceView />);
//     expect(screen.getByText("A")).toBeInTheDocument();
//     expect(screen.getByText("B")).toBeInTheDocument();
//   });
//   it("handles button clicks", () => {
//     const someMockFunction = vi.fn();
//     render(<ChoiceView />);
//     const button = screen.getByRole("button", { name: /choose/i });
//     fireEvent.click(button);
//     expect(someMockFunction).toHaveBeenCalled();
//   });
//   it("applies custom images if provided", () => {
//     const customImage = "path/to/image.jpg";
//     render(<ChoiceView />);
//     const img = screen.getByRole("img");
//     expect(img).toHaveAttribute("src", customImage);
//   });
//   it("handles inactivity reset", () => {
//     const { resetInactivity } = useABButtons();
//     render(<ChoiceView />);
//     const button = screen.getByRole("button", { name: /reset/i });
//     fireEvent.click(button);
//     expect(resetInactivity).toHaveBeenCalled();
//   });
// });
