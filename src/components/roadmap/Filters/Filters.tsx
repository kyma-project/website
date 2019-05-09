import React, { useContext } from "react";

import Icon from "@components/shared/Icon";

import RoadmapService from "@components/roadmap/service";
import TicketsService from "@components/roadmap/Tickets/service";

import { Capability } from "../types";

import { FiltersList, Filter, FilterButton } from "./styled";

const Filters: React.FunctionComponent = () => {
  const { capabilities } = useContext(RoadmapService);
  const { filters, setCapability, clearFilters } = useContext(TicketsService);

  if (!filters.capabilities || !filters.capabilities.length) {
    return null;
  }

  return (
    <>
      <FiltersList>
        {filters.capabilities.map(capability => {
          const displayName = capabilities.find(
            cap => cap.frontmatter.id === capability,
          )!.frontmatter.displayName;

          return (
            <Filter key={displayName} onClick={() => setCapability(capability)}>
              <FilterButton>
                {displayName}
                <Icon iconName="times" iconPrefix="fas" />
              </FilterButton>
            </Filter>
          );
        })}
        <Filter key={"clear-all"} onClick={clearFilters}>
          <FilterButton>Clear all</FilterButton>
        </Filter>
      </FiltersList>
    </>
  );
};

export default Filters;
