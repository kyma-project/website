import React, { useContext } from "react";

import Link from "@components/shared/Link";

import CapabilitySvg from "@components/roadmap/Svg";

import ScrollSpy from "@common/state/useScrollSpy";
import RoadmapService from "@components/roadmap/service";
import TicketsService from "@components/roadmap/Tickets/service";

import { CAPABILITY_SCROLL_SPY_NODE } from "@components/roadmap/constants";

import {
  NavigationList,
  NavigationListItem,
  NavigationListItemName,
} from "./styled";

const Navigation: React.FunctionComponent = () => {
  const {
    pageContext: { capabilitiesNavigation, ids },
    location,
  } = useContext(RoadmapService);
  const { clearFilters } = useContext(TicketsService);
  const { activeNodes } = useContext(ScrollSpy.Context);

  const isActive = (id: string): boolean => {
    if (activeNodes && activeNodes[CAPABILITY_SCROLL_SPY_NODE]) {
      return activeNodes[CAPABILITY_SCROLL_SPY_NODE].id === id;
    }
    return false;
  };

  const LinkType = location.search ? Link.Internal : Link.Hash;

  return (
    <NavigationList>
      {capabilitiesNavigation.map(item => (
        <NavigationListItem key={item.displayName} active={isActive(item.id)}>
          <LinkType to={location.search ? `/roadmap/#${item.id}` : item.id}>
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

export default Navigation;
