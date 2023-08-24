import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScenarioTrackerPage } from "../ScenarioTrackerPage/ScenarioTrackerPage";
import { ScenarioSelector } from "../ScenarioSelector/ScenarioSelector";
import { ScenarioProvider } from "../../context/ScenarioContext/ScenarioContext";
import "../../i18n";
import { ModalProvider } from "../../context/modalContext/ModalContext";
import { VillainHealthContextProvider } from "../../context/VillainHealthContext/VillainHealthContext";
import { MainSchemeThreatContextProvider } from "../../context/MainSchemeThreatContext/MainSchemeThreatContext";

function App() {
  return (
    <BrowserRouter>
      <ScenarioProvider>
        <VillainHealthContextProvider>
          <MainSchemeThreatContextProvider>
            <ModalProvider>
              <Routes>
                <Route path="/scenario" element={<ScenarioTrackerPage />} />
                <Route path="/" element={<ScenarioSelector />} />
              </Routes>
            </ModalProvider>
          </MainSchemeThreatContextProvider>
        </VillainHealthContextProvider>
      </ScenarioProvider>
    </BrowserRouter>
  );
}

export default App;
