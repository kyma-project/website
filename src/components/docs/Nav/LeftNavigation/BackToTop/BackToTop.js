import React from "react";
import styled from "styled-components";

import ui from "../../../../../locales/en/UI.json";

const Link = styled.a`
  color: ${props => (props.active ? "#167ee6" : "#485766")};
  font-size: 16px;
  font-weight: ${props => (props.bold ? "bold" : "normal")};
  display: block;
  position: relative;
  text-decoration: none;
  border-bottom: 1px solid #e5e5e5;
  padding: 10px 0;
  :hover {
    color: #167ee6;
  }
`;

const Icon = styled.span`
  margin-right: 5px;
`;

const BackToTop = ({ contentId }) => (
  <Link href={`#${contentId}`}>
    <Icon>&uarr;</Icon> {ui.docs.backToTop}
  </Link>
);

export default BackToTop;
