import React from "react";

import DefaultTemplate from "@views/blog/components/content/templates/Default";
import ReleaseTemplate from "@views/blog/components/content/templates/Release";

import {
  PostMetaData,
  PostTypeRelease,
} from "@typings/blog";

interface PostContentProps {
  content: React.ReactNode;
  metadata: PostMetaData;
  forceDefaultTemplate?: boolean;
}

const PostContent: React.FunctionComponent<PostContentProps> = ({
  content,
  metadata,
  forceDefaultTemplate = false,
}) => {
  if (forceDefaultTemplate) {
    return <DefaultTemplate content={content} />;
  }

  if (metadata.type && metadata.type === PostTypeRelease) {
    return (
      <ReleaseTemplate
        content={content}
        releaseTag={metadata.releaseTag}
      />
    );
  }

  return <DefaultTemplate content={content} />;
};

export default PostContent;