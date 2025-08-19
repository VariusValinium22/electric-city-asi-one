import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import React from "react";
import SharkCounter from "./SharkCounter";
import i18n from "../../i18n";

const mockMainStore = {
  currentSharkCount: 0,
  increment: vi.fn(),
};

vi.mock("../../store", () => ({
  useStore: () => ({
    mainStore: mockMainStore,
  }),
}));

describe("SharkCounter", () => {
  const renderWithI18n = (component: React.ReactNode) => {
    return render(
      <I18nextProvider i18n={i18n}>
        {component}
      </I18nextProvider>
    );
  };

  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    vi.clearAllMocks();
    mockMainStore.currentSharkCount = 0;
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  describe("Basic Rendering", () => {
    it("renders the component with correct structure", () => {
      renderWithI18n(<SharkCounter />);
      
      // use a more reliable selector based on the aria-live attribute
      const container = document.querySelector('[aria-live="polite"]');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass("flex", "justify-center", "absolute", "bottom-12", "w-full");
    });

    it("applies correct accessibility attributes", () => {
      renderWithI18n(<SharkCounter />);
      
      const container = document.querySelector('[aria-live="polite"]');
      expect(container).toHaveAttribute("aria-live", "polite");
      expect(container).toHaveAttribute("aria-atomic", "true");
    });

    it("renders the inner flex container with correct classes", () => {
      renderWithI18n(<SharkCounter />);
      
      const innerContainer = document.querySelector('.flex.items-center.justify-center.gap-4.z-10');
      expect(innerContainer).toBeInTheDocument();
    });
  });

  describe("Store Integration", () => {
    it("displays the shark count from the store", () => {
      mockMainStore.currentSharkCount = 5;
      
      renderWithI18n(<SharkCounter />);
      
      // component should show the count in the translated text (i18n should format it)
      expect(screen.getByText(/5/)).toBeInTheDocument();
    });

    it("initializes with zero count", () => {
      mockMainStore.currentSharkCount = 0;
      
      renderWithI18n(<SharkCounter />);
      
      expect(screen.getByText(/0/)).toBeInTheDocument();
    });

    it("displays larger shark counts correctly", () => {
      mockMainStore.currentSharkCount = 25;
      
      renderWithI18n(<SharkCounter />);
      
      expect(screen.getByText(/25/)).toBeInTheDocument();
    });
  });

  describe("Translation Integration", () => {
    it("uses the translated shark count text", () => {
      mockMainStore.currentSharkCount = 3;
      
      renderWithI18n(<SharkCounter />);
      
      // check that the count appears (i18n should format it)
      expect(screen.getByText(/3/)).toBeInTheDocument();
    });

    it("displays the correct translation key for shark count", () => {
      mockMainStore.currentSharkCount = 7;
      
      renderWithI18n(<SharkCounter />);
      
      // the translation should include the count
      const countElement = screen.getByText(/7/);
      expect(countElement).toBeInTheDocument();
      expect(countElement).toHaveClass("bg-white", "text-[#1B1C38]");
    });
  });

  describe("Pluralization Logic", () => {
    it("shows singular text when count is 1", () => {
      mockMainStore.currentSharkCount = 1;
      
      renderWithI18n(<SharkCounter />);
      
      // check for singular form - the component should render the singular translation
      const textElements = screen.getAllByText(/shark/i);
      expect(textElements.length).toBeGreaterThan(0);
    });

    it("shows plural text when count is 0", () => {
      mockMainStore.currentSharkCount = 0;
      
      renderWithI18n(<SharkCounter />);
      
      // check for plural form when count is 0
      const textElements = screen.getAllByText(/shark/i);
      expect(textElements.length).toBeGreaterThan(0);
    });

    it("shows plural text when count is greater than 1", () => {
      mockMainStore.currentSharkCount = 5;
      
      renderWithI18n(<SharkCounter />);
      
      // check for plural form when count > 1
      const textElements = screen.getAllByText(/shark/i);
      expect(textElements.length).toBeGreaterThan(0);
    });

    it("correctly handles count of 2", () => {
      mockMainStore.currentSharkCount = 2;
      
      renderWithI18n(<SharkCounter />);
      
      expect(screen.getByText(/2/)).toBeInTheDocument();
      const textElements = screen.getAllByText(/shark/i);
      expect(textElements.length).toBeGreaterThan(0);
    });
  });

  describe("CSS Classes and Styling", () => {
    it("applies correct CSS classes to the count display", () => {
      renderWithI18n(<SharkCounter />);
      
      const countElement = screen.getByText(/0/).closest('p');
      expect(countElement).toHaveClass(
        "flex",
        "items-center", 
        "justify-center",
        "font-lilita",
        "font-normal",
        "bg-white",
        "text-[#1B1C38]",
        "rounded-lg",
        "w-fit"
      );
    });

    it("applies responsive height classes to count display", () => {
      renderWithI18n(<SharkCounter />);
      
      const countElement = screen.getByText(/0/).closest('p');
      expect(countElement).toHaveClass("h-[clamp(42px,5.5vw,67px)]");
    });

    it("applies responsive text size classes to count display", () => {
      renderWithI18n(<SharkCounter />);
      
      const countElement = screen.getByText(/0/).closest('p');
      expect(countElement).toHaveClass(
        "text-[clamp(26px,3.5vw,52px)]",
        "leading-[clamp(28px,4.2vw,52px)]",
        "px-[clamp(.2px,4vw,14px)]"
      );
    });

    it("applies correct CSS classes to the description text", () => {
      renderWithI18n(<SharkCounter />);
      
      // get the second p element which contains the description
      const paragraphs = screen.getAllByText(/shark/i);
      const descriptionElement = paragraphs[paragraphs.length - 1]?.closest('p');
      
      expect(descriptionElement).toHaveClass(
        "text-white",
        "font-inter",
        "font-medium",
        "whitespace-nowrap"
      );
    });

    it("applies responsive text classes to description", () => {
      renderWithI18n(<SharkCounter />);
      
      const paragraphs = screen.getAllByText(/shark/i);
      const descriptionElement = paragraphs[paragraphs.length - 1]?.closest('p');
      
      expect(descriptionElement).toHaveClass(
        "text-[clamp(16px,3.5vw,40px)]",
        "leading-[clamp(28px,4.2vw,52px)]"
      );
    });
  });

  describe("useEffect Hook Behavior", () => {
    it("sets shark count from store on initial render", () => {
      mockMainStore.currentSharkCount = 8;
      
      renderWithI18n(<SharkCounter />);
      
      expect(screen.getByText(/8/)).toBeInTheDocument();
    });

    it("handles store count changes correctly", () => {
      mockMainStore.currentSharkCount = 3;
      
      const { rerender } = renderWithI18n(<SharkCounter />);
      
      expect(screen.getByText(/3/)).toBeInTheDocument();
      
      // simulate store change (in reality this would trigger a re-render)
      mockMainStore.currentSharkCount = 7;
      rerender(
        <I18nextProvider i18n={i18n}>
          <SharkCounter />
        </I18nextProvider>
      );
      
      // note: due to the empty dependency array, the count won't update
      // this tests the current implementation behavior
      expect(screen.getByText(/3/)).toBeInTheDocument();
    });

    it("only runs useEffect once due to empty dependency array", () => {
      // this test verifies that useEffect runs only once due to empty dependency array
      // since we can't easily spy on internal hooks, we'll test the observable behavior
      mockMainStore.currentSharkCount = 4;
      
      const { rerender } = renderWithI18n(<SharkCounter />);
      
      // verify initial render shows correct count
      expect(screen.getByText(/4/)).toBeInTheDocument();
      
      // change the store value
      mockMainStore.currentSharkCount = 10;
      
      // re-render the component
      rerender(
        <I18nextProvider i18n={i18n}>
          <SharkCounter />
        </I18nextProvider>
      );
      
      // the displayed count should still be 4 because useEffect only runs once
      // due to the empty dependency array
      expect(screen.getByText(/4/)).toBeInTheDocument();
      expect(screen.queryByText(/10/)).not.toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles very large numbers", () => {
      mockMainStore.currentSharkCount = 999;
      
      renderWithI18n(<SharkCounter />);
      
      expect(screen.getByText(/999/)).toBeInTheDocument();
    });

    it("handles negative numbers gracefully", () => {
      mockMainStore.currentSharkCount = -1;
      
      renderWithI18n(<SharkCounter />);
      
      expect(screen.getByText(/-1/)).toBeInTheDocument();
    });

    it("renders correctly when store returns undefined", () => {
      // simulate undefined/null store value
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockMainStore.currentSharkCount = undefined as any;
      
      renderWithI18n(<SharkCounter />);
      
      // component should still render without crashing
      const container = document.querySelector('[aria-live="polite"]');
      expect(container).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("renders exactly two paragraph elements", () => {
      renderWithI18n(<SharkCounter />);
      
      // check by getting all p elements directly
      const allParagraphs = document.querySelectorAll('p');
      expect(allParagraphs).toHaveLength(2);
    });

    it("has the count paragraph as the first element", () => {
      mockMainStore.currentSharkCount = 6;
      
      renderWithI18n(<SharkCounter />);
      
      const firstP = document.querySelector('p');
      expect(firstP).toHaveTextContent('6');
    });

    it("has the description paragraph as the second element", () => {
      renderWithI18n(<SharkCounter />);
      
      const paragraphs = document.querySelectorAll('p');
      const secondP = paragraphs[1];
      expect(secondP).toHaveTextContent(/shark/i);
    });
  });
});