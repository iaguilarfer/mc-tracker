import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import ScenariosJson from "../../assets/data/Scenarios.json";
import { Modal } from "../../components/Modal/Modal";
import { Scenario } from "../../models/Scenario";
import { Villain } from "../../models/Villain";
import { useModalContext } from "../modalContext/ModalContext";
import styles from "./ScenarioContext.module.scss";
import { Button } from "../../components/Button/Button";

interface ScenarioContextProps {
  scenarioValue: string | undefined;
  setScenarioValue: (scenarioValue: string) => void;
  numberOfPlayers: number | undefined;
  setNumberOfPlayers: (numberOfPlayers: number) => void;
  selectedScenario: Scenario | undefined;
  currentVillain: Villain | undefined;
  setCurrentVillain: (currentVillain: Villain) => void;
  advanceStage: () => void;
  VictoryMessage: () => void;
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
  VictoryMessage: () => null,
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

  const { open, close } = useModalContext();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const VictoryMessage = () => (
    <Modal modalClassname={styles["victory-modal"]} size={"large"}>
      <div className={styles["victory-message"]}>
        {t("victoryModal.victoryMessage")}
      </div>
      <div className={styles["modal-buttons"]}>
        <Button
          text={t("victoryModal.newGameButton")}
          onClick={() => {
            navigate("/");
            close();
          }}
        />

        <Button
          text={t("victoryModal.closeButton")}
          onClick={() => {
            close();
          }}
        />
      </div>
    </Modal>
  );

  const advanceStage = () => {
    if (villainDeck) {
      if (currentStageIndex === 0) {
        setCurrentVillain(villainDeck[currentStageIndex + 1]);
        setCurrentStageIndex((prevState) => prevState + 1);
      } else {
        open(<VictoryMessage />);
      }
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
        VictoryMessage,
      }}
    >
      {children}
    </ScenarioContext.Provider>
  );
};
