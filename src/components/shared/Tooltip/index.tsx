import React from "react";
import { Tooltip as TippyTooltip, TooltipProps } from "react-tippy";

const Tooltip: React.FunctionComponent<TooltipProps> = ({
  title,
  position = "top",
  arrow = true,
  children,
  ...otherProps
}) => (
  <TippyTooltip
    title={title}
    arrow={arrow}
    position={position}
    // @ts-ignore
    theme="kyma"
    {...otherProps}
  >
    {children}
  </TippyTooltip>
);

export default Tooltip;
