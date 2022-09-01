import React, { PropsWithChildren } from "react";
import cx from "classnames";
import { useModalContext } from "../../context/modalContext/ModalContext";

import styles from "./Modal.module.scss";

interface ModalProps {
  size: "small" | "medium" | "large";
  containerClassname?: string;
  modalClassname?: string;
}

export const ModalBackdrop: React.FC = () => {
  const { close } = useModalContext();

  return <div onClick={() => close()} className={styles["modal-backdrop"]} />;
};

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  children,
  containerClassname,
  modalClassname,
  size,
}) => {
  return (
    <div
      className={cx(
        styles["modal-container"],
        styles[`modal-container-${size}`],
        containerClassname
      )}
    >
      <div className={modalClassname}>{children}</div>
    </div>
  );
};
