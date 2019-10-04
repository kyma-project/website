import React from "react";

import ReactMarkdown from "@components/shared/ReactMarkdown";

interface Props {
  body: string;
}

export const ModalContent: React.FunctionComponent<Props> = ({ body }) => (
  <ReactMarkdown source={body} />
);
