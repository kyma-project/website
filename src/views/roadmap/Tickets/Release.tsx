import React from "react";

import { is } from "@styled";
import Grid from "@styled/Grid";

import { FormattedMessage } from "@common/i18n";

import H from "@components/shared/H";
import { CapabilitySvg } from "../components";
import { TicketComponent } from "./Ticket";

import { Release, Ticket } from "@typings/roadmap";

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
  orderNumber: number;
}

export const ReleaseComponent: React.FunctionComponent<ReleaseProps> = ({
  release,
  orderNumber,
}) => {
  const ticketsWrapper = (
    order: number,
    tickets: React.ReactNode,
    futurePlanned: boolean,
  ) => {
    const isMobile = is.phone() || is.smallPhone();
    let leftItems;
    let rightItems;

    if (isMobile) {
      rightItems = tickets;
      leftItems = null;
    } else {
      leftItems = order % 2 ? tickets : null;
      rightItems = order % 2 === 0 ? tickets : null;
    }

    return (
      <Grid.Container padding={"0 30px"} key={order}>
        <Grid.Row>
          {!isMobile ? (
            <TicketsWrapper
              futurePlanned={futurePlanned}
              rightBorder={true}
              df={6}
              sm={12}
            >
              {leftItems}
            </TicketsWrapper>
          ) : null}
          <TicketsWrapper futurePlanned={futurePlanned} df={6} sm={12}>
            {rightItems}
          </TicketsWrapper>
        </Grid.Row>
      </Grid.Container>
    );
  };

  const createTicketsComponents = (
    order: number,
    tickets: Ticket[],
    capabilityId: string,
  ) => (
    <TicketsRow order={order} direction={order % 2 ? "rtl" : "ltl"}>
      {tickets.map((ticket, index) => (
        <Grid.Unit df={6} md={12} key={index}>
          <TicketModalWrapper>
            <TicketComponent key={index} ticket={ticket} />
          </TicketModalWrapper>
        </Grid.Unit>
      ))}
      {tickets && tickets.length ? (
        <TicketsIcon order={order}>
          <CapabilitySvg capability={capabilityId} />
        </TicketsIcon>
      ) : null}
    </TicketsRow>
  );

  const headerText =
    release.displayName === "Future" ? (
      <FormattedMessage id="roadmap.timeline.futurePlanned" />
    ) : /[0-9]\.[0-9]/.test(release.displayName) ? (
      <FormattedMessage
        id="roadmap.timeline.release"
        values={{
          number: release.displayName,
        }}
      />
    ) : (
      release.displayName
    );

  return (
    <ReleaseWrapper>
      <ReleaseHeader futurePlanned={release.displayName === "Future"}>
        <H as="h3">{headerText}</H>
      </ReleaseHeader>
      <ReleaseTicketsWrapper>
        {Object.keys(release.capabilities).map((capability, idx) => {
          const tickets = release.capabilities[capability];
          const ticketsComponents = createTicketsComponents(
            orderNumber + idx,
            tickets,
            tickets.length ? tickets[0].capability.id : "",
          );

          return tickets.length
            ? ticketsWrapper(
                orderNumber + idx,
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
