import React from "react";
import styles from "./ScenarioSelector.module.scss";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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

  const ScenarioList = () => (
    <Select options={scenarioOptions} placeholder="Select Scenario" />
  );
  const SelectNumberOfPlayers = () => (
    <Select options={numberPlayers} placeholder="Number of Players" />
  );

  return (
    <div className={styles["scenario-main-container"]}>
      <div className={styles["scenario-selector-container"]}>
        <div className={styles["scenario-selector"]}>
          <ScenarioList />
        </div>
        <div className={styles["player-selector"]}>
          <SelectNumberOfPlayers />
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
