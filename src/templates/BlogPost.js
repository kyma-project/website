import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Post from "../components/blog/Post";
import DefaultLayout from "../components/layout/DefaultLayout";

const BlogPostPage = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <DefaultLayout pageName={frontmatter.title}>
      <Helmet />
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
