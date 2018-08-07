import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Post from "../components/blog/Post";
import DefaultLayout from "../components/layout/DefaultLayout";

const DESCRIPTION_LENGTH = 297;

const BlogPostPage = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const description =
    html.replace(/<(?:.|\n)*?>/gm, "").substring(0, DESCRIPTION_LENGTH) + "...";
  const tags = frontmatter.tags || [];

  return (
    <DefaultLayout pageName={frontmatter.title}>
      <Helmet>
        <meta property="og:type" content="article" />
        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />
        {tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </Helmet>
      <Post metadata={frontmatter} html={html} />
    </DefaultLayout>
  );
};

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      ...BlogPost
    }
  }
`;

export default BlogPostPage;
