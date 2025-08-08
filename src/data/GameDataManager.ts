import { GameNode, GameConfig, Choice, Outcome } from "../types/game";
import { SharkSpecies, sharkSpecies, getSharkByTraits } from "./sharkData";
import { gameDataGenerator, dynamicGameData } from "./gameDataGenerator";

export interface PlayerChoices {
  size?: "small" | "large";
  habitat?: "bottom-dwelling" | "open-water";
  waterTemperature?: "warm" | "cold";
  skinType?: string;
}

export class GameDataManager {
  private static instance: GameDataManager;
  private gameData: Record<string, GameNode>;
  private sharkCount: number = 0;
  private stepCount: number = 1;

  // a constructor is a special method that is called when an object is created
  // it is used to initialize the object
  // it is called automatically when an object is created
  // it is used to initialize the object
  private constructor() {
    // set gameData to dynamic game data
    this.gameData = dynamicGameData;
    // load shark count from local storage
    this.loadSharkCount();
  }

  public static getInstance(): GameDataManager {
    if (!GameDataManager.instance) {
      GameDataManager.instance = new GameDataManager();
    }
    return GameDataManager.instance;
  }

  // core game data access
  public getGameData(): Record<string, GameNode> {
    return this.gameData;
  }

  public getNode(nodeId: string): GameNode | null {
    return this.gameData[nodeId] || null;
  }

  public getStartNode(): GameNode {
    return this.gameData["start"]!;
  }

  // dynamic data generation
  public generateNode(nodeId: string, choices: PlayerChoices): GameNode | null {
    console.log({ nodeId, choices });
    // this method can be used to generate nodes dynamically based on player choices
    // for now, we are just returning the pre-generated node
    return this.getNode(nodeId);
  }

  // shark data access
  public getAllSharks(): SharkSpecies[] {
    return Object.values(sharkSpecies);
  }

  public getSharkById(sharkId: string): SharkSpecies | null {
    return sharkSpecies[sharkId] || null;
  }

  public getSharkByTraits(choices: PlayerChoices): SharkSpecies | null {
    if (!choices.size || !choices.habitat || !choices.waterTemperature || !choices.skinType) {
      return null;
    }

    return getSharkByTraits(
      choices.size,
      choices.habitat,
      choices.waterTemperature,
      choices.skinType
    );
  }

  public getAvailableSharks(
    size: "small" | "large",
    habitat: "bottom-dwelling" | "open-water",
    waterTemp: "warm" | "cold"
  ): SharkSpecies[] {
    return gameDataGenerator.getAvailableSharks(size, habitat, waterTemp);
  }

  // shark count management
  public getSharkCount(): number {
    return this.sharkCount;
  }

  public incrementSharkCount(): void {
    this.sharkCount++;
    this.saveSharkCount();
  }

  private saveSharkCount(): void {
    try {
      localStorage.setItem("shark-count", this.sharkCount.toString());
    } catch (error) {
      console.error("Failed to save shark count:", error);
    }
  }

  private loadSharkCount(): void {
    try {
      const savedCount = localStorage.getItem("shark-count");
      this.sharkCount = savedCount ? parseInt(savedCount) : 0;
    } catch (error) {
      console.error("Failed to load shark count:", error);
    }
  }

  // data validation
  public validateGameData(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // check for required nodes
    const requiredNodes = ["start", "size-choice"];
    requiredNodes.forEach((nodeId) => {
      if (!this.gameData[nodeId]) {
        errors.push(`Missing required node: ${nodeId}`);
      }
    });

    // check for broken links
    Object.entries(this.gameData).forEach(([nodeId, node]) => {
      if (node.type === "choice") {
        const choice = node as Choice;
        if (choice.optionA?.nextId && !this.gameData[choice.optionA.nextId]) {
          errors.push(`Broken link from ${nodeId} to ${choice.optionA.nextId}`);
        }
        if (choice.optionB?.nextId && !this.gameData[choice.optionB.nextId]) {
          errors.push(`Broken link from ${nodeId} to ${choice.optionB.nextId}`);
        }
      } else if (node.type === "outcome") {
        const outcome = node as Outcome;
        if (outcome.nextId && !this.gameData[outcome.nextId]) {
          errors.push(`Broken link from ${nodeId} to ${outcome.nextId}`);
        }
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // utility methods
  public getGameConfig(): GameConfig {
    return {
      startNodeId: "start",
      nodes: this.gameData,
      onComplete: (playerChoices: Record<string, string>) => {
        console.log("Game completed with choices:", playerChoices);
      },
    };
  }

  public resetGameData(): void {
    this.gameData = dynamicGameData;
    this.sharkCount = 0;
    this.saveSharkCount();
  }
}

// export singleton instance
export const gameDataManager = GameDataManager.getInstance();
