import React from "react";
import logo from "../../logo.svg";
import styles from "./App.module.css";
import { Button } from "../../components/Button/Button";
import { VillainLifeTracker } from "../../components/VillainLifeTracker/VillainLifeTracker";
import { Villain } from "../../models/Villain";

function App() {
  const rhino: Villain = {
    maxHealth: 18,
    villainName: "Rhino",
  }
  
  return (
    <div className={styles["App"]}>
      <VillainLifeTracker villain={rhino}/>
    </div>
  );
}

export default App;
