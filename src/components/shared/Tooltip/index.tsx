import React, { useState } from "react";

import { TooltipWrapper, TooltipContainer } from "./styled";

interface TooltipProps {
  content: React.ReactNode;
  showFullTime?: boolean;
  timeout?: number;
  placement?: "left" | "top" | "right" | "bottom";
}

const Tooltip: React.FunctionComponent<TooltipProps> = ({
  children,
  content,
  showFullTime = false,
  timeout = 200,
  placement = "top",
}) => {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleShow = () => {
    setShow(true);
    setVisible(true);
  };

  const handleHide = () => {
    setVisible(false);

    if (!showFullTime) {
      setTimeout(() => setShow && setShow(false), timeout);
    }
  };

  return (
    <TooltipWrapper onMouseEnter={handleShow} onMouseLeave={handleHide}>
      {children}
      <TooltipContainer
        placement={placement}
        timeout={timeout}
        show={show}
        visible={visible}
      >
        {content}
      </TooltipContainer>
    </TooltipWrapper>
  );
};

export default Tooltip;
