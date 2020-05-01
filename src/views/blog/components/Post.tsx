import React from "react";

import PostHeader from "@views/blog/components/PostHeader";
import PostContent from "@views/blog/components/content/PostContent";
import PostFooter from "@views/blog/components/PostFooter";

import { PageContext } from "@typings/common";
import { PostPageContext } from "@typings/blog";

import { PostWrapper, PostContentWrapper } from "./styled";

const Post: React.FunctionComponent<PageContext<PostPageContext> & {
  content: React.ReactNode;
}> = ({ pageContext, content }) => {
  const frontmatter = pageContext.frontmatter;
  const fields = pageContext.fields;

  return (
    <PostWrapper>
      <PostHeader
        title={frontmatter.title}
        author={frontmatter.author}
        path={fields.slug}
        postInfo={fields.postInfo}
        readingTime={pageContext.readingTime}
      />
      <PostContentWrapper>
        <PostContent content={content} metadata={frontmatter} />
      </PostContentWrapper>
      <PostFooter tags={frontmatter.tags || []} />
    </PostWrapper>
  );
};

export default Post;
