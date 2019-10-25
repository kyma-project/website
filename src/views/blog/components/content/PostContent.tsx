import React from "react";

import DefaultTemplate from "@views/blog/components/content/templates/Default";
import ReleaseTemplate from "@views/blog/components/content/templates/Release";

import {
  PostMetaData,
  PostTypeRelease,
} from "@typings/blog";

interface PostContentProps {
  markdown: string;
  assetsPath?: string;
  metadata: PostMetaData;
}

export const PostContent: React.FunctionComponent<PostContentProps> = ({
  markdown,
  assetsPath = "",
  metadata,
}) => {
  if (metadata.type && metadata.type === PostTypeRelease) {
    return (
      <ReleaseTemplate
        markdown={markdown}
        releaseTag={metadata.releaseTag}
        assetsPath={assetsPath}
      />
    );
  }

  return <DefaultTemplate markdown={markdown} assetsPath={assetsPath} />;
};
