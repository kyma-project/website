import React from "react";

import NavigationSections from "./NavigationSection";

import {
  DocsNavigationTopic,
  DocsContentItem,
  DocsManifestItem,
} from "@components/docs/types";
import {
  ActiveNav,
  ScrollSpyActiveNodes,
} from "@components/docs/navigation/types";

import {
  NavigationGroupContainer,
  NavigationHeader,
  NavigationItems,
  NavigationItem,
  LinkWrapper,
  NavigationLink,
  NavigationSectionArrow,
} from "./styled";

interface NavigationGroupProps {
  title?: string;
  groupType: string;
  topics: DocsNavigationTopic[];
  items: DocsManifestItem[];
  content: DocsContentItem;
  setActiveNav: (arg: ActiveNav) => void;
  isLinkActive: ({ id, type }: { id: string; type: string }) => boolean;
  getPathLink: (props: ActiveNav) => string;
  activeNav: ActiveNav;
  activeNodes: ScrollSpyActiveNodes;
  hideNavIfShouldOnMobile: (value: boolean) => void;
}

const NavigationGroup: React.FunctionComponent<NavigationGroupProps> = ({
  title = "",
  groupType,
  items,
  topics,
  content,
  setActiveNav,
  isLinkActive,
  getPathLink,
  activeNav,
  activeNodes,
  hideNavIfShouldOnMobile,
}) => {
  const renderArrow = (item: DocsManifestItem) => (
    <NavigationSectionArrow
      onClick={() => {
        setActiveNav({
          id: item.id,
          type: groupType,
          hash: "",
        });
      }}
      activeArrow={item.id === activeNav.id}
      active={isLinkActive({
        id: item.id,
        type: groupType,
      })}
    />
  );

  const renderNavigationItem = (item: DocsManifestItem) => {
    const topic: DocsNavigationTopic | undefined =
      topics && topics.find(obj => obj.id === item.id);

    return (
      <NavigationItem key={item.id}>
        <LinkWrapper>
          {topic && topic.sections && renderArrow(item)}
          <NavigationLink
            active={isLinkActive({
              id: item.id,
              type: groupType,
            })}
            to={getPathLink({
              id: item.id,
              type: groupType,
              hash: "",
            })}
            onClick={() => hideNavIfShouldOnMobile(topics && topics.length > 0)}
          >
            {item.displayName}
          </NavigationLink>
        </LinkWrapper>
        {topic && topic.sections && (
          <NavigationSections
            items={topic.sections}
            groupType={groupType}
            rootId={item.id}
            content={content}
            activeNav={activeNav}
            activeNodes={activeNodes}
            getPathLink={getPathLink}
            setActiveNav={setActiveNav}
            hideNavIfShouldOnMobile={hideNavIfShouldOnMobile}
          />
        )}
      </NavigationItem>
    );
  };

  return (
    <NavigationGroupContainer>
      {title && <NavigationHeader>{title}</NavigationHeader>}
      <NavigationItems showAll={true}>
        {items && items.map(item => renderNavigationItem(item))}
      </NavigationItems>
    </NavigationGroupContainer>
  );
};

export default NavigationGroup;
