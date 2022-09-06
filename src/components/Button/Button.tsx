import React from "react";
import cs from "classnames";
import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled,
  className,
}) => {
  return (
    <button
      disabled={disabled}
      className={cs(styles["button"], className)}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
};
