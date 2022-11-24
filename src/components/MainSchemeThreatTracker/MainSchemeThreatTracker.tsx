import React, { useEffect, useState } from "react";
import { schemeImages } from "../../assets/images/schemes";
import { useScenarioContext } from "../../context/ScenarioContext/ScenarioContext";
import { MainScheme } from "../../models/MainScheme";
import styles from "./MainSchemeThreatTracker.module.scss";
import { useTranslation } from "react-i18next";
import { useMainSchemeThreatContext } from "../../context/MainSchemeThreatContext/MainSchemeThreatContext";
import { SchemeModal } from "../SchemeModal/SchemeModal";
import { useModalContext } from "../../context/modalContext/ModalContext";

interface MainSchemeThreatTrackerProps {
  mainScheme: MainScheme;
}

export const MainSchemeThreatTracker: React.FC<
  MainSchemeThreatTrackerProps
> = ({ mainScheme }) => {
  const { t } = useTranslation();
  const { selectedScenario } = useScenarioContext();
  const { open } = useModalContext();

  const {
    increaseCurrentThreat,
    increaseMaxThreat,
    decreaseCurrentThreat,
    decreaseMaxThreat,
    increaseAccelerationTokens,
    decreaseAccelerationTokens,
    startVillainTurn,
    threat,
    currentThreat,
    maxThreat,
  } = useMainSchemeThreatContext();

  return (
    <div className={styles["scheme-threat-tracker-container"]}>
      <div className={styles["scheme-image-container"]}>
        <img
          onClick={() => open(<SchemeModal />)}
          className={styles["scheme-image"]}
          src={
            schemeImages[selectedScenario!.scenarioValue][mainScheme.stage - 1]
          }
          alt={t(`scenarios.${selectedScenario?.scenarioValue}.mainSchemeName`)}
        />
      </div>
      <div className={styles["scheme-threat-tracker-content"]}>
        <div
          className={styles["scheme-threat-tracker-current-threat-container"]}
        >
          <div
            onClick={() => decreaseCurrentThreat()}
            className={styles["scheme-threat-tracker-decreasethreat"]}
          >
            <div className={styles["increase-decrease-buttons"]}>-1</div>
          </div>
          <div>
            <p className={styles["scheme-threat-tracker-currentthreat"]}>
              {currentThreat} / {maxThreat}
            </p>
          </div>

          <div
            onClick={() => increaseCurrentThreat()}
            className={styles["scheme-threat-tracker-increasethreat"]}
          >
            <div className={styles["increase-decrease-buttons"]}>+1</div>
          </div>
        </div>

        {/* aqui empieza el turno del villano */}
        <div
          className={
            styles["scheme-threat-tracker-secondary-buttons-container"]
          }
        >
          <div className={styles["scheme-threat-tracker-acceleration"]}>
            <div
              onClick={() => decreaseAccelerationTokens()}
              className={styles["scheme-threat-tracker-decreaseacceleration"]}
            >
              <div className={styles["increase-decrease-buttons"]}>-1</div>
            </div>
            <div>
              <p
                className={styles["scheme-threat-tracker-currentacceleration"]}
              >
                {threat.accelerationTokens}
                <span className={styles["accelerationToken"]}>a</span>
              </p>
            </div>

            <div
              onClick={() => increaseAccelerationTokens()}
              className={styles["scheme-threat-tracker-increaseacceleration"]}
            >
              <div className={styles["increase-decrease-buttons"]}>+1</div>
            </div>
          </div>
          <div
            onClick={() => startVillainTurn()}
            className={styles["scheme-threat-tracker-villainturn"]}
          >
            <div>{`${t("threatTracker.villainTurn")} ${
              threat.threatPerTurn
            }`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
