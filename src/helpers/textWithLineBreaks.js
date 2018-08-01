import React from "react";
import styled from "styled-components";

const BlockSpan = styled.span`
  display: block;
`;

export const displayHeaderWithLineBreaks = text => {
  const blocks = text.split("\n");
  return blocks.map((block, idx) => <BlockSpan key={idx}>{block}</BlockSpan>);
};
