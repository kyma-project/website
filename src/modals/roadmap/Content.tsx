import React from "react";

import ReactMarkdown from "@components/shared/ReactMarkdown";

import { ModalContentWrapper } from "./styled";

interface Props {
  body: string;
}

export const ModalContent: React.FunctionComponent<Props> = ({ body }) => (
  <ModalContentWrapper>
    <ReactMarkdown source={body} />
  </ModalContentWrapper>
);
