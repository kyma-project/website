import React from "react";

import Link from "@components/shared/Link";
import H from "@components/shared/H";

import { FormattedMessage, getTranslation } from "@common/i18n";

import { PostMetaDataAuthor } from "./types";

import { PostHeaderWrapper, PostMetadata } from "./styled";

interface PostHeaderProps {
  title: string;
  author: PostMetaDataAuthor;
  date: string;
  path: string;
}

const gt = getTranslation("blog");

const PostHeader: React.FunctionComponent<PostHeaderProps> = ({
  title,
  author: { name },
  date,
  path,
}) => {
  const metadata = (
    <FormattedMessage
      id={gt("postMetadata")}
      values={{
        author: name,
        date,
      }}
    />
  );

  return (
    <PostHeaderWrapper>
      <Link.Internal to={path}>
        <H as="h2">{title}</H>
      </Link.Internal>
      <PostMetadata>{metadata}</PostMetadata>
    </PostHeaderWrapper>
  );
};

export default PostHeader;
