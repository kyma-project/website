import React from "react";

import styled from "@styled";

interface TableCellProps {
  align: "left" | "right" | "center";
  isHeader: boolean;
}

type StyledTableCellProps = Pick<TableCellProps, "align">;

const StyledTableHeaderCell = styled("th")<StyledTableCellProps>`
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

const StyledTableCell = styled("td")<StyledTableCellProps>`
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
