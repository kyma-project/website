import React from "react";

import Grid from "@styled/Grid";
import Link from "@components/shared/Link";

import { injectIntl, IntlInterface } from "@common/i18n";

import Logo from "./assets/LogoSecond";
import Navigation from "./Navigation";
import { HeaderWrapper, HeaderLogo, GithubButtonsWrapper } from "./styled";

import GithubButtons from "./GithubButtons";

interface HeaderProps {
  horizontalBg?: boolean;
  hiddenNav: boolean;
  search?: boolean;
}

const Header: React.FunctionComponent<HeaderProps & IntlInterface> = ({
  horizontalBg = false,
  hiddenNav,
  formatMessage,
}) => (
  <HeaderWrapper horizontalBg={horizontalBg}>
    <Grid.Container>
      <GithubButtonsWrapper>
        <Link.Internal
          to="/"
          ariaLabel={formatMessage({ id: "header.ariaLabel" })}
        >
          <HeaderLogo horizontalBg={horizontalBg}>
            <Logo />
          </HeaderLogo>
        </Link.Internal>
      </GithubButtonsWrapper>
      {hiddenNav ? null : <Navigation />}
    </Grid.Container>
  </HeaderWrapper>
);

export default injectIntl("layout")(Header);
