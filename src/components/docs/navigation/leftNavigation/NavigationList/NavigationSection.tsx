import React from "react";

import {
  DocsNavigationTopicSection,
  DocsContentItem,
} from "@components/docs/types";
import {
  ActiveNav,
  ScrollSpyActiveNodes,
} from "@components/docs/navigation/types";

import {
  NavigationItems,
  NavigationItem,
  LinkWrapper,
  NavigationLink,
  NavigationSectionArrow,
} from "./styled";

interface NavigationSectionsProps {
  items?: DocsNavigationTopicSection[];
  groupType: string;
  rootId?: string;
  parentId?: string;
  content: DocsContentItem;
  setActiveNav: (props: ActiveNav) => void;
  getPathLink: (props: ActiveNav) => string;
  activeNav: ActiveNav;
  activeNodes: ScrollSpyActiveNodes;
  hideNavIfShouldOnMobile: (value: boolean) => void;
}

const NavigationSections: React.FunctionComponent<NavigationSectionsProps> = ({
  items = [],
  rootId = "",
  parentId = "",
  groupType,
  content,
  setActiveNav,
  getPathLink,
  activeNav,
  activeNodes,
  hideNavIfShouldOnMobile,
}) => {
  const hashing = (item: DocsNavigationTopicSection) => {
    if (parentId) {
      return `${parentId}-${item.anchor}`;
    }

    const topicType = item.topicType
      ? item.topicType.replace(/ /g, "-").toLowerCase()
      : item.anchor;
    return `${topicType}-${item.anchor}`;
  };

  const renderArrow = (
    hash: string,
    isActive: boolean,
    isActiveNavArrow: boolean,
  ) => (
    <NavigationSectionArrow
      onClick={() => {
        setActiveNav({
          id: rootId,
          type: groupType,
          hash,
        });
      }}
      activeArrow={isActiveNavArrow}
      active={isActive}
    />
  );

  const renderNavigationItem = (item: DocsNavigationTopicSection) => {
    const hash = hashing(item);
    const hasSubElements = item && item.titles && item.titles.length > 0;

    let isActive = false;
    let isActiveNavArrow = false;

    if (content.id === rootId) {
      if (parentId) {
        isActive = Boolean(
          activeNodes &&
            (activeNodes.document && activeNodes.document.id === hash),
        );
      } else {
        isActive = Boolean(
          activeNodes &&
            (activeNodes.groupOfDocuments &&
              activeNodes.groupOfDocuments.id === hash),
        );
      }

      if (
        activeNodes &&
        activeNodes.groupOfDocuments &&
        activeNodes.groupOfDocuments.id.startsWith(hash)
      ) {
        isActiveNavArrow = true;
      }
    }

    if (!isActiveNavArrow) {
      isActiveNavArrow = Boolean(
        hasSubElements &&
          activeNav.id === rootId &&
          activeNav.hash &&
          activeNav.hash.startsWith(item.anchor),
      );
    }

    const key = parentId
      ? `${rootId}-${parentId}-${item.anchor}`
      : `${rootId}-${item.anchor}`;

    return (
      <NavigationItem key={key}>
        <LinkWrapper>
          {hasSubElements && renderArrow(hash, isActive, isActiveNavArrow)}
          <NavigationLink
            active={isActive}
            to={getPathLink({
              id: rootId,
              type: groupType,
              hash,
            })}
            onClick={() => hideNavIfShouldOnMobile(true)}
            borderLeft={parentId || !hasSubElements}
          >
            {item.name}
          </NavigationLink>
        </LinkWrapper>
        {hasSubElements && (
          <NavigationSections
            items={item.titles}
            groupType={groupType}
            rootId={rootId}
            parentId={item.anchor}
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

  let isActiveNav = false;
  if (
    parentId &&
    activeNodes &&
    activeNodes.groupOfDocuments &&
    activeNodes.groupOfDocuments.id.startsWith(parentId)
  ) {
    isActiveNav = content.id === rootId;
  } else {
    isActiveNav = !parentId ? content.id === rootId : false;
  }

  const isClickedNav = parentId
    ? activeNav.id === rootId &&
      activeNav.hash &&
      activeNav.hash.startsWith(parentId)
    : activeNav.id === rootId;

  return (
    <NavigationItems
      secondary={true}
      marginTop={true}
      show={isActiveNav || isClickedNav}
    >
      {items.map(item => renderNavigationItem(item))}
    </NavigationItems>
  );
};

export default NavigationSections;
