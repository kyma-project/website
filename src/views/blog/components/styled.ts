import styled, { media } from "@styled";

export const Wrapper = styled.div`
  margin: 75px 0 0 0;
  display: flex;
  flex-direction: column;

  ${media.phone`
    margin-top: 25px;
  `};
`;

/* PostOnList */
export const PostOnListWrapper = styled.article`
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  border-radius: 4px;
  box-shadow: rgba(46, 41, 51, 0.08) 0px 1px 2px,
    rgba(71, 63, 79, 0.08) 0px 2px 4px;
  margin-bottom: 1.5rem;
  padding: 3rem;
  color: rgb(81, 85, 89);

  &:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0 2px 13px 0 rgba(11, 116, 222, 0.49);

    h2 {
      color: rgb(11, 116, 222);
    }
  }
`;

export const PostOnListExcerpt = styled.p`
  margin-top: ;
`;

/* Post */
export const PostWrapper = styled.article`
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
export const PostContentWrapper = styled.main`
  iframe {
    display: block;
    margin: 0 auto;
    margin-top: 24px;
    margin-bottom: 24px;
  }
`;

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

/* PostSocial */
interface PostSocialListProps {
  visible?: boolean;
}

export const PostSocialList = styled.ul<PostSocialListProps>`
  margin: 0 32px 0 auto;
  position: relative;
  top: 50vh;
  transform: translateY(-100%);

  transition: opacity 0.15s linear;
  opacity: ${props => (props.visible ? "1" : "0")};
  pointer-events: ${props => (props.visible ? "initial" : "none")};

  > li {
    text-align: right;

    > button > button {
      color: #0b74de;
      border-color: #0b74de;
    }

    svg {
      width: 25px !important;
      margin-right: 0;
    }
  }
`;
