import React from "react";

import Grid from "@styled/Grid";

import Modal from "@components/roadmap/Modal/Modal";
import H from "@components/shared/H";

import { TicketWrapper, TicketHeader, TicketContent } from "./styled";

interface TicketProps {
  title: string;
  ticketNumber: number;
}

const Ticket: React.FunctionComponent<TicketProps> = ({
  title,
  ticketNumber,
}) => {
  const openingModalComponent = (
    <TicketWrapper>
      <TicketHeader>
        <div>
          <H as="h3">{title}</H>
        </div>
      </TicketHeader>
      <TicketContent>
        <span>{ticketNumber}</span>
        <H as="h4">{title}</H>
      </TicketContent>
    </TicketWrapper>
  );

  return <Modal openComponent={openingModalComponent} />;
};

export default Ticket;
