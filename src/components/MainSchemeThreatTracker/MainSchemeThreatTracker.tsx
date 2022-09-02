import React, { useState } from "react";
import { schemeImages } from "../../assets/images/schemes";
import { useStartingSetUpContext } from "../../context/startingSetUpContext/startingSetUpContext";
import { MainScheme } from "../../models/MainScheme";
import styles from "./MainSchemeThreatTracker.module.scss";
import { useTranslation } from "react-i18next";

interface MainSchemeThreatTrackerProps {
  mainScheme: MainScheme;
}

export const MainSchemeThreatTracker: React.FC<
  MainSchemeThreatTrackerProps
> = ({ mainScheme }) => {
  const { t } = useTranslation();
  const { selectedScenario } = useStartingSetUpContext();
  const { numberOfPlayers } = useStartingSetUpContext();

  const maxThreat = mainScheme.maxThreatPerPlayer * (numberOfPlayers || 0);
  const [currentThreat, setCurrentThreat] = useState(
    mainScheme.startingThreatPerPlayer * (numberOfPlayers || 0)
  );

  const [accelerationTokens, setAccelerationTokens] = useState(0);

  const increaseThreat = () => {
    setCurrentThreat((prevState) => {
      if (prevState < maxThreat) {
        return prevState + 1;
      } else {
        return maxThreat;
      }
    });
  };

  const decreaseThreat = () => {
    setCurrentThreat((prevState) => {
      if (prevState > 0) {
        return prevState - 1;
      } else {
        return 0;
      }
    });
  };

  const villainTurn = () => {
    setCurrentThreat((prevState) => {
      if (prevState < maxThreat) {
        return prevState + villainSchemeThreat;
      } else {
        return maxThreat;
      }
    });
  };

  const increaseAcceleration = () => {
    setAccelerationTokens((prevState) => {
      return prevState + 1;
    });
  };

  const decreaseAcceleration = () => {
    setAccelerationTokens((prevState) => {
      if (prevState > 0) {
        return prevState - 1;
      } else {
        return 0;
      }
    });
  };

  const villainSchemeThreat =
    mainScheme.threatPerTurnPerPlayer * (numberOfPlayers || 0) +
    accelerationTokens;

  return (
    <div className={styles["scheme-threat-tracker-container"]}>
      <div className={styles["scheme-image-container"]}>
        <img
          className={styles["scheme-image"]}
          src={schemeImages.rhino}
          alt={t(`scenarios.${selectedScenario?.scenarioValue}.mainSchemeName`)}
        />
      </div>
      <div className={styles["scheme-threat-tracker-content"]}>
        <div
          className={styles["scheme-threat-tracker-current-threat-container"]}
        >
          <div
            onClick={decreaseThreat}
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
            onClick={increaseThreat}
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
              onClick={decreaseAcceleration}
              className={styles["scheme-threat-tracker-decreaseacceleration"]}
            >
              <div className={styles["increase-decrease-buttons"]}>-1</div>
            </div>
            <div>
              <p
                className={styles["scheme-threat-tracker-currentacceleration"]}
              >
                {accelerationTokens}
                <span className={styles["accelerationToken"]}>a</span>
              </p>
            </div>

            <div
              onClick={increaseAcceleration}
              className={styles["scheme-threat-tracker-increaseacceleration"]}
            >
              <div className={styles["increase-decrease-buttons"]}>+1</div>
            </div>
          </div>
          <div
            onClick={villainTurn}
            className={styles["scheme-threat-tracker-villainturn"]}
          >
            <div>{`${t(
              "threatTracker.villainTurn"
            )} ${villainSchemeThreat}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
