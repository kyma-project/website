import React, { useContext } from "react";

import Grid from "@styled/Grid";

import CapabilitySvg from "@components/roadmap/Svg";
import H from "@components/shared/H";
import Button from "@components/shared/Button";
import ReactMarkdown from "@components/shared/ReactMarkdown";

import RoadmapService from "@components/roadmap/service";
import TicketsService from "@components/roadmap/Tickets/service";
import { toKebabCase } from "@common/utils/index";

import { Capability } from "../types";

import {
  ContentWrapper,
  CapabilityWrapper,
  Header,
  StyledReactMarkdown,
} from "./styled";

import {
  CAPABILITIES_SCROLL_SPY_ROOT,
  CAPABILITY_SCROLL_SPY_NODE,
} from "@components/roadmap/constants";

const Content: React.FunctionComponent = () => {
  const { sortCapabilities, scrollToTickets } = useContext(RoadmapService);
  const { setCapability } = useContext(TicketsService);

  const header = (capability: Capability) => (
    <Grid.Container padding="0 30px">
      <Grid.Row>
        <Grid.Unit df={3} withoutPadding={true}>
          <CapabilitySvg capability={capability.frontmatter.id} />
        </Grid.Unit>
        <Grid.Unit df={9} withoutPadding={true}>
          <H as="h2">{capability.frontmatter.displayName}</H>
          <div
            onClick={() => {
              scrollToTickets();
              setCapability(toKebabCase(capability.frontmatter.displayName));
            }}
          >
            <Button.Emphasized>View Roadmap</Button.Emphasized>
          </div>
        </Grid.Unit>
      </Grid.Row>
    </Grid.Container>
  );

  const content = (capability: Capability) => (
    <ReactMarkdown source={capability.rawMarkdownBody} />
  );

  return (
    <ContentWrapper id={CAPABILITIES_SCROLL_SPY_ROOT}>
      {sortCapabilities().map(capability => (
        <CapabilityWrapper
          id={capability.frontmatter.id}
          data-scrollspy-node-type={CAPABILITY_SCROLL_SPY_NODE}
          key={capability.frontmatter.id}
        >
          <Header>{header(capability)}</Header>
          <StyledReactMarkdown>{content(capability)}</StyledReactMarkdown>
        </CapabilityWrapper>
      ))}
    </ContentWrapper>
  );
};

export default Content;
