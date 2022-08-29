import React from "react";
import styles from "./ScenarioSelector.module.scss";
import { Link } from "react-router-dom";
import Select from "react-select";
import ScenariosJson from "./Scenarios.json";

export const ScenarioSelector: React.FC = () => {
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

  const ScenarioSelector = () => (
    <Select options={scenarioOptions} placeholder="Select Scenario" />
  );
  const NumberOfPlayersSelector = () => (
    <Select options={numberPlayers} placeholder="Number of Players" />
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
    </div>
  );
};
