import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";

import colors from "../../config/colors";
import PostMetadata from "./PostMetadata";

const Wrapper = styled.div`
  margin: 30px 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  transition: color ease-out 0.15s;

  &,
  &:visited {
    color: ${colors.gray};
  }

  &:hover {
    color: ${colors.blue};
  }
`;

const PostTitle = styled.h1`
  font-size: 40px;
  font-weight: 600;
  line-height: 1.3em;
  margin: 0 0 20px;
`;

const PostHeader = ({ path, title, date, author }) => {
  return (
    <Wrapper>
      <StyledLink to={path}>
        <PostTitle>{title}</PostTitle>
      </StyledLink>
      <PostMetadata date={date} author={author} />
    </Wrapper>
  );
};

export default PostHeader;
