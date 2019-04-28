import React, { useRef } from "react";

import Icon from "@components/shared/Icon";

import { DropdownIcon } from "./styled";

const ActionElement: React.FunctionComponent = () => (
  <DropdownIcon>
    <Icon iconName="sliders-h" iconPrefix="fas" />
  </DropdownIcon>
);

export default ActionElement;
