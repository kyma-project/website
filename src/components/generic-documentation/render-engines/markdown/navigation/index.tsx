import React from "react";

import Link from "@components/shared/Link";
import { DocsNavigation, DocsNavigationTopic } from "@components/docs/types";

import {
  NavigationWrapper,
  NavigationList,
  NavigationListItem,
  NavigationListItemName,
  NavigationGroupName,
} from "./styled";

export type linkFn = ({
  group,
  items,
  id,
}: {
  group: string;
  items: DocsNavigationTopic[];
  id: string;
}) => string;

export interface NavigationProps {
  navigation: DocsNavigation;
  linkSerializer: linkFn;
}

function renderList(
  group: string,
  items: DocsNavigationTopic[],
  linkSerializer: linkFn,
): React.ReactNode {
  const list = items.map(item => (
    <NavigationListItem active={false} key={`${group}-${item.id}`}>
      <Link.Internal to={linkSerializer({ group, items, id: item.id })}>
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
  linkSerializer,
}) => {
  const lists = Object.keys(navigation).map(group =>
    renderList(group, navigation[group], linkSerializer),
  );

  return <NavigationWrapper>{lists}</NavigationWrapper>;
};
