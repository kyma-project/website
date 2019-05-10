import React from "react";

import { FormattedMessage } from "@common/i18n";

import H from "@components/shared/H";

import Dropdown from "@components/roadmap/Dropdown/Dropdown";
import Filters from "@components/roadmap/Filters/Filters";

import { HeaderWrapper } from "./styled";

const Header: React.FunctionComponent = () => (
  <HeaderWrapper>
    <FormattedMessage id="roadmap.timeline.header">
      {header => <H as="h2">{header}</H>}
    </FormattedMessage>
    <Dropdown />
    <Filters />
  </HeaderWrapper>
);

export default Header;
