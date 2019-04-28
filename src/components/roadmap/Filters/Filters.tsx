import React from "react";

import Icon from "@components/shared/Icon";

import { Capability } from "../types";

import { FiltersList, Filter, FilterButton } from "./styled";

interface Props {
  capabilities: Capability[];
  checkedCapabilities: string[];
  setCapability: (capability: string) => void;
  clearFilters: () => void;
}

const Filters: React.FunctionComponent<Props> = ({
  capabilities,
  checkedCapabilities,
  setCapability,
  clearFilters,
}) => (
  <FiltersList>
    {checkedCapabilities.map(capability => {
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
    {checkedCapabilities.length ? (
      <Filter key={"clear-all"} onClick={clearFilters}>
        <FilterButton>Clear all</FilterButton>
      </Filter>
    ) : null}
  </FiltersList>
);

export default Filters;
