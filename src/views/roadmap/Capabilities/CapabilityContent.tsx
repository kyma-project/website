import React from "react";

import ReactMarkdown from "@components/shared/ReactMarkdown";

import { StyledReactMarkdown } from "./styled";

import { Capability } from "@typings/roadmap";

interface Props {
  capability: Capability;
}

export const CapabilityContent: React.FunctionComponent<Props> = ({
  capability: { rawMarkdownBody },
}) => (
  <StyledReactMarkdown>
    <ReactMarkdown source={rawMarkdownBody} />
  </StyledReactMarkdown>
);
