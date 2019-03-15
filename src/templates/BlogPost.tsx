import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";

import Layout from "@components/layout/Layout";
import BlogPage from "@components/blog/Post";
import { BlogPageWrapper } from "@components/blog/BlogPage";

import {
  AllFile,
  AllFileImage,
  MarkdownRemark,
  PageContext,
  IntlPageContext,
} from "@common/types";
import { Post, PostPageContext } from "@components/blog/types";

const BlogPostTemplate: React.FunctionComponent<
  MarkdownRemark<Post> & PageContext<IntlPageContext & PostPageContext>
> = ({
  data: {
    markdownRemark: { rawMarkdownBody, frontmatter, fields },
  },
  pageContext: { locale, previous, next, assetsPath },
}) => {
  const description = `${rawMarkdownBody
    .replace(/<(?:.|\n)*?>/gm, "")
    .substring(0, 297)}...`;

  return (
    <Layout
      locale={locale}
      pageTitle={frontmatter.title}
      pageDescription={description}
    >
      <Helmet>
        <meta property="og:type" content="article" />
        {frontmatter &&
          frontmatter.tags &&
          frontmatter.tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
      </Helmet>
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
    </Layout>
  );
};

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      ...BlogPost
    }
  }
`;

export default BlogPostTemplate;
