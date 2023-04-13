import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import ScenariosJson from "../../assets/data/Scenarios.json";
import { Scenario } from "../../models/Scenario";
import { Villain, VillainStage } from "../../models/Villain";
import { MainScheme, MainSchemeStage } from "../../models/MainScheme";

interface ScenarioContextProps {
  scenarioValue: string | undefined;
  setScenarioValue: (scenarioValue: string) => void;
  numberOfPlayers: number | undefined;
  setNumberOfPlayers: (numberOfPlayers: number) => void;
  selectedScenario: Scenario | undefined;
  moveToNextVillainStage: (villainIndex: number) => void;
  moveToNextSchemeStage: (schemeIndex: number) => void;
  cleanUp: () => void;
  hasGameStarted: boolean;
  setHasGameStarted: (hasGameStarted: boolean) => void;
  isStartingPoint: boolean;
  setOnVictoryCallback: (callback: () => void) => void;
  setOnDefeatCallback: (callback: () => void) => void;
  getVillain: (villainIndex: number) => Villain;
  getMainScheme: (schemeIndex: number) => MainScheme;
  activeVillainIndex: number;
  activeMainSchemeIndex: number;
  getVillainStage: (villainIndex: number) => VillainStage;
  getMainSchemeStage: (mainSchemeIndex: number) => MainSchemeStage;
}

export const ScenarioContextDefaults: ScenarioContextProps = {
  scenarioValue: undefined,
  setScenarioValue: () => null,
  numberOfPlayers: undefined,
  setNumberOfPlayers: () => null,
  selectedScenario: undefined,
  cleanUp: () => null,
  hasGameStarted: false,
  setHasGameStarted: () => null,
  isStartingPoint: false,
  setOnVictoryCallback: () => null,
  setOnDefeatCallback: () => null,
  moveToNextVillainStage: (villainIndex: number) => null,
  moveToNextSchemeStage: (schemeIndex: number) => null,
  getVillain: () => ({} as Villain),
  getMainScheme: () => ({} as MainScheme),
  activeVillainIndex: 0,
  activeMainSchemeIndex: 0,
  getVillainStage: (villainIndex: number) => ({} as VillainStage),
  getMainSchemeStage: (mainSchemeIndex: number) => ({} as MainSchemeStage),
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

  const [activeVillainIndex, setActiveVillainIndex] = useState(0);
  const [villainGroup, setVillainGroup] = useState<Array<Villain>>([]);
  const [villainStageIndexes, setVillainStageIndexes] = useState<Array<number>>(
    []
  );

  const [activeMainSchemeIndex, setActiveMainSchemeIndex] = useState(0);
  const [mainSchemeGroup, setMainSchemeGroup] = useState<Array<MainScheme>>([]);
  const [mainSchemeStageIndexes, setMainSchemeStageIndexes] = useState<
    Array<number>
  >([]);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const isStartingPoint = useMemo(
    () =>
      villainStageIndexes.every((a) => a === 0) &&
      mainSchemeStageIndexes.every((a) => a === 0) &&
      hasGameStarted,
    [villainStageIndexes, mainSchemeStageIndexes, hasGameStarted]
  );

  const [onVictoryCallback, setOnVictoryCallback] = useState<() => void>();
  const [onDefeatCallback, setOnDefeatCallback] = useState<() => void>();

  const cleanUp = useCallback(() => {
    setScenarioValue(undefined);
    setSelectedScenario(undefined);
    setNumberOfPlayers(undefined);
    setHasGameStarted(false);
    setActiveVillainIndex(0);
    setVillainGroup([]);
    setVillainStageIndexes([]);
    setActiveMainSchemeIndex(0);
    setMainSchemeGroup([]);
    setMainSchemeStageIndexes([]);
  }, []);

  const moveToNextVillainStage = (villainIndex: number) => {
    setVillainStageIndexes((prevState) => {
      const result = [...prevState];
      result[villainIndex]++;
      return result;
    });
  };

  const moveToNextSchemeStage = (schemeIndex: number) => {
    setMainSchemeStageIndexes((prevState) => {
      const result = [...prevState];
      result[schemeIndex]++;
      return result;
    });
  };

  useEffect(() => {
    const scenarios: Array<Scenario> =
      ScenariosJson.mCScenarios as Array<Scenario>;
    setSelectedScenario(
      scenarios.find((scenario) => scenario.scenarioValue === scenarioValue)
    );
  }, [scenarioValue]);

  useEffect(() => {
    console.warn("selectedScenario");
    if (selectedScenario) {
      setVillainGroup(
        selectedScenario.villains.map((villain) => {
          const result = { ...villain };
          result.villainDeck = result.villainDeck.slice(0, 2);
          return result;
        })
      );
      setVillainStageIndexes(Array(selectedScenario.villains.length).fill(0));
      console.warn("selectedScenarioInside");
      console.warn(selectedScenario);
      setMainSchemeGroup(selectedScenario.mainSchemes);
      setMainSchemeStageIndexes(
        Array(selectedScenario.mainSchemes.length).fill(0)
      );
    }
  }, [selectedScenario]);

  const getVillain = useCallback(
    (index: number) => {
      return villainGroup[index];
    },
    [villainGroup]
  );

  const getMainScheme = useCallback(
    (index: number) => {
      return mainSchemeGroup[index];
    },
    [mainSchemeGroup]
  );

  const getVillainStage = useCallback(
    (index: number) => {
      return villainGroup[index].villainDeck[villainStageIndexes[index]];
    },
    [villainGroup, villainStageIndexes]
  );

  const getMainSchemeStage = useCallback(
    (index: number) => {
      console.warn(mainSchemeGroup);
      return mainSchemeGroup[index].stages[mainSchemeStageIndexes[index]];
    },
    [mainSchemeGroup, mainSchemeStageIndexes]
  );

  return (
    <ScenarioContext.Provider
      value={{
        scenarioValue,
        setScenarioValue,
        numberOfPlayers,
        setNumberOfPlayers,
        selectedScenario,
        moveToNextVillainStage,
        moveToNextSchemeStage,
        cleanUp,
        hasGameStarted,
        setHasGameStarted,
        isStartingPoint,
        setOnVictoryCallback,
        setOnDefeatCallback,
        activeVillainIndex,
        activeMainSchemeIndex,
        getVillain,
        getMainScheme,
        getVillainStage,
        getMainSchemeStage,
      }}
    >
      {children}
    </ScenarioContext.Provider>
  );
};
