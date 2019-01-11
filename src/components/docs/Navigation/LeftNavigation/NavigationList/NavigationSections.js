import React from "react";

import {
  NavigationItems,
  NavigationItem,
  LinkWrapper,
  NavigationLink,
  NavigationSectionArrow,
} from "./styled";

function NavigationSections({
  rootId,
  parentId,
  groupType,
  items = [],
  setActiveNav,
  isLinkActive,
  getPathLink,
  activeNav,
  activeNodes,
  hideNavIfShouldOnMobile,
  currentContent,
  ...otherProps
}) {
  const hashing = item => {
    if (parentId) return `${parentId}-${item.anchor}`;

    const topicType = item.topicType
      ? item.topicType.replace(/ /g, "-").toLowerCase()
      : item.anchor;
    return `${topicType}-${item.anchor}`;
  };

  const renderArrow = (hash, isActive, isActiveNavArrow) => (
    <NavigationSectionArrow
      onClick={() => {
        setActiveNav({
          id: rootId,
          type: groupType,
          hash: hash,
        });
      }}
      activeArrow={isActiveNavArrow}
      active={isActive}
    />
  );

  const renderNavigationItem = item => {
    const hash = hashing(item);
    const hasSubElements = item && item.titles && item.titles.length > 0;

    let isActive = false;
    let isActiveNavArrow = false;

    if (currentContent.id === rootId) {
      if (parentId) {
        isActive =
          activeNodes &&
          (activeNodes.document && activeNodes.document.id === hash);
      } else {
        isActive =
          activeNodes &&
          (activeNodes.groupOfDocuments &&
            activeNodes.groupOfDocuments.id === hash);
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
      isActiveNavArrow =
        hasSubElements &&
        activeNav.id === rootId &&
        activeNav.hash &&
        activeNav.hash.startsWith(item.anchor);
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
              hash: hash,
            })}
            onClick={() => {
              hideNavIfShouldOnMobile();
            }}
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
            isLinkActive={isLinkActive}
            activeNav={activeNav}
            activeNodes={activeNodes}
            getPathLink={getPathLink}
            hideNavIfShouldOnMobile={hideNavIfShouldOnMobile}
            setActiveNav={setActiveNav}
            currentContent={currentContent}
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
    isActiveNav = currentContent.id === rootId;
  } else {
    isActiveNav = !parentId ? currentContent.id === rootId : false;
  }

  const isClickedNav = parentId
    ? activeNav.id === rootId &&
      activeNav.hash &&
      activeNav.hash.startsWith(parentId)
    : activeNav.id === rootId;

  return (
    <NavigationItems secondary marginTop show={isActiveNav || isClickedNav}>
      {items.map(item => renderNavigationItem(item))}
    </NavigationItems>
  );
}

export default NavigationSections;
