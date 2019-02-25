import React from "react";

import Icon from "@components/shared/Icon";

import { FormattedMessage, getTranslation } from "@common/i18n";

import { PostFooterWrapper, PostTagsWrapper, PostTag } from "./styled";

interface PostFooterProps {
  tags: string[];
}

const gt = getTranslation("blog");

const PostFooter: React.FunctionComponent<PostFooterProps> = ({
  tags = [],
}) => {
  return (
    <PostFooterWrapper>
      <PostTagsWrapper>
        <FormattedMessage id={gt("tags")}>
          {tags => (
            <PostTag>
              <Icon iconName="tags" iconPrefix="fas" />
              {tags}:
            </PostTag>
          )}
        </FormattedMessage>
        {tags.map((tag: string) => (
          <PostTag key={tag}>#{tag}</PostTag>
        ))}
      </PostTagsWrapper>
    </PostFooterWrapper>
  );
};

export default PostFooter;
