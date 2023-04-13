import React, { useEffect } from "react";
import { MainSchemeThreatTracker } from "../../components/MainSchemeThreatTracker/MainSchemeThreatTracker";
import { VillainLifeTracker } from "../../components/VillainLifeTracker/VillainLifeTracker";
import { useScenarioContext } from "../../context/ScenarioContext/ScenarioContext";
import styles from "./ScenarioTrackerPage.module.scss";
import { EndGameModal } from "../../components/EndGameModal/EndGameModal";
import { useModalContext } from "../../context/modalContext/ModalContext";
import { useTranslation } from "react-i18next";
import { useVillainHealthContext } from "../../context/VillainHealthContext/VillainHealthContext";
import { useMainSchemeThreatContext } from "../../context/MainSchemeThreatContext/MainSchemeThreatContext";

export const ScenarioTrackerPage: React.FC = () => {
  const {
    selectedScenario,
    getVillain,
    getMainScheme,
    setOnVictoryCallback,
    setOnDefeatCallback,
    activeVillainIndex,
    activeMainSchemeIndex,
  } = useScenarioContext();
  const { hasLoadedHealth } = useVillainHealthContext();
  const { hasLoadedThreat } = useMainSchemeThreatContext();
  const { open } = useModalContext();
  const { t } = useTranslation();
  const isReady =
    hasLoadedHealth && hasLoadedThreat && selectedScenario !== undefined;
  useEffect(() => {
    setOnVictoryCallback(
      () => () =>
        open(<EndGameModal endGameMessage={t("endGameModal.victoryMessage")} />)
    );
    setOnDefeatCallback(
      () => () =>
        open(<EndGameModal endGameMessage={t("endGameModal.defeatMessage")} />)
    );
  }, [open, setOnDefeatCallback, setOnVictoryCallback, t]);

  return (
    <div className={styles["scenario-tracker-page"]}>
      {isReady && (
        <div className={styles["scenario-tracker-page-container"]}>
          <VillainLifeTracker villainIndex={activeVillainIndex} />
          <MainSchemeThreatTracker mainSchemeIndex={activeMainSchemeIndex} />
        </div>
      )}
      {selectedScenario === undefined && <div>Scenario not found</div>}
      {!hasLoadedHealth && <div>Loading Health</div>}
      {!hasLoadedThreat && <div>Loading Threat</div>}
    </div>
  );
};
