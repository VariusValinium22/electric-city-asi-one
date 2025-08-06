// export all data-related modules
export * from "./sharkData";
export * from "./gameDataGenerator";
export * from "./GameDataManager";

// re-export the main data manager instance
export { gameDataManager } from "./GameDataManager";
export { dynamicGameData } from "./gameDataGenerator";
