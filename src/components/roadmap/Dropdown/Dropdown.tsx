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
  checkedCapabilities: string[];
  setCapability: (capability: string) => void;
}

const Dropdown: React.FunctionComponent<Props> = ({
  capabilities,
  checkedCapabilities,
  setCapability,
}) => {
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
        <DropElement
          capabilities={capabilities}
          checkedCapabilities={checkedCapabilities}
          setCapability={setCapability}
        />
      </DropdownDropElementWrapper>
    </DropDownWrapper>
  );
};

export default Dropdown;
