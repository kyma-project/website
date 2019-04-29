import React from "react";

import Grid from "@styled/Grid";

import Link from "@components/shared/Link";
import H from "@components/shared/H";

import TicketNumber from "@components/roadmap/TicketNumber";

import { Ticket as TicketType } from "../types";

import { TicketWrapper, TicketHeader, TicketContent } from "./styled";

interface TicketProps {
  ticket: TicketType;
  capabilityDisplayName: string;
}

const Ticket: React.FunctionComponent<TicketProps> = ({
  ticket,
  capabilityDisplayName,
}) => (
  <Link.Internal to={`/roadmap/${ticket.repository}/${ticket.number}/`}>
    <TicketWrapper>
      <TicketHeader>
        <div>
          <H as="h3">{capabilityDisplayName}</H>
        </div>
      </TicketHeader>
      <TicketContent>
        <TicketNumber number={ticket.number} />
        <H as="h4">{ticket.title}</H>
      </TicketContent>
    </TicketWrapper>
  </Link.Internal>
);

export default Ticket;
