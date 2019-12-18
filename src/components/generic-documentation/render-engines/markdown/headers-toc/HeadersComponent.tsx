import React, { useRef, useContext } from "react";
import { useLockBodyScroll, useToggle } from "react-use";

import { plugins } from "@kyma-project/dc-markdown-render-engine";

import { GenericDocsContext } from "../../../services";

import { RenderedHeader } from "./RenderedHeader";
import { scrollSpyCallback, postProcessingHeaders } from "../helpers";
import { HeadersNavigationsWrapper, StyledHeadersNavigation } from "./styled";

const HN = plugins.HeadersNavigation;

export interface HeadersNavigationProps {
  enableSmoothScroll?: boolean;
}

export const HeadersNavigation: React.FunctionComponent<HeadersNavigationProps> = ({
  enableSmoothScroll = false,
  children = null,
}) => {
  const { showMobileRightNav } = useContext(GenericDocsContext);
  const headersWrapperRef = useRef<HTMLDivElement>();
  const [locked, toggleLocked] = useToggle(false);
  useLockBodyScroll(locked);

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
