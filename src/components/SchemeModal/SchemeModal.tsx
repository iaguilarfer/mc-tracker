import { useTranslation } from "react-i18next";
import { useModalContext } from "../../context/modalContext/ModalContext";
import { useScenarioContext } from "../../context/ScenarioContext/ScenarioContext";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import styles from "./SchemeModal.module.scss";

import { schemeImages } from "../../assets/images/schemes";
import { useMainSchemeThreatContext } from "../../context/MainSchemeThreatContext/MainSchemeThreatContext";

interface SchemeModalProps {}

export const SchemeModal: React.FC<SchemeModalProps> = () => {
  const { t } = useTranslation();
  const { close } = useModalContext();
  const { selectedScenario, activeMainSchemeIndex, getMainSchemeStage } =
    useScenarioContext();

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

  const mainSchemeStage = getMainSchemeStage(activeMainSchemeIndex);

  const { currentThreat, maxThreat, threatPerTurn, accelerationTokens } =
    getThreat(activeMainSchemeIndex);
  const imageKey = t(
    `scenarios.${selectedScenario?.scenarioValue}.mainSchemeImages`,
    { returnObjects: true }
  )[activeMainSchemeIndex];
  return (
    <Modal modalClassname={styles["scheme-modal"]} size={"large"}>
      <div className={styles["scheme-modal-container"]}>
        <div className={styles["scheme-image-container"]}>
          <img
            className={styles["scheme-image"]}
            src={
              selectedScenario
                ? schemeImages[imageKey][mainSchemeStage.stage - 1]
                : ""
            }
            alt={t(
              `scenarios.${selectedScenario?.scenarioValue}.mainSchemeName`
            )}
          />
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
