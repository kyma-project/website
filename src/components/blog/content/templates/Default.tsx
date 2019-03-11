import React from "react";

import ReactMarkdown from "@components/shared/ReactMarkdown";

interface DefaultTemplatePostProps {
  markdown: string;
  assetsPath: string;
}

const DefaultTemplatePost: React.FunctionComponent<
  DefaultTemplatePostProps
> = ({ markdown, assetsPath }) => (
  <ReactMarkdown source={markdown} escapeHtml={false} assetsPath={assetsPath} />
);

export default DefaultTemplatePost;
