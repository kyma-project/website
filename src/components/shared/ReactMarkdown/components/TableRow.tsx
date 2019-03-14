import React from "react";
import { AlignType } from "react-markdown";

import styled from "@styled";

const StyledTableRow = styled.tr`
  &:nth-child(2n) {
    background-color: rgb(246, 248, 250);
  }
`;

interface TableRowProps {
  isHeader: boolean;
  columnAlignment: AlignType;
}

export const TableRow: React.FunctionComponent<TableRowProps> = ({
  isHeader = false,
  columnAlignment,
  children,
}) => <StyledTableRow>{children}</StyledTableRow>;
