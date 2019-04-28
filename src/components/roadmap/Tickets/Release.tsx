import React from "react";

import Grid from "@styled/Grid";

import H from "@components/shared/H";
import Svg from "@components/roadmap/Svg";
import TicketComponent from "@components/roadmap/Tickets/Ticket";

import { Release, Ticket } from "../types";

import {
  ReleaseWrapper,
  ReleaseHeader,
  ReleaseTicketsWrapper,
  TicketsWrapper,
  TicketsRow,
  TicketsIcon,
  TicketModalWrapper,
} from "./styled";

interface ReleaseProps {
  release: Release;
}

const ReleaseComponent: React.FunctionComponent<ReleaseProps> = ({
  release,
}) => {
  const ticketsWrapper = (
    order: number,
    tickets: React.ReactNode,
    futurePlanned: boolean,
  ) => (
    <Grid.Container padding={"0 30px"}>
      <Grid.Row>
        <TicketsWrapper
          futurePlanned={futurePlanned}
          rightBorder={true}
          df={6}
          sm={12}
        >
          {order % 2 ? tickets : null}
        </TicketsWrapper>
        <TicketsWrapper futurePlanned={futurePlanned} df={6} sm={12}>
          {order % 2 === 0 ? tickets : null}
        </TicketsWrapper>
      </Grid.Row>
    </Grid.Container>
  );

  const createTicketsComponents = (
    order: number,
    tickets: Ticket[],
    capabilityDisplayName: string,
  ) => (
    <TicketsRow order={order} direction={order % 2 ? "rtl" : "ltl"}>
      {tickets.map((ticket, index) => (
        <Grid.Unit df={6} md={12}>
          <TicketModalWrapper>
            <TicketComponent
              key={index}
              ticket={ticket}
              capabilityDisplayName={capabilityDisplayName}
            />
          </TicketModalWrapper>
        </Grid.Unit>
      ))}
      {tickets && tickets.length ? (
        <TicketsIcon order={order}>
          <Svg capability={tickets[0].capabilityId} />
        </TicketsIcon>
      ) : null}
    </TicketsRow>
  );

  const headerText =
    release.displayName === "Future"
      ? "Future planned"
      : `${/[0-9]\.[0-9]/.test(release.displayName) ? "Release " : ""}${
          release.displayName
        }`;

  return (
    <ReleaseWrapper>
      <ReleaseHeader futurePlanned={release.displayName === "Future"}>
        <H as="h3">{headerText}</H>
      </ReleaseHeader>
      <ReleaseTicketsWrapper>
        {Object.keys(release.capabilities).map((capability, idx) => {
          const tickets = release.capabilities[capability];
          const ticketsComponents = createTicketsComponents(
            idx,
            tickets,
            capability,
          );

          return tickets.length
            ? ticketsWrapper(
                idx,
                ticketsComponents,
                release.displayName === "Future",
              )
            : null;
        })}
      </ReleaseTicketsWrapper>
    </ReleaseWrapper>
  );
};

export default ReleaseComponent;
