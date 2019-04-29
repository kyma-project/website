import React, { useContext } from "react";

import Link from "@components/shared/Link";

import CapabilitySvg from "@components/roadmap/Svg";

import ScrollSpy from "@common/state/useScrollSpy";
import RoadmapService from "@components/roadmap/service";

import { CAPABILITY_SCROLL_SPY_NODE } from "@components/roadmap/constants";

import {
  NavigationList,
  NavigationListItem,
  NavigationListItemName,
} from "./styled";

const Navigation: React.FunctionComponent = () => {
  const {
    pageContext: { capabilitiesNavigation, ids },
  } = useContext(RoadmapService);
  const { activeNodes } = useContext(ScrollSpy.Context);

  const isActive = (id: string): boolean => {
    if (activeNodes && activeNodes[CAPABILITY_SCROLL_SPY_NODE]) {
      return activeNodes[CAPABILITY_SCROLL_SPY_NODE].id === id;
    }
    return false;
  };

  return (
    <NavigationList>
      {capabilitiesNavigation.map(item => (
        <NavigationListItem key={item.displayName} active={isActive(item.id)}>
          <Link.Hash to={item.id}>
            <CapabilitySvg capability={ids[item.displayName]} />
            <NavigationListItemName>
              <span>{item.displayName}</span>
            </NavigationListItemName>
          </Link.Hash>
        </NavigationListItem>
      ))}
    </NavigationList>
  );
};

export default Navigation;
