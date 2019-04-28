import React, { useRef } from "react";

import Icon from "@components/shared/Icon";
import Checkbox from "@components/shared/Checkbox";

import { Capability } from "../types";

import {
  DropdownListWrapper,
  DropdownList,
  DropdownListItem,
  DropdownListItemName,
} from "./styled";

interface Props {
  capabilities: Capability[];
  checkedCapabilities: string[];
  setCapability: (capability: string) => void;
}

const DropElement: React.FunctionComponent<Props> = ({
  capabilities,
  checkedCapabilities,
  setCapability,
}) => (
  <DropdownListWrapper>
    <DropdownList>
      {capabilities.map((capability, idx) => (
        <DropdownListItem key={idx}>
          <label>
            <DropdownListItemName>
              {capability.frontmatter.displayName}
            </DropdownListItemName>
            <Checkbox
              checked={checkedCapabilities.includes(capability.frontmatter.id)}
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

export default DropElement;
