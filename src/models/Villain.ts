export enum OnDefeatOption {
  MoveToNextStage = "MoveToNextStage",
  MoveToNextStageIfAllDefeated = "MoveToNextStageIfAllDefeated",
  Resurrect = "Resurrect",
}

export interface Villain {
  villainDeck: Array<VillainStage>;
  villainValue: string;
}

export interface VillainStage {
  maxHealthPerPlayer: number;
  stage: number;
  onDefeat: OnDefeatOption;
}
