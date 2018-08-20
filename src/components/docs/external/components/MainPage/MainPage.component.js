import React, { Component } from "react";
import styled from "styled-components";
import { StickyContainer, Sticky } from "react-sticky";
import { ThemeWrapper } from "@kyma-project/react-components";
import ColumnsWrapper from "../ColumnsWrapper/ColumnsWrapper.component";
import ContentWrapper from "../ContentWrapper/ContentWrapper.container";
import { goToAnchor, goToTop } from "react-scrollable-anchor";
import NavigationSidebar from "../../../navigation/NavigationSidebar";
import { DOCS_RESPONSIVE_BREAKPOINT } from "../../../../../constans/docs";

const SideWrapper = styled.div`
  box-sizing: border-box;
  text-align: left;
  flex: 0 0 280px;
  flex-shrink: 0;
  margin-right: 20px;
  bottom: 0;
  z-index: 1;
  overflow: auto;
  transition: transform 0.2s ease-in-out;

  @media (max-width: ${DOCS_RESPONSIVE_BREAKPOINT}px) {
    flex-basis: 100%;
    margin: 30px 0 40px;
  }
`;

const CenterSideWrapper = styled.div`
  box-sizing: border-box;
  flex: 1;
  flex-basis: 400px;
  overflow: auto;

  @media (max-width: ${DOCS_RESPONSIVE_BREAKPOINT}px) {
    padding: 0 20px;
  }
`;

function getRoot(manifest) {
  if (manifest && manifest.root) {
    return manifest.root.id;
  }
  return null;
}

class MainPage extends Component {
  constructor(props) {
    super(props);

    const manifest = props.manifest;
    const root = getRoot(manifest);
    this.state = {
      active: {
        id: props.match.params.id || root,
        type: props.match.params.type || "root",
        hash: props.location.hash.replace(/#/g, ""),
      },
      activeNav: {
        id: props.match.params.id || root,
        type: props.match.params.type || "root",
        hash: props.location.hash.replace(/#/g, ""),
      },
      navigationList: manifest,
    };

    this.navSidebar = React.createRef();
  }

  chooseActive(activeLink, { hasSubElements }) {
    this.setState({
      active: activeLink,
      activeNav: activeLink,
    });

    let link = `/${this.props.pageName}/${this.props.version}/${
      activeLink.type
    }/${activeLink.id}`;

    if (activeLink.hash) {
      link = `${link}#${activeLink.hash}`;
      this.props.history.push(link);
      goToAnchor(activeLink.hash);
    } else {
      this.props.history.push(link);
      goToTop();
    }

    // Hide navigation on Click on mobile
    if (window.innerWidth < DOCS_RESPONSIVE_BREAKPOINT && !hasSubElements) {
      this.navSidebar.current && this.navSidebar.current.hide();
    }
  }

  setActiveNav(activeNav) {
    if (
      JSON.stringify(activeNav) === JSON.stringify(this.state.activeNav) ||
      (activeNav.type === this.state.activeNav.type &&
        activeNav.id === this.state.activeNav.id &&
        !activeNav.hash)
    ) {
      this.collapseNav(activeNav);
    } else {
      this.expandNav(activeNav);
    }
  }

  expandNav(activeNav) {
    this.setState({
      activeNav: activeNav,
    });
  }

  collapseNav(activeNav) {
    const nav = activeNav.hash
      ? {
          id: activeNav.id,
          type: activeNav.type,
          hash: "",
        }
      : {
          id: "",
          type: "",
          hash: "",
        };

    this.setState({
      activeNav: nav,
    });
  }

  render() {
    let topics = null;
    if (!this.props.topics.loading) {
      if (this.props.topics.topics) {
        topics = this.props.topics.topics;
      }
    }

    return (
      <ThemeWrapper>
        <div className="App">
          <StickyContainer>
            <ColumnsWrapper>
              <SideWrapper>
                <Sticky>
                  {({ style }) => (
                    <div style={style}>
                      <NavigationSidebar
                        ref={this.navSidebar}
                        topNavComponent={this.props.topNavComponent}
                        items={this.state.navigationList}
                        topics={topics}
                        active={this.state.active}
                        activeNav={this.state.activeNav}
                        callbackParent={(newState, options) => {
                          this.chooseActive(newState, options);
                        }}
                        setActiveNav={newState => {
                          this.setActiveNav(newState);
                        }}
                        history={this.props.history}
                      />
                    </div>
                  )}
                </Sticky>
              </SideWrapper>
              <CenterSideWrapper>
                <ContentWrapper
                  version={this.props.version}
                  versions={this.props.versions}
                  item={this.state.active}
                />
              </CenterSideWrapper>
            </ColumnsWrapper>
          </StickyContainer>
        </div>
      </ThemeWrapper>
    );
  }
}

export default MainPage;
