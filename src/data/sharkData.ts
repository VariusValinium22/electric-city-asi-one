// Shark-specific data and configurations
export interface SharkSpecies {
    id: string;
    name: string;
    description: {
      range: string;
      size: string;
      fact: string;
    };
    image: string;
    skinChoiceImage?: string;
    size: "small" | "large";
    habitat: "bottom-dwelling" | "open-water";
    waterTemperature: "warm" | "cold";
    skinType: string;
  }
  
  export const sharkSpecies: Record<string, SharkSpecies> = {
    // Small Bottom Dwelling Sharks
    "coral-catshark": {
      id: "coral-catshark",
      name: "Coral Catshark",
      description: {
        range: "The coral catshark can be found from India to Southeast Asia.",
        size: "1.5-2ft; 1.5-2.5lbs",
        fact: "Coral catshark females tuck their eggs into the crevices in rocks. \nThese eggs, which take 4-6 months to hatch, look like a small purse and are often referred to as “mermaid's purses”.",
      },
      image: "/CoralCatshark/Result_CoralCatshark.png",
      skinChoiceImage: "/CoralCatshark/SharkSkin_CoralCatshark.jpg",
      size: "small",
      habitat: "bottom-dwelling",
      waterTemperature: "warm",
      skinType: "coral-catshark",
    },
    "epaulette-shark": {
      id: "epaulette-shark",
      name: "Epaulette Shark",
      description: {
        range: "The epaulette shark can be found from the Red Sea to the Pacific Ocean.",
        size: "1.5-2ft; 1.5-2.5lbs",
        fact: "Epaulette sharks are known for their ability to “walk” on their fins in shallow water.",
      },
      image: "/EppauletteShark/SharkSkin_EppauletteShark.jpg",
      skinChoiceImage: "/EppauletteShark/SharkSkin_EppauletteShark.jpg",
      size: "small",
      habitat: "bottom-dwelling",
      waterTemperature: "warm",
      skinType: "epaulette-shark",
    },
    "chain-catshark": {
      id: "chain-catshark",
      name: "Chain Catshark",
      description: {
        range: "",
        size: "",
        fact: "",
      },
      image: "/ChainCatshark/SharkSkin_ChainCatshark.jpg",
      size: "small",
      habitat: "bottom-dwelling",
      waterTemperature: "cold",
      skinType: "chain-catshark",
    },
    "spotted-wobbegong": {
      id: "spotted-wobbegong",
      name: "Spotted Wobbegong",
      description: {
        range: "",
        size: "",
        fact: "",
      },
      image: "/SpottedWobbegong/SharkSkin_SpottedWobbegong.jpg",
      size: "small",
      habitat: "bottom-dwelling",
      waterTemperature: "cold",
      skinType: "spotted-wobbegong",
    },
  
    // Small Open Water Sharks
    "atlantic-sharpnose": {
      id: "atlantic-sharpnose",
      name: "Atlantic Sharpnose Shark",
      description: {
        range: "",
        size: "",
        fact: "",
      },
      image: "/AtlanticSharpnose/SharkSkin_AtlanticSharpnose.jpg",
      skinChoiceImage: "/AtlanticSharpnose/SharkSkin_AtlanticSharpnose.jpg",
      size: "small",
      habitat: "open-water",
      waterTemperature: "warm",
      skinType: "atlantic-sharpnose",
    },
    bonnethead: {
      id: "bonnethead",
      name: "Bonnethead Shark",
      description: {
        range: "",
        size: "",
        fact: "",
      },
      image: "/Bonnethead/SharkSkin_Bonnethead.jpg",
      skinChoiceImage: "/Bonnethead/SharkSkin_Bonnethead.jpg",
      size: "small",
      habitat: "open-water",
      waterTemperature: "warm",
      skinType: "bonnethead",
    },
    "scalloped-hammerhead": {
      id: "scalloped-hammerhead",
      name: "Scalloped Hammerhead",
      description: {
        range: "",
        size: "",
        fact: "",
      },
      image: "/ScallopedHammerhead/SharkSkin_ScallopedHammerhead.jpg",
      size: "small",
      habitat: "open-water",
      waterTemperature: "cold",
      skinType: "scalloped-hammerhead",
    },
    "salmon-shark": {
      id: "salmon-shark",
      name: "Salmon Shark",
      description: {
        range: "",
        size: "",
        fact: "",
      },
      image: "/SalmonShark/SharkSkin_Salmon.jpg",
      size: "small",
      habitat: "open-water",
      waterTemperature: "cold",
      skinType: "salmon-shark",
    },
  
    // Large Bottom Dwelling Sharks
    "nurse-shark": {
      id: "nurse-shark",
      name: "Nurse Shark",
      description: {
        range: "",
        size: "",
        fact: "",
      },
      image: "/NurseShark/SharkSkin_Nurse.jpg",
      size: "large",
      habitat: "bottom-dwelling",
      waterTemperature: "warm",
      skinType: "nurse-shark",
    },
    wobbegong: {
      id: "wobbegong",
      name: "Wobbegong Shark",
      description: {
        range: "",
        size: "",
        fact: "",
      },
      image: "/SpottedWobbegong/SharkSkin_SpottedWobbegong.jpg",
      size: "large",
      habitat: "bottom-dwelling",
      waterTemperature: "warm",
      skinType: "wobbegong",
    },
    "greenland-shark": {
      id: "greenland-shark",
      name: "Greenland Shark",
      description: {
        range: "",
        size: "",
        fact: "",
      },
      image: "/SharkSkin_Nurse.jpg", // Placeholder
      size: "large",
      habitat: "bottom-dwelling",
      waterTemperature: "cold",
      skinType: "greenland-shark",
    },
    "spiny-dogfish": {
      id: "spiny-dogfish",
      name: "Spiny Dogfish",
      description: {
        range: "",
        size: "",
        fact: "",
      },
      image: "/SpinyDogfish/SharkSkin_SpinyDogfish.jpg",
      size: "large",
      habitat: "bottom-dwelling",
      waterTemperature: "cold",
      skinType: "spiny-dogfish",
    },
  
    // Large Open Water Sharks
    "whale-shark": {
      id: "whale-shark",
      name: "Whale Shark",
      description: {
        range: "",
        size: "",
        fact: "",
      },
      image: "/WhaleShark/SharkSkin_WhaleShark.jpg",
      size: "large",
      habitat: "open-water",
      waterTemperature: "warm",
      skinType: "whale-shark",
    },
    "tiger-shark": {
      id: "tiger-shark",
      name: "Tiger Shark",
      description: {
        range: "",
        size: "",
        fact: "",
      },
      image: "/SharkSkin_Nurse.jpg", // Placeholder
      size: "large",
      habitat: "open-water",
      waterTemperature: "warm",
      skinType: "tiger-shark",
    },
    porbeagle: {
      id: "porbeagle",
      name: "Porbeagle Shark",
      description: {
        range: "",
        size: "",
        fact: "",
      },
      image: "/PorbeagleShark/SharkSkin_Porbeagle.jpg",
      size: "large",
      habitat: "open-water",
      waterTemperature: "cold",
      skinType: "porbeagle",      
    },
    "great-white": {
      id: "great-white",
      name: "Great White Shark",
      description: {
        range: "",
        size: "",
        fact: "",
      },
      image: "/SharkSkin_Nurse.jpg", // Placeholder
      size: "large",
      habitat: "open-water",
      waterTemperature: "cold",
      skinType: "great-white",
    },
  };
  
  // Helper functions for shark data
  export const getSharkByTraits = (
    size: "small" | "large",
    habitat: "bottom-dwelling" | "open-water",
    waterTemperature: "warm" | "cold",
    skinType: string
  ): SharkSpecies | null => {
    return (
      Object.values(sharkSpecies).find(
        (shark) =>
          shark.size === size &&
          shark.habitat === habitat &&
          shark.waterTemperature === waterTemperature &&
          shark.skinType === skinType
      ) || null
    );
  };
  
  export const getAllSharks = (): SharkSpecies[] => {
    return Object.values(sharkSpecies);
  };
  
  export const getSharksBySize = (size: "small" | "large"): SharkSpecies[] => {
    return getAllSharks().filter((shark) => shark.size === size);
  };
  
  export const getSharksByHabitat = (habitat: "bottom-dwelling" | "open-water"): SharkSpecies[] => {
    return getAllSharks().filter((shark) => shark.habitat === habitat);
  };
  
  export const getSharksByTemperature = (temperature: "warm" | "cold"): SharkSpecies[] => {
    return getAllSharks().filter((shark) => shark.waterTemperature === temperature);
  };
  