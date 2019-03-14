import React from "react";

import { FormattedMessage } from "@common/i18n";

import Link from "@components/shared/Link";
import Button from "@components/shared/Button";

import PostHeader from "@components/blog/PostHeader";
import PostContent from "@components/blog/content/PostContent";
import PostFooter from "@components/blog/PostFooter";
import PrevNextSection from "@components/blog/PrevNextSection";

import { PostPageContext, PostMetaData, PostFields } from "./types";

import { PostWrapper, PostContentWrapper } from "./styled";

interface PostProps extends PostPageContext {
  metadata: PostMetaData;
  fields: PostFields;
  markdown: string;
  readMore?: boolean;
}

const Post: React.FunctionComponent<PostProps> = ({
  metadata: { title, author, tags = [] },
  metadata,
  fields: { slug, date },
  markdown,
  assetsPath = "",
  previous,
  next,
  readMore = false,
}) => (
  <PostWrapper>
    <PostHeader title={title} author={author} date={date} path={slug} />
    <PostContentWrapper>
      <PostContent
        markdown={markdown}
        metadata={metadata}
        assetsPath={assetsPath}
      />
    </PostContentWrapper>
    {readMore && (
      <Link.Internal to={slug}>
        <Button.Emphasized size="sm">
          <FormattedMessage id="blog.readMoreButton" />
        </Button.Emphasized>
      </Link.Internal>
    )}
    <PostFooter tags={tags} />
    {/* {!readMore && (
        <PrevNextSection next={next} previous={previous} />
      )} */}
  </PostWrapper>
);

export default Post;
