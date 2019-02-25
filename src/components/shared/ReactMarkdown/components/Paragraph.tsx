import React from "react";

import P from "@components/shared/Paragraph";

interface ParagraphProps {}

export const Paragraph: React.FunctionComponent<ParagraphProps> = ({
  children,
}) => {
  return <P>{children}</P>;
};
