import React from "react";

import Link from "@components/shared/Link";

import PostHeader from "@views/blog/components/PostHeader";
import PostContent from "@views/blog/components/content/PostContent";
import PostFooter from "@views/blog/components/PostFooter";

import { Post } from "@typings/blog";

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
    <Link.Internal to={fields.slug}>
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
        <PostFooter tags={frontmatter.tags || []} />
      </PostOnListWrapper>
    </Link.Internal>
  );
};

export default PostOnList;
