import { GameNode } from "../types/game";
import { sharkSpecies, SharkSpecies } from "./sharkData";

/**
 * GameDataGenerator - dynamically generates game structure from shark data
 *
 * this class creates the start node and all of the game nodes (choices and outcomes) based on the
 * available shark species and their traits
 */

// main game data generator
export class GameDataGenerator {
  private gameData: Record<string, GameNode> = {};

  constructor() {
    this.generateGameData();
  }

  private generateGameData(): void {
    // start node
    this.gameData["start"] = {
      id: "start",
      title: "Make a Shark!",
      description: "",
      optionA: {
        text: "Start",
        nextId: "size-choice",
      },
      optionB: {
        text: "",
        nextId: "",
      },
      type: "choice",
    };

    // size choice
    this.gameData["size-choice"] = {
      id: "size-choice",
      title: "Choose a size",
      description: "",
      optionA: {
        text: "Small Shark",
        nextId: "small-shark-outcome",
        cardHeader: "6 inches — 7 feet",
        leftIcon: "/HumanIcons/HumanIcon.svg",
        rightIcons: ["/SharkIcons/SharkIcon.svg", "/SharkIcons/SharkIcon.svg"],
        headerSize: "text-2xl font-bold",
        iconSizes: {
          left: "w-[clamp(40px,6vw,80px)] h-auto",
          right: [
            "w-[clamp(120px,12vw,180px)] h-auto",
            "w-[clamp(80px,8vw,120px)] h-auto"
          ]
        }
      },
      optionB: {
        text: "Large Shark",
        nextId: "large-shark-outcome",
        cardHeader: "7 feet — 62 feet",
        leftIcon: "/HumanIcons/HumanIcon.svg",
        rightIcons: ["/SharkIcons/SharkIcon.svg", "/SharkIcons/SharkIcon.svg"],
        headerSize: "text-2xl font-bold",
        iconSizes: {
          left: "w-[clamp(40px,6vw,80px)] h-auto",
          right: [
            "w-[clamp(120px,12vw,180px)] h-auto",
            "w-[clamp(80px,8vw,120px)] h-auto"
          ]
        }
      },
      type: "choice",
    };

    // size outcomes
    this.gameData["small-shark-outcome"] = {
      id: "small-shark-outcome",
      title: "Small Shark",
      description: "Small sharks may be tiny but they play a big role in the oceans ecosystem. Many live among reefs and rocks that they use for shelter. They often have special adaptations to help they avoid predators and locate food.",
      image: "/SharkIcons/SharkIcon.svg",
      nextId: "habitat-choice-small",
      type: "outcome",
    };

    this.gameData["large-shark-outcome"] = {
      id: "large-shark-outcome",
      title: "Large Shark",
      description: "Many large sharks are considered to be apex predators, meaning they are at the top of the food chain. These large powerful sharks feed on fish, invertebrates, and mammals. Some other large sharks feed primarily on small plankton that they filter from the oceans water.",
      image: "/SharkIcons/SharkIcon.svg",
      nextId: "habitat-choice-large",
      type: "outcome",
    };

    // generate habitat choices and outcomes
    this.generateHabitatNodes();

    // generate water temperature choices and outcomes
    this.generateWaterTemperatureNodes();

    // generate skin type choices and final outcomes
    this.generateSkinTypeNodes();
  }

  private generateHabitatNodes(): void {
    // small shark habitats
    this.gameData["habitat-choice-small"] = {
      id: "habitat-choice-small",
      title: "Choose a habitat",
      description: "",
      optionA: {
        text: "Bottom Dwelling",
        nextId: "bottom-dwelling-small-outcome",
        image: "/Habitat_BottomDwelling.png",
      },
      optionB: {
        text: "Open Water",
        nextId: "open-water-small-outcome",
        image: "/Habitat_OpenWater.png",
      },
      type: "choice",
    };

    // large shark habitats
    this.gameData["habitat-choice-large"] = {
      id: "habitat-choice-large",
      title: "Choose a habitat",
      description: "",
      optionA: {
        text: "Bottom Dwelling",
        nextId: "bottom-dwelling-large-outcome",
        image: "/Habitat_BottomDwelling.png",
      },
      optionB: {
        text: "Open Water",
        nextId: "open-water-large-outcome",
        image: "/Habitat_OpenWater.png",
      },
      type: "choice",
    };

    // habitat outcomes
    this.gameData["bottom-dwelling-small-outcome"] = {
      id: "bottom-dwelling-small-outcome",
      title: "Bottom Dwelling",
      description: "Many shark species inhabit the lower levels of the aquatic ecosystem. Many have specialized sensors for detecting prey that they catch among the rocks and sand. Others have camouflage to help them ambush their unsuspecting food.",
      image: "/Habitat_BottomDwelling.png",
      nextId: "water-temp-choice-small-bottom",
      type: "outcome",
    };

    this.gameData["open-water-small-outcome"] = {
      id: "open-water-small-outcome",
      title: "Open Water",
      description: "Open water sharks roam the vast open oceans of the world and can travel great distances. These sharks play a key role in keeping fish populations balanced.",
      image: "/Habitat_OpenWater.png",
      nextId: "water-temp-choice-small-open",
      type: "outcome",
    };

    this.gameData["bottom-dwelling-large-outcome"] = {
      id: "bottom-dwelling-large-outcome",
      title: "Bottom Dwelling",
      description: "Many shark species inhabit the lower levels of the aquatic ecosystem. Many have specialized sensors for detecting prey that they catch among the rocks and sand. Others have camouflage to help them ambush their unsuspecting food.",
      image: "/Habitat_BottomDwelling.png",
      nextId: "water-temp-choice-large-bottom",
      type: "outcome",
    };

    this.gameData["open-water-large-outcome"] = {
      id: "open-water-large-outcome",
      title: "Open Water",
      description: "Open water sharks roam the vast open oceans of the world and can travel great distances. These sharks play a key role in keeping fish populations balanced.",
      image: "/Habitat_OpenWater.png",
      nextId: "water-temp-choice-large-open",
      type: "outcome",
    };
  }

