import React from "react";

import ReactMarkdown from "@components/shared/ReactMarkdown";

import {
  StyledReactMarkdown,
} from "./styled";

interface ContentProps {
  description: string;
}

const Content: React.FunctionComponent<ContentProps> = ({
  description,
}) => {
  return (
    <StyledReactMarkdown>
      <ReactMarkdown source={description} />
    </StyledReactMarkdown>
  );
};

export default Content;
