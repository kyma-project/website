import React from "react";
import styled from "@styled";

const StyledStrong = styled.strong`
  font-weight: ${props => props.theme.fontWeight.bold};
`;

export const Strong: React.FunctionComponent<{}> = ({ children }) => (
  <StyledStrong>{children}</StyledStrong>
);
