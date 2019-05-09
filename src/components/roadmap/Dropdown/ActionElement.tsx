import React, { useRef } from "react";

import Icon from "@components/shared/Icon";

import { DropdownIcon } from "./styled";

interface Props {
  capabilitiesDropOpen: boolean;
}

const ActionElement: React.FunctionComponent<Props> = ({
  capabilitiesDropOpen = false,
}) => (
  <DropdownIcon capabilitiesDropOpen={capabilitiesDropOpen}>
    <Icon iconName="sliders-h" iconPrefix="fas" />
  </DropdownIcon>
);

export default ActionElement;
