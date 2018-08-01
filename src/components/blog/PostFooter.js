import React from "react";
import { translate } from "react-i18next";
import styled from "styled-components";

import colors from "../../config/colors";

const FooterWrapper = styled.footer`
  margin-top: 30px;
`;

const TagsWrapper = styled.ul`
  list-style-type: none;
  display: block;
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
  padding: 10px 15px;
  margin-bottom: 15px;

  & + & {
    margin-left: 15px;
  }
`;

const PostFooter = ({ tags, t }) => {
  return (
    <FooterWrapper>
      <TagsText>{t("blog.tags")}</TagsText>
      <TagsWrapper>
        {tags.map((tag, idx) => <TagPill key={idx}>{tag}</TagPill>)}
      </TagsWrapper>
    </FooterWrapper>
  );
};

export default translate("UI")(PostFooter);
