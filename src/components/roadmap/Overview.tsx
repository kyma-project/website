import React from "react";

import Grid from "@styled/Grid";

import { FormattedMessage, getTranslation } from "@common/i18n";
import { resolveSocialMedia } from "@common/utils";

import H from "@components/shared/H";
import Link from "@components/shared/Link";
import Paragraph from "@components/shared/Paragraph";

import { OverviewWrapper, OverviewHeader } from "./styled";

const gt = getTranslation("roadmap.overview");

const Overview: React.FunctionComponent = () => (
  <Grid.Container>
    <Grid.Row>
      <OverviewWrapper>
        <Grid.Row>
          <Grid.Unit df={2} md={0} />
          <Grid.Unit df={8} md={12}>
            <OverviewHeader>
              <FormattedMessage id={gt("header")}>
                {data => <H as="h2">{data}</H>}
              </FormattedMessage>
              <FormattedMessage id={gt("subHeader")}>
                {data => <H as="h4">{data}</H>}
              </FormattedMessage>
              <FormattedMessage id={gt("description.0")}>
                {data => <Paragraph>{data}</Paragraph>}
              </FormattedMessage>
              <Paragraph>
                <FormattedMessage
                  id={gt("description.1")}
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
            </OverviewHeader>
          </Grid.Unit>
          <Grid.Unit df={2} md={0} />
        </Grid.Row>
      </OverviewWrapper>
    </Grid.Row>
  </Grid.Container>
);

export default Overview;
