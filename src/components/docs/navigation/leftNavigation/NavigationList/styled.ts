import React from "react";
import styled, { media } from "@styled";
import { customScrollBar } from "@styled/mixins";

import Link from "@components/shared/Link";

export const NavigationContainer = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 58px);

  ${media.tablet`
    max-height: calc(100vh - 116px);
  `};

  ${customScrollBar({
    thumbBorderRadius: "6px",
    trackBorderRadius: "6px",
  })}
`;

interface SeparatorProps {
  height?: string;
  margin?: string;
}

export const Separator = styled.div`
  box-sizing: border-box;
  display: block;
  height: ${(props: SeparatorProps) => (props.height ? props.height : "1px")};
  opacity: 0.1;
  background-color: #000000;
  margin: ${(props: SeparatorProps) => (props.margin ? props.margin : "0")};
`;

export const NavigationGroupContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 10px 16px 10px 0;
  text-align: left;
`;

export const NavigationHeader = styled.div`
  font-size: 12px;
  font-weight: 300;
  text-align: left;
  color: rgba(63, 80, 96, 0.6);
  padding: 10px 0;
  text-transform: uppercase;
`;

interface NavigationItemsProps {
  marginTop?: boolean;
  secondary?: boolean;
  showAll?: boolean;
  show?: boolean;
}

export const NavigationItems = styled.ul`
  width: auto;
  margin: 0;
  margin-top: ${(props: NavigationItemsProps) =>
    props.marginTop ? "10px" : "0"};
  margin-bottom: ${props => (props.marginTop ? "-10px" : "0")} !important;
  margin-left: ${props => (props.secondary ? "10px" : "0")};
  padding: 0;
  max-height: ${props =>
    (props.show && "9000px") || (props.showAll && "auto") || "0"};
  overflow-y: ${props => (props.show ? "auto" : "hidden")};
`;

export const NavigationItem = styled.li`
  display: block;
  padding: 10px 0;
  margin-bottom: 0;
`;

export const LinkWrapper = styled.div`
  position: relative;
`;

interface NavigationSectionArrowProps {
  active?: boolean;
  activeArrow?: boolean;
}

export const NavigationSectionArrow = styled.a`
  width: 16px;
  height: 100%;
  display: block;
  position: absolute;
  z-index: 50;
  cursor: pointer;
  :before {
    content: "";
    display: "block";
    width: 0;
    height: 0;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    border-left: ${(props: NavigationSectionArrowProps) =>
      props.active ? `3px solid #167ee6` : "3px solid rgba(50,54,58,0.6)"};
    left: 2px;
    top: 50%;
    position: absolute;
    transform: translateY(-50%);
    transform: ${props =>
      props.activeArrow
        ? "translateY(-50%) rotate(90deg)"
        : "translateY(-50%)"};
  }
`;

interface NavigationLinkProps {
  active?: boolean;
  bold?: boolean;
  borderLeft?: boolean | string;
}

export const NavigationLink = styled(Link.Internal)`
  color: ${(props: NavigationLinkProps) =>
    props.active ? "#167ee6" : "#485766"};
  font-size: 14px;
  font-weight: ${props => (props.bold ? "bold" : "normal")};
  display: block;
  padding-left: ${props =>
    props.borderLeft && props.active ? "13px" : "16px"};
  position: relative;
  text-decoration: none;
  border-left: ${props =>
    props.borderLeft && props.active ? "3px solid #167ee6" : "none"};

  :hover {
    color: #167ee6;
    cursor: pointer;
  }
`;
