import React from "react";
import { villainImages } from "../../assets/images/villains";
import { useScenarioContext } from "../../context/ScenarioContext/ScenarioContext";
import { Villain } from "../../models/Villain";
import styles from "./VillainLifeTracker.module.scss";
import { useTranslation } from "react-i18next";
import { useModalContext } from "../../context/modalContext/ModalContext";
import { VillainModal } from "../VillainModal/VillainModal";
import { useVillainHealthContext } from "../../context/VillainHealthContext/VillainHealthContext";

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

  console.warn("VillainLifeTracker");
  console.warn(villainImages);
  console.warn(selectedScenario);
  console.warn(villainStage);

  return (
    <div className={styles["villain-life-tracker-container"]}>
      <div className={styles["villain-image-container"]}>
        <img
          onClick={() => open(<VillainModal />)}
          className={styles["villain-image"]}
          src={
            villainImages[selectedScenario!.scenarioValue][
              villainStage.stage - 1
            ]
          }
          alt={t(`scenarios.${selectedScenario?.scenarioValue}.villainName`)}
        />
      </div>
      <div className={styles["villain-life-tracker-content"]}>
        <div
          className={styles["villain-life-tracker-current-health-container"]}
        >
          <div
            onClick={() => {
              console.warn("onCLick");
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
