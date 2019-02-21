import React from "react";

import { Icon } from "./styled";

interface SlideIconProps {
  iconPath: string;
  altText?: string;
}

const SlideIcon: React.FunctionComponent<SlideIconProps> = ({
  iconPath,
  altText,
}) => {
  if (!iconPath) {
    return null;
  }

  return <Icon src={iconPath} alt={altText} />;
};

export default SlideIcon;
