import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { ChoiceView } from "./ChoiceView";
import { Choice, GameStage } from "../../types/game";
import i18n from "../../i18n";

const mockMainStore = {
  getCurrentNode: vi.fn(),
  makeChoice: vi.fn(),
  getCurrentStepCount: 1,
  gameStage: GameStage.CHOICE,
};

vi.mock("../../store", () => ({
  useStore: () => ({
    mainStore: mockMainStore,
  }),
}));

const mockUseABButtons = {
  promptState: 0,
  resetInactivity: vi.fn(),
};

vi.mock("../../hooks/useABButtons", () => ({
  useABButtons: () => mockUseABButtons,
}));

vi.mock("../../components/Header/Header", () => ({
  Header: ({ title, legend }: { title: string; legend: string }) => (
    <div data-testid="header">
      <div data-testid="header-title">{title}</div>
      <div data-testid="header-legend">{legend}</div>
    </div>
  ),
}));

vi.mock("../../components/SizeCard/SizeCard", () => ({
  SizeCard: ({ size }: { size: string }) => (
    <div data-testid={`size-card-${size}`}>Size Card {size}</div>
  ),
}));

vi.mock("../../components/Card/Card", () => ({
  default: ({ imageUrl, onClick, size }: { imageUrl: string; onClick: () => void; size: string }) => (
    <div 
      data-testid="card" 
      data-image-url={imageUrl}
      data-size={size}
      onClick={onClick}
    >
      Card Component
    </div>
  ),
}));

vi.mock("../../components/TextButton/TextButton", () => ({
  TextButton: ({ 
    label, 
    id, 
    text, 
    onClick, 
    isChoiceView 
  }: { 
    label: string; 
    id: string; 
    text: string; 
    onClick: () => void; 
    isChoiceView: boolean; 
  }) => (
    <button 
      data-testid={id} 
      onClick={onClick}
      data-label={label}
      data-text={text}
      data-is-choice-view={isChoiceView}
    >
      {label}: {text}
    </button>
  ),
}));

vi.mock("../../components/InactivityManager/InactivityManager", () => ({
  default: ({ promptState, resetInactivity }: { promptState: number; resetInactivity: () => void }) => (
    <div 
      data-testid="inactivity-manager"
      data-prompt-state={promptState}
      data-reset-inactivity={resetInactivity.toString()}
    >
      Inactivity Manager
    </div>
  ),
}));

