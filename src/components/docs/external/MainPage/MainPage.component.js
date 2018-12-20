// TODO: This component has been moved from console repository and it has to be rewritten

import React from "react";
import { StickyContainer, Sticky } from "react-sticky";
import DocsContent from "../../DocsContent/DocsContent.container";
import NavigationSidebar from "../../navigation/NavigationSidebar";
import { DOCS_RESPONSIVE_BREAKPOINT } from "../../../../constants/docs";
import { ColumnsWrapper, SideWrapper, CenterSideWrapper } from "./styled";

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
      manifest,
      location,
      includeVersionInPath,
    } = this.props;
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
                    includeVersionInPath={includeVersionInPath}
                    location={location}
                    versions={versions}
                    currentVersion={currentVersion}
                    activeNav={this.state.activeNav}
                    setActiveNav={this.setActiveNav}
                    onLinkClick={this.hideNavIfShouldOnMobile}
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
            />
          </CenterSideWrapper>
        </ColumnsWrapper>
      </StickyContainer>
    );
  }
}

export default MainPage;
