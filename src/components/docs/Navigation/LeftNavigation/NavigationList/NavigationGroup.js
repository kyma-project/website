import React from "react";

import NavigationSections from "./NavigationSections";
import {
  NavigationContainer,
  NavigationHeader,
  NavigationItems,
  NavigationItem,
  LinkWrapper,
  NavigationLink,
  NavigationSectionArrow,
} from "./styled";

function NavigationGroup({
  title,
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
  const renderArrow = item => (
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

  const renderNavigationItem = item => {
    let topics = null;
    if (otherProps.topics) {
      topics = otherProps.topics.find(obj => obj.id === item.id);
    }

    return (
      <NavigationItem key={item.id}>
        <LinkWrapper>
          {topics && topics.sections && renderArrow(item)}
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
        {topics && topics.sections && (
          <NavigationSections
            items={topics.sections}
            groupType={groupType}
            rootId={item.id}
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

  return (
    <NavigationContainer>
      {title && <NavigationHeader>{title}</NavigationHeader>}
      <NavigationItems showAll>
        {items && items.map(item => renderNavigationItem(item))}
      </NavigationItems>
    </NavigationContainer>
  );
}

export default NavigationGroup;
