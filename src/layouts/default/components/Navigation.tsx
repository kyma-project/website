import React, { Component } from "react";
import throttle from "lodash.throttle";

import Button from "@components/shared/Button";

import Search from "./Search";
import NavDropdown from "./NavDropdown";

import { injectIntl, IntlInterface } from "@common/i18n";
import { resolveSocialMedia } from "@common/utils";
import { sizes } from "@styled";

import {
  NavigationWrapper,
  NavigationList,
  NavigationItem,
  NavigationIntLink,
  NavigationExtLink,
  NavigationMobileButton,
} from "./styled";

import config from "@config";

const navigation = [
  {
    path: "/blog/",
    title: "Blog",
  },
  {
    path: "/community/",
    title: "Community",
  },
  {
    path: "/roadmap/",
    title: "Roadmap",
  },
];

interface State {
  mobileMenuVisible?: boolean;
  isOnMobile?: boolean;
  initial?: boolean;
}

class Navigation extends Component<IntlInterface, State> {
  state: State = {
    mobileMenuVisible: false,
    isOnMobile: false,
    initial: false,
  };

  componentDidMount() {
    window.addEventListener("resize", throttle(this.resize, 500));
    this.resize();
    this.setState({ initial: true });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  toggleVisibility = (): void => {
    this.setState({ mobileMenuVisible: !this.state.mobileMenuVisible });
  };

  hide = () => {
    this.setState({ mobileMenuVisible: false });
  };

  resize = () => {
    this.setState({
      isOnMobile: window.innerWidth <= sizes.largeTablet,
    });
  };

  renderDocsNavigation = () => {
    const docsNav = {
      path: "/docs/",
      title: "Docs",
    };
    const elements = Object.entries(config.docs).map(([_, doc]) => ({
      displayName: doc.displayName,
      url: `/docs/${doc.navPath}`,
      active: false,
    }));

    return (
      <NavigationItem key={docsNav.title}>
        <NavDropdown elements={elements}>
          <NavigationIntLink to={docsNav.path}>
            {docsNav.title}
          </NavigationIntLink>
        </NavDropdown>
      </NavigationItem>
    );
  };

  render() {
    const { mobileMenuVisible, isOnMobile, initial } = this.state;

    const slackMedia = resolveSocialMedia("slack");
    const slackAriaLabel = this.props.formatMessage({
      id: "navigation.socialLinks.slack",
    });

    const menuVisible = !initial
      ? false
      : isOnMobile
      ? mobileMenuVisible
      : true;

    return (
      <NavigationWrapper>
        {isOnMobile ? <Search /> : null}
        <NavigationMobileButton onClick={this.toggleVisibility}>
          <Button.Light iconName="bars" iconPrefix="fas" />
        </NavigationMobileButton>
        <NavigationList visible={menuVisible}>
          <NavigationItem
            key="mobile-button"
            visible={isOnMobile}
            onClick={this.toggleVisibility}
          >
            <Button.Light iconName="times" iconPrefix="fas" />
          </NavigationItem>
          {this.renderDocsNavigation()}
          {navigation.map(navItem => (
            <NavigationItem key={navItem.title}>
              <NavigationIntLink to={navItem.path}>
                {navItem.title}
              </NavigationIntLink>
            </NavigationItem>
          ))}
          <NavigationItem>
            <NavigationExtLink to={slackMedia.url} ariaLabel={slackAriaLabel}>
              <Button.Light
                iconName={slackMedia.icon}
                ariaLabel={slackAriaLabel}
              >
                <span>{slackMedia.name}</span>
              </Button.Light>
            </NavigationExtLink>
          </NavigationItem>

          <NavigationItem key="search">
            {!isOnMobile ? <Search /> : null}
          </NavigationItem>
        </NavigationList>
      </NavigationWrapper>
    );
  }
}

export default injectIntl("layout")(Navigation);
