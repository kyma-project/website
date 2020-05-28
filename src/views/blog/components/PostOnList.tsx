import React from "react";

import Link from "@components/shared/Link";
import Button from "@components/shared/Button";

import PostHeader from "@views/blog/components/PostHeader";
import PostContent from "@views/blog/components/content/PostContent";
import PostFooter from "@views/blog/components/PostFooter";

import { Post } from "@typings/blog";
import { FormattedMessage } from "@common/i18n";

import {
  PostOnListWrapper,
  PostContentWrapper,
  PostOnListExcerpt,
} from "./styled";

const PostOnList: React.FunctionComponent<Post> = ({
  frontmatter,
  fields,
  readingTime,
  excerpt,
}) => {
  const content = <PostOnListExcerpt>{excerpt}</PostOnListExcerpt>;

  return (
    <PostOnListWrapper>
      <PostHeader
        title={frontmatter.title}
        author={frontmatter.author}
        path={fields.slug}
        postInfo={fields.postInfo}
        readingTime={readingTime}
      />
      <PostContentWrapper>
        <PostContent
          content={content}
          metadata={frontmatter}
          forceDefaultTemplate={true}
        />
      </PostContentWrapper>
      <Link.Internal to={fields.slug}>
        <Button.Emphasized size="sm">
          <FormattedMessage id="blog.readMoreButton" />
        </Button.Emphasized>
      </Link.Internal>
      <PostFooter tags={frontmatter.tags || []} />
    </PostOnListWrapper>
  );
};

export default PostOnList;
