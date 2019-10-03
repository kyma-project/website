import React from "react";

import Link from "@components/shared/Link";
import H from "@components/shared/H";

import { TicketNumber } from "../components";

import { useTicketsService } from "../Services";

import { Ticket as TicketType } from "@typings/roadmap";

import { TicketWrapper, TicketHeader, TicketContent } from "./styled";

interface TicketProps {
  ticket: TicketType;
}

export const TicketComponent: React.FunctionComponent<TicketProps> = ({
  ticket,
}) => {
  const { filters } = useTicketsService();

  return (
    <Link.Internal
      to={`/roadmap/${ticket.repository.name}/${ticket.number}/`}
      state={{
        filters,
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
