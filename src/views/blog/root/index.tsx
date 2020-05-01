import React from "react";

import Icon from "@components/shared/Icon";

import PostOnList from "@views/blog/components/PostOnList";
import { BlogPageWrapper } from "@views/blog/components/Wrapper";

import { PageContext } from "@typings/common";
import { BlogPageContext, Post } from "@typings/blog";

import { StyledLink, RSSIcon } from "./styled";

import config from "@config";

const BlogView: React.FunctionComponent<PageContext<BlogPageContext>> = ({
  pageContext: { posts },
}) => {
  const blogPosts = posts.map((post: Post) => (
    <PostOnList key={post.id} {...post} />
  ));

  return (
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
      {blogPosts}
    </BlogPageWrapper>
  );
};

export default BlogView;
