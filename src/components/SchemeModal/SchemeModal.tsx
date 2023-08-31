import { useTranslation } from "react-i18next";
import { useModalContext } from "../../context/modalContext/ModalContext";
import { useScenarioContext } from "../../context/ScenarioContext/ScenarioContext";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import styles from "./SchemeModal.module.scss";

import { schemeImages } from "../../assets/images/schemes";
import { useMainSchemeThreatContext } from "../../context/MainSchemeThreatContext/MainSchemeThreatContext";
import classNames from "classnames";

interface SchemeModalProps {}

export const SchemeModal: React.FC<SchemeModalProps> = () => {
  const { t } = useTranslation();
  const { close } = useModalContext();
  const {
    selectedScenario,
    activeMainSchemeIndex,
    getMainSchemeStage,
    mainSchemeGroup,
    setActiveMainSchemeIndex,
  } = useScenarioContext();

  const {
    increaseCurrentThreat,
    increaseMaxThreat,
    decreaseCurrentThreat,
    decreaseMaxThreat,
    increaseAccelerationTokens,
    decreaseAccelerationTokens,
    startVillainTurn,
    getThreat,
  } = useMainSchemeThreatContext();

  const { currentThreat, maxThreat, threatPerTurn, accelerationTokens } =
    getThreat(activeMainSchemeIndex);

  const mainSchemeImageContainerPositionClassName =
    mainSchemeGroup.length === 1
      ? "main-scheme-image-container--single-scheme"
      : "main-scheme-image-container--multiple-scheme";

  return (
    <Modal modalClassName={styles["scheme-modal"]} size={"large"}>
      <div className={styles["scheme-modal-container"]}>
        <div
          className={classNames(
            styles["scheme-image-container"],
            styles[mainSchemeImageContainerPositionClassName]
          )}
        >
          {mainSchemeGroup.map((mainScheme, index) => {
            const mainSchemeStage = getMainSchemeStage(index);

            const imageKey = t(
              `scenarios.${selectedScenario?.scenarioValue}.mainSchemeImages`,
              { returnObjects: true }
            )[index];

            return (
              <>
                <img
                  className={classNames(styles["scheme-image"], {
                    [styles["active-scheme--not-selected"]]:
                      index !== activeMainSchemeIndex,
                  })}
                  src={
                    selectedScenario
                      ? schemeImages[imageKey][mainSchemeStage.stageIndex - 1]
                      : ""
                  }
                  alt={t(
                    `scenarios.${selectedScenario?.scenarioValue}.mainSchemeName`
                  )}
                  onClick={() => setActiveMainSchemeIndex(index)}
                />
              </>
            );
          })}
        </div>
        <div className={styles["scheme-button-container"]}>
          <div className={styles["current-max-threat"]}>
            {t("threatTracker.currentThreat")}: {currentThreat}/{" "}
            {t("threatTracker.maxThreat")}: {maxThreat}
          </div>
          <div className={styles["current-acceleration-tokens"]}>
            {t("threatTracker.currentAccelerationTokens")}: {accelerationTokens}
          </div>
          <div className={styles["buttons-container"]}>
            <div className={styles["buttons"]}>
              <Button
                text={t("threatTracker.currentModifier", { modifier: "+1" })}
                onClick={() => increaseCurrentThreat(activeMainSchemeIndex)}
              />
              <Button
                text={t("threatTracker.currentModifier", { modifier: "-1" })}
                onClick={() => decreaseCurrentThreat(activeMainSchemeIndex)}
              />
            </div>
            <div className={styles["buttons"]}>
              <Button
                text={t("threatTracker.maxModifier", { modifier: "+1" })}
                onClick={() => increaseMaxThreat(activeMainSchemeIndex)}
              />
              <Button
                text={t("threatTracker.maxModifier", { modifier: "-1" })}
                onClick={() => decreaseMaxThreat(activeMainSchemeIndex)}
              />

              <Button
                text={t("threatTracker.camioncito")}
                onClick={() => increaseMaxThreat(activeMainSchemeIndex, 4)}
              />
            </div>
            <div className={styles["buttons"]}>
              <Button
                text={t("threatTracker.accelerationModifier", {
                  modifier: "+1",
                })}
                onClick={() =>
                  increaseAccelerationTokens(activeMainSchemeIndex)
                }
              />
              <Button
                text={t("threatTracker.accelerationModifier", {
                  modifier: "-1",
                })}
                onClick={() =>
                  decreaseAccelerationTokens(activeMainSchemeIndex)
                }
              />
              <Button
                text={`${t("threatTracker.villainTurn")} ${threatPerTurn}`}
                onClick={() => startVillainTurn()}
              />
            </div>
          </div>
        </div>
      </div>

      <Button
        className={styles["scheme-button-close"]}
        text={t("threatTracker.closeButton")}
        onClick={close}
      />
    </Modal>
  );
};
