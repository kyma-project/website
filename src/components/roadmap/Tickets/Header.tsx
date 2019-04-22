import React from "react";

import Grid from "@styled/Grid";

import { FormattedMessage, getTranslation } from "@common/i18n";

import H from "@components/shared/H";

import { HeaderWrapper } from "./styled";

const gt = getTranslation("roadmap.tickets");

const Header: React.FunctionComponent = () => (
  <HeaderWrapper>
    <FormattedMessage id={gt("header")}>
      {data => <H as="h2">{data}</H>}
    </FormattedMessage>
  </HeaderWrapper>
);

export default Header;
