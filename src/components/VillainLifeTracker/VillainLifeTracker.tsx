import React, { useState } from "react";
import { Villain } from "../../models/Villain";
import styles from "./VillainLifeTracker.module.scss";

interface VillainLifeTrackerProps {
  villain: Villain;
}

export const VillainLifeTracker: React.FC<VillainLifeTrackerProps> = ({
  villain,
}) => {
  const [currentHealth, setCurrentHealth] = useState(villain.maxHealth);

  const increaseHealth = () => {
    setCurrentHealth((prevState) => {
      if (prevState < villain.maxHealth) {
        return prevState + 1;
      } else {
        return villain.maxHealth;
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
            {villain.villainName}
          </p>
        </div>
        <div className={styles["villain-life-tracker-maxhealth-container"]}>
          MaxHealth:{villain.maxHealth}
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
