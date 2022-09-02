import React from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useStartingSetUpContext } from "../../context/startingSetUpContext/startingSetUpContext";
import ScenariosJson from "../../assets/data/Scenarios.json";
import styles from "./ScenarioSelector.module.scss";

export const ScenarioSelector: React.FC = () => {
  const {
    setScenarioValue,
    setNumberOfPlayers,
    numberOfPlayers,
    scenarioValue,
  } = useStartingSetUpContext();

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
      isSearchable={false}
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
      isSearchable={false}
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
