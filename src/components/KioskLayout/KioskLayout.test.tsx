import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import { KioskLayout } from "./KioskLayout";

const mockUseOfflineStatus = vi.fn();

vi.mock("../hooks/useElectron", () => ({
  useOfflineStatus: () => mockUseOfflineStatus(),
}));

describe("KioskLayout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders the component with correct structure", () => {
      render(
        <KioskLayout>
          <div data-testid="test-child">Test content</div>
        </KioskLayout>
      );
      
      // check main container exists with correct classes
      const mainContainer = document.querySelector('.min-h-screen.text-white');
      expect(mainContainer).toBeInTheDocument();
      expect(mainContainer).toHaveClass("min-h-screen", "text-white");
    });

    it("applies correct CSS classes to main container", () => {
      render(
        <KioskLayout>
          <div>Test content</div>
        </KioskLayout>
      );
      
      const mainContainer = document.querySelector('.min-h-screen.text-white');
      expect(mainContainer).toHaveClass("min-h-screen", "text-white");
    });

    it("renders the flex-1 content wrapper", () => {
      render(
        <KioskLayout>
          <div data-testid="test-child">Test content</div>
        </KioskLayout>
      );
      
      const contentWrapper = document.querySelector('.flex-1');
      expect(contentWrapper).toBeInTheDocument();
      expect(contentWrapper).toHaveClass("flex-1");
    });
  });

  describe("Children Rendering", () => {
    it("renders children correctly", () => {
      render(
        <KioskLayout>
          <div data-testid="test-child">Test content</div>
        </KioskLayout>
      );
      
      expect(screen.getByTestId("test-child")).toBeInTheDocument();
      expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("renders multiple children correctly", () => {
      render(
        <KioskLayout>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
          <span data-testid="child-3">Child 3</span>
        </KioskLayout>
      );
      
      expect(screen.getByTestId("child-1")).toBeInTheDocument();
      expect(screen.getByTestId("child-2")).toBeInTheDocument();
      expect(screen.getByTestId("child-3")).toBeInTheDocument();
      expect(screen.getByText("Child 1")).toBeInTheDocument();
      expect(screen.getByText("Child 2")).toBeInTheDocument();
      expect(screen.getByText("Child 3")).toBeInTheDocument();
    });

    it("renders complex nested children", () => {
      render(
        <KioskLayout>
          <div data-testid="parent">
            <h1>Title</h1>
            <div data-testid="nested-child">
              <p>Nested paragraph</p>
              <button>Click me</button>
            </div>
          </div>
        </KioskLayout>
      );
      
      expect(screen.getByTestId("parent")).toBeInTheDocument();
      expect(screen.getByTestId("nested-child")).toBeInTheDocument();
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Nested paragraph")).toBeInTheDocument();
      expect(screen.getByText("Click me")).toBeInTheDocument();
    });

    it("renders children inside the flex-1 container", () => {
      render(
        <KioskLayout>
          <div data-testid="test-child">Test content</div>
        </KioskLayout>
      );
      
      const contentWrapper = document.querySelector('.flex-1');
      const testChild = screen.getByTestId("test-child");
      
      expect(contentWrapper).toContainElement(testChild);
    });

    it("handles empty children gracefully", () => {
      render(<KioskLayout>{null}</KioskLayout>);
      
      const contentWrapper = document.querySelector('.flex-1');
      expect(contentWrapper).toBeInTheDocument();
      expect(contentWrapper).toBeEmptyDOMElement();
    });

    it("handles undefined children gracefully", () => {
      render(<KioskLayout>{undefined}</KioskLayout>);
      
      const contentWrapper = document.querySelector('.flex-1');
      expect(contentWrapper).toBeInTheDocument();
      expect(contentWrapper).toBeEmptyDOMElement();
    });
  });

  describe("Props Interface Compliance", () => {
    it("accepts title prop even though it's currently unused", () => {
      // test that component accepts title prop without errors
      expect(() => {
        render(
          <KioskLayout title="Test Title">
            <div>Test content</div>
          </KioskLayout>
        );
      }).not.toThrow();
    });

    it("works without title prop", () => {
      expect(() => {
        render(
          <KioskLayout>
            <div>Test content</div>
          </KioskLayout>
        );
      }).not.toThrow();
    });

    it("accepts ReactNode as children", () => {
      expect(() => {
        render(
          <KioskLayout>
            <span>String child</span>
            <span>{123}</span>
            <div>Element child</div>
            {[<span key="1">Array child 1</span>, <span key="2">Array child 2</span>]}
          </KioskLayout>
        );
      }).not.toThrow();
      
      expect(screen.getByText("String child")).toBeInTheDocument();
      expect(screen.getByText("123")).toBeInTheDocument();
      expect(screen.getByText("Element child")).toBeInTheDocument();
      expect(screen.getByText("Array child 1")).toBeInTheDocument();
      expect(screen.getByText("Array child 2")).toBeInTheDocument();
    });
  });

  describe("DOM Structure", () => {
    it("has correct DOM hierarchy", () => {
      render(
        <KioskLayout>
          <div data-testid="test-child">Test content</div>
        </KioskLayout>
      );
      
      // should have main container > content wrapper > children
      const mainContainer = document.querySelector('.min-h-screen.text-white');
      const contentWrapper = document.querySelector('.flex-1');
      const testChild = screen.getByTestId("test-child");
      
      expect(mainContainer).toContainElement(contentWrapper as HTMLElement);
      expect(contentWrapper).toContainElement(testChild);
    });

    it("renders exactly one main container", () => {
      render(
        <KioskLayout>
          <div>Test content</div>
        </KioskLayout>
      );
      
      const mainContainers = document.querySelectorAll('.min-h-screen.text-white');
      expect(mainContainers).toHaveLength(1);
    });

    it("renders exactly one content wrapper", () => {
      render(
        <KioskLayout>
          <div>Test content</div>
        </KioskLayout>
      );
      
      const contentWrappers = document.querySelectorAll('.flex-1');
      expect(contentWrappers).toHaveLength(1);
    });

    it("content wrapper is a direct child of main container", () => {
      render(
        <KioskLayout>
          <div>Test content</div>
        </KioskLayout>
      );
      
      const mainContainer = document.querySelector('.min-h-screen.text-white');
      const contentWrapper = document.querySelector('.flex-1');
      
      expect(mainContainer?.firstElementChild).toBe(contentWrapper as Element);
    });
  });

  describe("CSS Classes and Styling", () => {
    it("applies min-h-screen class for full height", () => {
      render(
        <KioskLayout>
          <div>Test content</div>
        </KioskLayout>
      );
      
      const mainContainer = document.querySelector('.min-h-screen');
      expect(mainContainer).toHaveClass("min-h-screen");
    });

    it("applies text-white class for white text", () => {
      render(
        <KioskLayout>
          <div>Test content</div>
        </KioskLayout>
      );
      
      const mainContainer = document.querySelector('.text-white');
      expect(mainContainer).toHaveClass("text-white");
    });

    it("applies flex-1 class to content wrapper for flexible layout", () => {
      render(
        <KioskLayout>
          <div>Test content</div>
        </KioskLayout>
      );
      
      const contentWrapper = document.querySelector('.flex-1');
      expect(contentWrapper).toHaveClass("flex-1");
    });

    it("maintains consistent styling across re-renders", () => {
      const { rerender } = render(
        <KioskLayout>
          <div>Initial content</div>
        </KioskLayout>
      );
      
      let mainContainer = document.querySelector('.min-h-screen.text-white');
      let contentWrapper = document.querySelector('.flex-1');
      
      expect(mainContainer).toHaveClass("min-h-screen", "text-white");
      expect(contentWrapper).toHaveClass("flex-1");
      
      rerender(
        <KioskLayout>
          <div>Updated content</div>
        </KioskLayout>
      );
      
      mainContainer = document.querySelector('.min-h-screen.text-white');
      contentWrapper = document.querySelector('.flex-1');
      
      expect(mainContainer).toHaveClass("min-h-screen", "text-white");
      expect(contentWrapper).toHaveClass("flex-1");
    });
  });

  describe("Component Behavior", () => {
    it("re-renders correctly when children change", () => {
      const { rerender } = render(
        <KioskLayout>
          <div data-testid="child">Initial content</div>
        </KioskLayout>
      );
      
      expect(screen.getByText("Initial content")).toBeInTheDocument();
      
      rerender(
        <KioskLayout>
          <div data-testid="child">Updated content</div>
        </KioskLayout>
      );
      
      expect(screen.getByText("Updated content")).toBeInTheDocument();
      expect(screen.queryByText("Initial content")).not.toBeInTheDocument();
    });

    it("maintains structure when title prop changes", () => {
      const { rerender } = render(
        <KioskLayout title="Initial Title">
          <div>Test content</div>
        </KioskLayout>
      );
      
      expect(document.querySelector('.min-h-screen.text-white')).toBeInTheDocument();
      expect(document.querySelector('.flex-1')).toBeInTheDocument();
      
      rerender(
        <KioskLayout title="Updated Title">
          <div>Test content</div>
        </KioskLayout>
      );
      
      expect(document.querySelector('.min-h-screen.text-white')).toBeInTheDocument();
      expect(document.querySelector('.flex-1')).toBeInTheDocument();
    });

    it("handles rapid re-renders gracefully", () => {
      const { rerender } = render(
        <KioskLayout>
          <div>Content 1</div>
        </KioskLayout>
      );
      
      for (let i = 2; i <= 10; i++) {
        rerender(
          <KioskLayout>
            <div>Content {i}</div>
          </KioskLayout>
        );
        
        expect(screen.getByText(`Content ${i}`)).toBeInTheDocument();
        expect(document.querySelector('.min-h-screen.text-white')).toBeInTheDocument();
        expect(document.querySelector('.flex-1')).toBeInTheDocument();
      }
    });
  });

  describe("Edge Cases", () => {
    it("handles boolean children", () => {
      render(
        <KioskLayout>
          {true}
          {false}
          <div>Regular content</div>
        </KioskLayout>
      );
      
      expect(screen.getByText("Regular content")).toBeInTheDocument();
      // boolean values should not render anything visible
      expect(screen.queryByText("true")).not.toBeInTheDocument();
      expect(screen.queryByText("false")).not.toBeInTheDocument();
    });

    it("handles numeric zero as child", () => {
      render(
        <KioskLayout>
          {0}
          <div>Regular content</div>
        </KioskLayout>
      );
      
      expect(screen.getByText("0")).toBeInTheDocument();
      expect(screen.getByText("Regular content")).toBeInTheDocument();
    });

    it("handles empty string as child", () => {
      render(
        <KioskLayout>
          {""}
          <div>Regular content</div>
        </KioskLayout>
      );
      
      expect(screen.getByText("Regular content")).toBeInTheDocument();
    });

    it("handles fragments as children", () => {
      render(
        <KioskLayout>
          <React.Fragment>
            <div>Fragment child 1</div>
            <div>Fragment child 2</div>
          </React.Fragment>
          <div>Regular child</div>
        </KioskLayout>
      );
      
      expect(screen.getByText("Fragment child 1")).toBeInTheDocument();
      expect(screen.getByText("Fragment child 2")).toBeInTheDocument();
      expect(screen.getByText("Regular child")).toBeInTheDocument();
    });
  });

  describe("Commented Code Verification", () => {
    it("does not render status bar elements", () => {
      render(
        <KioskLayout title="Test Title">
          <div>Test content</div>
        </KioskLayout>
      );
      
      // verify that commented-out status bar elements are not rendered
      expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
      expect(screen.queryByText("KIOSK MODE")).not.toBeInTheDocument();
      expect(screen.queryByText("ONLINE")).not.toBeInTheDocument();
      expect(screen.queryByText("OFFLINE")).not.toBeInTheDocument();
    });

    it("does not render footer elements", () => {
      render(
        <KioskLayout>
          <div>Test content</div>
        </KioskLayout>
      );
      
      // verify that commented-out footer elements are not rendered
      expect(screen.queryByText("Electric City Aquarium")).not.toBeInTheDocument();
    });

    it("does not use offline status hook functionality", () => {
      render(
        <KioskLayout>
          <div>Test content</div>
        </KioskLayout>
      );
      
      // verify that the mocked hook is not called since it's commented out
      expect(mockUseOfflineStatus).not.toHaveBeenCalled();
    });
  });
});