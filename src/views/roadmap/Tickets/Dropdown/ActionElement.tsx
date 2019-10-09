import React from "react";

import Icon from "@components/shared/Icon";

import { DropdownIcon } from "./styled";

interface Props {
  capabilitiesDropOpen: boolean;
}

export const ActionElement: React.FunctionComponent<Props> = ({
  capabilitiesDropOpen = false,
}) => (
  <DropdownIcon capabilitiesDropOpen={capabilitiesDropOpen}>
    <Icon iconName="sliders-h" iconPrefix="fas" />
  </DropdownIcon>
);
