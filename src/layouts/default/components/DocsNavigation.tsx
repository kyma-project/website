import React from "react";

import NavDropdown from "./NavDropdown";

import { NavigationItem, NavigationIntLink } from "./styled";

import config from "@config";

interface DocsNavigationProps {
  toggleVisibility: () => void;
}

const DocsNavigation: React.FunctionComponent<DocsNavigationProps> = ({
  toggleVisibility,
}) => {
  const docsNav = {
    path: "/docs/",
    title: "Docs",
  };
  const elements = Object.entries(config.docs).map(([_, doc]) => ({
    displayName: doc.displayName,
    url: `/docs/${doc.navPath}`,
    active: false,
  }));

  return (
    <NavigationItem key={docsNav.title}>
      <NavDropdown elements={elements} toggleVisibility={toggleVisibility}>
        <NavigationIntLink to={docsNav.path}>{docsNav.title}</NavigationIntLink>
      </NavDropdown>
    </NavigationItem>
  );
};

export default DocsNavigation;
