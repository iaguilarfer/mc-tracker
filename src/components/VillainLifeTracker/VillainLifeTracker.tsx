import React, { useState, useEffect } from "react";
import { villainImages } from "../../assets/images/villains";
import { useScenarioContext } from "../../context/ScenarioContext/ScenarioContext";
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
  const { selectedScenario, numberOfPlayers, advanceStage } =
    useScenarioContext();

  const maxHealth = villain.maxHealthPerPlayer * (numberOfPlayers || 0);
  const [currentHealth, setCurrentHealth] = useState(maxHealth);

  useEffect(() => {
    setCurrentHealth(maxHealth);
  }, [villain, maxHealth]);

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
    if (currentHealth === 1) {
      advanceStage();
    }

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
          src={
            villainImages[selectedScenario!.scenarioValue][villain.stage - 1]
          }
          alt={t(`scenarios.${selectedScenario?.scenarioValue}.villainName`)}
        />
      </div>
      <div className={styles["villain-life-tracker-content"]}>
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
        <div>{`${t("villainTracker.maxHealth")}:${maxHealth}`}</div>
      </div>
    </div>
  );
};
