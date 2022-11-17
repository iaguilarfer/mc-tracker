import { MainScheme } from "./MainScheme";
import { Villain } from "./Villain";

export interface Scenario {
  villains: Array<Villain>;
  mainSchemeDeck: Array<MainScheme>;
  scenarioValue: string;
}
