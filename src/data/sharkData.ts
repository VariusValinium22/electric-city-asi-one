// Shark-specific data and configurations
export interface SharkSpecies {
    id: string;
    name: string;
    description: string | {
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
        range: "The epaulette shark is found in the shallow waters of Northern Australia and Papua New Guinea.",
        size: "2-3.5ft; 5-10lbs",
        fact: "Epaulette sharks can use their fins in a walking motion as they undulate their bodies, helping them move through coral reefs. This motion can even help them move on land between tide pools in search of food.",
      },
      image: "/EppauletteShark/Result_EppauletteShark.jpg",
      skinChoiceImage: "/EppauletteShark/SharkSkin_EppauletteShark.jpg",
      size: "small",
      habitat: "bottom-dwelling",
      waterTemperature: "warm",
      skinType: "epaulette-shark",
    },
    "spiny-dogfish": {
      id: "spiny-dogfish",
      name: "Spiny Dogfish",
      description: {
        range: "The spiny dogfish is found in cool temperate waters throughout the North Atlantic and North Pacific Oceans.",
        size: "2-4ft; 7-15lbs",
        fact: "The name “spiny” dogfish refers to two large spines on both of the shark's dorsal fins. When threatened, the spiny dogfish can use its spines to defend itself.",
      },
      image: "/SpinyDogfish/Result_SpinyDogfish.jpg",
      skinChoiceImage: "/SpinyDogfish/SharkSkin_SpinyDogfish.jpg",
      size: "small",
      habitat: "bottom-dwelling",
      waterTemperature: "cold",
      skinType: "spiny-dogfish",
    },
    "chain-catshark": {
      id: "chain-catshark",
      name: "Chain Catshark",
      description: {
        range: "The chain catshark can be found in the deep waters of the Northwest Atlantic Ocean to the Gulf of Mexico.",
        size: "1.5-2ft; 0.5-1lb",
        fact: "The chain catshark has been observed to have a biofluorescent glow. It is believed that this glow may help it communicate with other sharks.",
      },
      image: "/ChainCatshark/Result_ChainCatshark.jpg",
      skinChoiceImage: "/ChainCatshark/SharkSkin_ChainCatshark.jpg",
      size: "small",
      habitat: "bottom-dwelling",
      waterTemperature: "cold",
      skinType: "chain-catshark",
    },
  
    // Small Open Water Sharks
    "atlantic-sharpnose": {
      id: "atlantic-sharpnose",
      name: "Atlantic Sharpnose Shark",
      description: {
        range: "The Atlantic sharpnose shark is found in the Western Atlantic Ocean to the Gulf of Mexico.",
        size: "3.5-4ft; 9-12lbs",
        fact: "After a female is bred, she will move offshore to deeper waters. When she is ready to give birth she returns to shallow water and gives birth to 3-7 pups.",
      },
      image: "/AtlanticSharpnose/Result_AtlanticSharpnose.jpg",
      skinChoiceImage: "/AtlanticSharpnose/SharkSkin_AtlanticSharpnose.jpg",
      size: "small",
      habitat: "open-water",
      waterTemperature: "warm",
      skinType: "atlantic-sharpnose",
    },
    "bonnethead": {
      id: "bonnethead",
      name: "Bonnethead Shark",
      description: {
        range: "The bonnethead shark is found in the Western Atlantic Ocean and Eastern Pacific Ocean.",
        size: "3-4.5ft; 15-20lbs",
        fact: "The bonnethead shark is the only shark that has been observed to be omnivorous, meaning they eat animals and plant material. They will readily feed on algae and seaweed.",
      },
      image: "/BonnetheadShark/Result_Bonnethead.jpg",
      skinChoiceImage: "/BonnetheadShark/SharkSkin_Bonnethead.jpg",
      size: "small",
      habitat: "open-water",
      waterTemperature: "warm",
      skinType: "bonnethead",
    },
    "school-shark": {
      id: "school-shark",
      name: "School Shark",
      description: {
        range: "The school shark is found in temperate waters throughout the world including the Northwest Atlantic Ocean, Mediterranean Sea, Southern Atlantic Ocean, Africa, and Australia.",
        size: "5-6.5ft; 45-55lbs",
        fact: "The school shark is ovoviviparous, meaning that its eggs are fertilized internally and develop within the female. When the embryo is ready the female gives birth to a fully developed shark ready to live on its own.",
      },
      image: "/SchoolShark/Result_SchoolShark.jpg", // Placeholder
      skinChoiceImage: "/SchoolShark/SharkSkin_SchoolShark.jpg",
      size: "small",
      habitat: "open-water",
      waterTemperature: "cold",
      skinType: "school-shark",
    },
    "dogfish-shark": {
      id: "dogfish-shark",
      name: "Dogfish Shark",
      description: {
        range: "",
        size: "",
        fact: "",
      },
      image: "/DogfishShark/Result_Dogfish.jpg", // Placeholder
      skinChoiceImage: "/DogfishShark/SharkSkin_Dogfish.jpg",
      size: "small",
      habitat: "open-water",
      waterTemperature: "cold",
      skinType: "dogfish-shark",
    },
  
    // Large Bottom Dwelling Sharks
    "nurse-shark": {
      id: "nurse-shark",
      name: "Nurse Shark",
      description: {
        range: "The nurse shark is found in coastal waters of the Eastern and Western Atlantic Ocean, as well as the Eastern Pacific Ocean.",
        size: "7-9ft; 160-230lbs",
        fact: "The nurse shark is able to create a powerful vacuum with its mouth, allowing it to capture unsuspecting prey from the sandy shallows it inhabits.",
      },
      image: "/NurseShark/Result_Nurse.jpg",
      skinChoiceImage: "/NurseShark/SharkSkin_Nurse.jpg",
      size: "large",
      habitat: "bottom-dwelling",
      waterTemperature: "warm",
      skinType: "nurse-shark",
    },
    "spotted-wobbegong": {
      id: "spotted-wobbegong",
      name: "Spotted Wobbegong",
      description: {
        range: "The spotted wobbegong is found along the Southern and Eastern coasts of Australia, the Eastern Indian Ocean, and the South China Sea.",
        size: "6-9ft; 90-150lbs",
        fact: "The spotted wobbegong is an ambush predator; it lies in wait relying on its unusual markings to camouflage it from unsuspecting prey.",
      },
      image: "/SpottedWobbegong/Result_SpottedWobbegong.jpg",
      skinChoiceImage: "/SpottedWobbegong/SharkSkin_SpottedWobbegong.jpg",
      size: "large",
      habitat: "bottom-dwelling",
      waterTemperature: "cold",
      skinType: "spotted-wobbegong",
    },
    "greenland-shark": {
      id: "greenland-shark",
      name: "Greenland Shark",
      description: {
        range: "The Greenland shark is found in the cold waters of the Northern Atlantic Ocean and the Arctic Ocean.",
        size: "8-20ft; 2200lbs",
        fact: "These sharks have the longest lifespan of any vertebrate animal on the planet. Scientists have estimated the Greenland shark can live as long as 500 years!",
      },
      image: "/GreenlandShark/Result_Greenland.jpg", // Placeholder
      skinChoiceImage: "/GreenlandShark/SharkSkin_Greenland.jpg",
      size: "large",
      habitat: "bottom-dwelling",
      waterTemperature: "cold",
      skinType: "greenland-shark",
    },
    "sixgill-shark": {
      id: "sixgill-shark",
      name: "Sixgill Shark",
      description: {
        range: "",
        size: "",
        fact: "",
      },
      image: "/SixgillShark/Result_Sixgill.jpg", // Placeholder
      skinChoiceImage: "/SixgillShark/SharkSkin_Sixgill.jpg",
      size: "large",
      habitat: "bottom-dwelling",
      waterTemperature: "cold",
      skinType: "sixgill-shark",
    },
  
    // Large Open Water Sharks
    "scalloped-hammerhead": {
      id: "scalloped-hammerhead",
      name: "Scalloped Hammerhead",
      description: {
        range: "The scalloped hammerhead shark is found throughout coastal waters along the equator worldwide.",
        size: "5-9ft; 60-90lbs",
        fact: "The scalloped hammerhead can form large schools when in search of food. These groups of sharks can be made up of several hundred individuals.",
      },
      image: "/ScallopedHammerhead/Result_ScallopedHammerhead.jpg",
      skinChoiceImage: "/ScallopedHammerhead/SharkSkin_ScallopedHammerhead.jpg",
      size: "large",
      habitat: "open-water",
      waterTemperature: "warm",
      skinType: "scalloped-hammerhead",
    },
    "whale-shark": {
      id: "whale-shark",
      name: "Whale Shark",
      description: {
        range: "The whale shark can be found worldwide in warm temperate and tropical seas.",
        size: "18-32ft on average, up to 60ft; 40,000-70,000lbs",
        fact: "Despite their huge size whale sharks feed primarily on plankton and small fish. A single whale shark can eat over 40lbs of plankton in a day.",
      },
      image: "/WhaleShark/Result_WhaleShark.jpg",
      skinChoiceImage: "/WhaleShark/SharkSkin_WhaleShark.jpg",
      size: "large",
      habitat: "open-water",
      waterTemperature: "warm",
      skinType: "whale-shark",
    },
    "porbeagle": {
      id: "porbeagle",
      name: "Porbeagle Shark",
      description: {
        range: "",
        size: "",
        fact: "",
      },
      image: "/PorbeagleShark/Result_Porbeagle.jpg",
      skinChoiceImage: "/PorbeagleShark/SharkSkin_Porbeagle.jpg",
      size: "large",
      habitat: "open-water",
      waterTemperature: "cold",
      skinType: "porbeagle",      
    },
    "salmon-shark": {
      id: "salmon-shark",
      name: "Salmon Shark",
      description: {
        range: "",
        size: "",
        fact: "",
      },
      image: "/SalmonShark/Result_Salmon.jpg",
      skinChoiceImage: "/SalmonShark/SharkSkin_Salmon.jpg",
      size: "large",
      habitat: "open-water",
      waterTemperature: "cold",
      skinType: "salmon-shark",
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
  