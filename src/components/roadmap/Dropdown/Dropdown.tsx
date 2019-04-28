import React, { useRef } from "react";

import useDropdown from "@components/shared/DropDown/useDropdown";

import ActionElement from "@components/roadmap/Dropdown/ActionElement";
import DropElement from "@components/roadmap/Dropdown/DropElement";

import {
  DropDownWrapper,
  DropdownDropElementWrapper,
  DropdownActionElementWrapper,
} from "./styled";

const Dropdown: React.FunctionComponent = () => {
  const iconEl = useRef(null);
  const capabilitiesDropEl = useRef(null);
  const [capabilitiesDropOpen, toggleCapabilitiesDrop] = useDropdown(
    capabilitiesDropEl,
    iconEl,
  );

  return (
    <DropDownWrapper>
      <DropdownActionElementWrapper
        ref={iconEl}
        onClick={toggleCapabilitiesDrop as any}
      >
        <ActionElement />
      </DropdownActionElementWrapper>
      <DropdownDropElementWrapper>
        <DropElement />
      </DropdownDropElementWrapper>
    </DropDownWrapper>
  );
};

export default Dropdown;
