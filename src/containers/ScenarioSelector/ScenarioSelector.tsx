import React from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useStartingSetUpContext } from "../../context/startingSetUpContext/startingSetUpContext";
import ScenariosJson from "../../assets/data/Scenarios.json";
import styles from "./ScenarioSelector.module.scss";
import { useModalContext } from "../../context/modalContext/ModalContext";
import { Modal } from "../../components/Modal/Modal";

export const ScenarioSelector: React.FC = () => {
  const {
    setScenarioValue,
    setNumberOfPlayers,
    numberOfPlayers,
    scenarioValue,
  } = useStartingSetUpContext();

  const { open, close } = useModalContext();

  const scenarioOptions = ScenariosJson.mCScenarios.map((scenario) => ({
    value: scenario.scenarioValue,
    label: scenario.scenarioName,
  }));

  const numberPlayers = [
    { value: "1", label: "Solo Game" },
    { value: "2", label: "Two Players" },
    { value: "3", label: "Three Players" },
    { value: "4", label: "Four Players" },
  ];

  const selectedScenarioOption = scenarioOptions.find(
    (option) => option.value === scenarioValue
  );

  const selectedNumberOfPlayers = numberPlayers.find(
    (option) => +option.value === numberOfPlayers
  );

  const ScenarioSelector = () => (
    <Select
      value={selectedScenarioOption}
      options={scenarioOptions}
      placeholder="Select Scenario"
      onChange={(option) => {
        if (option !== null) {
          setScenarioValue(option.value);
        }
      }}
    />
  );
  const NumberOfPlayersSelector = () => (
    <Select
      value={selectedNumberOfPlayers}
      options={numberPlayers}
      placeholder="Number of Players"
      onChange={(option) => {
        if (option !== null) {
          setNumberOfPlayers(+option.value);
        }
      }}
    />
  );

  const TestModal = () => (
    <Modal size={"large"}>
      This is a modal
      <button onClick={() => close()}>Close</button>
    </Modal>
  );

  return (
    <div className={styles["scenario-main-container"]}>
      <div className={styles["scenario-selector-container"]}>
        <div className={styles["scenario-selector"]}>
          <ScenarioSelector />
        </div>
        <div className={styles["player-selector"]}>
          <NumberOfPlayersSelector />
        </div>
      </div>

      <div className={styles["scenario-button-container"]}>
        <Link className={styles["scenario-button-link"]} to={"/scenario"}>
          Start Game
        </Link>
      </div>
      <button onClick={() => open(TestModal)}>Open test modal</button>
    </div>
  );
};
