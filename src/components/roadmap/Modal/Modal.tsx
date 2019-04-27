import React from "react";

import ModalHeader from "@components/roadmap/Modal/Header";
import ModalContent from "@components/roadmap/Modal/Content";

import { Ticket } from "../types";

import { StyledModal } from "./styled";

export interface ModalProps {
  openComponent: React.ReactNode;
  ticket: Ticket;
  capabilityDisplayName: string;
}

const Modal: React.FunctionComponent<ModalProps> = ({
  openComponent,
  ticket,
  capabilityDisplayName,
}) => (
  <StyledModal openComponent={openComponent}>
    <div>
      <ModalHeader {...ticket} capabilityDisplayName={capabilityDisplayName} />
      <ModalContent body={ticket.body} />
    </div>
  </StyledModal>
);

export default Modal;
