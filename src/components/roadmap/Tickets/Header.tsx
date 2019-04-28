import React from "react";

import Grid from "@styled/Grid";

import { FormattedMessage } from "@common/i18n";

import H from "@components/shared/H";

import Dropdown from "@components/roadmap/Dropdown/Dropdown";

import { HeaderWrapper } from "./styled";

const Header: React.FunctionComponent = () => (
  <HeaderWrapper>
    <FormattedMessage id="roadmap.timeline.header">
      {header => <H as="h2">{header}</H>}
    </FormattedMessage>
    <Dropdown />
  </HeaderWrapper>
);

export default Header;
