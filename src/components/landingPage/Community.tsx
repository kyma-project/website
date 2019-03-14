import React from "react";

import Grid from "@styled/Grid";
import Button from "@components/shared/Button";
import Link from "@components/shared/Link";
import H from "@components/shared/H";
import Paragraph from "@components/shared/Paragraph";
import Icon from "@components/shared/Icon";

import CommunitySvg from "./assets/landing-page/Community";

import { FormattedMessage, getTranslation } from "@common/i18n";
import { resolveSocialMedia } from "@common/utils";
import config from "@config";

import {
  CommunityWrapper,
  CommunitySvgWrapper,
  CommunityLinksWrapper,
  CommunityLinksListHeader,
  CommunityLinksList,
  CommunityLinksItem,
  CommunityLinksItemLink,
  CommunityLinksItemLinkIcon,
  CommunityLinksItemLinkName,
} from "./styled";

const gt = getTranslation("landingPage.community");

const Community: React.FunctionComponent = () => {
  const socialMedia = [
    resolveSocialMedia("github"),
    resolveSocialMedia("twitter"),
    resolveSocialMedia("slack"),
    resolveSocialMedia("linkedIn"),
    resolveSocialMedia("stackOverflow"),
  ];

  return (
    <CommunityWrapper>
      <Grid.Container as="section">
        <Grid.Row space={true}>
          <Grid.Unit df={6} lg={6} md={12}>
            <CommunitySvgWrapper>
              <CommunitySvg />
            </CommunitySvgWrapper>
          </Grid.Unit>
          <Grid.Unit df={6} lg={6} md={12}>
            <FormattedMessage id={gt("headline")}>
              {headline => <H as="h2">{headline}</H>}
            </FormattedMessage>
            <FormattedMessage id={gt("paragraphs.0")}>
              {paragraph => <Paragraph>{paragraph}</Paragraph>}
            </FormattedMessage>
            <FormattedMessage
              id={gt("paragraphs.1")}
              values={{
                sigLink: (
                  <Link.External
                    to={config.links.SIG_LINK}
                    underline={true}
                    externalIcon={true}
                  >
                    <FormattedMessage id={gt("sigLink")} />
                  </Link.External>
                ),
              }}
            />
            <CommunityLinksWrapper>
              <CommunityLinksListHeader>
                <FormattedMessage id={gt("linksHeader")}>
                  {headline => <H as="h4">{headline}</H>}
                </FormattedMessage>
              </CommunityLinksListHeader>
              <CommunityLinksList>
                {socialMedia.map(media => (
                  <CommunityLinksItem key={media.name}>
                    <CommunityLinksItemLink to={media.url}>
                      <CommunityLinksItemLinkIcon>
                        <Icon iconName={media.icon} />
                      </CommunityLinksItemLinkIcon>
                      <CommunityLinksItemLinkName>
                        {media.shortName}
                      </CommunityLinksItemLinkName>
                    </CommunityLinksItemLink>
                  </CommunityLinksItem>
                ))}
              </CommunityLinksList>
            </CommunityLinksWrapper>
          </Grid.Unit>
        </Grid.Row>
      </Grid.Container>
    </CommunityWrapper>
  );
};

export default Community;
