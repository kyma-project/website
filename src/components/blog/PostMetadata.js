import React from "react";
import { translate } from "react-i18next";
import styled from "styled-components";

import colors from "../../config/colors";

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

const Text = styled.p`
  display: inline-block;
  text-align: left;
  font-size: 18px;
  color: ${colors.gray};
`;

const PostMetadata = ({ author, date, t }) => {
  return (
    <Wrapper>
      <Text>{t("blog.postMetadata", { author, date })}</Text>
    </Wrapper>
  );
};

export default translate("UI")(PostMetadata);
