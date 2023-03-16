import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import ScenariosJson from "../../assets/data/Scenarios.json";
import { Scenario } from "../../models/Scenario";
import { Villain } from "../../models/Villain";
import { MainScheme } from "../../models/MainScheme";

interface ScenarioContextProps {
  scenarioValue: string | undefined;
  setScenarioValue: (scenarioValue: string) => void;
  numberOfPlayers: number | undefined;
  setNumberOfPlayers: (numberOfPlayers: number) => void;
  selectedScenario: Scenario | undefined;
  currentVillain: Villain | undefined;
  setCurrentVillain: (currentVillain: Villain) => void;
  advanceVillainStage: () => void;
  isThisLastStage: () => boolean;
  advanceSchemeStage: () => void;
  currentMainScheme: MainScheme | undefined;
  cleanUp: () => void;
  hasGameStarted: boolean;
  setHasGameStarted: (hasGameStarted: boolean) => void;
  isStartingPoint: boolean;
  setOnVictoryCallback: (callback: () => void) => void;
  setOnDefeatCallback: (callback: () => void) => void;
}

export const ScenarioContextDefaults: ScenarioContextProps = {
  scenarioValue: undefined,
  setScenarioValue: () => null,
  numberOfPlayers: undefined,
  setNumberOfPlayers: () => null,
  selectedScenario: undefined,
  currentVillain: undefined,
  setCurrentVillain: () => null,
  advanceVillainStage: () => null,
  isThisLastStage: () => false,
  advanceSchemeStage: () => null,
  currentMainScheme: undefined,
  cleanUp: () => null,
  hasGameStarted: false,
  setHasGameStarted: () => null,
  isStartingPoint: false,
  setOnVictoryCallback: () => null,
  setOnDefeatCallback: () => null,
};

const ScenarioContext = createContext(ScenarioContextDefaults);

export const useScenarioContext = (): ScenarioContextProps =>
  useContext(ScenarioContext);

export const ScenarioProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [scenarioValue, setScenarioValue] = useState<string>();
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>();

  const [selectedScenario, setSelectedScenario] = useState<Scenario>();

  const [currentVillain, setCurrentVillain] = useState<Villain>();
  const [currentMainScheme, setCurrentMainScheme] = useState<MainScheme>();
  const [villainDeck, setVillainDeck] = useState<Array<Villain>>();
  const [currentVillainStage, setCurrentVillainStage] = useState<number>(0);
  const [currentMainSchemeStage, setCurrentMainSchemeStage] =
    useState<number>(0);

  const isStartingPoint =
    currentMainSchemeStage === 0 && currentVillainStage === 0;

  const [onVictoryCallback, setOnVictoryCallback] = useState<() => void>();
  const [onDefeatCallback, setOnDefeatCallback] = useState<() => void>();

  const cleanUp = useCallback(() => {
    setScenarioValue(undefined);
    setSelectedScenario(undefined);
    setVillainDeck(undefined);
    setCurrentVillain(undefined);
    setCurrentVillainStage(0);
    setCurrentMainScheme(undefined);
    setNumberOfPlayers(undefined);
    setCurrentMainSchemeStage(0);
    setHasGameStarted(false);
  }, []);

  const advanceVillainStage = () => {
    if (villainDeck) {
      if (currentVillainStage === 0) {
        setCurrentVillain(villainDeck[currentVillainStage + 1]);
        setCurrentVillainStage((prevState) => prevState + 1);
      } else {
        if (onVictoryCallback) {
          onVictoryCallback();
        }
      }
    }
  };

  const [hasGameStarted, setHasGameStarted] = useState(false);

  const isThisLastStage = useCallback(() => {
    if (selectedScenario) {
      return (
        currentMainSchemeStage === selectedScenario.mainSchemeDeck.length - 1
      );
    } else {
      return false;
    }
  }, [currentMainSchemeStage, selectedScenario]);

  const advanceSchemeStage = useCallback(() => {
    if (selectedScenario) {
      if (isThisLastStage()) {
        if (onDefeatCallback) {
          onDefeatCallback();
        }
      } else {
        setCurrentMainScheme(
          selectedScenario.mainSchemeDeck[currentMainSchemeStage + 1]
        );
        setCurrentMainSchemeStage((prevState) => prevState + 1);
      }
    }
  }, [
    currentMainSchemeStage,
    selectedScenario,

    isThisLastStage,
    onDefeatCallback,
  ]);

  useEffect(() => {
    const scenarios: Array<Scenario> = ScenariosJson.mCScenarios;
    setSelectedScenario(
      scenarios.find((scenario) => scenario.scenarioValue === scenarioValue)
    );
  }, [scenarioValue]);

  useEffect(() => {
    if (selectedScenario) {
      setVillainDeck(selectedScenario.villainDeck.slice(0, 2));
      setCurrentVillain(selectedScenario!.villainDeck[0]);
      setCurrentVillainStage(0);
      setCurrentMainScheme(selectedScenario.mainSchemeDeck[0]);
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
        advanceVillainStage,
        isThisLastStage,
        advanceSchemeStage,
        currentMainScheme,
        cleanUp,
        hasGameStarted,
        setHasGameStarted,
        isStartingPoint,
        setOnVictoryCallback,
        setOnDefeatCallback,
      }}
    >
      {children}
    </ScenarioContext.Provider>
  );
};
