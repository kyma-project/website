import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import Post from "../components/blog/Post";
import DefaultLayout from "../components/layout/DefaultLayout";

const Wrapper = styled.div`
  max-width: 850px;
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
      <Wrapper>
        <ul>{posts}</ul>
      </Wrapper>
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
