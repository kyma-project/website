import React from "react";

import Checkbox from "@components/shared/Checkbox";

import { useRoadmapService, useTicketsService } from "../../Services";

import {
  DropdownListWrapper,
  DropdownList,
  DropdownListItem,
  DropdownListItemName,
} from "./styled";

export const DropElement: React.FunctionComponent = () => {
  const {
    pageContext: { capabilities },
  } = useRoadmapService();
  const { filters, setCapability } = useTicketsService();

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