describe("ChoiceView", () => {
  const mockChoiceNode: Choice = {
    id: "test-choice",
    title: "Test Choice Title",
    description: "Test description",
    type: "choice",
    optionA: {
      text: "Option A Text",
      nextId: "next-a",
      image: "option-a-image.jpg",
    },
    optionB: {
      text: "Option B Text", 
      nextId: "next-b",
      image: "option-b-image.jpg",
    },
  };

  const mockSizeChoiceNode: Choice = {
    id: "size-choice",
    title: "Size Choice Title",
    description: "Size description",
    type: "choice",
    optionA: {
      text: "Small Option",
      nextId: "next-small",
      cardHeader: "Small",
    },
    optionB: {
      text: "Large Option",
      nextId: "next-large", 
      cardHeader: "Large",
    },
  };

  const renderWithI18n = (component: React.ReactNode) => {
    return render(
      <I18nextProvider i18n={i18n}>
        {component}
      </I18nextProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockMainStore.getCurrentStepCount = 1;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("returns null when no node exists", () => {
      mockMainStore.getCurrentNode.mockReturnValue(null);
      
      const { container } = renderWithI18n(<ChoiceView />);
      
      expect(container.firstChild).toBeNull();
    });

    it("renders the component with basic structure when node exists", () => {
      mockMainStore.getCurrentNode.mockReturnValue(mockChoiceNode);
      
      renderWithI18n(<ChoiceView />);
      
      expect(screen.getByTestId("header")).toBeInTheDocument();
      expect(screen.getByTestId("header-title")).toHaveTextContent("Test Choice Title");
      expect(screen.getByTestId("inactivity-manager")).toBeInTheDocument();
    });

    it("applies correct ID to the main container", () => {
      mockMainStore.getCurrentNode.mockReturnValue(mockChoiceNode);
      
      renderWithI18n(<ChoiceView />);
      
      const container = screen.getByTestId("header").closest("div");
      expect(container).not.toBeNull();
      if (container) {
        expect(container.parentElement).toHaveAttribute("id", "test-choice");
      }
    });

    it("applies correct CSS classes to main container", () => {
      mockMainStore.getCurrentNode.mockReturnValue(mockChoiceNode);
      
      renderWithI18n(<ChoiceView />);
      
      const container = screen.getByTestId("header").closest("div");
      expect(container).not.toBeNull();
      if (container) {
        expect(container.parentElement).toHaveClass("min-h-screen", "bg-[#1B3567]");
      }
    });
  });

  describe("Step Count Logic", () => {
    it("displays correct step count for valid steps (1-3)", () => {
      mockMainStore.getCurrentNode.mockReturnValue(mockChoiceNode);
      mockMainStore.getCurrentStepCount = 2;
      
      renderWithI18n(<ChoiceView />);
      
      expect(screen.getByTestId("header-legend")).toHaveTextContent("Step 2/3");
    });

    it("displays 'Last detail' for invalid step counts", () => {
      mockMainStore.getCurrentNode.mockReturnValue(mockChoiceNode);
      mockMainStore.getCurrentStepCount = 5;
      
      renderWithI18n(<ChoiceView />);
      
      expect(screen.getByTestId("header-legend")).toHaveTextContent("Last Detail");
    });

    it("handles step count of 0 as invalid", () => {
      mockMainStore.getCurrentNode.mockReturnValue(mockChoiceNode);
      mockMainStore.getCurrentStepCount = 0;
      
      renderWithI18n(<ChoiceView />);
      
      expect(screen.getByTestId("header-legend")).toHaveTextContent("Last Detail");
    });
  });

  describe("Size Choice Rendering", () => {
    it("renders size choice layout when both options have cardHeader", () => {
      mockMainStore.getCurrentNode.mockReturnValue(mockSizeChoiceNode);
      
      renderWithI18n(<ChoiceView />);
      
      expect(screen.getByTestId("size-card-small")).toBeInTheDocument();
      expect(screen.getByTestId("size-card-large")).toBeInTheDocument();
    });

    it("renders correct text buttons for size choice", () => {
      mockMainStore.getCurrentNode.mockReturnValue(mockSizeChoiceNode);
      
      renderWithI18n(<ChoiceView />);
      
      const buttonA = screen.getByTestId("a-button");
      const buttonB = screen.getByTestId("b-button");
      
      expect(buttonA).toHaveAttribute("data-text", "Small Option");
      expect(buttonB).toHaveAttribute("data-text", "Large Option");
      expect(buttonA).toHaveAttribute("data-is-choice-view", "true");
      expect(buttonB).toHaveAttribute("data-is-choice-view", "true");
    });
  });

  describe("Regular Choice Rendering", () => {
    it("renders card components for regular choices", () => {
      mockMainStore.getCurrentNode.mockReturnValue(mockChoiceNode);
      
      renderWithI18n(<ChoiceView />);
      
      const cards = screen.getAllByTestId("card");
      expect(cards).toHaveLength(2);
      expect(cards[0]).toHaveAttribute("data-image-url", "option-a-image.jpg");
      expect(cards[1]).toHaveAttribute("data-image-url", "option-b-image.jpg");
      expect(cards[0]).toHaveAttribute("data-size", "lg");
      expect(cards[1]).toHaveAttribute("data-size", "lg");
    });

    it("renders text buttons with correct text for valid step counts", () => {
      mockMainStore.getCurrentNode.mockReturnValue(mockChoiceNode);
      mockMainStore.getCurrentStepCount = 2;
      
      renderWithI18n(<ChoiceView />);
      
      const buttonA = screen.getByTestId("a-button");
      const buttonB = screen.getByTestId("b-button");
      
      expect(buttonA).toHaveAttribute("data-text", "Option A Text");
      expect(buttonB).toHaveAttribute("data-text", "Option B Text");
    });

    it("renders text buttons with empty text for invalid step counts", () => {
      mockMainStore.getCurrentNode.mockReturnValue(mockChoiceNode);
      mockMainStore.getCurrentStepCount = 5;
      
      renderWithI18n(<ChoiceView />);
      
      const buttonA = screen.getByTestId("a-button");
      const buttonB = screen.getByTestId("b-button");
      
      expect(buttonA).toHaveAttribute("data-text", "");
      expect(buttonB).toHaveAttribute("data-text", "");
    });
  });

  describe("Conditional Option B Rendering", () => {
    it("renders option B when both text and image exist", () => {
      mockMainStore.getCurrentNode.mockReturnValue(mockChoiceNode);
      
      renderWithI18n(<ChoiceView />);
      
      expect(screen.getByTestId("b-button")).toBeInTheDocument();
      expect(screen.getAllByTestId("card")).toHaveLength(2);
    });

    it("does not render option B when text is missing", () => {
      const nodeWithoutBText = {
        ...mockChoiceNode,
        optionB: {
          ...mockChoiceNode.optionB,
          text: "",
        },
      };
      mockMainStore.getCurrentNode.mockReturnValue(nodeWithoutBText);
      
      renderWithI18n(<ChoiceView />);
      
      expect(screen.queryByTestId("b-button")).not.toBeInTheDocument();
      expect(screen.getAllByTestId("card")).toHaveLength(1);
    });

    it("does not render option B when image is missing", () => {
      const nodeWithoutBImage = {
        ...mockChoiceNode,
        optionB: {
          ...mockChoiceNode.optionB,
          image: undefined,
        },
      };
      mockMainStore.getCurrentNode.mockReturnValue(nodeWithoutBImage);
      
      renderWithI18n(<ChoiceView />);
      
      expect(screen.queryByTestId("b-button")).not.toBeInTheDocument();
      expect(screen.getAllByTestId("card")).toHaveLength(1);
    });

    it("does not render option B when both text and image are missing", () => {
      const nodeWithoutB = {
        ...mockChoiceNode,
        optionB: {
          ...mockChoiceNode.optionB,
          text: "",
          image: undefined,
        },
      };
      mockMainStore.getCurrentNode.mockReturnValue(nodeWithoutB);
      
      renderWithI18n(<ChoiceView />);
      
      expect(screen.queryByTestId("b-button")).not.toBeInTheDocument();
      expect(screen.getAllByTestId("card")).toHaveLength(1);
    });
  });

  describe("Choice Interactions", () => {
    it("calls makeChoice with 'a' when option A button is clicked", () => {
      mockMainStore.getCurrentNode.mockReturnValue(mockChoiceNode);
      
      renderWithI18n(<ChoiceView />);
      
      fireEvent.click(screen.getByTestId("a-button"));
      
      expect(mockMainStore.makeChoice).toHaveBeenCalledWith("a");
      expect(mockUseABButtons.resetInactivity).toHaveBeenCalled();
    });

    it("calls makeChoice with 'b' when option B button is clicked", () => {
      mockMainStore.getCurrentNode.mockReturnValue(mockChoiceNode);
      
      renderWithI18n(<ChoiceView />);
      
      fireEvent.click(screen.getByTestId("b-button"));
      
      expect(mockMainStore.makeChoice).toHaveBeenCalledWith("b");
      expect(mockUseABButtons.resetInactivity).toHaveBeenCalled();
    });

    it("calls makeChoice with 'a' when option A card is clicked", () => {
      mockMainStore.getCurrentNode.mockReturnValue(mockChoiceNode);
      
      renderWithI18n(<ChoiceView />);
      
      const cards = screen.getAllByTestId("card");
      expect(cards).toHaveLength(2);
      fireEvent.click(cards[0]!);
      
      expect(mockMainStore.makeChoice).toHaveBeenCalledWith("a");
      expect(mockUseABButtons.resetInactivity).toHaveBeenCalled();
    });

    it("calls makeChoice with 'b' when option B card is clicked", () => {
      mockMainStore.getCurrentNode.mockReturnValue(mockChoiceNode);
      
      renderWithI18n(<ChoiceView />);
      
      const cards = screen.getAllByTestId("card");
      expect(cards).toHaveLength(2);
      fireEvent.click(cards[1]!);
      
      expect(mockMainStore.makeChoice).toHaveBeenCalledWith("b");
      expect(mockUseABButtons.resetInactivity).toHaveBeenCalled();
    });
  });

  describe("Translation Integration", () => {
    it("uses translated button labels", () => {
      mockMainStore.getCurrentNode.mockReturnValue(mockChoiceNode);
      
      renderWithI18n(<ChoiceView />);
      
      const buttonA = screen.getByTestId("a-button");
      const buttonB = screen.getByTestId("b-button");
      
      expect(buttonA).toHaveAttribute("data-label", "A");
      expect(buttonB).toHaveAttribute("data-label", "B");
    });
  });

  describe("InactivityManager Integration", () => {
    it("passes correct props to InactivityManager", () => {
      mockMainStore.getCurrentNode.mockReturnValue(mockChoiceNode);
      mockUseABButtons.promptState = 1;
      
      renderWithI18n(<ChoiceView />);
      
      const inactivityManager = screen.getByTestId("inactivity-manager");
      
      expect(inactivityManager).toHaveAttribute("data-prompt-state", "1");
      expect(inactivityManager).toHaveAttribute("data-reset-inactivity", mockUseABButtons.resetInactivity.toString());
    });

    it("updates InactivityManager when promptState changes", () => {
      mockMainStore.getCurrentNode.mockReturnValue(mockChoiceNode);
      mockUseABButtons.promptState = 2;
      
      renderWithI18n(<ChoiceView />);
      
      const inactivityManager = screen.getByTestId("inactivity-manager");
      
      expect(inactivityManager).toHaveAttribute("data-prompt-state", "2");
    });
  });

  describe("Edge Cases", () => {
    it("handles node without optionA image", () => {
      const nodeWithoutAImage = {
        ...mockChoiceNode,
        optionA: {
          ...mockChoiceNode.optionA,
          image: undefined,
        },
      };
      mockMainStore.getCurrentNode.mockReturnValue(nodeWithoutAImage);
      
      renderWithI18n(<ChoiceView />);
      
      const cards = screen.getAllByTestId("card");
      expect(cards[0]).toHaveAttribute("data-image-url", "");
    });

    it("handles size choice with only option A having cardHeader", () => {
      const partialSizeChoice = {
        ...mockChoiceNode,
        optionA: {
          ...mockChoiceNode.optionA,
          cardHeader: "Small",
        },
      };
      mockMainStore.getCurrentNode.mockReturnValue(partialSizeChoice);
      
      renderWithI18n(<ChoiceView />);
      
      expect(screen.queryByTestId("size-card-small")).not.toBeInTheDocument();
      expect(screen.getAllByTestId("card")).toHaveLength(2);
    });

    it("handles empty choice text gracefully", () => {
      const nodeWithEmptyText = {
        ...mockChoiceNode,
        optionA: {
          ...mockChoiceNode.optionA,
          text: "",
        },
      };
      mockMainStore.getCurrentNode.mockReturnValue(nodeWithEmptyText);
      
      renderWithI18n(<ChoiceView />);
      
      const buttonA = screen.getByTestId("a-button");
      expect(buttonA).toHaveAttribute("data-text", "");
    });
  });
});
