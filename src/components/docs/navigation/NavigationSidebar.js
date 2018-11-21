import React from "react";
import styled from "styled-components";
import NavigationList from "../external/Navigation/NavigationList.component";
import DocsIcon from "./assets/docs-icon.svg";
import ui from "../../../locales/en/UI.json";
import { DOCS_RESPONSIVE_BREAKPOINT } from "../../../constants/docs";

const Icon = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 10px;
`;

const ToggleSidebarButton = styled.button`
  position: relative;
  background-color: #fff;
  outline: none;
  border-radius: 3px;
  line-height: 24px;
  cursor: pointer;
  width: 100%;
  border: 0;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  padding: 10px;
  padding-left: 50px;
  appearance: none;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.25);
  display: none;
  margin: 0;
  font-size: 18px;

  @media (max-width: ${DOCS_RESPONSIVE_BREAKPOINT}px) {
    display: block;
  }
`;

const SidebarWrapper = styled.div`
  display: ${props => (props.visible ? "block" : "none")};
  background: #fff;
  @media (max-width: ${DOCS_RESPONSIVE_BREAKPOINT}px) {
    height: calc(100vh - 46px);
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.3);
    padding: 0 20px;
  }
`;

class NavigationSidebar extends React.Component {
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
      topNavComponent,
      items,
      topics,
      activeNav,
      currentContent,
      setActiveNav,
      onLinkClick,
      includeVersionInPath,
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
          {topNavComponent}
          <NavigationList
            items={items}
            topics={topics}
            includeVersionInPath={includeVersionInPath}
            currentContent={currentContent}
            activeNav={activeNav}
            setActiveNav={setActiveNav}
            currentVersion={currentVersion}
            onLinkClick={onLinkClick}
          />
        </SidebarWrapper>
      </>
    );
  }
}

export default NavigationSidebar;
