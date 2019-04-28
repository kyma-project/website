import React from "react";

import Grid from "@styled/Grid";

import { FormattedMessage } from "@common/i18n";

import H from "@components/shared/H";

import Dropdown from "@components/roadmap/Dropdown/Dropdown";

import { Capability } from "../types";

import { HeaderWrapper } from "./styled";

interface Props {
  capabilities: Capability[];
}

const Header: React.FunctionComponent<Props> = ({ capabilities }) => (
  <HeaderWrapper>
    <FormattedMessage id="roadmap.timeline.header">
      {header => <H as="h2">{header}</H>}
    </FormattedMessage>
    <Dropdown capabilities={capabilities} />
  </HeaderWrapper>
);

export default Header;
