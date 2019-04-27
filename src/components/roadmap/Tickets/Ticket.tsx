import React from "react";

import Grid from "@styled/Grid";

import Modal from "@components/roadmap/Modal/Modal";
import H from "@components/shared/H";

import { Ticket as TicketType } from "../types";

import { TicketWrapper, TicketHeader, TicketContent } from "./styled";

interface TicketProps {
  ticket: TicketType;
  capabilityDisplayName: string;
}

const Ticket: React.FunctionComponent<TicketProps> = ({
  ticket,
  capabilityDisplayName,
}) => {
  const openingModalComponent = (
    <TicketWrapper>
      <TicketHeader>
        <div>
          <H as="h3">{capabilityDisplayName}</H>
        </div>
      </TicketHeader>
      <TicketContent>
        <span>
          Ticket N<sup>o</sup> {ticket.number}
        </span>
        <H as="h4">{ticket.title}</H>
      </TicketContent>
    </TicketWrapper>
  );

  return (
    <Modal
      openComponent={openingModalComponent}
      ticket={ticket}
      capabilityDisplayName={capabilityDisplayName}
    />
  );
};

export default Ticket;
