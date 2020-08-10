import React, { useState } from "react";

import Link from "@components/shared/Link";

import {
  DropDownWrapper,
  DropdownActionElementWrapper,
  DropdownDropElementWrapper,
  DropdownListWrapper,
  DropdownList,
  DropdownListItem,
} from "./styled";

interface NavDropdown {
  elements: Array<{
    displayName: string;
    url: string;
    active: boolean;
  }>;
  toggleVisibility: () => void;
}

const NavDropdown: React.FunctionComponent<NavDropdown> = ({
  elements = [],
  toggleVisibility,
  children,
}) => {
  const [dropOpen, setDropOpen] = useState(false);

  const list = elements.map(el => (
    <DropdownListItem key={el.displayName} onClick={toggleVisibility}>
      <Link.Internal to={el.url}>{el.displayName}</Link.Internal>
    </DropdownListItem>
  ));

  return (
    <DropDownWrapper
      onMouseEnter={() => {
        setDropOpen(true);
      }}
      onMouseLeave={() => {
        setDropOpen(false);
      }}
    >
      <DropdownActionElementWrapper>{children}</DropdownActionElementWrapper>
      <DropdownDropElementWrapper>
        <DropdownListWrapper active={dropOpen}>
          <DropdownList>{list}</DropdownList>
        </DropdownListWrapper>
      </DropdownDropElementWrapper>
    </DropDownWrapper>
  );
};

export default NavDropdown;
