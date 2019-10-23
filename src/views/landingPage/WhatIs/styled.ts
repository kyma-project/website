import Grid from "@styled/Grid";
import styled from "@styled";
import Link from "@components/shared/Link";
import media from "@styled/media";

export const ParagraphWrapper = styled.section`
  padding-top: 20px;
`;

export const StyledGridContainer = styled(Grid.Container)`
  padding-top: 0;
`;

export const SpellingOfText = styled.pre`
  margin: 0;
  display: inline;
  font-size: 16px;
`;

export const MakesSpecialSvgWrapper = styled.section`
  ${media.tablet`
    text-align: center;
    width: unset;
  `};

  padding-top: 10px;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
`;

interface ProductImageProps {
  icon: any;
  width?: number;
}

const size = "60px";

export const ProductSVG = styled.div<ProductImageProps>`
  width: ${props => (props.width ? props.width + "px" : size)};
  height: ${size};
  background: url(${props => props.icon}) no-repeat;
  margin: 10px;
`;

export const ProductIconImg = styled.img`
  max-width: 100%;
  margin: 10px;
  height: ${size};
`;

export const AliceCarouselWrapper = styled.div`
  margin: auto 0;
  position: relative;
  z-index: 1;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    z-index: 2;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 5px;
    height: 100%;
    z-index: 2;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
  }
`;
