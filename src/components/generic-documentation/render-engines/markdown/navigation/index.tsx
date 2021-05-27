import React, { useContext, useState } from "react";

import Link from "@components/shared/Link";

import { GenericDocsContext } from "../../../services";

import { DocsNavigation, DocsNavigationElement } from "@typings/docs";

import {
  NavigationWrapper,
  NavigationListWrapper,
  NavigationList,
  NavigationListItem,
  NavigationListItemName,
  NavigationGroupName,
  VersionSwitcherWrapper,
  SubToggle,
  NavigationListItemMain,
  NoContent,
} from "./styled";
import Icon from "@components/shared/Icon";

export type linkSerializer = (path: string[]) => string;
export enum ActiveState {
  INACTIVE = "inactive",
  ACTIVE_INDIRECT = "indirect",
  ACTIVE_DIRECT = "direct",
}
export type activeLinkChecker = (path: string[]) => ActiveState;

export interface NavigationProps {
  navigation: DocsNavigationElement[];
  linkFn: linkSerializer;
  activeLinkFn?: activeLinkChecker;
  basePath: string;
  docsVersionSwitcher?: React.ReactNode;
}

function renderListElement(
  element: DocsNavigationElement,
  path: string[],
  linkFn: linkSerializer,
  activeLinkFn?: activeLinkChecker,
): React.ReactNode {
  const curPath = [...path, element.id];
  const isActive = activeLinkFn ? activeLinkFn(curPath) : ActiveState.INACTIVE;

  const [subHidden, setSubHidden] = useState(
    isActive !== ActiveState.ACTIVE_INDIRECT,
  );
  const toggleSub = () => setSubHidden(!subHidden);

  return (
    <NavigationListItem>
      <NavigationListItemMain active={isActive}>
        {element.children && element.children.length > 0 && (
          <SubToggle onClick={toggleSub} active={isActive}>
            <Icon
              iconName={subHidden ? "chevron-right" : "chevron-down"}
              iconPrefix="fas"
            />
          </SubToggle>
        )}
        {element.noContent ? (
          <NoContent active={isActive}>
            <NavigationListItemName>
              <span>{element.displayName}</span>
            </NavigationListItemName>
          </NoContent>
        ) : (
          <Link.Internal to={linkFn(curPath)}>
            <NavigationListItemName>
              <span>{element.displayName}</span>
            </NavigationListItemName>
          </Link.Internal>
        )}
      </NavigationListItemMain>

      {element.children && element.children.length > 0 && (
        <NavigationList hidden={subHidden}>
          {element.children.map(el =>
            renderListElement(el, curPath, linkFn, activeLinkFn),
          )}
        </NavigationList>
      )}
    </NavigationListItem>
  );
}

export const Navigation: React.FunctionComponent<NavigationProps> = ({
  navigation,
  linkFn,
  basePath,
  activeLinkFn,
  docsVersionSwitcher,
}) => {
  const { showMobileLeftNav } = useContext(GenericDocsContext);

  let basicPath = [] as string[];
  if (basePath !== "") {
    basicPath = basePath.split("/");
  }

  return (
    <NavigationWrapper showMobileNav={showMobileLeftNav}>
      {docsVersionSwitcher && (
        <VersionSwitcherWrapper>{docsVersionSwitcher}</VersionSwitcherWrapper>
      )}
      <NavigationListWrapper>
        <NavigationList>
          {navigation.map(el =>
            renderListElement(el, basicPath, linkFn, activeLinkFn),
          )}
        </NavigationList>
      </NavigationListWrapper>
    </NavigationWrapper>
  );
};
