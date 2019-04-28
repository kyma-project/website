import React from "react";

import Grid from "@styled/Grid";

import { FormattedMessage } from "@common/i18n";

import H from "@components/shared/H";

import { HeaderWrapper } from "./styled";

const Header: React.FunctionComponent = () => (
  <HeaderWrapper>
    <FormattedMessage id="roadmap.timeline.header">
      {data => <H as="h2">{data}</H>}
    </FormattedMessage>
  </HeaderWrapper>
);

export default Header;
