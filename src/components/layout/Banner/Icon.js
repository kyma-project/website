import React from "react";
import { StyledIcon } from "./styled";
const Icon = ({ iconPath }) => {
  if (!iconPath) {
    return null;
  }
  let iconRef = null;
  if (iconPath) {
    try {
      iconRef = require(`../../../banner/assets/${iconPath}`);
    } catch (err) {
      console.error(err);
    }
  }
  if (iconPath && iconRef) {
    return <StyledIcon src={iconRef} alt="Banner Icon" />;
  }
  return null;
};

export default Icon;
