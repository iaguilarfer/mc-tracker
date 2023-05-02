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
          src={villainImages[imageKey][villainStage.stage - 1]}
          alt={t(`scenarios.${selectedScenario?.scenarioValue}.villainName`)}
        />
      </div>
      <div className={styles["villain-life-tracker-content"]}>
        <div
          className={styles["villain-life-tracker-current-health-container"]}
        >
          <div
            onClick={() => {
              decreaseCurrentHealth(villainIndex);
            }}
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
            onClick={() => increaseCurrentHealth(villainIndex)}
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
