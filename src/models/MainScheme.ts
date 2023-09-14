export enum onThreatGetToZeroOption {
  Nothing = "Nothing",
}

export enum onThreatGetToMaxOption {
  MoveToNextStage = "MoveToNextStage",
  Reset = "Reset",
}

export interface MainScheme {
  stages: Array<MainSchemeStage>;
}

export interface MainSchemeStage {
  maxThreatPerPlayer: number;
  startingThreatPerPlayer: number;
  threatPerTurnPerPlayer: number;
  stageIndex: number;
  onThreatGetToZero: onThreatGetToZeroOption;
  onThreatGetToMax: onThreatGetToMaxOption;
}
