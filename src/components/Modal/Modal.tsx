import React, { PropsWithChildren } from "react";
import cx from "classnames";
import { useModalContext } from "../../context/modalContext/ModalContext";

import styles from "./Modal.module.scss";

interface ModalProps {
  size: "small" | "medium" | "large";
  containerClassName?: string;
  modalClassName?: string;
}

export const ModalBackdrop: React.FC = () => {
  const { close } = useModalContext();

  return <div onClick={() => close()} className={styles["modal-backdrop"]} />;
};

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  children,
  containerClassName,
  modalClassName,
  size,
}) => {
  return (
    <div
      className={cx(
        styles["modal-container"],
        styles[`modal-container-${size}`],
        containerClassName
      )}
    >
      <div className={modalClassName}>{children}</div>
    </div>
  );
};
