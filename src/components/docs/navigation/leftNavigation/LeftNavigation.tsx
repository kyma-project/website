import React, { Component } from "react";

import VersionSwitcher from "@components/docs/navigation/leftNavigation/VersionSwitcher/VersionSwitcher";
import MobileDocsToggle from "@components/docs/navigation/leftNavigation/MobileDocsToogle";
import NavigationList from "@components/docs/navigation/leftNavigation/NavigationList/NavigationList";

import {
  DocsContentItem,
  DocsNavigationTopic,
  DocsVersions,
  DocsManifest,
} from "@components/docs/types";
import { ActiveNav } from "@components/docs/navigation/types";

import { MOBILE_DEVICES_BREAKPOINT } from "@common/constants";

import { LeftNavigationWrapper } from "./styled";

interface LeftNavigationProps {
  content: DocsContentItem;
  topics: DocsNavigationTopic[];
  version: string;
  versions: DocsVersions;
  items: DocsManifest;
  changeDocsVersion: (e: any) => Promise<void>;
  activeNav: ActiveNav;
  setActiveNav: (arg: ActiveNav) => void;
}

interface LeftNavigationState {
  visible: boolean;
}

class LeftNavigation extends Component<
  LeftNavigationProps,
  LeftNavigationState
> {
  state: LeftNavigationState = {
    visible: true,
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  toggleVisibility = (): void => {
    this.setState({ visible: !this.state.visible });
  };

  hide = (): void => {
    this.setState({ visible: false });
  };

  resize = () => {
    const { visible } = this.state;
    const newVisible = window.innerWidth > MOBILE_DEVICES_BREAKPOINT;

    if (visible !== newVisible) {
      this.setState({ visible: newVisible });
    }
  };

  hideNavIfShouldOnMobile = (condition: boolean) => {
    if (window.innerWidth <= MOBILE_DEVICES_BREAKPOINT && condition) {
      this.hide();
    }
  };

  render() {
    const {
      content,
      topics,
      version,
      versions,
      items,
      changeDocsVersion,
      activeNav,
      setActiveNav,
    } = this.props;
    const { visible } = this.state;

    return (
      <>
        <MobileDocsToggle
          toggleVisibility={this.toggleVisibility}
          visible={visible}
        />
        <LeftNavigationWrapper visible={visible}>
          <VersionSwitcher
            version={version}
            versions={versions}
            onChange={changeDocsVersion}
          />
          <NavigationList
            items={items}
            topics={topics}
            content={content}
            activeNav={activeNav}
            setActiveNav={setActiveNav}
            version={version}
            hideNavIfShouldOnMobile={this.hideNavIfShouldOnMobile}
          />
        </LeftNavigationWrapper>
      </>
    );
  }
}

export default LeftNavigation;
