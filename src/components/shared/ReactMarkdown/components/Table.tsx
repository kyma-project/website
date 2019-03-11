import React from "react";
import { AlignType } from "react-markdown";

import styled from "@styled";

const StyledTable = styled.table`
  display: block;
  width: 100%;
  overflow: auto;
`;

interface TableProps {
  columnAlignment: AlignType;
}

export const Table: React.FunctionComponent<TableProps> = ({
  columnAlignment,
  children,
}) => <StyledTable>{children}</StyledTable>;
