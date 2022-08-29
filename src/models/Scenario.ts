import { MainScheme } from "./MainScheme";
import { Villain } from "./Villain";

export interface Scenario{
    villain: Villain;
    mainScheme: MainScheme;
    scenarioValue: string;
    scenarioName: string
}