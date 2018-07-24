import React from "react";
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

const PostMetadata = ({ author, date }) => {
  return (
    <Wrapper>
      <Text>
        {author} on {date}
      </Text>
    </Wrapper>
  );
};

export default PostMetadata;
