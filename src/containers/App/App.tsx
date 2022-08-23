import React from "react";
import styles from "./App.module.scss";
import { VillainLifeTracker } from "../../components/VillainLifeTracker/VillainLifeTracker";
import { Villain } from "../../models/Villain";
import { MainSchemeThreatTracker } from "../../components/MainSchemeThreatTracker/MainSchemeThreatTracker";
import { MainScheme } from "../../models/MainScheme";

function App() {
  const rhino: Villain = {
    maxHealth: 18,
    villainName: "Rhino",
  };

  const theBreakIn: MainScheme = {
    maxThreat: 7,
    startingThreat: 0,
    schemeName: "The Break-In!",
  };

  // const klaw: Villain = {
  //   maxHealth: 16,
  //   villainName: "Klaw",
  // };

  return (
    <div className={styles["App"]}>
      <VillainLifeTracker villain={rhino} />
      <MainSchemeThreatTracker mainScheme={theBreakIn} />
    </div>
  );
}

export default App;
