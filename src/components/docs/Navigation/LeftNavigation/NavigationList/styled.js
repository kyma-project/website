import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import { DOCS_RESPONSIVE_BREAKPOINT } from "../../../../../constants/docs";

export const Wrapper = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 94px);

  @media (max-width: ${DOCS_RESPONSIVE_BREAKPOINT}px) {
    max-height: calc(100vh - 140px);
  }
`;

export const Separator = styled.div`
  box-sizing: border-box;
  display: block;
  height: ${props => (props.height ? props.height : "1px")};
  opacity: 0.1;
  background-color: #000000;
  margin: ${props => (props.margin ? props.margin : "0")};
`;

export const NavigationContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 10px 0;
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

export const NavigationItems = styled.ul`
  width: auto;
  margin: 0;
  margin-top: ${props => (props.marginTop ? "10px" : "0")};
  margin-bottom: ${props => (props.marginTop ? "-10px" : "0")};
  margin-left: ${props => (props.secondary ? "10px" : "0")};
  padding: 0;
  max-height: ${props =>
    (props.show && "9000px") || (props.showAll && "auto") || "0"};
  overflow-y: ${props => (props.show ? "auto" : "hidden")};
`;

export const NavigationItem = styled.li`
  display: block;
  padding: 10px 0;
`;

export const LinkWrapper = styled.div`
  position: relative;
`;

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
    border-left: ${props =>
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

export const NavigationLink = styled(({ active, parentId, ...otherProps }) => (
  <Link {...otherProps} />
))`
  color: ${props => (props.active ? "#167ee6" : "#485766")};
  font-size: 14px;
  font-weight: ${props => (props.bold ? "bold" : "normal")};
  display: block;
  padding-left: ${props => (props.parentId && props.active ? "13px" : "16px")};
  position: relative;
  text-decoration: none;
  border-left: ${props =>
    props.parentId && props.active ? "3px solid #167ee6" : "none"};

  :hover {
    color: #167ee6;
    cursor: pointer;
  }
`;
