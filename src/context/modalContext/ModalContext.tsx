import React, { PropsWithChildren, ReactNode, useState } from "react";
import { ModalBackdrop } from "../../components/Modal/Modal";

export interface ModalContextProps {
  isOpen: boolean;
  open: (content: ReactNode) => void;
  close: () => void;
}

export const ModalContextDefaults: ModalContextProps = {
  isOpen: false,
  open: () => null,
  close: () => null,
};

export const ModalContext = React.createContext(ModalContextDefaults);

export const useModalContext = (): ModalContextProps =>
  React.useContext(ModalContext);

export const ModalProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>();

  const open = (someContent: ReactNode) => {
    setIsOpen(true);
    setContent(someContent);
  };

  const close = () => {
    setIsOpen(false);
    setContent(undefined);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        open,
        close,
      }}
    >
      {children}
      {isOpen && content && (
        <>
          {content}
          <ModalBackdrop />
        </>
      )}
    </ModalContext.Provider>
  );
};
