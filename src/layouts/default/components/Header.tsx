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
  hiddenNav: boolean;
  search?: boolean;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  horizontalBg = false,
  hiddenNav,
}) => (
  <HeaderWrapper horizontalBg={horizontalBg}>
    <Grid.Container>
      <GithubButtonsWrapper>
        <Link.Internal to="/">
          <HeaderLogo horizontalBg={horizontalBg}>
            <Logo />
          </HeaderLogo>
        </Link.Internal>
        <GithubButtons />
      </GithubButtonsWrapper>
      {hiddenNav ? null : <Navigation />}
    </Grid.Container>
  </HeaderWrapper>
);

export default Header;
