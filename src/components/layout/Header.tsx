import React from "react";

import Grid from "@styled/Grid";
import Link from "@components/shared/Link";

import Logo from "./assets/LogoHeader";
import Navigation from "@components/layout/Navigation";

import { FormattedMessage, getTranslation } from "@common/i18n";

import { HeaderWrapper, HeaderLogo } from "./styled";

interface HeaderProps {
  horizontalBg?: boolean;
  search?: boolean;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  horizontalBg = false,
}) => (
  <HeaderWrapper horizontalBg={horizontalBg}>
    <Grid.Container>
      <Link.Internal to="/">
        <HeaderLogo horizontalBg={horizontalBg}>
          <Logo />
        </HeaderLogo>
      </Link.Internal>
      <Navigation search={search} />
    </Grid.Container>
  </HeaderWrapper>
);

export default Header;
