import React from "react";
import { AlignType } from "react-markdown";

import styled from "@styled";

interface TableCellProps {
  align: AlignType;
}

const StyledTableHeaderCell = styled("th")<TableCellProps>`
  text-align: ${props => props.align};
  padding: 8px 13px;
  display: table-cell;
  vertical-align: middle;
  border: 1px solid rgb(223, 226, 229);

  &:first-child {
    padding-left: 13px;
  }

  &:last-child {
    padding-right: 13px;
  }
`;

const StyledTableCell = styled("td")<TableCellProps>`
  text-align: ${props => props.align};
  padding: 8px 13px;
  display: table-cell;
  vertical-align: middle;
  border: 1px solid rgb(223, 226, 229);

  &:first-child {
    padding-left: 13px;
  }

  &:last-child {
    padding-right: 13px;
  }
`;

interface TableCellProps {
  isHeader: boolean;
  align: AlignType;
}

export const TableCell: React.FunctionComponent<TableCellProps> = ({
  isHeader = false,
  align = "left",
  children,
}) =>
  isHeader ? (
    <StyledTableHeaderCell align={align}>{children}</StyledTableHeaderCell>
  ) : (
    <StyledTableCell align={align}>{children}</StyledTableCell>
  );
