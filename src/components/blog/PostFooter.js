import React from "react";
import styled from "styled-components";
import ui from "../../locales/en/UI.json";

import colors from "../../config/colors";

const FooterWrapper = styled.footer`
  margin-top: 30px;
`;

const TagsWrapper = styled.ul`
  list-style-type: none;
  display: block;
  margin-top: 0;
`;

const TagsText = styled.p`
  font-weight: bold;
  display: block;
  margin-bottom: 16px;
  color: ${colors.gray};
`;

const TagPill = styled.li`
  display: inline-block;
  background: ${colors.lightGray};
  color: ${colors.gray};
  border-radius: 25px;
  padding: 8px 10px;
  margin-bottom: 15px;
  font-size: 14px;

  & + & {
    margin-left: 15px;
  }
`;

const PostFooter = ({ tags }) => {
  return (
    <FooterWrapper>
      <TagsText>{ui.blog.tags}</TagsText>
      <TagsWrapper>
        {tags.map((tag, idx) => (
          <TagPill key={idx}>{tag}</TagPill>
        ))}
      </TagsWrapper>
    </FooterWrapper>
  );
};

export default PostFooter;
