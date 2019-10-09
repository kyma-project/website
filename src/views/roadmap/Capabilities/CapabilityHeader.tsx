import React from "react";

import Grid from "@styled/Grid";

import { FormattedMessage } from "@common/i18n";

import { CapabilitySvg } from "../components";
import H from "@components/shared/H";
import Button from "@components/shared/Button";

import { useRoadmapService, useTicketsService } from "../Services";

import { Header } from "./styled";

import { Capability } from "@typings/roadmap";

interface Props {
  capability: Capability;
}

export const CapabilityHeader: React.FunctionComponent<Props> = ({
  capability: {
    frontmatter: { id, displayName },
  },
}) => {
  const { scrollToTicketsReference } = useRoadmapService();
  const { setCapability } = useTicketsService();

  return (
    <Header>
      <Grid.Container padding="0 30px">
        <Grid.Row>
          <Grid.Unit df={3} sm={0} withoutPadding={true}>
            <CapabilitySvg capability={id} />
          </Grid.Unit>
          <Grid.Unit df={9} sm={12} withoutPadding={true}>
            <H as="h2">{displayName}</H>
            <div
              onClick={() => {
                scrollToTicketsReference();
                setCapability(id);
              }}
            >
              <Button.Emphasized>
                <FormattedMessage id={"roadmap.capabilities.viewRoadmap"} />
              </Button.Emphasized>
            </div>
          </Grid.Unit>
        </Grid.Row>
      </Grid.Container>
    </Header>
  );
};
