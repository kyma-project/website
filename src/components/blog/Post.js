import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

import colors from "../../config/colors";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import PostContent from "./PostContent";

const PostWrapper = styled.div`
  border: 0;
  padding: 0;
  padding: 40px 0 40px;
  border-bottom: 3px solid ${colors.blue};
`;

const Post = ({ metadata = {}, html }) => {
  const { title, author, tags = [], date, path } = metadata;
  return (
    <PostWrapper>
      <PostHeader title={title} author={author} date={date} path={path} />
      <PostContent html={html} />
      <PostFooter tags={tags} />
    </PostWrapper>
  );
};

export const PostFragment = graphql`
  fragment BlogPost on MarkdownRemark {
    id
    html
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
