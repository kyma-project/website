import React, { useContext } from "react";

import Link from "@components/shared/Link";

import { GenericDocsContext } from "../../../services";

import { DocsNavigation, DocsNavigationTopic } from "@typings/docs";

import {
  NavigationWrapper,
  NavigationListWrapper,
  NavigationList,
  NavigationListItem,
  NavigationListItemName,
  NavigationGroupName,
  VersionSwitcherWrapper,
} from "./styled";

export type linkSerializer = ({
  group,
  items,
  id,
}: {
  group: string;
  items: DocsNavigationTopic[];
  id: string;
}) => string;

export type activeLinkChecker = ({
  group,
  items,
  id,
}: {
  group: string;
  items: DocsNavigationTopic[];
  id: string;
}) => boolean;

export interface NavigationProps {
  navigation: DocsNavigation;
  linkFn: linkSerializer;
  activeLinkFn?: activeLinkChecker;
  docsVersionSwitcher?: React.ReactNode;
}

function renderList(
  group: string,
  items: DocsNavigationTopic[],
  linkFn: linkSerializer,
  activeLinkFn?: activeLinkChecker,
  showGroups?: boolean,
): React.ReactNode {
  const list = items.map(item => (
    <NavigationListItem
      active={
        activeLinkFn ? activeLinkFn({ group, items, id: item.id }) : false
      }
      key={`${group}-${item.id}`}
    >
      <Link.Internal to={linkFn({ group, items, id: item.id })}>
        <NavigationListItemName>
          <span>{item.displayName}</span>
        </NavigationListItemName>
      </Link.Internal>
    </NavigationListItem>
  ));

  return (
    <div key={group}>
      {showGroups && items.length > 1 && group.toLowerCase() !== "root" ? (
        <NavigationGroupName>{group}</NavigationGroupName>
      ) : null}
      <NavigationList>{list}</NavigationList>
    </div>
  );
}

export const Navigation: React.FunctionComponent<NavigationProps> = ({
  navigation,
  linkFn,
  activeLinkFn,
  docsVersionSwitcher,
}) => {
  const { showMobileLeftNav } = useContext(GenericDocsContext);

  const numberOfGroups = Object.keys(navigation).length;
  const lists = Object.keys(navigation).map(group =>
    renderList(
      group,
      navigation[group],
      linkFn,
      activeLinkFn,
      numberOfGroups > 1,
    ),
  );

  return (
    <NavigationWrapper showMobileNav={showMobileLeftNav}>
      {docsVersionSwitcher && (
        <VersionSwitcherWrapper>{docsVersionSwitcher}</VersionSwitcherWrapper>
      )}
      <NavigationListWrapper>{lists}</NavigationListWrapper>
    </NavigationWrapper>
  );
};
