import styled, { media } from "@styled";
import Grid from "@styled/Grid";

export const ParagraphWrapper = styled.section`
  padding: 0 0 7px;
`;

export const ParagraphWrapper2 = styled.section`
  padding-top: 30px;
  padding-bottom: 50px;
  font-size: 18px;
  font-weight: bold;
`;

export const StyledGridContainer = styled(Grid.Container)`
  padding-top: 0;
`;

export const CLIIcon = styled.img`
  max-width: 100%;
  margin: 10px;
  height: 500px;
`;

export const SvgWrapper = styled.section`
  padding: 30px 0;
  ${media.tablet`
    text-align: center;
    width: unset;
  `};
  display: flex;
  justify-content: center;
  justify-content: left;
  flex-flow: row wrap;
`;

export const ProjectIcon = styled.img`
  max-width: 100%;
  margin: 10px;
  height: 70px;
`;
