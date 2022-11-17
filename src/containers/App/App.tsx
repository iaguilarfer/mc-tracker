import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScenarioTrackerPage } from "../ScenarioTrackerPage/ScenarioTrackerPage";
import { ScenarioSelector } from "../ScenarioSelector/ScenarioSelector";
import { ScenarioProvider } from "../../context/ScenarioContext/ScenarioContext";
import "../../i18n";
import { ModalProvider } from "../../context/modalContext/ModalContext";
import { VillainHealthContextProvider } from "../../context/VillainHealthContext/VillainHealthContext";

function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <ScenarioProvider>
          <VillainHealthContextProvider>
            <ModalProvider>
              <div>
                <Routes>
                  <Route path="/scenario" element={<ScenarioTrackerPage />} />
                  <Route path="/" element={<ScenarioSelector />} />
                </Routes>
              </div>
            </ModalProvider>
          </VillainHealthContextProvider>
        </ScenarioProvider>
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
