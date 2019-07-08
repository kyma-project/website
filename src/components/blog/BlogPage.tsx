import React from "react";

import Link from "@components/shared/Link";
import Grid from "@styled/Grid";

import PostPage from "@components/blog/Post";

import { AllMarkdownRemarkNode } from "@common/types";
import { Post } from "./types";

import { BlogPageWrapper as Wrapper } from "./styled";

type AllMarkdownRemarkNodePost = AllMarkdownRemarkNode<Post>;

interface BlogPageProps {
  nodes: AllMarkdownRemarkNodePost[];
}

import styled from "styled-components";

const Temp = styled(Link.Internal)`
  align-self: flex-end;
`;

export const BlogPageWrapper: React.FunctionComponent = ({ children }) => (
  <Grid.Container>
    <Grid.Row>
      <Grid.Unit df={1} md={0} />
      <Grid.Unit df={10} md={12}>
        <Wrapper>{children}</Wrapper>
      </Grid.Unit>
      <Grid.Unit df={1} md={0} />
    </Grid.Row>
  </Grid.Container>
);

const BlogPage: React.FunctionComponent<BlogPageProps> = ({ nodes }) => (
  <BlogPageWrapper>
    <Temp to={"feed.xml"}>RSS</Temp>
    {nodes.map((edge: AllMarkdownRemarkNodePost) => {
      const post = edge.node;
      return (
        <PostPage
          key={post.id}
          metadata={post.frontmatter}
          fields={post.fields}
          markdown={post.excerpt || post.rawMarkdownBody}
          readMore={true}
        />
      );
    })}
  </BlogPageWrapper>
);

export default BlogPage;
