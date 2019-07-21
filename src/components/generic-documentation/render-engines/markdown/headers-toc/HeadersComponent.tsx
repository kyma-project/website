import React from "react";
import { plugins } from "@kyma-project/dc-markdown-render-engine";
import { RenderedHeader } from "./RenderedHeader";
import { postProcessingHeaders } from "../helpers";
import { HeadersNavigationsWrapper, StyledHeadersNavigation } from "./styled";

const HN = plugins.HeadersNavigation;

export interface HeadersNavigationProps {
  enableSmoothScroll?: boolean;
}

export const HeadersNavigation: React.FunctionComponent<
  HeadersNavigationProps
> = ({ enableSmoothScroll = false }) => (
  <HeadersNavigationsWrapper className="headers-navigation-wrapper">
    <HN
      postProcessing={postProcessingHeaders}
      enableSmoothScroll={enableSmoothScroll}
    >
      <StyledHeadersNavigation className="cms__toc-wrapper">
        <RenderedHeader />
      </StyledHeadersNavigation>
    </HN>
  </HeadersNavigationsWrapper>
);
