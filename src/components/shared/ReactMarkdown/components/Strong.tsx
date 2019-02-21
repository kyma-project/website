import React from "react";
import styled from "@styled";

const StyledStrong = styled.strong`
  font-weight: ${props => props.theme.fontWeight.bold};
`;

interface StrongProps {}

export const Strong: React.FunctionComponent<StrongProps> = ({ children }) => {
  return <StyledStrong>{children}</StyledStrong>;
};
