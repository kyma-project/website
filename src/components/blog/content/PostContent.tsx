import React from "react";
import ReactMarkdown from "react-markdown";

import DefaultTemplate from "@components/blog/content/templates/Default";
import ReleaseTemplate from "@components/blog/content/templates/Release";

import {
  PostType,
  PostMetaData,
  PostTypeRelease,
  PostTypeEvent,
} from "@components/blog/types";

interface PostContentProps {
  markdown: string;
  assetsPath?: string;
  metadata: PostMetaData;
}

const PostContent: React.FunctionComponent<PostContentProps> = ({
  markdown,
  assetsPath = "",
  metadata,
}) => {
  if (metadata.type) {
    if (metadata.type === PostTypeRelease) {
      return (
        <ReleaseTemplate
          markdown={markdown}
          releaseTag={metadata.releaseTag}
          assetsPath={assetsPath}
        />
      );
    }
  }

  return <DefaultTemplate markdown={markdown} assetsPath={assetsPath} />;
};

export default PostContent;
