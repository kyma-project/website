import React from "react";

import { FormattedMessage } from "@common/i18n";

import Link from "@components/shared/Link";
import Button from "@components/shared/Button";

import PostHeader from "@views/blog/components/PostHeader";
import { PostContent } from "@views/blog/components/content/PostContent";
import { PostFooter } from "@views/blog/components/PostFooter";

import { PostPageContext, Post } from "@typings/blog";

import { PostWrapper, PostContentWrapper } from "./styled";

interface PostPageProps extends Post, Omit<PostPageContext, "post"> {
  markdown: string;
  readMore?: boolean;
}

export const PostPage: React.FunctionComponent<PostPageProps> = ({
  frontmatter: { title, author, tags = [] },
  frontmatter,
  fields: { slug, postInfo },
  markdown,
  assetsPath = "",
  previous,
  next,
  readMore = false,
}) => (
  <PostWrapper>
    <PostHeader title={title} author={author} path={slug} postInfo={postInfo} />
    <PostContentWrapper>
      <PostContent
        markdown={markdown}
        metadata={frontmatter}
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
