// TODO: This component has been moved from console repository and it has to be rewritten

import React from "react";
import styled from "styled-components";
import { StickyContainer, Sticky } from "react-sticky";
import DocsContent from "../../DocsContent/DocsContent.container";
import NavigationSidebar from "../../navigation/NavigationSidebar";
import { DOCS_RESPONSIVE_BREAKPOINT } from "../../../../constants/docs";

const ColumnsWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

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

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    const { content, location } = props;

    this.state = {
      activeNav: {
        id: content.id,
        type: content.type,
        hash: location.hash.replace(/#/g, ""),
      },
    };

    this.navSidebar = React.createRef();
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

  hideNavIfShouldOnMobile(hasSubElements) {
    // Hide navigation on Click on mobile
    if (window.innerWidth < DOCS_RESPONSIVE_BREAKPOINT) {
      this.navSidebar.current && this.navSidebar.current.hide();
    }
  }

  render() {
    const { content, topics, currentVersion, manifest, location } = this.props;
    const topicItems = topics.topics;

    return (
      <StickyContainer>
        <ColumnsWrapper>
          <SideWrapper>
            <Sticky>
              {({ style }) => (
                <div style={style}>
                  <NavigationSidebar
                    ref={this.navSidebar}
                    topNavComponent={this.props.topNavComponent}
                    items={manifest}
                    topics={topicItems}
                    currentContent={content}
                    location={location}
                    currentVersion={currentVersion}
                    activeNav={this.state.activeNav}
                    setActiveNav={newState => {
                      this.setActiveNav(newState);
                    }}
                    onLinkClick={hasSubElements =>
                      this.hideNavIfShouldOnMobile(hasSubElements)
                    }
                  />
                </div>
              )}
            </Sticky>
          </SideWrapper>
          <CenterSideWrapper>
            <DocsContent version={currentVersion} content={content} />
          </CenterSideWrapper>
        </ColumnsWrapper>
      </StickyContainer>
    );
  }
}

export default MainPage;
