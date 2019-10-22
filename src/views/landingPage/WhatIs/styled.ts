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

  display: flex;
  justify-content: center;
  flex-flow: row wrap;
`;

interface ProductImageProps {
  icon: any;
  width?: number;
}

const size = "50px";

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
