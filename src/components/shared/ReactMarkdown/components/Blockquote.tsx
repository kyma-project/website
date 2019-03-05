import React from "react";
import styled from "@styled";

const StyledBlockQuote = styled.blockquote`
  margin-left: 0;
  padding-left: 1.6rem;
  border-left: 3px solid rgba(27, 31, 35, 0.2);
`;

export const BlockQuote: React.FunctionComponent = ({ children }) => (
  <StyledBlockQuote>{children}</StyledBlockQuote>
);
