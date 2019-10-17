import styled, { media } from "@styled";

import Middle from "@static/img/middle.svg";

export const MakeSpecialWrapper = styled.section`
  position: relative;
  /* background: url(${Middle}) no-repeat; */
  background-size: 100% 100%;
  min-height: 670px;
  z-index: 1;
  justify-content: center;
  flex-direction: column;
  display: flex;
  margin-top: 1.5%;
  margin-bottom: 1.5%;
  /* color: #fff; */

  ${media.tablet`
    padding: 50px 0 50px 0;
  `};
`;

export const MakesSpecialSvgWrapper = styled.section`
  /* width: 500px; */
  ${media.tablet`
    text-align: center;
    width: unset;
  `};

  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;
`;

interface ProductImageProps {
  icon: any;
  width?: number;
}

export const ProductSVG = styled.div<ProductImageProps>`
  width: ${props => (props.width ? props.width + "px" : "70px;")};
  height: 70px;
  background: url(${props => props.icon}) no-repeat;
  margin: 10px;
`;

export const ProductIconImg = styled.img`
  max-width: 100%;
  margin: 10px;
  height: 70px;
`;
