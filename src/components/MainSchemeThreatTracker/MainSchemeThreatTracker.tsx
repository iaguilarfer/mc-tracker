import React from "react";
import { schemeImages } from "../../assets/images/schemes";
import { useScenarioContext } from "../../context/ScenarioContext/ScenarioContext";
import styles from "./MainSchemeThreatTracker.module.scss";
import { useTranslation } from "react-i18next";
import { useMainSchemeThreatContext } from "../../context/MainSchemeThreatContext/MainSchemeThreatContext";
import { SchemeModal } from "../SchemeModal/SchemeModal";
import { useModalContext } from "../../context/modalContext/ModalContext";

interface MainSchemeThreatTrackerProps {
  mainSchemeIndex: number;
}

export const MainSchemeThreatTracker: React.FC<
  MainSchemeThreatTrackerProps
> = ({ mainSchemeIndex }) => {
  const { t } = useTranslation();
  const { selectedScenario, getMainSchemeStage } = useScenarioContext();
  const { open } = useModalContext();

  const {
    increaseCurrentThreat,
    decreaseCurrentThreat,
    increaseAccelerationTokens,
    decreaseAccelerationTokens,
    startVillainTurn,
    getThreat,
  } = useMainSchemeThreatContext();

  const mainSchemeStage = getMainSchemeStage(mainSchemeIndex);

  const { currentThreat, maxThreat, threatPerTurn, accelerationTokens } =
    getThreat(mainSchemeIndex);

  const imageKey = t(
    `scenarios.${selectedScenario?.scenarioValue}.mainSchemeImages`,
    { returnObjects: true }
  )[mainSchemeIndex];

  return (
    <div className={styles["scheme-threat-tracker-container"]}>
      <div className={styles["scheme-image-container"]}>
        <img
          onClick={() => open(<SchemeModal />)}
          className={styles["scheme-image"]}
          src={schemeImages[imageKey][mainSchemeStage.stageIndex - 1]}
          alt={t(`scenarios.${selectedScenario?.scenarioValue}.mainSchemeName`)}
        />
      </div>
      <div className={styles["scheme-threat-tracker-content"]}>
        <div
          className={styles["scheme-threat-tracker-current-threat-container"]}
        >
          <div
            onClick={() => decreaseCurrentThreat(mainSchemeIndex)}
            className={styles["scheme-threat-tracker-decreasethreat"]}
          >
            <div className={styles["increase-decrease-buttons"]}>-</div>
          </div>
          <div>
            <p className={styles["scheme-threat-tracker-currentthreat"]}>
              {currentThreat} / {maxThreat}
            </p>
          </div>

          <div
            onClick={() => increaseCurrentThreat(mainSchemeIndex)}
            className={styles["scheme-threat-tracker-increasethreat"]}
          >
            <div className={styles["increase-decrease-buttons"]}>+</div>
          </div>
        </div>

        <div
          onClick={() => startVillainTurn()}
          className={styles["scheme-threat-tracker-villainturn"]}
        >
          <div>{`${t("threatTracker.villainTurn")} ${threatPerTurn}`}</div>
        </div>
      </div>
    </div>
  );
};
