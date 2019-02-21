import React from "react";
import { AlignType } from "react-markdown";

import styled from "@styled";

const StyledTable = styled.table``;

interface TableProps {
  columnAlignment: AlignType;
}

export const Table: React.FunctionComponent<TableProps> = ({
  columnAlignment,
  children,
}) => {
  return <StyledTable>{children}</StyledTable>;
};
