import React, { Component } from "react";

import Button from "@components/shared/Button";
import Icon from "@components/shared/Icon";

import { resolveSocialMedia } from "@common/utils";
import {
  MOBILE_DEVICES_BREAKPOINT,
  PHONE_RESPONSIVE_BREAKPOINT,
} from "@common/constants";

import {
  NavigationWrapper,
  NavigationList,
  NavigationItem,
  NavigationIntLink,
  NavigationExtLink,
  NavigationMobileButton,
} from "./styled";

const navigation = [
  {
    path: "/docs",
    title: "Docs",
  },
  {
    path: "/blog",
    title: "Blog",
  },
];

interface NavigationState {
  mobileMenuVisible?: boolean;
  isOnMobile?: boolean;
}

class Navigation extends Component<{}, NavigationState> {
  state: NavigationState = {
    mobileMenuVisible: false,
    isOnMobile: false,
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
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
      isOnMobile: window.innerWidth <= PHONE_RESPONSIVE_BREAKPOINT,
    });
  };

  render() {
    const { mobileMenuVisible, isOnMobile } = this.state;

    const socialMedia = [
      resolveSocialMedia("slack"),
      resolveSocialMedia("github"),
    ];

    return (
      <NavigationWrapper>
        <NavigationMobileButton onClick={this.toggleVisibility}>
          <Button.Light iconName="bars" iconPrefix="fas" />
        </NavigationMobileButton>
        <NavigationList visible={isOnMobile ? mobileMenuVisible : true}>
          <NavigationItem
            key="mobile-button"
            visible={isOnMobile}
            onClick={this.toggleVisibility}
          >
            <Button.Light iconName="times" iconPrefix="fas" />
          </NavigationItem>
          {navigation.map((navItem: { path: string; title: string }) => (
            <NavigationItem key={navItem.title}>
              <NavigationIntLink to={navItem.path}>
                {navItem.title}
              </NavigationIntLink>
            </NavigationItem>
          ))}
          {socialMedia.map((media, index) => (
            <NavigationItem key={media.name}>
              <NavigationExtLink to={media.url}>
                <Button.Light iconName={media.icon}>
                  <span>{media.name}</span>
                </Button.Light>
              </NavigationExtLink>
            </NavigationItem>
          ))}
        </NavigationList>
      </NavigationWrapper>
    );
  }
}

export default Navigation;
