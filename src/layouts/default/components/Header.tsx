import React from "react";

import { is } from "@styled";
import Grid from "@styled/Grid";
import Link from "@components/shared/Link";

import Logo from "./assets/LogoSecond";
import Navigation from "./Navigation";
import {
  HeaderWrapper,
  HeaderLogo,
  GithubButtonsWrapper,
  IFrameWrapper,
} from "./styled";

interface HeaderProps {
  horizontalBg?: boolean;
  search?: boolean;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  horizontalBg = false,
}) => (
  <HeaderWrapper horizontalBg={horizontalBg}>
    <Grid.Container>
      <GithubButtonsWrapper>
        <Link.Internal to="/">
          <HeaderLogo horizontalBg={horizontalBg}>
            <Logo />
          </HeaderLogo>
        </Link.Internal>
        {is.smallPhone() ? null : (
          <IFrameWrapper>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=kyma-project&repo=kyma&type=star&count=true"
              frameBorder="0"
              scrolling="0"
              width="70px"
              height="20px"
            />
            <iframe
              src="https://ghbtns.com/github-btn.html?user=kyma-project&repo=kyma&type=fork&count=true"
              frameBorder="0"
              scrolling="0"
              width="70px"
              height="20px"
            />
          </IFrameWrapper>
        )}
      </GithubButtonsWrapper>
      <Navigation />
    </Grid.Container>
  </HeaderWrapper>
);

export default Header;