  private generateWaterTemperatureNodes(): void {
    const combinations = [
      { size: "small", habitat: "bottom-dwelling", id: "small-bottom" },
      { size: "small", habitat: "open-water", id: "small-open" },
      { size: "large", habitat: "bottom-dwelling", id: "large-bottom" },
      { size: "large", habitat: "open-water", id: "large-open" },
    ];

    combinations.forEach(({ size, habitat, id }) => {
      console.log({ size, habitat, id });
      // choice node
      this.gameData[`water-temp-choice-${id}`] = {
        id: `water-temp-choice-${id}`,
        title: "Choose water temperature",
        description: "",
        optionA: {
          text: "Warm Water",
          nextId: `warm-water-${id}-outcome`,
          image: "/WaterTemp_Warm.png",
        },
        optionB: {
          text: "Cold Water",
          nextId: `cold-water-${id}-outcome`,
          image: "/WaterTemp_Cold.png",
        },
        type: "choice",
      };

      // warm water outcome
      this.gameData[`warm-water-${id}-outcome`] = {
        id: `warm-water-${id}-outcome`,
        title: "Warm Water",
        description: "Some sharks spend the majority of their lives in warm waters in tropical and sub-tropical climates. Warmer waters typically have larger fish populations that sharks can feed on. These sharks balance reef ecosystems by feeding on sick or unhealthy fish.",
        image: "/WaterTemp_Warm.png",
        nextId: `skin-choice-warm-${id}`,
        type: "outcome",
      };

      // cold water outcome
      this.gameData[`cold-water-${id}-outcome`] = {
        id: `cold-water-${id}-outcome`,
        title: "Cold Water",
        description: "Some sharks inhabit the freezing waters of the arctic and sub-arctic. To survive in these frigid waters many of these sharks species have special adaptations such as higher body temperature, specially evolved blood, and higher metabolic rates.",
        image: "/WaterTemp_Cold.png",
        nextId: `skin-choice-cold-${id}`,
        type: "outcome",
      };
    });
  }

  private generateSkinTypeNodes(): void {
    const combinations = [
      { size: "small", habitat: "bottom-dwelling", waterTemp: "warm", id: "small-bottom" },
      { size: "small", habitat: "bottom-dwelling", waterTemp: "cold", id: "small-bottom" },
      { size: "small", habitat: "open-water", waterTemp: "warm", id: "small-open" },
      { size: "small", habitat: "open-water", waterTemp: "cold", id: "small-open" },
      { size: "large", habitat: "bottom-dwelling", waterTemp: "warm", id: "large-bottom" },
      { size: "large", habitat: "bottom-dwelling", waterTemp: "cold", id: "large-bottom" },
      { size: "large", habitat: "open-water", waterTemp: "warm", id: "large-open" },
      { size: "large", habitat: "open-water", waterTemp: "cold", id: "large-open" },
    ];

    combinations.forEach(({ size, habitat, waterTemp, id }) => {
      const availableSharks = Object.values(sharkSpecies).filter(
        (shark) =>
          shark.size === size && shark.habitat === habitat && shark.waterTemperature === waterTemp
      );

      if (availableSharks.length >= 2) {
        // choice node
        this.gameData[`skin-choice-${waterTemp}-${id}`] = {
          id: `skin-choice-${waterTemp}-${id}`,
          title: "Choose the shark's skin!",
          description: "",
          optionA: {
            text: availableSharks[0]?.name || "Unknown Shark",
            nextId: `${availableSharks[0]?.id || "unknown"}-outcome`,
            image: availableSharks[0]?.skinChoiceImage || availableSharks[0]?.image,
          },
          optionB: {
            text: availableSharks[1]?.name || "Unknown Shark",
            nextId: `${availableSharks[1]?.id || "unknown"}-outcome`,
            image: availableSharks[1]?.skinChoiceImage || availableSharks[1]?.image,
          },
          type: "choice",
        };

        // final outcomes
        availableSharks.forEach((shark) => {
          this.gameData[`${shark.id}-outcome`] = {
            id: `${shark.id}-outcome`,
            title: shark.name,
            description: shark.description,
            image: shark.image,
            isFinal: true,
            type: "outcome",
          };
        });
      }
    });
  }

  getGameData(): Record<string, GameNode> {
    return this.gameData;
  }

  // dynamic methods for runtime data access
  getAvailableSharks(
    size: "small" | "large",
    habitat: "bottom-dwelling" | "open-water",
    waterTemp: "warm" | "cold"
  ): SharkSpecies[] {
    return Object.values(sharkSpecies).filter(
      (shark) =>
        shark.size === size && shark.habitat === habitat && shark.waterTemperature === waterTemp
    );
  }
}

// export singleton instance
export const gameDataGenerator = new GameDataGenerator();
export const dynamicGameData = gameDataGenerator.getGameData();
