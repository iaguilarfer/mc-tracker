import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import ScenariosJson from "../../assets/data/Scenarios.json";
import { Scenario } from "../../models/Scenario";
import { Villain } from "../../models/Villain";

interface ScenarioContextProps {
  scenarioValue: string | undefined;
  setScenarioValue: (scenarioValue: string) => void;
  numberOfPlayers: number | undefined;
  setNumberOfPlayers: (numberOfPlayers: number) => void;
  selectedScenario: Scenario | undefined;
  currentVillain: Villain | undefined;
  setCurrentVillain: (currentVillain: Villain) => void;
  advanceStage: () => void;
}

export const ScenarioContextDefaults: ScenarioContextProps = {
  scenarioValue: undefined,
  setScenarioValue: () => null,
  numberOfPlayers: undefined,
  setNumberOfPlayers: () => null,
  selectedScenario: undefined,
  currentVillain: undefined,
  setCurrentVillain: () => null,
  advanceStage: () => null,
};

const ScenarioContext = createContext(ScenarioContextDefaults);

export const useScenarioContext = (): ScenarioContextProps =>
  useContext(ScenarioContext);

export const ScenarioProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [scenarioValue, setScenarioValue] = useState<string>();
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>();
  const scenarios: Array<Scenario> = ScenariosJson.mCScenarios;
  const selectedScenario = scenarios.find(
    (scenario) => scenario.scenarioValue === scenarioValue
  );
  const [currentVillain, setCurrentVillain] = useState<Villain>();
  const [villainDeck, setVillainDeck] = useState<Array<Villain>>();
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);

  const advanceStage = () => {
    if (villainDeck) {
      setCurrentVillain(villainDeck[currentStageIndex + 1]);
      setCurrentStageIndex((prevState) => prevState + 1);
      console.log("hola");
    }
  };

  useEffect(() => {
    if (selectedScenario) {
      setVillainDeck(selectedScenario.villainDeck.slice(0, 2));
      setCurrentVillain(selectedScenario!.villainDeck[0]);
      setCurrentStageIndex(0);
    }
  }, [selectedScenario]);

  return (
    <ScenarioContext.Provider
      value={{
        scenarioValue,
        setScenarioValue,
        numberOfPlayers,
        setNumberOfPlayers,
        selectedScenario,
        currentVillain,
        setCurrentVillain,
        advanceStage,
      }}
    >
      {children}
    </ScenarioContext.Provider>
  );
};
