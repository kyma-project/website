import React from "react";

import ModalHeader from "@components/roadmap/Modal/Header";
import ModalContent from "@components/roadmap/Modal/Content";

import {
  StyledModal,
} from "./styled";

export interface ModalProps {
  openComponent: React.ReactNode;
}

const Modal: React.FunctionComponent<ModalProps> = ({
  openComponent,
  children,
}) => {
  const overlay: any = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.48)',
    zIndex: 305,
  }

  return (
    <StyledModal style={{ overlay }} openComponent={<div>lol</div>}>
      <ModalHeader
        capability="Micro-Frontends / Console / CLI"
        ticketNumber="69"
        title="Apply refactoring comments for event-service Apply refactoring comments for event-service"
        dueDate="December 13, 2019"
        githubLink="dupa"
        zenhubLink="dupa"
      >
        
      </ModalHeader>
      <ModalContent>
        {children}
      </ModalContent>
    </StyledModal>
  )
};

export default Modal;
