import styled, { media } from "@styled";

import usedByBackgroundSVG from "@views/landingPage/assets/landing-page/usedBy/usedByBackground.svg";

interface HeaderWrapperProps {
  marginBottom?: number;
}

export const ButtonWrapper = styled.div`
  button {
    :hover {
      background-color: #0472e6;
    }
    color: white;
    border-color: white;
  }
  text-align: center;
`;

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

export const StyledWrapper = styled.div`
  background: url(${usedByBackgroundSVG});
  background-size: 100% 100%;
  padding: 200px 15px 30px;
  background-repeat: no-repeat;

  ${media.phone`
    background-size: 120% 100%;
    padding: 110px 15px 0px;
  `};

  ${media.smallPhone`
    background-size: 120% 100%;
    padding: 110px 15px 0px;
  `};
`;

export const ImageWrapper = styled.div`
  display: flex;
  margin-bottom: 90px;
  margin-top: 90px;
  /* height: 100%; */

  img {
    margin: 0 auto;

    ${media.phone`
      margin: 0 0;
    `}
  }

  ${media.phone`
      margin-bottom: 32px;
  `}
`;
