import React, { useState, useEffect, useContext } from "react";

import Icon from "@components/shared/Icon";
import { useScrollPosition } from "@common/hooks/useScrollPosition";

import { BackToTopIcon } from "./styled";

const OFFSET_BREAKPOINT = 350;

interface BackToTopProps {
  inDocsLayout?: boolean;
}

const BackToTop: React.FunctionComponent<BackToTopProps> = ({
  inDocsLayout = false,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const scrollPosition = useScrollPosition();

  useEffect(() => {
    if (scrollPosition >= OFFSET_BREAKPOINT && !visible) {
      setVisible(true);
    }
    if (scrollPosition < OFFSET_BREAKPOINT && visible) {
      setVisible(false);
    }
  }, [scrollPosition]);

  const backToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <BackToTopIcon
      onClick={backToTop}
      visible={visible}
      inDocsLayout={inDocsLayout}
    >
      <Icon iconName="chevron-up" iconPrefix="fas" />
    </BackToTopIcon>
  );
};

export default BackToTop;
