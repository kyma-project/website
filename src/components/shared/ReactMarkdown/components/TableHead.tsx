import React from "react";
import { AlignType } from "react-markdown";

import styled from "@styled";

const StyledTableHead = styled.thead``;

interface TableHeadProps {
  columnAlignment: AlignType;
}

export const TableHead: React.FunctionComponent<TableHeadProps> = ({
  columnAlignment,
  children,
}) => <StyledTableHead>{children}</StyledTableHead>;
