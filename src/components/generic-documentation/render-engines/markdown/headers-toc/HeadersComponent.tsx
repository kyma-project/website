import React, { useRef, useContext } from "react";

import { plugins } from "@kyma-project/dc-markdown-render-engine";

import { GenericDocsContext } from "../../../services";

import { RenderedHeader } from "./RenderedHeader";
import { checkIsInView, postProcessingHeaders } from "../helpers";
import { HeadersNavigationsWrapper, StyledHeadersNavigation } from "./styled";

const HN = plugins.HeadersNavigation;

export interface HeadersNavigationProps {
  enableSmoothScroll?: boolean;
}

export const HeadersNavigation: React.FunctionComponent<
  HeadersNavigationProps
> = ({ enableSmoothScroll = false }) => {
  const { showMobileRightNav } = useContext(GenericDocsContext);
  const headersWrapperRef = useRef<HTMLDivElement>();

  return (
    <HeadersNavigationsWrapper
      ref={headersWrapperRef as any}
      showMobileNav={showMobileRightNav}
      className="headers-navigation-wrapper"
    >
      <HN
        postProcessing={postProcessingHeaders}
        enableSmoothScroll={enableSmoothScroll}
        callback={checkIsInView(headersWrapperRef)}
        offset={16}
      >
        <StyledHeadersNavigation className="cms__toc-wrapper">
          <RenderedHeader />
        </StyledHeadersNavigation>
      </HN>
    </HeadersNavigationsWrapper>
  );
};
