import React, { Component } from "react";
import { StickyContainer, Sticky } from "react-sticky";

import DocsContent from "../DocsContent/DocsContent.container";
import LeftNavigation from "../Nav/LeftNavigation/LeftNavigation";
import { ColumnsWrapper, SideWrapper, CenterSideWrapper } from "./styled";

import { DOCS_RESPONSIVE_BREAKPOINT } from "../../../constants/docs";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: {},
    };
    this.navSidebar = React.createRef();
  }

  componentDidMount() {
    const { content } = this.props;

    this.setState({
      activeNav: {
        id: content.id,
        type: "",
        hash: "",
      },
    });
  }

  setActiveNav = activeNav => {
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
  };

  expandNav = activeNav => {
    this.setState({
      activeNav: activeNav,
    });
  };

  collapseNav = activeNav => {
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
  };

  hideNavIfShouldOnMobile = () => {
    // Hide navigation on Click on mobile
    if (window.innerWidth < DOCS_RESPONSIVE_BREAKPOINT) {
      this.navSidebar.current && this.navSidebar.current.hide();
    }
  };

  render() {
    const {
      content,
      topics,
      currentVersion,
      versions,
      changeDocsVersion,
      manifest,
      location,
      includeVersionInPath,
    } = this.props;
    const { activeNav } = this.state;
    const topicItems = topics.topics;

    const contentId = content.displayName.toLowerCase().replace(" ", "-");

    return (
      <StickyContainer>
        <ColumnsWrapper>
          <SideWrapper>
            <Sticky>
              {({ style }) => (
                <div style={style}>
                  <LeftNavigation
                    ref={this.navSidebar}
                    items={manifest}
                    topics={topicItems}
                    currentContent={content}
                    includeVersionInPath={includeVersionInPath}
                    location={location}
                    versions={versions}
                    currentVersion={currentVersion}
                    changeDocsVersion={changeDocsVersion}
                    activeNav={activeNav}
                    setActiveNav={this.setActiveNav}
                    onLinkClick={this.hideNavIfShouldOnMobile}
                    contentId={contentId}
                  />
                </div>
              )}
            </Sticky>
          </SideWrapper>
          <CenterSideWrapper>
            <DocsContent
              version={currentVersion}
              content={content}
              versions={versions}
              contentId={contentId}
            />
          </CenterSideWrapper>
        </ColumnsWrapper>
      </StickyContainer>
    );
  }
}

export default MainPage;
