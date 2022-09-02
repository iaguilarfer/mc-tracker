import React from "react";
import { MainSchemeThreatTracker } from "../../components/MainSchemeThreatTracker/MainSchemeThreatTracker";
import { VillainLifeTracker } from "../../components/VillainLifeTracker/VillainLifeTracker";
import { useStartingSetUpContext } from "../../context/startingSetUpContext/startingSetUpContext";
import styles from "./ScenarioTrackerPage.module.scss";

export const ScenarioTrackerPage: React.FC = () => {
  const { selectedScenario } = useStartingSetUpContext();

  return (
    <div className={styles["scenario-tracker-page"]}>
      {selectedScenario !== undefined ? (
        <div className={styles["scenario-tracker-page-container"]}>
          <VillainLifeTracker villain={selectedScenario.villain} />
          <MainSchemeThreatTracker mainScheme={selectedScenario.mainScheme} />
        </div>
      ) : (
        <div>Scenario not found</div>
      )}
    </div>
  );
};
