import React from "react";
import styled from "@styled";

const StyledOl = styled.ol`
  list-style-type: decimal;
  margin-left: 28px;
`;

const StyledUl = styled.ul`
  list-style-type: disc;
  margin-left: 20px;
`;

interface ListProps {
  start: number;
  ordered: boolean;
  tight: boolean;
  depth: number;
}

export const List: React.FunctionComponent<ListProps> = ({
  start,
  ordered,
  tight,
  depth,
  children,
}) => {
  if (ordered) {
    return <StyledOl start={start}>{children}</StyledOl>;
  }
  return <StyledUl>{children}</StyledUl>;
};
