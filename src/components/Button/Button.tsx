import React from "react";

interface ButtonProps {
  text: string;
  onClick: (value: number) => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <button disabled={disabled} onClick={() => onClick(5)}>
      {text}
    </button>
  );
};
