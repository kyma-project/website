import styled, { media } from "@styled";
import Link from "@components/shared/Link";
import RSSIcon from "./assets/RSS_46x46_default.svg";
import HoveredRSSIcon from "./assets/RSS_46x46_hover.svg";
/* BlogPage */
export const BlogPageWrapper = styled.div`
  margin: 75px 0 0 0;
  display: flex;
  flex-direction: column;

  ${media.phone`
    margin-top: 25px;
  `};
`;

export const StyledLink = styled.a`
  align-self: flex-end;
  ${media.tablet`
    position: relative;
    top: 10px;
  `};
`;

// RSS Icon
export const Icon = styled.section`
  width: 46px;
  height: 46px;
  background-image: url(${RSSIcon});
  transition: 0.2s;
  :hover {
    background-image: url(${HoveredRSSIcon});
  }
`;

/* Post */
export const PostWrapper = styled.article`
  margin-bottom: 20px;
  padding: 40px 0px;
  border-bottom: 1px solid #e5e5e5;

  &:last-child {
    border-bottom: none;
  }

  ${media.tablet`
    &:last-child {
      padding-bottom: 0;
    }
    margin-bottom: 0;
  `};
`;

/* Post Header */
export const PostHeaderWrapper = styled.header`
  margin: 0 0 50px 0;

  h2 {
    font-size: 36px;
    margin-bottom: 16px;
    color: rgb(72, 87, 102);
    transition: color 0.2s ease-in-out;

    &:hover {
      color: rgb(11, 116, 222);
    }
  }
`;

export const PostMetadata = styled.p`
  margin-bottom: 0;
  display: inline-block;
  text-align: left;
  font-size: 18px;
`;

/* Post Content */
export const PostContentWrapper = styled.main``;

/* Post Footer */
export const PostFooterWrapper = styled.footer`
  margin-top: 30px;
`;

export const PostTagsWrapper = styled.ul`
  list-style-type: none;
  display: inline-block;
  margin: 0;
  margin-top: 0;
`;

export const PostTag = styled.li`
  display: inline-block;
  margin-bottom: 15px;
  margin-left: 15px;
  font-size: 14px;

  &:first-child {
    margin-left: 0;
    font-weight: 600;
    font-size: 16px;

    > svg {
      margin-right: 6px;
    }
  }
`;

/* PrevNextSectionWrapper */
export const PrevNextSectionWrapper = styled.div`
  margin-top: 75px;

  a {
    display: inline-block;

    &:hover {
      h4 {
        color: rgb(11, 116, 222);
      }
    }
  }

  span {
    font-size: 18px;
    color: rgb(72, 87, 102);
  }

  svg {
    position: absolute;
    color: rgb(72, 87, 102);
    top: 7px;
  }
`;

export const PrevWrapper = styled.div`
  position: relative;
  text-align: left;
  min-width: 100%;

  svg {
    left: -18px;
  }
`;

export const NextWrapper = styled.div`
  position: relative;
  text-align: right;

  svg {
    right: -18px;
  }
`;

export const PrevNextSectionPostTitle = styled.h4`
  transition: all 0.2s ease-in-out;
  color: rgb(72, 87, 102);
`;
