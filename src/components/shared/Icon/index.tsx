import React, { FunctionComponent } from "react";
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
  [key: string]: any;
}

const Icon: FunctionComponent<IconProps> = ({
  iconName,
  iconPrefix = "fab",
  className = "",
  ...otherProps
}) => {
  const icon: IconProp = [iconPrefix as IconPrefix, iconName as IconName];

  return <FontAwesomeIcon icon={icon} className={className} {...otherProps} />;
};

export default Icon;
