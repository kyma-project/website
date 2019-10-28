import React from "react";

import Icon from "@components/shared/Icon";

import { PostPage } from "@views/blog/components/Post";
import { BlogPageWrapper } from "@views/blog/components/Wrapper";

import { PageContext } from "@typings/common";
import { BlogPageContext, Post } from "@typings/blog";

import { StyledLink, RSSIcon } from "./styled";

import config from "@config";

const BlogView: React.FunctionComponent<PageContext<BlogPageContext>> = ({
  pageContext: { posts },
}) => (
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
      <RSSIcon>
        <Icon iconName="rss" iconPrefix="fas" />
      </RSSIcon>
    </StyledLink>
    {posts.map((post: Post) => (
      <PostPage
        key={post.id}
        {...post}
        markdown={post.excerpt || post.rawMarkdownBody}
        readMore={true}
      />
    ))}
  </BlogPageWrapper>
);

export default BlogView;
