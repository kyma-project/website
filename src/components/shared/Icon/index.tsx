import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconPrefix,
  IconName,
  IconProp,
} from "@fortawesome/fontawesome-svg-core";

export interface IconProps {
  iconName: string;
  iconPrefix?: string;
  className?: string;
}

const Icon: React.StatelessComponent<IconProps> = ({
  iconName,
  iconPrefix = "fab",
  className = "",
}) => {
  const icon: IconProp = [iconPrefix as IconPrefix, iconName as IconName];

  return <FontAwesomeIcon icon={icon} className={className} />;
};

export default Icon;
