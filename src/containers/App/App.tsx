import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScenarioTrackerPage } from "../ScenarioTrackerPage/ScenarioTrackerPage";
import { ScenarioSelector } from "../ScenarioSelector/ScenarioSelector";
import { StartingSetUpProvider } from "../../context/startingSetUpContext/startingSetUpContext";
import "../../i18n";
import { ModalProvider } from "../../context/modalContext/ModalContext";

function App() {
  return (
    <ModalProvider>
      <StartingSetUpProvider>
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/scenario" element={<ScenarioTrackerPage />} />
              <Route path="/" element={<ScenarioSelector />} />
            </Routes>
          </BrowserRouter>
        </div>
      </StartingSetUpProvider>
    </ModalProvider>
  );
}

export default App;
