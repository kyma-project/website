import React from "react";
import { StyledIcon } from "./styled";
const Icon = ({ iconPath }) => {
  if (!iconPath) {
    return null;
  }
  let iconRef = null;
  try {
    iconRef = require(`../../../banner/assets/${iconPath}`);
  } catch (err) {
    console.error(err);
    return null;
  }
  return <StyledIcon src={iconRef} alt="Banner Icon" />;
};

export default Icon;
