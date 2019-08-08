import React from "react";
import { graphql } from "gatsby";

import BlogPage from "@components/blog/Post";
import { BlogPageWrapper } from "@components/blog/BlogPage";

import { MarkdownRemark, PageContext, IntlPageContext } from "@common/types";
import { Post, PostPageContext } from "@components/blog/types";

const BlogPostTemplate: React.FunctionComponent<
  MarkdownRemark<Post> & PageContext<IntlPageContext & PostPageContext>
> = ({
  data: {
    markdownRemark: { rawMarkdownBody, frontmatter, fields },
  },
  pageContext: { previous, next, assetsPath },
}) => (
  <BlogPageWrapper>
    <BlogPage
      metadata={frontmatter}
      markdown={rawMarkdownBody}
      fields={fields}
      assetsPath={assetsPath}
      previous={previous}
      next={next}
    />
  </BlogPageWrapper>
);

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      ...BlogPost
    }
  }
`;

export default BlogPostTemplate;
