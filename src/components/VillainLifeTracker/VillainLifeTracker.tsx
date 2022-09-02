import React, { useState } from "react";
import { villainImages } from "../../assets/images/villains";
import { useStartingSetUpContext } from "../../context/startingSetUpContext/startingSetUpContext";
import { Villain } from "../../models/Villain";
import styles from "./VillainLifeTracker.module.scss";

interface VillainLifeTrackerProps {
  villain: Villain;
}

export const VillainLifeTracker: React.FC<VillainLifeTrackerProps> = ({
  villain,
}) => {
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
      <div className={styles["villain-image-container"]}>
        <img
          className={styles["villain-image"]}
          src={villainImages.rhino}
          alt={villain.villainName}
        ></img>
      </div>
      <div className={styles["villain-life-tracker-content"]}>
        {/* <div className={styles["villain-life-tracker-name-container"]}>
          <p className={styles["villain-life-tracker-name"]}>
            {villain.villainName}
          </p>
        </div> */}

        <div
          className={styles["villain-life-tracker-current-health-container"]}
        >
          <div
            onClick={decreaseHealth}
            className={styles["villain-life-tracker-decreasehealth"]}
          >
            <div className={styles["increase-decrease-buttons"]}>-1</div>
          </div>
          <div>
            <p className={styles["villain-life-tracker-currenthealth"]}>
              {currentHealth}
            </p>
          </div>
          <div
            onClick={increaseHealth}
            className={styles["villain-life-tracker-increasehealth"]}
          >
            <div className={styles["increase-decrease-buttons"]}>+1</div>
          </div>
        </div>
        <div className={styles["villain-life-tracker-maxhealth-container"]}>
          MaxHealth:{maxHealth}
        </div>
      </div>
    </div>
  );
};
