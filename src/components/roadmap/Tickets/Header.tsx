import React from "react";

import Grid from "@styled/Grid";

import H from "@components/shared/H";

import { HeaderWrapper } from "./styled";

const Header: React.FunctionComponent = () => (
  <HeaderWrapper>
    <H as="h2">Roadmap</H>
  </HeaderWrapper>
);

export default Header;
