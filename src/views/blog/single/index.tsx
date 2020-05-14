import React from "react";

import {
  GenericComponent,
  LayoutType,
} from "@components/generic-documentation";
import Post from "@views/blog/components/Post";
import PostSocial from "@views/blog/components/PostSocial";

import { PageContext } from "@typings/common";
import { PostPageContext } from "@typings/blog";

const BlogPostView: React.FunctionComponent<PageContext<PostPageContext>> = ({
  pageContext,
}) => {
  const postContent = (content: React.ReactNode) => (
    <Post pageContext={pageContext} content={content} />
  );
  const additionalProps = {
    postContent,
  };

  return (
    <GenericComponent
      pageContext={pageContext}
      layout={LayoutType.BLOG_POST}
      additionalProps={additionalProps}
    />
  );
};

export default BlogPostView;
