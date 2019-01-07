import React, { Component } from "react";

import NavigationList from "./NavigationList/NavigationList";
import VersionSwitcher from "./VersionSwitcher/VersionSwitcher";
import BackToTop from "./BackToTop/BackToTop";

import { SidebarWrapper, ToggleSidebarButton, Icon } from "./styled";
import DocsIcon from "../assets/docs-icon.svg";

import ui from "../../../../locales/en/UI.json";
import { DOCS_RESPONSIVE_BREAKPOINT } from "../../../../constants/docs";

class LeftNavigation extends Component {
  state = {
    visible: true,
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible });
  };

  hide = () => {
    this.setState({ visible: false });
  };

  resize = () => {
    const newVisible = window.innerWidth > DOCS_RESPONSIVE_BREAKPOINT;

    if (this.state.visible !== newVisible) {
      this.setState({ visible: newVisible });
    }
  };

  render() {
    const buttonVisible = !this.state.visible;
    const label = this.state.visible
      ? ui.docs.hideNavigation
      : ui.docs.showNavigation;

    const {
      currentVersion,
      items,
      topics,
      versions,
      changeDocsVersion,
      activeNav,
      activeNodes,
      currentContent,
      setActiveNav,
      onLinkClick,
      includeVersionInPath,
      contentId,
    } = this.props;

    return (
      <>
        <ToggleSidebarButton
          visible={buttonVisible}
          onClick={this.toggleVisibility}
        >
          <Icon src={DocsIcon} />
          {label}
        </ToggleSidebarButton>
        <SidebarWrapper visible={this.state.visible}>
          <>
            <BackToTop contentId={contentId} />
            <VersionSwitcher
              versions={versions}
              currentVersion={currentVersion}
              onChange={changeDocsVersion}
            />
          </>
          <NavigationList
            items={items}
            topics={topics}
            includeVersionInPath={includeVersionInPath}
            currentContent={currentContent}
            activeNav={activeNav}
            activeNodes={activeNodes}
            setActiveNav={setActiveNav}
            currentVersion={currentVersion}
            onLinkClick={onLinkClick}
            versions={versions}
          />
        </SidebarWrapper>
      </>
    );
  }
}

export default LeftNavigation;
