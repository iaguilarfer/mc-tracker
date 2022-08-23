import React from "react";
import styles from "./App.module.scss";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ScenarioTrackerPage } from "../ScenarioTrackerPage/ScenarioTrackerPage";

function App() {
  return (
    <div className={styles["App"]}>
      <BrowserRouter>
        <Routes>
          <Route path="/scenario" element={<ScenarioTrackerPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
