import React from "react";
import { MainSchemeThreatTracker } from "../../components/MainSchemeThreatTracker/MainSchemeThreatTracker";
import { VillainLifeTracker } from "../../components/VillainLifeTracker/VillainLifeTracker";
import { Scenario } from "../../models/Scenario";
import styles from "./ScenarioTrackerPage.module.scss";

export const ScenarioTrackerPage: React.FC = () => {
  const rhino: Scenario = {
    villain: {
      maxHealth: 18,
      villainName: "Rhino",
    },
    mainScheme: {
      maxThreat: 7,
      startingThreat: 0,
      schemeName: "The Break-In!",
    },
  };

  return (
    <div className={styles["scenario-tracker-page"]}>
      <VillainLifeTracker villain={rhino.villain} />
      <MainSchemeThreatTracker mainScheme={rhino.mainScheme} />
    </div>
  );
};
