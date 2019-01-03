import React from "react";
import styled from "styled-components";
import ui from "../../locales/en/UI.json";

import colors from "../../config/colors";

const FooterWrapper = styled.footer`
  margin-top: 30px;
`;

const TagsWrapper = styled.ul`
  list-style-type: none;
  display: inline-block;
  margin-top: 0;
`;

const TagsText = styled.li`
  font-weight: bold;
  display: inline-block;
  margin-bottom: 15px;
  color: ${colors.gray};
`;

const Tag = styled.li`
  display: inline-block;
  color: ${colors.gray};
  border-radius: 25px;
  margin-bottom: 15px;
  margin-left: 15px;
  font-size: 14px;
`;

const PostFooter = ({ tags }) => {
  return (
    <FooterWrapper>
      <TagsWrapper>
        <TagsText>{ui.blog.tags}:</TagsText>
        {tags.map((tag, idx) => (
          <Tag key={idx}>#{tag}</Tag>
        ))}
      </TagsWrapper>
    </FooterWrapper>
  );
};

export default PostFooter;
