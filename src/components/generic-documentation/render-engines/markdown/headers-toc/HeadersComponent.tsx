import React, { useRef, useEffect, useContext } from "react";

import { is } from "@styled";

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

  useEffect(() => {
    const html = document.querySelector(`html`);
    const nav = headersWrapperRef.current;

    const onMouseOver = (element?: any) => (e: Event) => {
      e.stopPropagation();
      if (!element || is.phone()) {
        return;
      }

      if (html) {
        html.style.overflowY = `hidden`;
      }

      element.style.overflowY = `auto`;
    };

    const onMouseOverNav = onMouseOver(nav);
    const onMouseOverGlobalWrapper = onMouseOver(html);

    nav && nav.addEventListener("mouseover", onMouseOverNav);
    html && html.addEventListener("mouseover", onMouseOverGlobalWrapper);

    return () => {
      nav && nav.removeEventListener("mouseover", onMouseOverNav);
      html && html.addEventListener("mouseover", onMouseOverGlobalWrapper);
    };
  }, [headersWrapperRef]);

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
