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
}

const DropElement: React.FunctionComponent<Props> = ({ capabilities }) => (
  <DropdownListWrapper>
    <DropdownList>
      {capabilities.map((capability, idx) => (
        <DropdownListItem key={idx}>
          <label>
            <DropdownListItemName>
              {capability.frontmatter.displayName}
            </DropdownListItemName>
            <Checkbox checked={false} />
          </label>
        </DropdownListItem>
      ))}
    </DropdownList>
  </DropdownListWrapper>
);

export default DropElement;
