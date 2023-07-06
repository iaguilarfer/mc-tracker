import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useModalContext } from "../../context/modalContext/ModalContext";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import styles from "./EndGameModal.module.scss";

interface EndGameModalProps {
  endGameMessage: string;
}

export const EndGameModal: React.FC<EndGameModalProps> = ({
  endGameMessage,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { close } = useModalContext();

  return (
    <Modal modalClassName={styles["end-game-modal"]} size={"large"}>
      <div className={styles["end-game-message"]}>{endGameMessage}</div>
      <div className={styles["modal-buttons"]}>
        <Button
          text={t("endGameModal.newGameButton")}
          onClick={() => {
            navigate("/");
            close();
          }}
        />

        <Button
          text={t("endGameModal.closeButton")}
          onClick={() => {
            close();
          }}
        />
      </div>
    </Modal>
  );
};
