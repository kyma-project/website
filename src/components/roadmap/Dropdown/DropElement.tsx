import React, { useContext } from "react";

import Icon from "@components/shared/Icon";
import Checkbox from "@components/shared/Checkbox";

import RoadmapService from "@components/roadmap/service";
import TicketsService from "@components/roadmap/Tickets/service";

import { Capability } from "../types";

import {
  DropdownListWrapper,
  DropdownList,
  DropdownListItem,
  DropdownListItemName,
} from "./styled";

const DropElement: React.FunctionComponent = () => {
  const { capabilities } = useContext(RoadmapService);
  const { filters, setCapability } = useContext(TicketsService);

  return (
    <DropdownListWrapper>
      <DropdownList>
        {capabilities.map((capability, idx) => (
          <DropdownListItem key={idx}>
            <label>
              <DropdownListItemName>
                {capability.frontmatter.displayName}
              </DropdownListItemName>
              <Checkbox
                checked={filters.capabilities.includes(
                  capability.frontmatter.id,
                )}
                onChange={() => null}
                onClick={() => {
                  setCapability(capability.frontmatter.id);
                }}
              />
            </label>
          </DropdownListItem>
        ))}
      </DropdownList>
    </DropdownListWrapper>
  );
};

export default DropElement;
