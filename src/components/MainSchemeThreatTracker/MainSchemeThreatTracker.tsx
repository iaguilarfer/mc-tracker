import React, { useState } from "react";
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

  return (
    <div className={styles["scheme-threat-tracker-container"]}>
      <div className="scheme-image-container"></div>
      <div className={styles["scheme-threat-tracker-content"]}>
        <div className={styles["scheme-threat-tracker-name-container"]}>
          <p className={styles["scheme-threat-tracker-name"]}>
            {mainScheme.schemeName}
          </p>
        </div>

        <div>
          <p className={styles["scheme-threat-tracker-currentthreat"]}>
            {currentThreat} / {maxThreat}
          </p>
        </div>
      </div>
      <div
        onClick={decreaseThreat}
        className={styles["scheme-threat-tracker-decreasethreat"]}
      >
        <div>-1</div>
      </div>
      <div
        onClick={increaseThreat}
        className={styles["scheme-threat-tracker-increasethreat"]}
      >
        <div>+1</div>
      </div>
    </div>
  );
};
