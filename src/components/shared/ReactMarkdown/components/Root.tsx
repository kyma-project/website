import React from "react";
import styled from "@styled";

const StyledRoot = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`;

export const Root: React.FunctionComponent = ({ children }) => {
  return <StyledRoot>{children}</StyledRoot>;
};
