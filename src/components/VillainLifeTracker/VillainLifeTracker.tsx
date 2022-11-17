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
  villain: Villain;
}

export const VillainLifeTracker: React.FC<VillainLifeTrackerProps> = ({
  villain,
}) => {
  const { t } = useTranslation();
  const { selectedScenario, numberOfPlayers, advanceVillainStage } =
    useScenarioContext();
  const { open } = useModalContext();
  const {
    decreaseCurrentHealth,
    increaseCurrentHealth,
    currentHealth,
    maxHealth,
  } = useVillainHealthContext();

  return (
    <div className={styles["villain-life-tracker-container"]}>
      <div className={styles["villain-image-container"]}>
        <img
          onClick={() => open(<VillainModal />)}
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
            onClick={() => decreaseCurrentHealth()}
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
            onClick={() => increaseCurrentHealth()}
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
