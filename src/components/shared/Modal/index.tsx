import React from "react";
import { useModal } from "react-modal-hook";

import Icon from "@components/shared/Icon";

import { StyledModal, CloseButton } from "./styled";

export interface ModalProps {
  openComponent: React.ReactNode;
  className?: string;
}

const Modal: React.FunctionComponent<ModalProps> = ({
  openComponent,
  children,
  className = "",
}) => {
  const [showModal, hideModal] = useModal(
    ({ in: open, onExited }: { in: boolean; onExited: boolean }) => (
      <>
        <StyledModal
          style={{
            content: {
              top: `inherit`,
              left: `inherit`,
              right: `inherit`,
              bottom: `inherit`,
              margin: `0 auto`,
              width: `900px`,
              minWidth: `680px`,
              maxWidth: `900px`,
              minHeight: `100%`,
              maxHeight: `100vh`,
              background: `none`,
              border: `none`,
              padding: `0`,
              overflow: `visible`,
              outline: `none`,
            },
            overlay: {
              position: `fixed`,
              top: 0,
              left: 0,
              right: 0,
              bottom: `unset`,
              minHeight: `100vh`,
              minWidth: `100%`,
              zIndex: 350,
              overflowY: `auto`,
              backgroundColor: `rgba(0, 0, 0, 0.48)`,
            },
          }}
          onAfterOpen={() => {
            (document as any).querySelector(`html`).style.overflowY = `hidden`;
          }}
          className={className}
          isOpen={true}
          onRequestClose={() => {
            (document as any).querySelector(`html`).style.overflowY = `auto`;
            hideModal();
          }}
        >
          {children}
          <CloseButton
            onClick={() => {
              (document as any).querySelector(`html`).style.overflowY = `auto`;
              hideModal();
            }}
          >
            <Icon iconName="times" iconPrefix="fas" />
          </CloseButton>
        </StyledModal>
      </>
    ),
  );

  return <div onClick={showModal}>{openComponent}</div>;
};

export default Modal;
