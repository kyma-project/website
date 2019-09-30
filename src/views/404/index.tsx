import React from "react";

import Grid from "@styled/Grid";
import H from "@components/shared/H";
import Button from "@components/shared/Button";
import Link from "@components/shared/Link";

import { FormattedMessage } from "@common/i18n";

import { NotFoundPageWrapper } from "./styled";

const NotFoundView: React.FunctionComponent = () => (
  <NotFoundPageWrapper>
    <Grid.Container>
      <Grid.Row>
        <Grid.Unit df={6} lg={6} md={12}>
          <H as="h2">
            <FormattedMessage id="404.headline" />
          </H>
          <div>
            <Link.Internal to="/">
              <FormattedMessage id="404.button">
                {headline => (
                  <Button.Emphasized size="sm">{headline}</Button.Emphasized>
                )}
              </FormattedMessage>
            </Link.Internal>
          </div>
        </Grid.Unit>
      </Grid.Row>
    </Grid.Container>
  </NotFoundPageWrapper>
);

export default NotFoundView;
