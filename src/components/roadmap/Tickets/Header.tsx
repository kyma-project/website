import React, { useContext } from "react";

import Grid from "@styled/Grid";

import { FormattedMessage } from "@common/i18n";

import Link from "@components/shared/Link";
import H from "@components/shared/H";
import Paragraph from "@components/shared/Paragraph";

import Dropdown from "@components/roadmap/Dropdown/Dropdown";
import Filters from "@components/roadmap/Filters/Filters";

import RoadmapService from "@components/roadmap/service";

import { resolveSocialMedia } from "@common/utils";

import { HeaderWrapper, RoadmapLinkWrapper } from "./styled";

const Header: React.FunctionComponent = () => {
  const { location } = useContext(RoadmapService);
  const LinkType = location.search ? Link.Internal : Link.Hash;

  return (
    <HeaderWrapper id="timeline">
      <Grid.Container>
        <Grid.Row>
          <Grid.Unit df={2} md={0} />
          <Grid.Unit df={8} md={12}>
            <FormattedMessage id="roadmap.timeline.header">
              {header => (
                <RoadmapLinkWrapper>
                  <LinkType
                    to={location.search ? `/roadmap/#timeline` : "timeline"}
                  >
                    <H as="h2">{header}</H>
                  </LinkType>
                </RoadmapLinkWrapper>
              )}
            </FormattedMessage>
            <FormattedMessage id="roadmap.timeline.description.0">
              {paragraph => <Paragraph>{paragraph}</Paragraph>}
            </FormattedMessage>
            <Paragraph>
              <FormattedMessage
                id="roadmap.timeline.description.1"
                values={{
                  slackLink: (
                    <Link.External
                      to={resolveSocialMedia("slack").url}
                      externalIcon={true}
                    >
                      Slack
                    </Link.External>
                  ),
                }}
              />
            </Paragraph>
          </Grid.Unit>
          <Grid.Unit df={2} md={0} />
        </Grid.Row>
      </Grid.Container>
      <Dropdown />
      <Filters />
    </HeaderWrapper>
  );
};

export default Header;
