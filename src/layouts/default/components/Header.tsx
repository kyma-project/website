import React from "react";

import { is } from "@styled";
import Grid from "@styled/Grid";
import Link from "@components/shared/Link";

import Logo from "./assets/LogoSecond";
import Navigation from "./Navigation";
import { HeaderWrapper, HeaderLogo, GithubButtonsWrapper } from "./styled";

import { GithubButtons } from "./GithubButtons";

interface HeaderProps {
  horizontalBg?: boolean;
  search?: boolean;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  horizontalBg = false,
}) => (
  <HeaderWrapper horizontalBg={horizontalBg} id="headerwrapper">
    <Grid.Container>
      <GithubButtonsWrapper id="gh-wrapper">
        <Link.Internal to="/">
          <HeaderLogo horizontalBg={horizontalBg}>
            <Logo />
          </HeaderLogo>
        </Link.Internal>
        <GithubButtons />
      </GithubButtonsWrapper>
      <Navigation />
    </Grid.Container>
  </HeaderWrapper>
);

export default Header;
