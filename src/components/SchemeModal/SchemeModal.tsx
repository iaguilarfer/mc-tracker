import { useTranslation } from "react-i18next";
import { useModalContext } from "../../context/modalContext/ModalContext";
import { useScenarioContext } from "../../context/ScenarioContext/ScenarioContext";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import styles from "./SchemeModal.module.scss";
import { useVillainHealthContext } from "../../context/VillainHealthContext/VillainHealthContext";
import { schemeImages } from "../../assets/images/schemes";
import { useMainSchemeThreatContext } from "../../context/MainSchemeThreatContext/MainSchemeThreatContext";

interface SchemeModalProps {}

export const SchemeModal: React.FC<SchemeModalProps> = () => {
  const { t } = useTranslation();
  const { close } = useModalContext();
  const {
    selectedScenario,
    numberOfPlayers,
    advanceSchemeStage,
    currentMainScheme,
  } = useScenarioContext();

  const {
    increaseCurrentThreat,
    increaseMaxThreat,
    decreaseCurrentThreat,
    decreaseMaxThreat,
    increaseAccelerationTokens,
    decreaseAccelerationTokens,
    startVillainTurn,
    threat,
    currentThreat,
    maxThreat,
    accelerationTokens,
  } = useMainSchemeThreatContext();

  return (
    <Modal modalClassname={styles["scheme-modal"]} size={"large"}>
      <div>
        <div className={styles["scheme-image-container"]}>
          <img
            className={styles["scheme-image"]}
            src={
              selectedScenario && currentMainScheme
                ? schemeImages[selectedScenario.scenarioValue][
                    currentMainScheme.stage - 1
                  ]
                : ""
            }
            alt={t(
              `scenarios.${selectedScenario?.scenarioValue}.mainSchemeName`
            )}
          />
        </div>
        <div className={styles["scheme-button-container"]}>
          <div className={styles["current-max-threat"]}>
            Current Threat: {currentThreat}/ Max Threat: {maxThreat}
          </div>
          <div className={styles["current-acceleration-tokens"]}>
            Current Acceleration Tokens: {accelerationTokens}
          </div>
          <div className={styles["buttons-container"]}>
            <div className={styles["buttons"]}>
              <Button
                text={"Current +1"}
                onClick={() => increaseCurrentThreat()}
              />
              <Button
                text={"Current -1"}
                onClick={() => decreaseCurrentThreat()}
              />
            </div>
            <div className={styles["buttons"]}>
              <Button text={"Max +1"} onClick={() => increaseMaxThreat()} />
              <Button text={"Max -1"} onClick={() => decreaseMaxThreat()} />

              <Button
                text={"Camioncito"}
                onClick={() => increaseMaxThreat(4)}
              />
            </div>
            <div className={styles["buttons"]}>
              <Button
                text={"Current +1"}
                onClick={() => increaseAccelerationTokens()}
              />
              <Button
                text={"Current -1"}
                onClick={() => decreaseAccelerationTokens()}
              />
            </div>
          </div>
        </div>
      </div>

      <Button
        className={styles["scheme-button-close"]}
        text={"Close"}
        onClick={close}
      />
    </Modal>
  );
};
