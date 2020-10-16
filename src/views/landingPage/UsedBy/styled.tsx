import styled, { media } from "@styled";
import { CardProps } from "./Card";
import { linkEffect } from "@styled/mixins";
import Link from "@components/shared/Link";
import usedByBackgroundSVG from "@views/landingPage/assets/landing-page/usedBy/usedByBackground.svg";
import Grid from "@styled/Grid";
import Button from "@components/shared/Button";

interface HeaderWrapperProps {
  marginBottom?: number;
}

export const HeaderWrapper = styled.div<HeaderWrapperProps>`
  margin-bottom: ${props => props.marginBottom || 75}px;
  & > h2 {
    font-size: 40px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    margin: 0 0 40px;
  }

  & > h2,
  p {
    text-align: center;
    color: white;
  }
`;

export const CardWrapper = styled.div`
  padding: 0 10px;
`;

export const AliceCarouselWrapper = styled.div`
  &&&& .alice-carousel__stage-item {
    transition-duration: 300ms;
    &:not(.__active) {
      margin-top: 20px;
    }
  }
`;

const ImgHeight = "60px";
export const StyledSection = styled.section<CardProps>`
  border-radius: 8px;
  box-shadow: 0 2px 26px 0 rgba(11, 116, 222, 0.49);
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;

  > div > a {
    display: inline-flex;
    > img {
      height: ${ImgHeight};
      max-width: 240px;
      margin: 21px ${props => (props.isMobile ? "20px" : "25px")};
      max-height: ${ImgHeight};
    }
  }

  &:hover {
    > a > img {
      cursor: pointer;
    }
  }
`;

export const LogoHeader = styled.div`
  border-bottom: solid 1px #d7d7d7;
`;

export const StyledCompanyName = styled.h3<CardProps>`
  padding: 17px ${props => (props.isMobile ? "20px 24px" : "24px 31px")};
  margin: 0;
`;

export const StyledContent = styled.p<CardProps>`
  margin: 0;
  padding: 0px ${p => (p.isMobile ? "20px" : "27px")} 30px;
`;

const marginLeftFn = (isMobile?: boolean): string =>
  isMobile ? "-22px" : "-16px";

export const StyledAdoptersItemExtLink = styled(Link.External)<CardProps>`
  &&&&& {
    ${linkEffect}
    padding: 0 27px 27px;
    margin-top: auto;
    margin-left: ${p => marginLeftFn(p.isMobile)};
    display: block;
  }
`;

export const StyledAdoptersItemIntLink = styled(Link.Internal)<CardProps>`
  &&&&& {
    ${linkEffect}
    display: block;
    margin-left: ${p => marginLeftFn(p.isMobile)};
    margin-top: auto;
    padding: 0 27px 27px;
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

export const LoadAllButton = styled(Button.Normal)`
  padding: 0 70px;
`;

export const StyledGridRow = styled(Grid.Row)`
  justify-content: center;
`;

export const StyledWrapper = styled.div`
  background: url(${usedByBackgroundSVG});
  background-size: 100% 1050px;
  padding: 200px 15px 30px;
  background-repeat: no-repeat;
  ${media.phone`
    background-size: 120% 600px;
    padding: 110px 15px 0px;
  `};
  ${media.smallPhone`
    background-size: 120% 600px;
    padding: 110px 15px 0px;
  `};
`;

export const StyledGridContainer = styled(Grid.Container)`
  ${media.smallPhone`
    padding: 0;
  `}
`;

export const StyledGridUnit = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  flex: 0 0 100%;
  max-width: 100%;
`;
