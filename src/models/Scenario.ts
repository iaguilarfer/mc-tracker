import { MainScheme } from "./MainScheme";
import { Villain } from "./Villain";

export interface Scenario {
  villainDeck: Array<Villain>;
  mainSchemeDeck: Array<MainScheme>;
  scenarioValue: string;
}
