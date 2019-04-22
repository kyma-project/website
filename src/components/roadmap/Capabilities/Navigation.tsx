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
  pathName: string;
  id: string;
}

const Navigation: React.FunctionComponent<NavigationProps> = ({
  pageContext,
  pathName,
  id,
}) => {
  const isActive = (path: string): boolean => pathName.includes(path);

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
