import React from "react";
import styles from "./App.module.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScenarioTrackerPage } from "../ScenarioTrackerPage/ScenarioTrackerPage";
import { ScenarioSelector } from "../ScenarioSelector/ScenarioSelector";

function App() {
  return (
    <div className={styles["App"]}>
      <BrowserRouter>
        <Routes>
          <Route path="/scenario" element={<ScenarioTrackerPage />} />
          <Route path="/" element={<ScenarioSelector />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
