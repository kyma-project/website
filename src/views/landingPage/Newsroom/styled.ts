import styled, { media } from "@styled";
import { customScrollBar } from "@styled/mixins";

import IconsBackground from "@static/img/icons-bg.svg";

export const NewsroomWrapper = styled.section`
  position: relative;
  background-size: 100% 100%;
  z-index: 1;
  justify-content: center;
  flex-direction: column;
  display: flex;
  margin-top: 3.5%;
  margin-bottom: 3.5%;

  ${media.phone`
    margin-bottom: 7.5%;
 `};

  .newsroom-twitter {
    .newsroom-card-content {
      padding: 0;
    }
  }

  .newsroom-blog-posts {
    ${media.phone`
      margin-top: 16px;
    `}
  }

  .newsroom-youtube {
    ${media.tablet`
      margin-top: 16px;
    `}
  }
`;

export const CardHeader = styled.div`
  color: #0b74de;
  margin-bottom: 12px;

  h3 {
    display: inline-block;
    margin: 0;
  }
`;

export const CardContentWrapper = styled.div`
  position: relative;
  height: 100%;

  > div {
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 26px 0 rgba(137, 165, 199, 0.42);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const CardContent = styled.div`
  background: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 20px;
  flex-grow: 1;
`;

export const CardHeaderIconWrapper = styled.div`
  display: inline-block;
  position: relative;
  background-size: 100% 100%;
  font-size: 10px;
  padding: 8px 6px 6px 8px;
  margin-right: 8px;
  background: url(${IconsBackground}) center center no-repeat;

  > svg {
    width: 1.125em !important;
    font-size: 18px;
    color: #fff;
  }

  ${media.smallPhone`
    > svg {
      width: 1em !important;
      font-size: 18px;
    }
  `};
`;

export const CardButtonWrapper = styled.div`
  > a > button {
    border-radius: 0;
    width: 100%;
    font-size: 16px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

export const TwitterFrameWrapper = styled.div`
  &&&&& {
    position: relative;
    width: 100%;
    height: 100%;
    max-height: 420px;
    overflow-y: auto;

    ${customScrollBar({
      thumbBorderRadius: "0 4px 0 0",
      trackBorderRadius: "4px",
    })}

    div {
      height: 100%;
    }

    iframe {
      margin-bottom: -8px !important;
    }
  }
`;

export const LastBlogPostsWrapper = styled.ul`
  &&&&& {
    padding: 6px;
    border-radius: 5px;
    background: #fff;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
`;

export const BlogPostWrapper = styled.li`
  &&&&& {
    color: rgb(72, 87, 102);
    padding: 12px 0;
    border-bottom: 1px solid #ddd;
    margin: 0;

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
      border-bottom: none;
    }

    button {
      font-size: 14px;
      line-height: 32px;
    }
  }
`;

export const BlogPostHeader = styled.header`
  margin: 0 0 16px 0;

  h4 {
    font-size: 16px;
    margin-bottom: 0px;
    color: rgb(72, 87, 102);
    transition: color 0.2s ease-in-out;

    &:hover {
      color: rgb(11, 116, 222);
    }
  }
`;

export const BlogPostAuthor = styled.p`
  margin-bottom: 0;
  display: inline-block;
  text-align: left;
  font-size: 12px;
`;

export const BlogPostDate = styled.p`
  margin-bottom: 0;
  display: block;
  text-align: left;
  font-size: 12px;
  color: #a3a3a3;
  font-weight: 500;
`;

export const StyledHeader = styled.header`
  color: #fff;
  transition: color 0.2s ease-in-out;

  h3 {
    font-size: 28px;
    margin-bottom: 6px;
    display: inline-block;
  }

  svg {
    margin-right: 8px;
  }
`;

export const YouTubeFrameWrapper = styled.ul`
  margin: 0;
  padding: 0;
`;

export const YouTubeFrameItem = styled.li`
  &&&&& {
    padding: 0;
    margin: 0 0 20px 0;

    &:last-child {
      margin-bottom: 0;
    }

    ${media.tablet`
      display: none;
      margin: 0;

      &:first-child {
        display: block;
      }
    `}

    > div {
      position: relative;
      height: 0;
      overflow: hidden;
      max-width: 100%;
      padding-bottom: 56.25%;
      border-radius: 3px;

      > iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
`;
