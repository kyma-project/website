import React from "react";

import { FormattedMessage } from "@common/i18n";

import Link from "@components/shared/Link";
import Button from "@components/shared/Button";
import ReactMarkdown from "@components/shared/ReactMarkdown";

import LastBlogPostHeader from "./LastBlogPostHeader";

import { Post } from "@typings/blog";

import { LastBlogPostWrapper } from "./styled";

export const LastBlogPost: React.FunctionComponent<Post> = ({
  excerpt,
  rawMarkdownBody,
  frontmatter: { title, author },
  fields: { slug, postInfo },
}) => {
  let shortedContent = excerpt || rawMarkdownBody;
  if (shortedContent.length > 256) {
    shortedContent = `${shortedContent.substring(0, 256)}...`;
  }

  return (
    <LastBlogPostWrapper>
      <LastBlogPostHeader
        title={title}
        author={author}
        path={slug}
        postInfo={postInfo}
      />
      <ReactMarkdown source={shortedContent} escapeHtml={false} />
      <Link.Internal to={slug}>
        <Button.Emphasized size="sm">
          <FormattedMessage id="blog.readMoreButton" />
        </Button.Emphasized>
      </Link.Internal>
    </LastBlogPostWrapper>
  );
};
