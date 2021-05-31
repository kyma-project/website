import styled, { media } from "@styled";
import Grid from "@styled/Grid";
import Button from "@components/shared/Button";

export const ParagraphWrapper = styled.section`
  padding: 0 0 7px;
`;

export const ParagraphTitleWrapper = styled.section`
  padding-top: 30px;
  font-size: 24px;
  font-weight: 600;
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

export const LearnMoreButton = styled(Button.Normal)`
  padding: 0 70px;
`;

export const HeaderWrapper = styled.div`
  margin-bottom: 45px;

  h2,
  > div {
    text-align: center;
  }

  > div {
    max-width: 567px;
    margin: 0 auto;
  }
`;
