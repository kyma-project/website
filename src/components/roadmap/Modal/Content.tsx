import React from "react";

import ReactMarkdown from "@components/shared/ReactMarkdown";

import { ModalContentWrapper } from "./styled";

interface Props {
  body: string;
}

const ModalContent: React.FunctionComponent<Props> = ({ body }) => (
  <ModalContentWrapper>
    <ReactMarkdown source={body} />
  </ModalContentWrapper>
);

export default ModalContent;
