import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import styled from "styled-components";
import Post from "../components/blog/Post";
import DefaultLayout from "../components/layout/DefaultLayout";
import PostsWrapper from "../components/blog/PostsWrapper";

const PostList = styled.ul`
  margin: 0;
`;

const BlogPage = ({ data }) => {
  const edges = (data.allMarkdownRemark && data.allMarkdownRemark.edges) || [];
  const posts = edges.filter(edge => !!edge.node.frontmatter.date).map(edge => {
    const post = edge.node;
    return (
      <li key={post.id}>
        <Post metadata={post.frontmatter} html={post.html} />
      </li>
    );
  });

  return (
    <DefaultLayout pageId="blog">
      <Helmet>
        <meta property="og:type" content="article" />
      </Helmet>
      <PostsWrapper>
        <PostList>{posts}</PostList>
      </PostsWrapper>
    </DefaultLayout>
  );
};

export default BlogPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          ...BlogPost
        }
      }
    }
  }
`;
