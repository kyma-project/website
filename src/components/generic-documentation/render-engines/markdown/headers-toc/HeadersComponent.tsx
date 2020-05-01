import React, { useState, useEffect, useRef, useContext } from "react";
import { useLockBodyScroll, useToggle } from "react-use";

import { plugins } from "@kyma-project/dc-markdown-render-engine";

import { useScrollPosition } from "@common/hooks/useScrollPosition";
import { BLOG_POST_VISIBILITY_OFFSET_BREAKPOINT } from "@common/constants";

import { GenericDocsContext } from "../../../services";

import { RenderedHeader } from "./RenderedHeader";
import { scrollSpyCallback, postProcessingHeaders } from "../helpers";
import { HeadersNavigationsWrapper, StyledHeadersNavigation } from "./styled";

const HN = plugins.HeadersNavigation;

export interface HeadersNavigationProps {
  enableSmoothScroll?: boolean;
  visibleOnScroll?: boolean;
}

export const HeadersNavigation: React.FunctionComponent<HeadersNavigationProps> = ({
  enableSmoothScroll = false,
  visibleOnScroll = false,
  children = null,
}) => {
  const { showMobileRightNav } = useContext(GenericDocsContext);
  const headersWrapperRef = useRef<HTMLDivElement>();
  const [locked, toggleLocked] = useToggle(false);
  useLockBodyScroll(locked);
  const [visible, setVisible] = useState<boolean>(!visibleOnScroll);
  const scrollPosition = useScrollPosition();

  useEffect(() => {
    if (!visibleOnScroll) {
      return;
    }

    if (scrollPosition >= BLOG_POST_VISIBILITY_OFFSET_BREAKPOINT && !visible) {
      setVisible(true);
    }
    if (scrollPosition < BLOG_POST_VISIBILITY_OFFSET_BREAKPOINT && visible) {
      setVisible(false);
    }
  }, [scrollPosition]);

  const onMouseEnter = () => {
    toggleLocked(true);
  };

  const onMouseLeave = () => {
    toggleLocked(false);
  };

  return (
    <HeadersNavigationsWrapper
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={headersWrapperRef as any}
      showMobileNav={showMobileRightNav}
      visible={visible}
      className="headers-navigation-wrapper"
    >
      <HN
        postProcessing={postProcessingHeaders}
        enableSmoothScroll={enableSmoothScroll}
        callback={scrollSpyCallback(headersWrapperRef)}
        offset={16}
      >
        <StyledHeadersNavigation className="dc-markdown__toc-wrapper">
          <RenderedHeader />
        </StyledHeadersNavigation>
        {children}
      </HN>
    </HeadersNavigationsWrapper>
  );
};
