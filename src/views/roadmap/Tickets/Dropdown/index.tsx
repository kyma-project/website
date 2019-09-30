import React, { useContext, useRef } from "react";

import { useToggle } from "@common/hooks/useToggle";

import { useRoadmapService } from "../../Services";

import { ActionElement } from "./ActionElement";
import { DropElement } from "./DropElement";

import {
  DropDownWrapper,
  DropdownDropElementWrapper,
  DropdownActionElementWrapper,
} from "./styled";

export const Dropdown: React.FunctionComponent = () => {
  const { ticketsReference } = useRoadmapService();

  const iconEl = useRef(null);
  const capabilitiesDropEl = useRef(null);
  const [capabilitiesDropOpen, toggleCapabilitiesDrop] = useToggle(
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
