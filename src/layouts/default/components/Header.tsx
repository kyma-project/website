import React from "react";
import GithubButton from "react-github-btn";

import Grid from "@styled/Grid";
import Link from "@components/shared/Link";
import { is } from "@styled";
import Logo from "./assets/LogoSecond";
import Navigation from "./Navigation";

import { HeaderWrapper, HeaderLogo, GithubButtonsWrapper } from "./styled";

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
        {is.phone() || is.smallPhone() ? null : (
          <>
            <GithubButton
              href="https://github.com/kyma-project/kyma"
              data-icon="octicon-star"
              data-show-count={true}
              aria-label="Star kyma-project/kyma on GitHub"
            >
              Star
            </GithubButton>
            <GithubButton
              href="https://github.com/kyma-project/kyma/fork"
              data-icon="octicon-repo-forked"
              data-show-count={true}
              aria-label="Fork kyma-project/kyma on GitHub"
            >
              Fork
            </GithubButton>
          </>
        )}
      </GithubButtonsWrapper>
      <Navigation />
    </Grid.Container>
  </HeaderWrapper>
);

export default Header;
