import { MainScheme } from "./MainScheme";
import { Villain } from "./Villain";

export interface Scenario {
  villains: Array<Villain>;
  mainSchemes: Array<MainScheme>;
  scenarioValue: string;
}
