import React from "react";

interface DefaultTemplatePostProps {
  content: React.ReactNode;
}

const DefaultTemplatePost: React.FunctionComponent<
  DefaultTemplatePostProps
> = ({ content }) => <>{content}</>;

export default DefaultTemplatePost;
