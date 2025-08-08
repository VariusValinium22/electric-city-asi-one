type Option = {
  text: string;
  nextId: string;
  image?: string;
  cardHeader?: string;
  leftIcon?: string;
  rightIcons?: string[];
  headerSize?: string;
  iconSizes?: {
    left?: string;
    right?: string[];
  };
};

export type Choice = {
  id: string;
  title: string;
  description: string;
  optionA: Option;
  optionB: Option;
  type: "choice";
  leftIcon?: string;
  rightIcons?: string[];
};

export type Outcome = {
  id: string;
  title: string;
  description:
    | string
    | {
        range: string;
        size: string;
        fact: string;
      };
  image?: string;
  nextId?: string;
  isFinal?: boolean;
  type: "outcome";
};

export type GameNode = Choice | Outcome;

export enum GameStage {
  START = "start",
  CHOICE = "choice",
  OUTCOME = "outcome",
  FINAL = "final",
}

export interface GameConfig {
  startNodeId: string;
  nodes: Record<string, GameNode>;
  onComplete?: (playerChoices: Record<string, string>) => void;
}

export interface GameState {
  currentNodeId: string;
  gameStage: GameStage;
  playerChoices: Record<string, string>;
}
