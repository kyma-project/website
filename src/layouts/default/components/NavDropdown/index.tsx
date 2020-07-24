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
}

const NavDropdown: React.FunctionComponent<NavDropdown> = ({
  elements = [],
  children,
}) => {
  const [dropOpen, setDropOpen] = useState(false);

  const list = elements.map(el => (
    <DropdownListItem key={el.displayName}>
      <Link.Internal to={el.url}>{el.displayName}</Link.Internal>
    </DropdownListItem>
  ));

  return (
    <DropDownWrapper
      onMouseEnter={() => {
        setDropOpen(true);
      }}
    >
      <DropdownActionElementWrapper>{children}</DropdownActionElementWrapper>
      <DropdownDropElementWrapper
        onMouseLeave={() => {
          setDropOpen(false);
        }}
      >
        <DropdownListWrapper active={dropOpen}>
          <DropdownList>{list}</DropdownList>
        </DropdownListWrapper>
      </DropdownDropElementWrapper>
    </DropDownWrapper>
  );
};

export default NavDropdown;
