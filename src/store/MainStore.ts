import { makeAutoObservable } from "mobx";
import { GameNode, Choice, Outcome, GameStage } from "../types/game";
import { gameDataManager, PlayerChoices } from "../data/GameDataManager";
import { SharkSpecies } from "../data/sharkData";

export class MainStore {
  count = 0;
  stepCount = 0;
  currentNodeId: string = "start";
  gameStage: GameStage = GameStage.START;
  playerChoices: Record<string, string> = {}; // tracks choices made by player
  currentSharkChoices: PlayerChoices = {}; // tracks structured choices for shark creation
  hasCompletedGame: boolean = false; // tracks if user has completed the full shark creation

  // get game data from the dynamic data manager
  get gameData(): Record<string, GameNode> {
    return gameDataManager.getGameData();
  }

  // method to force refresh of game data (useful when language changes)
  refreshGameData(): void {
    // force a refresh by calling the game data manager
    gameDataManager.refreshGameData();
    
    // force mobx to recognize the change by updating a tracked property
    // eslint-disable-next-line
    this.count = this.count;
  }

  constructor(initialCount?: number) {
    makeAutoObservable(this);

    if (typeof initialCount === "number") {
      this.count = initialCount;
    } else {
      this.count = gameDataManager.getSharkCount();
    }

    // listen for language changes and refresh game data
    this.setupLanguageChangeListener();
  }

  private setupLanguageChangeListener(): void {
    // listen for storage changes (language changes)
    window.addEventListener('storage', (event) => {
      if (event.key === 'language') {
        this.refreshGameData();
      }
    });

    // also listen for custom language change events
    window.addEventListener('languageChanged', () => {
      this.refreshGameData();
    });
  }

  increment() {
    this.count += 1;
    gameDataManager.incrementSharkCount();
  }

  get currentSharkCount() {
    return this.count;
  }

  incrementStepCount() {
    this.stepCount++;
  }

  resetStepCount() {
    this.stepCount = 0
  }
  
  get getCurrentStepCount(): number {
    return this.stepCount;
  }

  // game logic methods
  getCurrentNode(): GameNode {
    const node = gameDataManager.getNode(this.currentNodeId);
    if (!node) {
      // we know "start" always exists in our game data
      return gameDataManager.getStartNode();
    }
    return node;
  }

  makeChoice(option: "a" | "b") {
    const currentNode = this.getCurrentNode() as Choice;

    if (this.gameStage === GameStage.START) {
      this.currentNodeId = currentNode.optionA.nextId;
      this.gameStage = GameStage.CHOICE;
      this.incrementStepCount();
      return;
    }

    if (this.gameStage === GameStage.CHOICE) {
      const nextId = option === "a" ? currentNode.optionA.nextId : currentNode.optionB.nextId;
      this.playerChoices[currentNode.id] = option;

      // track structured choices for shark creation
      this.updateSharkChoices(currentNode, option);

      this.currentNodeId = nextId;
      this.gameStage = GameStage.OUTCOME;
      return;
    }

    if (this.gameStage === GameStage.OUTCOME) {
      const currentOutcome = this.getCurrentNode() as Outcome;
      this.incrementStepCount();
      
      // handle restart button (B) - return to start without incrementing
      if (option === "b") {
        this.resetGame();
        return;
      }

      // handle continue/start over button (A)
      if (currentOutcome.isFinal) {
        // mark that the user has completed the game when they first reach the final outcome
        if (!this.hasCompletedGame) {
          this.hasCompletedGame = true;
          // shark creation completed - increment the counter
          this.increment(); // increment shark count on completion
          // reset step count
          this.resetStepCount();
        }

        this.resetGame();
      } else {
        this.currentNodeId = currentOutcome.nextId || "start";
        this.gameStage = GameStage.CHOICE;
      }
      return;
    }

    if (this.gameStage === GameStage.FINAL) {
      this.resetGame();
      return;
    }
  }

  /**
   * updateSharkChoices
   *
   * @param currentNode - the current node in the game
   * @param option - the option chosen by the player
   *
   * @returns {void}
   * 
   * @description
   * This method updates the shark choices based on the current node and the option chosen by the player
   */
  private updateSharkChoices(currentNode: Choice, option: "a" | "b") {
    // get the text of the choice
    const choiceText = option === "a" ? currentNode.optionA.text : currentNode.optionB.text;

    // map choice text to structured choices
    // if size choice, set size to small or large
    if (currentNode.id === "size-choice") {
      this.currentSharkChoices.size = choiceText.toLowerCase().includes("small")
        ? "small"
        : "large";
    // if habitat choice, set habitat to bottom-dwelling or open-water
    } else if (currentNode.id.includes("habitat-choice")) {
      // if choice includes bottom or dwelling, set habitat to bottom-dwelling
      // else set habitat to open-water
      if (
        choiceText.toLowerCase().includes("bottom") ||
        choiceText.toLowerCase().includes("dwelling")
      ) {
        this.currentSharkChoices.habitat = "bottom-dwelling";
      } else {
        this.currentSharkChoices.habitat = "open-water";
      }
    // if water temperature choice, set water temperature to warm or cold
    } else if (currentNode.id.includes("water-temp-choice")) {
      this.currentSharkChoices.waterTemperature = choiceText.toLowerCase().includes("warm")
        ? "warm"
        : "cold";
    // if skin choice, set skin type to spotted-pattern or solid-pattern
    } else if (currentNode.id.includes("skin-choice")) {
      // map shark names to skin types
      const shark = gameDataManager.getAllSharks().find((s) => s.name === choiceText);
      // if shark is found, set skin type to the shark's skin type
      if (shark) {
        this.currentSharkChoices.skinType = shark.skinType;
      }
    }
  }

  resetGame() {
    this.currentNodeId = "start";
    this.gameStage = GameStage.START;
    this.playerChoices = {};
    this.currentSharkChoices = {};
    this.hasCompletedGame = false;
  }

  get isChoice(): boolean {
    return this.gameStage === GameStage.CHOICE;
  }

  get isOutcome(): boolean {
    return this.gameStage === GameStage.OUTCOME;
  }

  get isFinalOutcome(): boolean {
    const node = this.getCurrentNode();
    return "isFinal" in node && node.isFinal === true;
  }

  // methods for accessing dynamic data features
  getAvailableSharks(
    size: "small" | "large",
    habitat: "bottom-dwelling" | "open-water",
    waterTemp: "warm" | "cold"
  ): SharkSpecies[] {
    return gameDataManager.getAvailableSharks(size, habitat, waterTemp);
  }

  validateGameData() {
    return gameDataManager.validateGameData();
  }

  resetGameData(): void {
    gameDataManager.resetGameData();
    this.count = 0;
  }
}
