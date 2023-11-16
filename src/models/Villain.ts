export enum OnDefeatOption {
  MoveToNextStage = "MoveToNextStage",
  MoveToNextStageIfAllDefeated = "MoveToNextStageIfAllDefeated",
  Resurrect = "Resurrect",
}

export interface Villain {
  villainDeck: Array<VillainStage>;
  villainValue: string;
  villainStandardStages: Array<number>;
  villainExpertStages: Array<number>;
}

export interface VillainStage {
  maxHealthPerPlayer: number;
  stageIndex: number;
  onDefeat: OnDefeatOption;
  onDefeatTitle: string;
}
