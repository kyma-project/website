import React from "react";

import Icon from "@components/shared/Icon";

import { FormattedMessage, getTranslation } from "@common/i18n";

import { PostFooterWrapper, PostTagsWrapper, PostTag } from "./styled";

interface PostFooterProps {
  tags: string[];
}

const gt = getTranslation("blog");

export const PostFooter: React.FunctionComponent<PostFooterProps> = ({
  tags = [],
}) => (
  <PostFooterWrapper>
    <PostTagsWrapper>
      <FormattedMessage id={gt("tags")}>
        {data => (
          <PostTag>
            <Icon iconName="tags" iconPrefix="fas" />
            {data}:
          </PostTag>
        )}
      </FormattedMessage>
      {tags.map((tag: string) => (
        <PostTag key={tag}>#{tag}</PostTag>
      ))}
    </PostTagsWrapper>
  </PostFooterWrapper>
);
