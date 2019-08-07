import React, { useEffect } from "react";
import { useModal } from "react-modal-hook";

import { sizes } from "@styled";

import Icon from "@components/shared/Icon";

import { StyledModal, CloseButton } from "./styled";

export interface ModalProps {
  openComponent: React.ReactNode;
  className?: string;
  show?: boolean;
  onRequestOpen?: () => void;
  onRequestClose?: () => void;
}

const Modal: React.FunctionComponent<ModalProps> = ({
  openComponent,
  className = "",
  onRequestOpen,
  onRequestClose,
  show = false,
  children,
}) => {
  const onOpen = () => {
    const element = document.querySelector(`html`);
    if (element) {
      element.style.overflowY = `hidden`;
    }

    onRequestOpen && onRequestOpen();
  };

  const onClose = () => {
    const element = document.querySelector(`html`);
    if (element) {
      element.style.overflowY = `auto`;
    }
    hideModal();
    onRequestClose && onRequestClose();
  };

  useEffect(() => {
    if (show) {
      showModal();
    }
  }, []);

  const contentStyle = {
    top: `inherit`,
    left: `inherit`,
    right: `inherit`,
    bottom: `inherit`,
    margin: `0 auto`,
    width:
      typeof window !== `undefined` && window.innerWidth > 900
        ? `900px`
        : `100vw`,
    minWidth: `320px`,
    maxWidth: `900px`,
    minHeight: `100%`,
    maxHeight: `100vh`,
    background: `none`,
    border: `none`,
    padding: `0`,
    overflow: `visible`,
    outline: `none`,
  };

  const overlayStyle = {
    position: `fixed`,
    top: 0,
    left: 0,
    right: 0,
    bottom: `unset`,
    minHeight: `100vh`,
    minWidth: `100%`,
    zIndex: 350,
    overflowY: `auto`,
    backgroundColor:
      typeof window !== `undefined` && window.innerWidth > sizes.phone
        ? `rgba(0, 0, 0, 0.48)`
        : `#fff`,
  };

  const [showModal, hideModal] = useModal(
    ({ in: open, onExited }: { in: boolean; onExited: boolean }) => (
      <>
        <StyledModal
          style={{
            content: contentStyle,
            overlay: overlayStyle,
          }}
          onAfterOpen={onOpen}
          className={className}
          isOpen={true}
          onRequestClose={() => {
            onClose();
          }}
        >
          {children}
          <CloseButton onClick={onClose}>
            <Icon iconName="times" iconPrefix="fas" />
          </CloseButton>
        </StyledModal>
      </>
    ),
  );

  return <div onClick={showModal}>{openComponent}</div>;
};

export default Modal;
