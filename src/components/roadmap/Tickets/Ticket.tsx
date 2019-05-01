import React, { useContext } from "react";

import Grid from "@styled/Grid";

import Link from "@components/shared/Link";
import H from "@components/shared/H";

import TicketNumber from "@components/roadmap/TicketNumber";

import TicketsService from "@components/roadmap/Tickets/service";

import { Ticket as TicketType } from "../types";

import { TicketWrapper, TicketHeader, TicketContent } from "./styled";

interface TicketProps {
  ticket: TicketType;
}

const Ticket: React.FunctionComponent<TicketProps> = ({ ticket }) => {
  const { filters } = useContext(TicketsService);

  return (
    <Link.Internal
      to={`/roadmap/${ticket.repository.name}/${ticket.number}/`}
      state={{
        filters,
        pageYOffset: window.pageYOffset,
      }}
    >
      <TicketWrapper>
        <TicketHeader>
          <div>
            <H as="h3">{ticket.capability.displayName}</H>
          </div>
        </TicketHeader>
        <TicketContent>
          <TicketNumber number={ticket.number} />
          <H as="h4">{ticket.title}</H>
        </TicketContent>
      </TicketWrapper>
    </Link.Internal>
  );
};

export default Ticket;
