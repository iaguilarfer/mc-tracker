import React, { useState } from "react";
import { schemeImages } from "../../assets/images/schemes";
import { useStartingSetUpContext } from "../../context/startingSetUpContext/startingSetUpContext";
import { MainScheme } from "../../models/MainScheme";
import styles from "./MainSchemeThreatTracker.module.scss";

interface MainSchemeThreatTrackerProps {
  mainScheme: MainScheme;
}

export const MainSchemeThreatTracker: React.FC<
  MainSchemeThreatTrackerProps
> = ({ mainScheme }) => {
  const { numberOfPlayers } = useStartingSetUpContext();

  const maxThreat = mainScheme.maxThreatPerPlayer * (numberOfPlayers || 0);
  const [currentThreat, setCurrentThreat] = useState(
    mainScheme.startingThreatPerPlayer * (numberOfPlayers || 0)
  );

  const [acelerationTokens, setAcelerationTokens] = useState(0);

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

  const increaseAceleration = () => {
    setAcelerationTokens((prevState) => {
      return prevState + 1;
    });
  };

  const decreaseAceleration = () => {
    setAcelerationTokens((prevState) => {
      if (prevState > 0) {
        return prevState - 1;
      } else {
        return 0;
      }
    });
  };

  const villainSchemeThreat =
    mainScheme.threatPerTurnPerPlayer * (numberOfPlayers || 0) +
    acelerationTokens;

  return (
    <div className={styles["scheme-threat-tracker-container"]}>
      <div className={styles["scheme-image-container"]}>
        <img
          className={styles["scheme-image"]}
          src={schemeImages.rhino}
          alt={mainScheme.schemeName}
        ></img>
      </div>
      <div className={styles["scheme-threat-tracker-content"]}>
        {/* <div className={styles["scheme-threat-tracker-name-container"]}>
          <p className={styles["scheme-threat-tracker-name"]}>
            {mainScheme.schemeName}
          </p>
        </div> */}
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
          className={styles["scheme-threat-tracker-villainturn-supercontainer"]}
        >
          <div
            className={styles["scheme-threat-tracker-villainturn-container"]}
          >
            <div
              onClick={decreaseAceleration}
              className={styles["scheme-threat-tracker-decreaseaceleration"]}
            >
              <div className={styles["increase-decrease-buttons"]}>-1</div>
            </div>
            <div>
              <p className={styles["scheme-threat-tracker-currentaceleration"]}>
                {acelerationTokens}
                <span className={styles["acelerationToken"]}>a</span>
              </p>
            </div>

            <div
              onClick={increaseAceleration}
              className={styles["scheme-threat-tracker-increaseaceleration"]}
            >
              <div className={styles["increase-decrease-buttons"]}>+1</div>
            </div>
          </div>
          <div
            onClick={villainTurn}
            className={styles["scheme-threat-tracker-villainturn"]}
          >
            <div>Villain Turn {villainSchemeThreat}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
