import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useModalContext } from "../../context/modalContext/ModalContext";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import styles from "./MessageModal.module.scss";

export interface MessageModalProps {
  title: string;
  image?: string;
  content?: string;
  onContinue: () => void;
  onCancel: () => void;
}

export const MessageModal: React.FC<MessageModalProps> = ({
  onContinue,
  onCancel,
  title,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { close } = useModalContext();

  return (
    <Modal modalClassName={styles["message-modal"]} size={"large"}>
      <div className={styles["message-message"]}>{title}</div>
      <div className={styles["modal-buttons"]}>
        <Button
          text={t("messageModal.cancelButton")}
          onClick={() => {
            onCancel();
            close();
          }}
        />
        <Button
          text={t("messageModal.continueButton")}
          onClick={() => {
            onContinue();
            close();
          }}
        />
      </div>
    </Modal>
  );
};
