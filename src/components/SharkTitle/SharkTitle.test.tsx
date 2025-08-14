import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import SharkTitle from "./SharkTitle";
import i18n from "../../i18n";

const renderWithI18n = (ui: React.ReactNode) => {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);
};

describe("SharkTitle", () => {
  afterEach(() => cleanup());

  it("renders the shark title text", () => {
    renderWithI18n(<SharkTitle title="Make a Shark!" />);
    const headings = screen.getAllByText(/make a shark!/i);
    expect(headings.length).toBeGreaterThan(0);
  });

  it("renders both outline and fill versions of the title", () => {
    renderWithI18n(<SharkTitle title="Test Title" />);
    const titleElements = screen.getAllByText(/Test Title/i);
    expect(titleElements).toHaveLength(2);
  });

  it("uses translation key for title text", () => {
    renderWithI18n(<SharkTitle title="Make a Shark!" />);
    expect(screen.getAllByText("Make a Shark!")).toHaveLength(2);
  });
});
