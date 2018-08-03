import React from "react";
import styled from "styled-components";
import ui from "../../locales/en/UI.json";

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

const PostMetadata = ({ author, date }) => {
  const text = ui.blog.postMetadata
    .replace("{{author}}", author)
    .replace("{{date}}", date);
  return (
    <Wrapper>
      <Text>{text}</Text>
    </Wrapper>
  );
};

export default PostMetadata;
