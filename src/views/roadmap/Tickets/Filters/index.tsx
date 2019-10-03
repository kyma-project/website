import React from "react";

import Icon from "@components/shared/Icon";

import { useRoadmapService, useTicketsService } from "../../Services";

import { FiltersList, Filter, FilterButton } from "./styled";

export const Filters: React.FunctionComponent = () => {
  const {
    pageContext: { capabilities },
  } = useRoadmapService();
  const { filters, setCapability, clearFilters } = useTicketsService();

  if (!filters.capabilities || !filters.capabilities.length) {
    return null;
  }

  const filteredFilters = filters.capabilities.map(capability => {
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
  });

  return (
    <>
      <FiltersList>
        {filteredFilters}
        <Filter key={"clear-all"} onClick={clearFilters}>
          <FilterButton>Clear all</FilterButton>
        </Filter>
      </FiltersList>
    </>
  );
};
