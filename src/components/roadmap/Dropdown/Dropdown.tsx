import React, { useRef } from "react";

import useDropdown from "@components/shared/DropDown/useDropdown";

import ActionElement from "@components/roadmap/Dropdown/ActionElement";
import DropElement from "@components/roadmap/Dropdown/DropElement";

import { Capability } from "../types";

import {
  DropDownWrapper,
  DropdownDropElementWrapper,
  DropdownActionElementWrapper,
} from "./styled";

interface Props {
  capabilities: Capability[];
}

const Dropdown: React.FunctionComponent<Props> = ({ capabilities }) => {
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
      <DropdownDropElementWrapper
        ref={capabilitiesDropEl}
        hidden={!capabilitiesDropOpen}
      >
        <DropElement capabilities={capabilities} />
      </DropdownDropElementWrapper>
    </DropDownWrapper>
  );
};

export default Dropdown;
