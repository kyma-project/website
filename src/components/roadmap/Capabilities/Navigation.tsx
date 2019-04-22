import React from "react";

import Link from "@components/shared/Link";

import CapabilitySvg from "@components/roadmap/Svg";

import { extractCapabilityByDisplayName } from "../helpers";
import { NavigationItem, CapabilityEnum } from "../types";

import {
  NavigationList,
  NavigationListItem,
  NavigationListItemName,
} from "./styled";

interface NavigationProps {
  items: NavigationItem[];
  pathName: string;
}

const Navigation: React.FunctionComponent<NavigationProps> = ({
  items,
  pathName,
}) => {
  const isActive = (path: string): boolean => pathName.includes(path);

  return (
    <NavigationList>
      {items.map(item => (
        <NavigationListItem key={item.displayName} active={isActive(item.path)}>
          <Link.Internal to={item.path}>
            <CapabilitySvg
              capability={extractCapabilityByDisplayName(item.displayName)}
            />
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
