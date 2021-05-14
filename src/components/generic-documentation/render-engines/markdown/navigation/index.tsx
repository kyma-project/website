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
export type activeLinkChecker = (path: string[]) => boolean;

export interface NavigationProps {
  navigation: DocsNavigationElement[];
  linkFn: linkSerializer;
  activeLinkFn?: activeLinkChecker;
  docsVersionSwitcher?: React.ReactNode;
}

function renderListElement(
  element: DocsNavigationElement,
  path: string[],
  linkFn: linkSerializer,
  activeLinkFn?: activeLinkChecker,
): React.ReactNode {
  const curPath = [...path, element.id];

  const [subHidden, setSubHidden] = useState(
    activeLinkFn ? activeLinkFn(curPath) : true,
  );
  const toggleSub = () => setSubHidden(!subHidden);

  return (
    <NavigationListItem>
      <NavigationListItemMain
        active={activeLinkFn ? activeLinkFn(curPath) : false}
      >
        {element.children.length > 0 && (
          <SubToggle
            onClick={toggleSub}
            active={activeLinkFn ? activeLinkFn(curPath) : false}
          >
            <Icon
              iconName={subHidden ? "chevron-right" : "chevron-down"}
              iconPrefix="fas"
            />
          </SubToggle>
        )}
        {element.noContent ? (
          <NoContent active={activeLinkFn ? activeLinkFn(curPath) : false}>
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

      {element.children.length > 0 && (
        <NavigationList level={curPath.length} hidden={subHidden}>
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
  activeLinkFn,
  docsVersionSwitcher,
}) => {
  const { showMobileLeftNav } = useContext(GenericDocsContext);

  const mockNavigation: DocsNavigationElement[] = [
    {
      displayName: "Get  started",
      id: "one",
      noContent: false,
      children: [],
    },
    {
      displayName: "Overview",
      id: "two",
      noContent: false,
      children: [
        {
          displayName: "sub-one",
          id: "one",
          noContent: false,
          children: [],
        },
        {
          displayName: "sub-two",
          id: "two",
          noContent: false,
          children: [],
        },
        {
          displayName: "sub-three",
          id: "three",
          noContent: false,
          children: [],
        },
      ],
    },
    {
      displayName: "Glossary (no content)",
      id: "three",
      noContent: true,
      children: [
        {
          displayName: "sub-one",
          id: "one",
          noContent: false,
          children: [
            {
              displayName: "sub-sub-one",
              id: "one",
              noContent: true,
              children: [
                {
                  displayName: "sub-sub-sub-one",
                  id: "one",
                  noContent: false,
                  children: [],
                },
              ],
            },
            {
              displayName: "sub-sub-two",
              id: "two",
              noContent: false,
              children: [],
            },
          ],
        },
        {
          displayName: "sub-two",
          id: "two",
          noContent: false,
          children: [],
        },
        {
          displayName: "sub-three",
          id: "three",
          noContent: false,
          children: [],
        },
      ],
    },
  ];

  return (
    <NavigationWrapper showMobileNav={showMobileLeftNav}>
      {docsVersionSwitcher && (
        <VersionSwitcherWrapper>{docsVersionSwitcher}</VersionSwitcherWrapper>
      )}
      <NavigationListWrapper>
        <NavigationList level={0}>
          {mockNavigation.map(el =>
            renderListElement(el, [], linkFn, activeLinkFn),
          )}
        </NavigationList>
      </NavigationListWrapper>
    </NavigationWrapper>
  );
};
