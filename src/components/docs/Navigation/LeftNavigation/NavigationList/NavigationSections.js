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
  items,
  setActiveNav,
  isLinkActive,
  getPathLink,
  activeNav,
  activeNodes,
  hideNavIfShouldOnMobile,
  ...otherProps
}) {
  const hashing = item => {
    if (parentId) {
      return `${parentId}-${item.anchor}`;
    } else {
      const topicType = item.topicType
        ? item.topicType.replace(/ /g, "-").toLowerCase()
        : item.anchor;
      return `${topicType}-${item.anchor}`;
    }
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

    let isActiveNavArrow = false;
    if (
      activeNodes &&
      activeNodes.groupOfDocuments &&
      activeNodes.groupOfDocuments.id.startsWith(hash)
    ) {
      isActiveNavArrow = true;
    } else {
      isActiveNavArrow =
        hasSubElements &&
        activeNav.id === rootId &&
        activeNav.hash &&
        activeNav.hash.startsWith(item.anchor);
    }

    const key = parentId
      ? `${rootId}-${parentId}-${item.anchor}`
      : `${rootId}-${item.anchor}`;

    let isActive = false;
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
            parentId={parentId}
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
            currentContent={otherProps.currentContent}
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
    isActiveNav = true;
  } else {
    isActiveNav = !parentId ? activeNav.id === rootId : false;
  }

  const isClickedNav = parentId
    ? activeNav.id === rootId &&
      activeNav.hash &&
      activeNav.hash.startsWith(parentId)
    : activeNav.id === rootId;

  return (
    <NavigationItems secondary marginTop show={isActiveNav || isClickedNav}>
      {items && items.map(item => renderNavigationItem(item))}
    </NavigationItems>
  );
}

export default NavigationSections;
