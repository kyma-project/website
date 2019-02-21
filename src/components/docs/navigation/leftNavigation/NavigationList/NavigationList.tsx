import React, { Component } from "react";

import ScrollSpy from "@components/docs/navigation/scrollSpy/ScrollSpy";
import NavigationGroup from "@components/docs/navigation/leftNavigation/NavigationList/NavigationGroup";

import {
  DocsContentItem,
  DocsNavigationTopic,
  DocsManifest,
} from "@components/docs/types";
import {
  ActiveNav,
  ScrollSpyActiveNodes,
} from "@components/docs/navigation/types";

import { getDocsPath, getDocsPathLink, tokenize } from "@common/utils";
import { DOCS_SCROLL_SPY_ROOT } from "@common/constants";

import { Separator, NavigationContainer } from "./styled";

interface NavigationListProps {
  content: DocsContentItem;
  topics: DocsNavigationTopic[];
  version: string;
  items: DocsManifest;
  activeNav: ActiveNav;
  setActiveNav: Function;
  hideNavIfShouldOnMobile: Function;
}

interface NavigationListState {
  activeNodes: ScrollSpyActiveNodes;
}

class NavigationList extends Component<
  NavigationListProps,
  NavigationListState
> {
  state: NavigationListState = {
    activeNodes: {
      groupOfDocuments: null,
      document: null,
      header: null,
    },
  };

  isLinkActive = (arg: { id: string; type: string }) => {
    const content = this.props.content;
    return (
      tokenize(arg.id) === tokenize(content.id) &&
      tokenize(arg.type) === tokenize(content.type)
    );
  };

  render() {
    const {
      items,
      topics,
      activeNav,
      setActiveNav,
      content,
      version,
      hideNavIfShouldOnMobile,
    } = this.props;
    const { activeNodes } = this.state;
    const getPathLink = getDocsPathLink(version);

    return (
      <NavigationContainer>
        <ScrollSpy
          rootElement={`#${DOCS_SCROLL_SPY_ROOT}`}
          offset={{
            groupOfDocuments: 40,
            document: 40,
            header: 40,
          }}
          onUpdate={(activeNodes: ScrollSpyActiveNodes) =>
            this.setState({ activeNodes })
          }
        />
        <>
          <NavigationGroup
            title=""
            groupType="root"
            items={items.root}
            topics={topics}
            content={content}
            getPathLink={getPathLink}
            isLinkActive={this.isLinkActive}
            activeNav={activeNav}
            activeNodes={activeNodes}
            setActiveNav={setActiveNav}
            hideNavIfShouldOnMobile={hideNavIfShouldOnMobile}
          />
        </>
        <Separator />
        <>
          <NavigationGroup
            title="Components"
            groupType="components"
            items={items.components}
            topics={topics}
            content={content}
            getPathLink={getPathLink}
            isLinkActive={this.isLinkActive}
            activeNav={activeNav}
            activeNodes={activeNodes}
            setActiveNav={setActiveNav}
            hideNavIfShouldOnMobile={hideNavIfShouldOnMobile}
          />
        </>
      </NavigationContainer>
    );
  }
}

export default NavigationList;
