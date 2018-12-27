import React from "react";
import { graphql } from "gatsby";
import Link from "gatsby-link";
import styled from "styled-components";

import colors from "../../config/colors";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import PostContent from "./PostContent";

const PostWrapper = styled.div`
  border: 0;
  padding: 0;
  padding: 40px 0 40px;
  ${props =>
    props.borderBottom ? `border-bottom: 1px solid ${colors.lightGray}` : null}
`;

const ReadMoreButton = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: #ffffff;
  border-color: #2852c7;
  background-color: #2852c7;
  line-height: 40px;
  border-radius: 25px;
  padding: 0 14px;
  font-size: 16px;
  font-weight: 500;
  transition: background-color ease-out 0.2s;
  margin-top: 30px;

  &:active,
  &:focus,
  &:hover {
    cursor: pointer;
    background-color: rgba(40, 82, 199, 0.9);
    outline: none;
  }
`;

const Post = ({
  metadata = {},
  html,
  readMoreButton = false,
  borderBottom = false,
}) => {
  const { title, author, tags = [], date, path } = metadata;
  return (
    <PostWrapper borderBottom={borderBottom}>
      <PostHeader title={title} author={author} date={date} path={path} />
      <PostContent html={html} />
      {readMoreButton && <ReadMoreButton to={path}>Read more</ReadMoreButton>}
      <PostFooter tags={tags} />
    </PostWrapper>
  );
};

export const PostFragment = graphql`
  fragment BlogPost on MarkdownRemark {
    id
    html
    excerpt(format: HTML)
    frontmatter {
      date(formatString: "MMMM DD, YYYY")
      path
      title
      author
      tags
    }
  }
`;

export default Post;
