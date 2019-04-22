import React from "react";
import { useModal } from "react-modal-hook";

import Icon from "@components/shared/Icon";

import { StyledModal, CloseButton } from "./styled";

export interface ModalProps {
  openComponent: React.ReactNode;
  className?: string;
  style?: any;
}

const Modal: React.FunctionComponent<ModalProps> = ({
  openComponent,
  children,
  className = "",
  style,
}) => {
  const [showModal, hideModal] = useModal(() => (
    <>
      <StyledModal
        className={className}
        style={style}
        isOpen={true}
        onRequestClose={() => {
          hideModal();
        }}
      >
        {children}
      </StyledModal>
      <CloseButton onClick={hideModal}>
        <Icon iconName="times" iconPrefix="fas" />
      </CloseButton>
    </>
  ));

  return <div onClick={showModal}>{openComponent}</div>;
};

export default Modal;
