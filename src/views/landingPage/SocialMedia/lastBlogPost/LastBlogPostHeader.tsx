import React from "react";

import Link from "@components/shared/Link";
import H from "@components/shared/H";

import {
  FormattedMessage,
  getTranslation,
  injectIntl,
  IntlInterface,
} from "@common/i18n";

import { PostMetaDataAuthor, PostFieldsInfo } from "@typings/blog";

import { LastBlogPostHeaderWrapper, LastBlogPostMetadata } from "./styled";

interface PostHeaderProps extends IntlInterface {
  title: string;
  author: PostMetaDataAuthor;
  postInfo: PostFieldsInfo;
  path: string;
}

const gt = getTranslation("blog");

const LastBlogPostHeader: React.FunctionComponent<PostHeaderProps> = ({
  title,
  author: { name },
  postInfo: { year, month, day },
  path,
  formatMessage,
}) => {
  const date = `${formatMessage({
    id: `months.${month}.name`,
  })} ${day}, ${year}`;

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
    <LastBlogPostHeaderWrapper>
      <Link.Internal to={path}>
        <H as="h4">{title}</H>
      </Link.Internal>
      <LastBlogPostMetadata>{metadata}</LastBlogPostMetadata>
    </LastBlogPostHeaderWrapper>
  );
};

export default injectIntl("utils")(LastBlogPostHeader);
