import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import ScenariosJson from "../../assets/data/Scenarios.json";
import { EndGameModal } from "../../components/EndGameModal/EndGameModal";
import { Scenario } from "../../models/Scenario";
import { Villain } from "../../models/Villain";
import { useModalContext } from "../modalContext/ModalContext";
import { useTranslation } from "react-i18next";
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
  advanceSchemeStage: () => void;
  currentMainScheme: MainScheme | undefined;
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
  advanceSchemeStage: () => null,
  currentMainScheme: undefined,
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
  const [currentMainScheme, setCurrentMainScheme] = useState<MainScheme>();
  const [villainDeck, setVillainDeck] = useState<Array<Villain>>();
  const [currentVillainStage, setCurrentVillainStage] = useState<number>(0);
  const [currentMainSchemeStage, setCurrentMainSchemeStage] =
    useState<number>(0);

  const { open } = useModalContext();
  const { t } = useTranslation();

  const advanceVillainStage = () => {
    if (villainDeck) {
      if (currentVillainStage === 0) {
        setCurrentVillain(villainDeck[currentVillainStage + 1]);
        setCurrentVillainStage((prevState) => prevState + 1);
      } else {
        open(
          <EndGameModal endGameMessage={t("endGameModal.victoryMessage")} />
        );
      }
    }
  };

  const advanceSchemeStage = useCallback(() => {
    if (selectedScenario) {
      if (
        currentMainSchemeStage ===
        selectedScenario.mainSchemeDeck.length - 1
      ) {
        open(<EndGameModal endGameMessage={t("endGameModal.defeatMessage")} />);
      } else {
        setCurrentMainScheme(
          selectedScenario.mainSchemeDeck[currentMainSchemeStage + 1]
        );
        setCurrentMainSchemeStage((prevState) => prevState + 1);
      }
    }
  }, [currentMainSchemeStage, selectedScenario, open]);

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
        advanceSchemeStage,
        currentMainScheme,
      }}
    >
      {children}
    </ScenarioContext.Provider>
  );
};
