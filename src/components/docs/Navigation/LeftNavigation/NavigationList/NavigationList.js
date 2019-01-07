import React, { Component } from "react";

import ScrollSpy from "../../ScrollSpy/ScrollSpy";
import NavigationGroup from "./NavigationGroup";
import { Wrapper, Separator } from "./styled";

import { getDocsPath } from "../../../../../helpers/docsPath";
import { tokenize } from "../../../../../helpers/tokenize";

class Navigation extends Component {
  state = {
    activeNodes: null,
  };

  render() {
    const getPathLink = ((version, includeVersionInPath) => {
      return ({ id, type, hash }) => {
        return getDocsPath(version, { type, id, hash }, includeVersionInPath);
      };
    })(this.props.currentVersion, this.props.includeVersionInPath);

    const isLinkActive = (() => {
      return ({ id, type }) => {
        const content = this.props.currentContent;
        return (
          tokenize(id) === tokenize(content.id) &&
          tokenize(type) === tokenize(content.type)
        );
      };
    })();

    const {
      items,
      topics,
      activeNav,
      hideNavIfShouldOnMobile,
      setActiveNav,
      currentContent,
    } = this.props;
    const { activeNodes } = this.state;

    return (
      <ScrollSpy
        rootElement="#docs-content"
        nodeTypes={["groupOfDocuments", "document", "header"]}
        offset={{
          groupOfDocuments: 40,
          document: 40,
          header: 40,
        }}
        onUpdate={activeNodes => this.setState({ activeNodes })}
      >
        <Wrapper>
          <NavigationGroup
            title=""
            items={[items.root]}
            topics={topics}
            groupType="root"
            getPathLink={getPathLink}
            isLinkActive={isLinkActive}
            activeNav={activeNav}
            activeNodes={activeNodes}
            setActiveNav={setActiveNav}
            hideNavIfShouldOnMobile={hideNavIfShouldOnMobile}
            currentContent={currentContent}
          />
          <Separator />
          <NavigationGroup
            title="Components"
            items={items.components}
            topics={topics}
            groupType="components"
            getPathLink={getPathLink}
            isLinkActive={isLinkActive}
            activeNav={activeNav}
            activeNodes={activeNodes}
            setActiveNav={setActiveNav}
            hideNavIfShouldOnMobile={hideNavIfShouldOnMobile}
            currentContent={currentContent}
          />
        </Wrapper>
      </ScrollSpy>
    );
  }
}

export default Navigation;
