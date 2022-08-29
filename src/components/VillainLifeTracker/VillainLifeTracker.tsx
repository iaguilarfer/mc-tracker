import React, { useState } from "react";
import { useStartingSetUpContext } from "../../context/startingSetUpContext/startingSetUpContext";
import { Villain } from "../../models/Villain";
import styles from "./VillainLifeTracker.module.scss";
import { useTranslation } from "react-i18next";

interface VillainLifeTrackerProps {
  villain: Villain;
}

export const VillainLifeTracker: React.FC<VillainLifeTrackerProps> = ({
  villain,
}) => {
  const { t } = useTranslation();
  const { selectedScenario } = useStartingSetUpContext();
  const { numberOfPlayers } = useStartingSetUpContext();

  const maxHealth = villain.maxHealthPerPlayer * (numberOfPlayers || 0);
  const [currentHealth, setCurrentHealth] = useState(maxHealth);

  const increaseHealth = () => {
    setCurrentHealth((prevState) => {
      if (prevState < maxHealth) {
        return prevState + 1;
      } else {
        return maxHealth;
      }
    });
  };

  const decreaseHealth = () => {
    setCurrentHealth((prevState) => {
      if (prevState > 0) {
        return prevState - 1;
      } else {
        return 0;
      }
    });
  };

  return (
    <div className={styles["villain-life-tracker-container"]}>
      <div className={styles["villain-life-tracker-content"]}>
        <div className={styles["villain-life-tracker-name-container"]}>
          <p className={styles["villain-life-tracker-name"]}>
            {t(`scenarios.${selectedScenario?.scenarioValue}.villainName`)}
          </p>
        </div>
        <div className={styles["villain-life-tracker-maxhealth-container"]}>
          {`${t(`villainTracker.maxHealth`)}: ${maxHealth}`}
        </div>
        <div>
          <p className={styles["villain-life-tracker-currenthealth"]}>
            {currentHealth}
          </p>
        </div>
      </div>
      <div
        onClick={decreaseHealth}
        className={styles["villain-life-tracker-decreasehealth"]}
      >
        <div>-1</div>
      </div>
      <div
        onClick={increaseHealth}
        className={styles["villain-life-tracker-increasehealth"]}
      >
        <div>+1</div>
      </div>
    </div>
  );
};
