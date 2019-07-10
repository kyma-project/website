import React from "react";

import Grid from "@styled/Grid";

import PostPage from "@components/blog/Post";

import { AllMarkdownRemarkNode } from "@common/types";
import { Post } from "./types";
import config from "@config";
import { BlogPageWrapper as Wrapper, Icon, StyledLink } from "./styled";
import { globalHistory } from "@reach/router";

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

const BlogPage: React.FunctionComponent<BlogPageProps> = ({ nodes }) => {
  const origin = globalHistory.location.origin;
  // tslint:disable-next-line
  console.log(globalHistory.location);
  return (
    <BlogPageWrapper>
      <StyledLink to={`${origin}/${config.siteMetadata.feedUrl}`}>
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
};

export default BlogPage;
