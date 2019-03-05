import React from "react";
import { AlignType } from "react-markdown";

import styled from "@styled";

const StyledTableBody = styled.tbody``;

interface TableBodyProps {
  columnAlignment: AlignType;
}

export const TableBody: React.FunctionComponent<TableBodyProps> = ({
  columnAlignment,
  children,
}) => <StyledTableBody>{children}</StyledTableBody>;
