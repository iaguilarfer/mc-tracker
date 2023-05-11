export enum onThreatGetToZeroOption {
  Nothing = "Nothing",
}

export enum onThreatGetToMaxOption {
  MoveToNextStage = "MoveToNextStage",
}

export interface MainScheme {
  stages: Array<MainSchemeStage>;
}

export interface MainSchemeStage {
  maxThreatPerPlayer: number;
  startingThreatPerPlayer: number;
  threatPerTurnPerPlayer: number;
  stage: number;
  onThreatGetToZero: onThreatGetToZeroOption;
  onThreatGetToMax: onThreatGetToMaxOption;
}
