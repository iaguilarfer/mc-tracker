import React from "react";
import { useTranslation } from "react-i18next";
import { villainImages } from "../../assets/images/villains";
import { useScenarioContext } from "../../context/ScenarioContext/ScenarioContext";
import { useVillainHealthContext } from "../../context/VillainHealthContext/VillainHealthContext";
import { useModalContext } from "../../context/modalContext/ModalContext";
import { VillainModal } from "../VillainModal/VillainModal";
import styles from "./VillainLifeTracker.module.scss";

interface VillainLifeTrackerProps {
  villainIndex: number;
}

export const VillainLifeTracker: React.FC<VillainLifeTrackerProps> = ({
  villainIndex,
}) => {
  const { t } = useTranslation();
  const { selectedScenario, getVillainStage } = useScenarioContext();
  const { open } = useModalContext();
  const { decreaseCurrentHealth, increaseCurrentHealth, getVillainHealth } =
    useVillainHealthContext();

  const villainStage = getVillainStage(villainIndex);

  const { currentHealth, maxHealth } = getVillainHealth(villainIndex);
  const imageKey = t(
    `scenarios.${selectedScenario?.scenarioValue}.villainImages`,
    { returnObjects: true }
  )[villainIndex];
  return (
    <div className={styles["villain-life-tracker-container"]}>
      <div className={styles["villain-image-container"]}>
        <img
          onClick={() => open(<VillainModal />)}
          className={styles["villain-image"]}
          src={villainImages[imageKey][villainStage.stageIndex - 1]}
          alt={t(`scenarios.${selectedScenario?.scenarioValue}.villainName`)}
        />
      </div>
      <div className={styles["villain-life-tracker-content"]}>
        <div
          className={styles["villain-life-tracker-current-health-container"]}
        >
          <button
            onClick={() => {
              decreaseCurrentHealth(villainIndex);
            }}
            className={styles["villain-life-tracker-decreasehealth"]}
          >
            <span className={styles["character-inside-villain-health"]}>-</span>
            <span className={styles["character-inside-villain-health"]}>
              {currentHealth}
            </span>
          </button>
          <div className={styles["bar-inside-villain-health"]}>/</div>
          <button
            onClick={() => increaseCurrentHealth(villainIndex)}
            className={styles["villain-life-tracker-increasehealth"]}
          >
            <span className={styles["character-inside-villain-health"]}>
              {maxHealth}
            </span>
            <span className={styles["character-inside-villain-health"]}>+</span>
          </button>
        </div>
      </div>
    </div>
  );
};
