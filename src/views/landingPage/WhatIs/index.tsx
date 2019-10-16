import React from "react";

import Grid from "@styled/Grid";
import Button from "@components/shared/Button";
import Link from "@components/shared/Link";
import H from "@components/shared/H";
import Paragraph from "@components/shared/Paragraph";

import WhatIsSvg from "../assets/landing-page/WhatIs";

import { FormattedMessage, getTranslation } from "@common/i18n";

const gt = getTranslation("landingPage.whatIs");

export const WhatIs: React.FunctionComponent = () => (
  <Grid.Container as="section">
    <Grid.Row space={true}>
      <Grid.Unit df={6} lg={6} md={12}>
        <FormattedMessage id={gt("headline")}>
          {headline => <H as="h2">{headline}</H>}
        </FormattedMessage>
        <>
          <FormattedMessage id={gt("paragraphs.0")}>
            {paragraph => <Paragraph key="paragraphs.0">{paragraph}</Paragraph>}
          </FormattedMessage>
          <FormattedMessage id={gt("paragraphs.1")}>
            {paragraph => <Paragraph key="paragraphs.1">{paragraph}</Paragraph>}
          </FormattedMessage>
          {/* discuss what to do with this section */}
          {/* <Paragraph>
            <FormattedMessage
              id={gt("XXXLutzBlogPost.paragraph")}
              values={{
                link: (
                  <Link.Internal
                    to="/blog/2018/12/10/xxxlutz-video"
                    underline={true}
                  >
                    <FormattedMessage id={gt("XXXLutzBlogPost.link")} />
                  </Link.Internal>
                ),
              }}
            />
          </Paragraph>
          <Link.Internal to="/docs/root/kyma#installation-installation">
            <Button.Emphasized>
              <FormattedMessage id={gt("installButton")} />
            </Button.Emphasized>
          </Link.Internal> */}
        </>
      </Grid.Unit>
      <Grid.Unit df={6} lg={6} md={12}>
        <WhatIsSvg />
      </Grid.Unit>
    </Grid.Row>
  </Grid.Container>
);
