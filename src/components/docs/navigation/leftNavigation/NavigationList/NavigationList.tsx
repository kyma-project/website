import React, { useContext } from "react";

import NavigationGroup from "@components/docs/navigation/leftNavigation/NavigationList/NavigationGroup";

import ScrollSpy from "@common/state/useScrollSpy";

import {
  DocsContentItem,
  DocsNavigationTopic,
  DocsManifest,
} from "@components/docs/types";
import {
  ActiveNav,
  ScrollSpyActiveNodes,
} from "@components/docs/navigation/types";

import { getDocsPath, getDocsPathLink } from "@components/docs/helpers";
import { tokenize } from "@common/utils";

import { Separator, NavigationContainer } from "./styled";

interface NavigationListProps {
  content: DocsContentItem;
  topics: DocsNavigationTopic[];
  version: string;
  items: DocsManifest;
  activeNav: ActiveNav;
  setActiveNav: (arg: ActiveNav) => string;
  hideNavIfShouldOnMobile: (value: boolean) => void;
}

const NavigationList: React.FunctionComponent<NavigationListProps> = ({
  items,
  topics,
  activeNav,
  setActiveNav,
  content,
  version,
  hideNavIfShouldOnMobile,
}) => {
  const isLinkActive = (arg: { id: string; type: string }) =>
    tokenize(arg.id) === tokenize(content.id) &&
    tokenize(arg.type) === tokenize(content.type);

  const { activeNodes } = useContext(ScrollSpy.Context);
  const getPathLink = getDocsPathLink(version);

  return (
    <NavigationContainer>
      <NavigationGroup
        title=""
        groupType="root"
        items={items.root}
        topics={topics}
        content={content}
        getPathLink={getPathLink}
        isLinkActive={isLinkActive}
        activeNav={activeNav}
        activeNodes={activeNodes}
        setActiveNav={setActiveNav}
        hideNavIfShouldOnMobile={hideNavIfShouldOnMobile}
      />
      <Separator />
      <NavigationGroup
        title="Components"
        groupType="components"
        items={items.components}
        topics={topics}
        content={content}
        getPathLink={getPathLink}
        isLinkActive={isLinkActive}
        activeNav={activeNav}
        activeNodes={activeNodes}
        setActiveNav={setActiveNav}
        hideNavIfShouldOnMobile={hideNavIfShouldOnMobile}
      />
    </NavigationContainer>
  );
};

export default NavigationList;
