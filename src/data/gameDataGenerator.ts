import { GameNode } from "../types/game";
import { sharkSpecies, SharkSpecies } from "./sharkData";

// import all translation files
import en from "../i18n/resources/en.json";
import es from "../i18n/resources/es.json";
import fr from "../i18n/resources/fr.json";
import de from "../i18n/resources/de.json";
import it from "../i18n/resources/it.json";
import pt from "../i18n/resources/pt.json";
import ru from "../i18n/resources/ru.json";
import ja from "../i18n/resources/ja.json";
import ko from "../i18n/resources/ko.json";
import zh from "../i18n/resources/zh.json";

/**
 * standalone i18n function for use in non-React contexts
 * this function provides basic translation functionality without requiring React hooks
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function t(key: string, options?: Record<string, any>): string {
  // get the current language from localStorage
  const currentLang = localStorage.getItem("language") || "en";

  // get translations based on current language
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let translations: Record<string, any>;

  switch (currentLang) {
    case "es":
      translations = es;
      break;
    case "fr":
      translations = fr;
      break;
    case "de":
      translations = de;
      break;
    case "it":
      translations = it;
      break;
    case "pt":
      translations = pt;
      break;
    case "ru":
      translations = ru;
      break;
    case "ja":
      translations = ja;
      break;
    case "ko":
      translations = ko;
      break;
    case "zh":
      translations = zh;
      break;
    default:
      translations = en;
  }

  // navigate to the nested key (example: "start.title" -> translations.start.title)
  const keys = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations;

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      // key not found, return the key itself as fallback
      return key;
    }
  }

  // if we have a string value and options for interpolation
  if (typeof value === "string" && options) {
    return value.replace(/\{\{(\w+)\}\}/g, (match: string, keyName: string) => {
      return options[keyName] !== undefined ? String(options[keyName]) : match;
    });
  }

  return typeof value === "string" ? value : key;
}

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
      title: t("title.main"),
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
        text: t("size.small"),
        nextId: "small-shark-outcome",
        cardHeader: "6 inches — 7 feet",
        leftIcon: "/HumanIcons/HumanIcon.svg",
        rightIcons: ["/SharkIcons/SharkIcon.svg", "/SharkIcons/SharkIcon.svg"],
        headerSize: "text-2xl font-bold",
        iconSizes: {
          left: "w-[clamp(40px,6vw,80px)] h-auto",
          right: ["w-[clamp(120px,12vw,180px)] h-auto", "w-[clamp(80px,8vw,120px)] h-auto"],
        },
      },
      optionB: {
        text: t("size.large"),
        nextId: "large-shark-outcome",
        cardHeader: "7 feet — 62 feet",
        leftIcon: "/HumanIcons/HumanIcon.svg",
        rightIcons: ["/SharkIcons/SharkIcon.svg", "/SharkIcons/SharkIcon.svg"],
        headerSize: "text-2xl font-bold",
        iconSizes: {
          left: "w-[clamp(40px,6vw,80px)] h-auto",
          right: ["w-[clamp(120px,12vw,180px)] h-auto", "w-[clamp(80px,8vw,120px)] h-auto"],
        },
      },
      type: "choice",
    };

    // size outcomes
    this.gameData["small-shark-outcome"] = {
      id: "small-shark-outcome",
      title: t("size.outcomeSmall"),
      description:
        "Small sharks may be tiny but they play a big role in the oceans ecosystem. Many live among reefs and rocks that they use for shelter. They often have special adaptations to help they avoid predators and locate food.",
      image: "/SharkIcons/SharkIcon.svg",
      nextId: "habitat-choice-small",
      type: "outcome",
    };

    this.gameData["large-shark-outcome"] = {
      id: "large-shark-outcome",
      title: t("size.outcomeLarge"),
      description:
        "Many large sharks are considered to be apex predators, meaning they are at the top of the food chain. These large powerful sharks feed on fish, invertebrates, and mammals. Some other large sharks feed primarily on small plankton that they filter from the oceans water.",
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
      title: t("habitat.chooseAHabitat"),
      description: "",
      optionA: {
        text: t("habitat.bottomDwelling"),
        nextId: "bottom-dwelling-small-outcome",
        image: "/Habitat_BottomDwelling.png",
      },
      optionB: {
        text: t("habitat.openWater"),
        nextId: "open-water-small-outcome",
        image: "/Habitat_OpenWater.png",
      },
      type: "choice",
    };

    // large shark habitats
    this.gameData["habitat-choice-large"] = {
      id: "habitat-choice-large",
      title: t("habitat.chooseAHabitat"),
      description: "",
      optionA: {
        text: t("habitat.bottomDwelling"),
        nextId: "bottom-dwelling-large-outcome",
        image: "/Habitat_BottomDwelling.png",
      },
      optionB: {
        text: t("habitat.openWater"),
        nextId: "open-water-large-outcome",
        image: "/Habitat_OpenWater.png",
      },
      type: "choice",
    };

    // habitat outcomes
    this.gameData["bottom-dwelling-small-outcome"] = {
      id: "bottom-dwelling-small-outcome",
      title: t("habitat.outcomeBottomDwelling"),
      description:
        "Many shark species inhabit the lower levels of the aquatic ecosystem. Many have specialized sensors for detecting prey that they catch among the rocks and sand. Others have camouflage to help them ambush their unsuspecting food.",
      image: "/Habitat_BottomDwelling.png",
      nextId: "water-temp-choice-small-bottom",
      type: "outcome",
    };

    this.gameData["open-water-small-outcome"] = {
      id: "open-water-small-outcome",
      title: t("habitat.outcomeOpenWater"),
      description:
        "Open water sharks roam the vast open oceans of the world and can travel great distances. These sharks play a key role in keeping fish populations balanced.",
      image: "/Habitat_OpenWater.png",
      nextId: "water-temp-choice-small-open",
      type: "outcome",
    };

    this.gameData["bottom-dwelling-large-outcome"] = {
      id: "bottom-dwelling-large-outcome",
      title: t("habitat.outcomeBottomDwelling"),
      description:
        "Many shark species inhabit the lower levels of the aquatic ecosystem. Many have specialized sensors for detecting prey that they catch among the rocks and sand. Others have camouflage to help them ambush their unsuspecting food.",
      image: "/Habitat_BottomDwelling.png",
      nextId: "water-temp-choice-large-bottom",
      type: "outcome",
    };

    this.gameData["open-water-large-outcome"] = {
      id: "open-water-large-outcome",
      title: t("habitat.outcomeOpenWater"),
      description:
        "Open water sharks roam the vast open oceans of the world and can travel great distances. These sharks play a key role in keeping fish populations balanced.",
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

    combinations.forEach(({ id }) => {
      // choice node
      this.gameData[`water-temp-choice-${id}`] = {
        id: `water-temp-choice-${id}`,
        title: t("waterTemperature.chooseWaterTemperature"),
        description: "",
        optionA: {
          text: t("waterTemperature.warm"),
          nextId: `warm-water-${id}-outcome`,
          image: "/WaterTemp_Warm.png",
        },
        optionB: {
          text: t("waterTemperature.cold"),
          nextId: `cold-water-${id}-outcome`,
          image: "/WaterTemp_Cold.png",
        },
        type: "choice",
      };

      // warm water outcome
      this.gameData[`warm-water-${id}-outcome`] = {
        id: `warm-water-${id}-outcome`,
        title: t("waterTemperature.outcomeWarm"),
        description:
          "Some sharks spend the majority of their lives in warm waters in tropical and sub-tropical climates. Warmer waters typically have larger fish populations that sharks can feed on. These sharks balance reef ecosystems by feeding on sick or unhealthy fish.",
        image: "/WaterTemp_Warm.png",
        nextId: `skin-choice-warm-${id}`,
        type: "outcome",
      };

      // cold water outcome
      this.gameData[`cold-water-${id}-outcome`] = {
        id: `cold-water-${id}-outcome`,
        title: t("waterTemperature.outcomeCold"),
        description:
          "Some sharks inhabit the freezing waters of the arctic and sub-arctic. To survive in these frigid waters many of these sharks species have special adaptations such as higher body temperature, specially evolved blood, and higher metabolic rates.",
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
        // choice node when multiple sharks are available
        this.gameData[`skin-choice-${waterTemp}-${id}`] = {
          id: `skin-choice-${waterTemp}-${id}`,
          title: t("skinType.chooseSkinType"),
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

        // final outcomes for multiple sharks
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
      } else if (availableSharks.length === 1) {
        // choice node with single option when only one shark is available
        const shark = availableSharks[0];
        if (shark) {
          this.gameData[`skin-choice-${waterTemp}-${id}`] = {
            id: `skin-choice-${waterTemp}-${id}`,
            title: t("skinType.chooseSkinType"),
            description: "",
            optionA: {
              text: shark.name,
              nextId: `${shark.id}-outcome`,
              image: shark.skinChoiceImage || shark.image,
            },
            optionB: {
              text: "",
              nextId: `${shark.id}-outcome`,
              image: "",
            },
            type: "choice",
          };

          // final outcome for single shark
          this.gameData[`${shark.id}-outcome`] = {
            id: `${shark.id}-outcome`,
            title: shark.name,
            description: shark.description,
            image: shark.image,
            isFinal: true,
            type: "outcome",
          };
        }
      }
    });
  }

  getGameData(): Record<string, GameNode> {
    // regenerate game data to ensure translations are current
    this.generateGameData();
    return this.gameData;
  }

  // method to refresh translations when language changes
  refreshTranslations(): void {
    this.generateGameData();
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
