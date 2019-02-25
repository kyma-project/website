import React from "react";
import { FontAwesomeIcon, Props } from "@fortawesome/react-fontawesome";
import {
  IconPrefix,
  IconName,
  IconProp,
} from "@fortawesome/fontawesome-svg-core";

export interface IconProps {
  iconName: string;
  iconPrefix?: string;
}

const Icon: React.StatelessComponent<IconProps> = ({
  iconName,
  iconPrefix = "fab",
}) => {
  const icon: IconProp = [iconPrefix as IconPrefix, iconName as IconName];

  return <FontAwesomeIcon icon={icon} />;
};

export default Icon;
