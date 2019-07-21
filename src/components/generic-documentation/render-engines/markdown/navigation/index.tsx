import React from "react";

import Link from "@components/shared/Link";
import {
  DocsNavigation,
  DocsNavigationTopic,
  DocsManifest,
  DocsManifestItem,
} from "@components/docs/types";

import {
  NavigationWrapper,
  NavigationList,
  NavigationListItem,
  NavigationListItemName,
  NavigationGroupName,
} from "./styled";
import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";

export interface NavigationProps {
  navigation: DocsNavigation;
  manifest: DocsManifest;
}

function getGroups(topics: DocsNavigationTopic[]): string[] {
  if (!topics.length) {
    return [];
  }

  const groups: Set<string> = new Set<string>();
  topics.map(topic => {
    groups.add(topic.contentType);
  });

  return Array.from(groups);
}

function renderList(group: string, items: DocsManifestItem[]): React.ReactNode {
  const list = items.map(item => (
    <NavigationListItem active={false}>
      <Link.Internal to={`/docs/${group}/${item.id}`}>
        <NavigationListItemName>
          <span>{item.displayName}</span>
        </NavigationListItemName>
      </Link.Internal>
    </NavigationListItem>
  ));

  return (
    <>
      <NavigationGroupName>
        {group !== "root" ? group : null}
      </NavigationGroupName>
      <NavigationList>{list}</NavigationList>
    </>
  );
}

export const Navigation: React.FunctionComponent<NavigationProps> = ({
  navigation,
  manifest,
}) => {
  const groups = getGroups(navigation.topics);
  if (!groups.length) {
    return null;
  }

  const lists = groups.map(group => renderList(group, manifest[group]));

  return <NavigationWrapper>{lists}</NavigationWrapper>;
};
