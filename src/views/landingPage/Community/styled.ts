import styled, { media } from "@styled";

import Link from "@components/shared/Link";

import IconsBackground from "@static/img/icons-bg.svg";

export const CommunityWrapper = styled.div`
  min-height: 640px;
  z-index: 1;
  justify-content: center;
  flex-direction: column;
  display: flex;
  padding-top: 160px;

  ${media.tablet`
    padding-top: 0px;
  `};

  ${media.phone`
    h2 {
      font-size: 32px;
    }
  `};
`;

export const CommunitySvgWrapper = styled.div`
  ${media.tablet`
    text-align: right;
  `};
`;

export const CommunityLinksWrapper = styled.div`
  margin: 60px 0 60px 0;

  ${media.phone`
    margin: 45px auto 30px auto;

    h4 {
      text-align: center;
    }
  `};
`;

export const CommunityLinksListHeader = styled.header``;

export const CommunityLinksList = styled.ul`
  margin: 0;
  text-align: left;
  list-style: none;
  display: inline-block;
`;

interface CommunityLinksItemProps {
  margin?: string;
}

export const CommunityLinksItem = styled.li`
  text-align: center;
  display: inline-block;
  margin: ${(props: CommunityLinksItemProps) =>
    props.margin ? props.margin : "0 20px 0 0"};

  &:last-child {
    margin: 0;
  }

  ${media.smallPhone`
    margin: 0 6px 0 0;
  `};
`;

export const CommunityLinksItemLinkName = styled.span`
  display: block;
  margin-top: 10px;
  color: #0073e6;

  &:before {
    display: inline-block;
    opacity: 0;
    transition: transform 0.3s, opacity 0.2s;
    margin-right: 0;
    content: "[";
    transform: translateX(8px);
  }

  &:after {
    display: inline-block;
    opacity: 0;
    transition: transform 0.3s, opacity 0.2s;
    margin-right: 0;
    content: "]";
    transform: translateX(-10px);
  }
`;

export const CommunityLinksItemLink = styled(Link.External)`
  color: #fff;
  font-size: 14px;
  box-shadow: none;

  &:hover {
    ${CommunityLinksItemLinkName} {
      &:before {
        opacity: 1;
        transform: translateX(-10px);
      }

      &:after {
        opacity: 1;
        transform: translateX(8px);
      }
    }
  }
`;

export const CommunityLinksItemLinkIcon = styled.div`
  position: relative;
  background-size: 100% 100%;
  font-size: 10px;
  padding: 12px 10px 10px 12px;
  background: url(${IconsBackground}) center center no-repeat;

  > svg {
    width: 1.125em !important;
    font-size: 25px;
  }

  ${media.smallPhone`
    > svg {
      width: 1em !important;
      font-size: 18px;
    }
  `};
`;
