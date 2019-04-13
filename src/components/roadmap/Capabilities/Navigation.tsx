import React from "react";

import Link from "@components/shared/Link";

import { NavigationItem } from "../types";

import {
  NavigationList,
  NavigationListItem,
} from "./styled";

interface NavigationProps {
  items: NavigationItem[];
}

const Navigation: React.FunctionComponent<NavigationProps> = ({
  items,
}) => {
  return (
    <NavigationList>
      {items.map(item => (
        <NavigationListItem key={item.displayName}>
          <Link.Internal to={item.path}>
            {item.displayName}
          </Link.Internal>
        </NavigationListItem>
      ))}
    </NavigationList>
  );
};

export default Navigation;
