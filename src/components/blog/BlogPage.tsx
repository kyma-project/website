import React from "react";

import Grid from "@styled/Grid";

import PostPage from "@components/blog/Post";

import { AllMarkdownRemarkNode } from "@common/types";
import { Post } from "./types";
import config from "@config";
import { BlogPageWrapper as Wrapper, Icon, StyledLink } from "./styled";

type AllMarkdownRemarkNodePost = AllMarkdownRemarkNode<Post>;

interface BlogPageProps {
  nodes: AllMarkdownRemarkNodePost[];
}

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
    <link
      rel="alternate"
      type="application/rss+xml"
      href={`${config.siteMetadata.siteUrl}${config.siteMetadata.feedUrl}`}
    />
    <StyledLink
      href={`/${config.siteMetadata.feedUrl}`}
      rel="alternate"
      type="application/rss+xml"
    >
      <Icon />
    </StyledLink>
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
