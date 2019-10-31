import styled, { media } from "@styled";
import Grid from "@styled/Grid";

export const ExtensionsAndToolsWrapper = styled.section`
  position: relative;

  background-size: 100% 100%;
  min-height: 350px;
  z-index: 1;
  justify-content: center;
  flex-direction: column;
  display: flex;
  margin-top: 3.5%;
  margin-bottom: 1.5%;

  ${media.tablet`
    padding: 30px 0 50px 0;
  `};
`;

interface GridProps {
  leftPadding?: number;
  rightPadding?: number;
}

export const StyledGridUnit = styled(Grid.Unit)<GridProps>`
  padding: 0
    ${props => (props.rightPadding ? props.rightPadding + "px" : "15px")} 0
    ${props => (props.leftPadding ? props.leftPadding + "px" : "15px")};
  ${media.tablet`
    padding: 0 15px;
  `};
`;

export const SvgWrapper = styled.section`
  padding: 30px 0;
  ${media.tablet`
    text-align: center;
    width: unset;
  `};

  display: flex;
  justify-content: center;
  flex-flow: row wrap;
`;

export const ProjectIcon = styled.img`
  max-width: 100%;
  margin: 10px;
  height: 70px;
`;
