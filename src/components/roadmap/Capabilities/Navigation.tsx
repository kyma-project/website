import React, { useContext } from "react";

import Link from "@components/shared/Link";

import CapabilitySvg from "@components/roadmap/Svg";

import ScrollSpy from "@common/state/useScrollSpy";

import { RoadmapPageContext, NavigationItem, CapabilityEnum } from "../types";

import { CAPABILITY_SCROLL_SPY_NODE } from "@components/roadmap/constants";

import {
  NavigationList,
  NavigationListItem,
  NavigationListItemName,
} from "./styled";

interface NavigationProps {
  pageContext: RoadmapPageContext;
}

const Navigation: React.FunctionComponent<NavigationProps> = ({
  pageContext,
}) => {
  const { activeNodes } = useContext(ScrollSpy.Context);
  const isActive = (id: string): boolean => {
    if (activeNodes && activeNodes[CAPABILITY_SCROLL_SPY_NODE]) {
      return activeNodes[CAPABILITY_SCROLL_SPY_NODE].id === id;
    }
    return false;
  };

  return (
    <NavigationList>
      {pageContext.capabilitiesNavigation.map(item => (
        <NavigationListItem key={item.displayName} active={isActive(item.id)}>
          <Link.Hash to={item.id}>
            <CapabilitySvg capability={pageContext.ids[item.displayName]} />
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
