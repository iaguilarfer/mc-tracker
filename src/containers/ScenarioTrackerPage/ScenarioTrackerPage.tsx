import React from "react";
import { MainSchemeThreatTracker } from "../../components/MainSchemeThreatTracker/MainSchemeThreatTracker";
import { VillainLifeTracker } from "../../components/VillainLifeTracker/VillainLifeTracker";
import { useScenarioContext } from "../../context/ScenarioContext/ScenarioContext";
import styles from "./ScenarioTrackerPage.module.scss";

export const ScenarioTrackerPage: React.FC = () => {
  const { selectedScenario, currentVillain, currentMainScheme } =
    useScenarioContext();

  return (
    <div className={styles["scenario-tracker-page"]}>
      {selectedScenario !== undefined &&
      currentVillain !== undefined &&
      currentMainScheme !== undefined ? (
        <div className={styles["scenario-tracker-page-container"]}>
          <VillainLifeTracker villain={currentVillain} />
          <MainSchemeThreatTracker mainScheme={currentMainScheme} />
        </div>
      ) : (
        <div>Scenario not found</div>
      )}
    </div>
  );
};
