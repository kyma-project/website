import React from "react";

import { PostPage } from "@views/blog/components/Post";
import { BlogPageWrapper } from "@views/blog/components/Wrapper";

import { PageContext } from "@typings/common";
import { PostPageContext } from "@typings/blog";

const BlogPostView: React.FunctionComponent<PageContext<PostPageContext>> = ({
  pageContext: { post, previous, next, assetsPath },
}) => (
  <BlogPageWrapper>
    <PostPage
      assetsPath={assetsPath}
      previous={previous}
      next={next}
      markdown={post.rawMarkdownBody}
      {...post}
    />
  </BlogPageWrapper>
);

export default BlogPostView;
