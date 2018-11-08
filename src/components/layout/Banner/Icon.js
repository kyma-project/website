import React from "react";
import { StyledIcon } from "./styled";
const Icon = ({ iconPath }) => {
  if (!iconPath) {
    return null;
  }
  let iconRef = null;
  try {
    iconRef = require(`../../../banner/${
      iconPath.indexOf("./") === 0 ? iconPath.slice(2) : iconPath
    }`);
  } catch (err) {
    console.error(err);
    return null;
  }
  return <StyledIcon src={iconRef} alt="Banner Icon" />;
};

export default Icon;
