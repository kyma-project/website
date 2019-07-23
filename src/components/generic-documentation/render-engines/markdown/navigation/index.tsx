import React from "react";
import { globalHistory } from "@reach/router";

import Link from "@components/shared/Link";
import { DocsNavigation, DocsNavigationTopic } from "@components/docs/types";

import {
  NavigationWrapper,
  NavigationList,
  NavigationListItem,
  NavigationListItemName,
  NavigationGroupName,
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
  lastItem,
}: {
  group: string;
  items: DocsNavigationTopic[];
  id: string;
  lastItem: string;
}) => boolean;

export interface NavigationProps {
  navigation: DocsNavigation;
  linkFn: linkSerializer;
  activeLinkFn?: activeLinkChecker;
}

function renderList(
  group: string,
  items: DocsNavigationTopic[],
  linkFn: linkSerializer,
  activeLinkFn?: activeLinkChecker,
): React.ReactNode {
  const lastItem = globalHistory.location.pathname
    .split("/")
    .reverse()
    .filter(el => el)[0];
  const defaultActiveChecker = (id: string) => lastItem === id;

  const list = items.map(item => (
    <NavigationListItem
      active={
        activeLinkFn
          ? activeLinkFn({ group, items, id: item.id, lastItem })
          : lastItem === item.id
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
      <NavigationGroupName>
        {items.length > 1 ? group : null}
      </NavigationGroupName>
      <NavigationList>{list}</NavigationList>
    </div>
  );
}

export const Navigation: React.FunctionComponent<NavigationProps> = ({
  navigation,
  linkFn,
  activeLinkFn,
}) => {
  const lists = Object.keys(navigation).map(group =>
    renderList(group, navigation[group], linkFn, activeLinkFn),
  );

  return <NavigationWrapper>{lists}</NavigationWrapper>;
};
