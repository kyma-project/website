import React from "react";
import styled from "@styled";

import embedVideo from "./EmbedVideo";

const StyledInlineCode = styled.code`
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
    monospace;
  font-size: 85%;
  background-color: rgba(27, 31, 35, 0.05);
  padding: 0.2em 0.4em;
  margin: 0;
  border-radius: 3px;
`;

interface InlineCodeProps {
  inline: boolean;
  value: string;
}

export const InlineCode: React.FunctionComponent<InlineCodeProps> = ({
  inline = true,
  value,
  children,
}) => {
  let video = null;
  if (value) {
    video = embedVideo(value);
  }

  return video ? (
    <div dangerouslySetInnerHTML={{ __html: video }} />
  ) : (
    <StyledInlineCode>{children === value ? value : children}</StyledInlineCode>
  );
};
