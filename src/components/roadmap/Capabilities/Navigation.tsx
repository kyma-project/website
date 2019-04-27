import React from "react";

import Link from "@components/shared/Link";

import CapabilitySvg from "@components/roadmap/Svg";

import { RoadmapPageContext, NavigationItem, CapabilityEnum } from "../types";

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
  const isActive = (path: string): boolean => true;

  return (
    <NavigationList>
      {pageContext.capabilitiesNavigation.map(item => (
        <NavigationListItem key={item.displayName} active={isActive(item.path)}>
          <Link.Internal to={item.path}>
            <CapabilitySvg capability={pageContext.ids[item.displayName]} />
            <NavigationListItemName>
              <span>{item.displayName}</span>
            </NavigationListItemName>
          </Link.Internal>
        </NavigationListItem>
      ))}
    </NavigationList>
  );
};

export default Navigation;
