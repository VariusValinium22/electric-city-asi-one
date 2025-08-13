import { render, screen, fireEvent } from "@testing-library/react";
import LanguageSelector from "./LanguageSelector";
import i18n from "../../i18n";
import { I18nextProvider } from "react-i18next";
import { describe, it, expect } from "vitest";

const renderWithI18n = (ui: React.ReactNode) => {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);
};

describe("LanguageSelector", () => {
  it("renders the current language flag", () => {
    renderWithI18n(<LanguageSelector />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("opens dropdown and shows language options", () => {
    renderWithI18n(<LanguageSelector />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByText(/English/i)).toBeInTheDocument();
  });

  it("changes language and updates text", async () => {
    renderWithI18n(<LanguageSelector />);
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText(/Español/i));

    // Wait for i18n to apply
    expect(i18n.language).toBe("es");
  });
});
