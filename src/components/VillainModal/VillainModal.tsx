import { useTranslation } from "react-i18next";
import { useModalContext } from "../../context/modalContext/ModalContext";
import { useScenarioContext } from "../../context/ScenarioContext/ScenarioContext";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import styles from "./VillainModal.module.scss";
import { villainImages } from "../../assets/images/villains";
import { useVillainHealthContext } from "../../context/VillainHealthContext/VillainHealthContext";
import classNames from "classnames";
import { useTemporaryValue } from "../../hooks/useTemporaryValue";

interface VillainModalProps {}

export const VillainModal: React.FC<VillainModalProps> = () => {
  const { t } = useTranslation();
  const { close } = useModalContext();
  const {
    activeVillainIndex,
    selectedScenario,
    getVillainStage,
    villainGroup,
    setActiveVillainIndex,
  } = useScenarioContext();
  const {
    increaseCurrentHealth,
    decreaseCurrentHealth,
    increaseMaxHealth,
    decreaseMaxHealth,
    getVillainHealth,
  } = useVillainHealthContext();

  const [temporaryVillainHealth, changeTemporaryVillainHealth] =
    useTemporaryValue();

  const { currentHealth, maxHealth } = getVillainHealth(activeVillainIndex);

  const villainImageContainerPositionClassName =
    villainGroup.length === 1
      ? "villain-image-container--single-villain"
      : "villain-image-container--multiple-villain";

  return (
    <Modal modalClassName={styles["villain-modal"]} size={"large"}>
      <div className={styles["villain-modal-container"]}>
        <div
          className={classNames(
            styles["villain-image-container"],
            styles[villainImageContainerPositionClassName]
          )}
        >
          {villainGroup.map((villain, index) => {
            const villainStage = getVillainStage(index);

            const imageKey = t(
              `scenarios.${selectedScenario?.scenarioValue}.villainImages`,
              { returnObjects: true }
            )[index];

            return (
              <>
                <img
                  className={classNames(styles["villain-image"], {
                    [styles["active-villain--not-selected"]]:
                      index !== activeVillainIndex,
                  })}
                  src={
                    selectedScenario
                      ? villainImages[imageKey][villainStage.stageIndex - 1]
                      : ""
                  }
                  alt={t(
                    `scenarios.${selectedScenario?.scenarioValue}.villainName`
                  )}
                  onClick={() => setActiveVillainIndex(index)}
                />
              </>
            );
          })}
        </div>
        <div className={styles["villain-button-container"]}>
          <div className={styles["buttons-container"]}>
            <div className={styles["temporary-villain-health-tracker"]}>
              {temporaryVillainHealth === 0 ? "" : temporaryVillainHealth}
            </div>
            <div className={styles["buttons"]}>
              <Button
                text={t("villainTracker.currentModifier", { modifier: "+1" })}
                onClick={() => {
                  increaseCurrentHealth(activeVillainIndex);
                  changeTemporaryVillainHealth(+1);
                }}
              />
              <Button
                text={t("villainTracker.currentModifier", { modifier: "-1" })}
                onClick={() => {
                  decreaseCurrentHealth(activeVillainIndex);
                  changeTemporaryVillainHealth(-1);
                }}
              />
            </div>
            <div className={styles["buttons"]}>
              <Button
                text={t("villainTracker.maxModifier", { modifier: "+1" })}
                onClick={() => increaseMaxHealth(activeVillainIndex)}
              />
              <Button
                text={t("villainTracker.maxModifier", { modifier: "-1" })}
                onClick={() => decreaseMaxHealth(activeVillainIndex)}
              />
            </div>
            <div className={styles["buttons"]}>
              <Button
                text={t("villainTracker.maxModifier", { modifier: "+10" })}
                onClick={() => increaseMaxHealth(activeVillainIndex, 10)}
              />
              <Button
                text={t("villainTracker.maxModifier", { modifier: "-10" })}
                onClick={() => decreaseMaxHealth(activeVillainIndex, 10)}
              />
            </div>
          </div>
          <div className={styles["current-max-health"]}>
            {t("villainTracker.currentHealth")}: {currentHealth} /{" "}
            {t("villainTracker.maxHealth")}:{maxHealth}
          </div>
        </div>
      </div>
      <Button
        className={styles["villain-button-close"]}
        text={t("villainTracker.closeButton")}
        onClick={close}
      />
    </Modal>
  );
};
