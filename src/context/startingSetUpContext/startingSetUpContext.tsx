import { createContext, PropsWithChildren, useContext, useState } from "react";
import ScenariosJson from "../../assets/data/Scenarios.json";
import { Scenario } from "../../models/Scenario";

interface StartingSetUpContextProps {
  scenarioValue: string | undefined;
  setScenarioValue: (scenarioValue: string) => void;
  numberOfPlayers: number | undefined;
  setNumberOfPlayers: (numberOfPlayers: number) => void;
  selectedScenario: Scenario | undefined;
}

export const StartingSetUpContextDefaults: StartingSetUpContextProps = {
  scenarioValue: undefined,
  setScenarioValue: () => null,
  numberOfPlayers: undefined,
  setNumberOfPlayers: () => null,
  selectedScenario: undefined,
};

const StartingSetUpContext = createContext(StartingSetUpContextDefaults);

export const useStartingSetUpContext = (): StartingSetUpContextProps =>
  useContext(StartingSetUpContext);

export const StartingSetUpProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [scenarioValue, setScenarioValue] = useState<string>();
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>();
  const scenarios: Array<Scenario> = ScenariosJson.mCScenarios;
  const selectedScenario = scenarios.find(
    (scenario) => scenario.scenarioValue === scenarioValue
  );

  return (
    <StartingSetUpContext.Provider
      value={{
        scenarioValue,
        setScenarioValue,
        numberOfPlayers,
        setNumberOfPlayers,
        selectedScenario,
      }}
    >
      {children}
    </StartingSetUpContext.Provider>
  );
};
