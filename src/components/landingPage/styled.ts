import styled, { media } from "@styled";

import Link from "@components/shared/Link";
import Paragraph from "@components/shared/Paragraph";
import Grid from "@styled/Grid";

import { linkEffect } from "@styled/mixins";

import Middle from "@static/img/middle.svg";
import Bottom from "@static/img/bottom-long.svg";
import Adopters from "@static/img/adopters-bg.svg";
import IconsBackground from "@static/img/icons-bg.svg";

/* Headline */
export const HeadlineWrapper = styled.h2`
  font-size: 40px;
  font-weight: 600;
  line-height: 1.2;
  margin-top: 40px;

  br {
    display: none;
  }

  ${media.phone`
    font-size: 35px;

    br:first-child {
      display: inline;
    }
  `};

  ${media.smallPhone`
    font-size: 30px;
  `};
`;

/* MakeSpecial */
export const MakeSpecialWrapper = styled.section`
  position: relative;
  background: url(${Middle}) no-repeat;
  background-size: 100% 100%;
  min-height: 670px;
  z-index: 1;
  justify-content: center;
  flex-direction: column;
  display: flex;
  margin-top: 3.5%;
  margin-bottom: 0;
  color: #fff;

  ${media.tablet`
    padding: 50px 0 150px 0;
  `};
`;

export const MakesSpecialSvgWrapper = styled.div`
  ${media.tablet`
    text-align: center;
  `};
`;

/* Key Features */
export const KeyFeaturesWrapper = styled.section`
  margin: 50px 0;
`;

export const KeyFeaturesSection = styled(Grid.Unit)`
  ${media.tablet`
    margin: 0 0 50px 0;
  `};
`;

export const KeyFeaturesParagraph = styled(Paragraph)`
  text-align: center;
`;

export const SvgWrap = styled.div`
  margin: 0 auto;
  text-align: center;
  margin-bottom: 32px;

  svg {
    max-width: 100%;

    @media (min-width: 576px) {
      & {
        justify-content: center;
        display: flex;
        flex-direction: column;
      }
    }

    @media (min-width: 1024px) {
      height: 23vw;
      max-height: 330px;
    }
  }
`;

export const KeyFeaturesLink = styled(Link.Internal)`
  ${linkEffect}
`;

/* Community */
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

/* Early Adopters */
export const EarlyAdoptersWrapper = styled.div`
  position: relative;
  background: url(${Adopters}) no-repeat;
  background-size: 100% 100%;
  background-position: center;
  min-height: 600px;
  z-index: 1;
  justify-content: center;
  flex-direction: column;
  display: flex;
  margin-bottom: 160px;
  text-align: center;

  @media (max-width: 1100px) {
    & {
      background-size: cover;
    }
  }

  .sprite-icon--twiggle {
    width: 159px;
    max-height: 35px;
  }
  .sprite-icon--netconomy {
    width: 173px;
    max-height: 22px;
    margin-top: 3px;
  }
  .sprite-icon--sap {
    width: 86px;
    max-height: 42px;
  }
  .sprite-icon--mgm {
    width: 89px;
    max-height: 31px;
    margin-top: 7px;
  }
  .sprite-icon--accenture-interactive {
    width: 270px;
    max-height: 24px;
    margin-top: -5px;
  }
  .sprite-icon--arithnea {
    width: 250px;
    max-height: 30px;
    margin-top: -2px;
  }
`;

export const EarlyAdoptersContent = styled.div``;

export const EarlyAdoptersList = styled.ul`
  margin: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-flow: row nowrap;

  ${media.tablet`
    flex-flow: row wrap;
  `};
`;

export const StyledEarlyAdoptersListItem = styled.li`
  margin: 10px 15px;
  text-align: center;

  > img {
    width: 100%;
  }
`;

/* Community and EarlyAdopters bg */
export const CommunityAndEarlyAdoptersWrapper = styled.div`
  position: relative;
  background: url(${Bottom}) no-repeat;
  background-size: cover;
  background-position: top;
  margin-bottom: -320px;
`;
