import React, { useContext, useRef } from "react";

import useDropdown from "@common/hooks/useDropdown";

import RoadmapService from "@components/roadmap/service";

import ActionElement from "@components/roadmap/Dropdown/ActionElement";
import DropElement from "@components/roadmap/Dropdown/DropElement";

import { Capability } from "../types";

import {
  DropDownWrapper,
  DropdownDropElementWrapper,
  DropdownActionElementWrapper,
} from "./styled";

const Dropdown: React.FunctionComponent = () => {
  const { ticketsReference } = useContext(RoadmapService);

  const iconEl = useRef(null);
  const capabilitiesDropEl = useRef(null);
  const [capabilitiesDropOpen, toggleCapabilitiesDrop] = useDropdown(
    capabilitiesDropEl,
    iconEl,
  );

  return (
    <div ref={ticketsReference}>
      <DropDownWrapper>
        <DropdownActionElementWrapper
          ref={iconEl}
          onClick={toggleCapabilitiesDrop as any}
        >
          <ActionElement
            capabilitiesDropOpen={capabilitiesDropOpen as boolean}
          />
        </DropdownActionElementWrapper>
        <DropdownDropElementWrapper
          ref={capabilitiesDropEl}
          hidden={!capabilitiesDropOpen}
        >
          <DropElement />
        </DropdownDropElementWrapper>
      </DropDownWrapper>
    </div>
  );
};

export default Dropdown;
