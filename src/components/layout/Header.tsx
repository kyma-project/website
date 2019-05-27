import React from "react";
import { is } from "@styled";

import Grid from "@styled/Grid";
import Link from "@components/shared/Link";

import LogoFirst from "./assets/LogoFirst";
import LogoSecond from "./assets/LogoSecond";
import Navigation from "@components/layout/Navigation";

import { FormattedMessage, getTranslation } from "@common/i18n";

import { HeaderWrapper, HeaderLogo } from "./styled";

interface HeaderProps {
  horizontalBg?: boolean;
  search?: boolean;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  horizontalBg = false,
  search,
}) => (
  <HeaderWrapper horizontalBg={horizontalBg}>
    <Grid.Container>
      <Link.Internal to="/">
        <HeaderLogo horizontalBg={horizontalBg} isMobile={is.smallPhone()}>
          {is.smallPhone() ? <LogoFirst /> : <LogoSecond />}
        </HeaderLogo>
      </Link.Internal>
      <Navigation />
    </Grid.Container>
  </HeaderWrapper>
);

export default Header;
