import React from "react";

import Grid from "@styled/Grid";

import Separator from "@components/shared/Separator";

import PostPage from "@components/blog/Post";

import { AllMarkdownRemarkNode } from "@types";
import { Post } from "./types";

import { BlogPageWrapper as Wrapper } from "./styled";

type AllMarkdownRemarkNodePost = AllMarkdownRemarkNode<Post>;

interface BlogPageProps {
  nodes: AllMarkdownRemarkNodePost[];
}

export const BlogPageWrapper: React.FunctionComponent = ({ children }) => {
  return (
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
};

const BlogPage: React.FunctionComponent<BlogPageProps> = ({ nodes }) => {
  return (
    <BlogPageWrapper>
      {nodes.map((edge: AllMarkdownRemarkNodePost, index: number) => {
        const post = edge.node;
        return (
          <PostPage
            key={post.id}
            metadata={post.frontmatter}
            fields={post.fields}
            markdown={post.excerpt || post.rawMarkdownBody}
            readMore
          />
        );
      })}
    </BlogPageWrapper>
  );
};

export default BlogPage;
