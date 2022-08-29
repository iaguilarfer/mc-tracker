import React from "react";
import styles from "./App.module.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScenarioTrackerPage } from "../ScenarioTrackerPage/ScenarioTrackerPage";
import { ScenarioSelector } from "../ScenarioSelector/ScenarioSelector";
import { StartingSetUpProvider } from "../../context/startingSetUpContext/startingSetUpContext";

function App() {
  return (
    <StartingSetUpProvider>
      <div className={styles["App"]}>
        <BrowserRouter>
          <Routes>
            <Route path="/scenario" element={<ScenarioTrackerPage />} />
            <Route path="/" element={<ScenarioSelector />} />
          </Routes>
        </BrowserRouter>
      </div>
    </StartingSetUpProvider>
  );
}

export default App;
