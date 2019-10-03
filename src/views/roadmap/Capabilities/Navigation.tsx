import React from "react";
import { useLocation } from "react-use";

import Link from "@components/shared/Link";

import { CapabilitySvg } from "@views/roadmap/components/CapabilitySvg";

import { useRoadmapService } from "../Services/roadmap.service";

import { useScrollSpy } from "@common/hooks";
import { NavigationItem } from "@typings/roadmap";
import { CAPABILITY_SCROLL_SPY_NODE } from "@views/roadmap/constants";

import {
  NavigationList,
  NavigationListItem,
  NavigationListItemName,
} from "./styled";

export const Navigation: React.FunctionComponent = () => {
  const {
    pageContext: { capabilitiesNavigation, ids },
  } = useRoadmapService();
  const { search } = useLocation();
  const { activeNodes } = useScrollSpy();

  const isActive = (id: string): boolean => {
    if (activeNodes && activeNodes[CAPABILITY_SCROLL_SPY_NODE]) {
      return activeNodes[CAPABILITY_SCROLL_SPY_NODE].id === id;
    }
    return false;
  };
  const link = (item: NavigationItem) =>
    search ? `/roadmap/#${item.id}` : item.id;
  const LinkType = search ? Link.Internal : Link.Hash;

  return (
    <NavigationList>
      {capabilitiesNavigation.map(item => (
        <NavigationListItem key={item.displayName} active={isActive(item.id)}>
          <LinkType to={link(item)}>
            <CapabilitySvg capability={ids[item.displayName]} />
            <NavigationListItemName>
              <span>{item.displayName}</span>
            </NavigationListItemName>
          </LinkType>
        </NavigationListItem>
      ))}
    </NavigationList>
  );
};
