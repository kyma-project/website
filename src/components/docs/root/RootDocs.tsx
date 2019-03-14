import React, { Component } from "react";

import DocsPageWrapper from "./DocsPageWrapper";

import DocsLeftNavigation from "@components/docs/navigation/leftNavigation/LeftNavigation";
import DocsContent from "@components/docs/content/DocsContent.container";

import ScrollSpy from "@common/state/useScrollSpy";

import {
  DocsContentItem,
  DocsNavigationTopic,
  DocsVersions,
  DocsManifest,
} from "../types";
import { ActiveNav } from "../navigation/types";

import {
  DOCS_SCROLL_SPY_ROOT,
  MOBILE_DEVICES_BREAKPOINT,
} from "@common/constants";

interface RootDocsProps {
  content: DocsContentItem;
  topics: DocsNavigationTopic[];
  version: string;
  versions: DocsVersions;
  manifest: DocsManifest;
  changeDocsVersion: () => void;
  assetsPath: string;
}

interface RootDocsState {
  activeNav: ActiveNav;
}

class RootDocs extends Component<RootDocsProps, RootDocsState> {
  navSidebar: React.RefObject<DocsLeftNavigation>;

  state: RootDocsState = {
    activeNav: {
      id: "",
      type: "",
      hash: "",
    },
  };

  constructor(props: RootDocsProps) {
    super(props);
    this.navSidebar = React.createRef<DocsLeftNavigation>();
  }

  componentDidMount() {
    const {
      content: { id },
    } = this.props;

    this.setState({
      activeNav: {
        id,
        type: "",
        hash: "",
      },
    });
  }

  setActiveNav = (activeNav: ActiveNav) => {
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

  collapseNav = (activeNav: ActiveNav) => {
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

  expandNav = (activeNav: ActiveNav) => {
    this.setState({ activeNav });
  };

  render() {
    const {
      content,
      topics,
      version,
      versions,
      manifest,
      changeDocsVersion,
      assetsPath,
    } = this.props;
    const { activeNav } = this.state;

    const scrollSpyProps = {
      nodeTypes: ["groupOfDocuments", "document", "header"],
      rootElement: `#${DOCS_SCROLL_SPY_ROOT}`,
      offset: {
        groupOfDocuments: 40,
        document: 40,
        header: 40,
      },
    };

    const leftNavigationComponent = (
      <DocsLeftNavigation
        ref={this.navSidebar}
        items={manifest}
        topics={topics}
        version={version}
        content={content}
        versions={versions}
        changeDocsVersion={changeDocsVersion}
        activeNav={activeNav}
        setActiveNav={this.setActiveNav}
      />
    );

    const contentComponent = (
      <DocsContent
        version={version}
        content={content}
        versions={versions}
        assetsPath={assetsPath}
      />
    );

    return (
      <ScrollSpy.Provider {...scrollSpyProps}>
        <DocsPageWrapper
          content={contentComponent}
          leftNavigation={leftNavigationComponent}
        />
      </ScrollSpy.Provider>
    );
  }
}

export default RootDocs;
