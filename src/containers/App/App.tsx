import React from "react";
import styles from "./App.module.scss";
import { VillainLifeTracker } from "../../components/VillainLifeTracker/VillainLifeTracker";
import { Villain } from "../../models/Villain";

function App() {
  const rhino: Villain = {
    maxHealth: 18,
    villainName: "Rhino",
  };

  // const klaw: Villain = {
  //   maxHealth: 16,
  //   villainName: "Klaw",
  // };

  return (
    <div className={styles["App"]}>
      <VillainLifeTracker villain={rhino} />
    </div>
  );
}

export default App;
