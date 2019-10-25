import React from "react";

import { FormattedMessage, injectIntl, IntlInterface } from "@common/i18n";

import Link from "@components/shared/Link";
import H from "@components/shared/H";

import { Post } from "@typings/blog";

import {
  LastBlogPostsWrapper,
  BlogPostWrapper,
  BlogPostHeader,
  BlogPostAuthor,
  BlogPostDate,
} from "./styled";

interface Props {
  latestBlogPosts: Post[];
}

const BlogPosts: React.FunctionComponent<Props & IntlInterface> = ({
  latestBlogPosts = [],
  formatMessage,
}) => {
  const blogPostsList = latestBlogPosts.map((post, index) => {
    const {
      frontmatter: {
        title,
        author: { name },
      },
      fields: {
        slug,
        postInfo: { day, month, year },
      },
    } = post;

    const date = `${formatMessage({
      id: `months.${month}.name`,
    })} ${day}, ${year}`;

    return (
      <BlogPostWrapper key={index}>
        <BlogPostHeader>
          <Link.Internal to={slug}>
            <H as="h4">{title}</H>
          </Link.Internal>
          <BlogPostAuthor>{name}</BlogPostAuthor>
          <BlogPostDate>{date}</BlogPostDate>
        </BlogPostHeader>
      </BlogPostWrapper>
    );
  });

  return <LastBlogPostsWrapper>{blogPostsList}</LastBlogPostsWrapper>;
};

export const LastBlogPosts = injectIntl("utils")(BlogPosts);
