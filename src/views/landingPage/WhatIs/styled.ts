import styled, { media } from "@styled";
import Grid from "@styled/Grid";

export const ParagraphWrapper = styled.section`
  padding: 20px 0 7px;
`;

export const StyledGridContainer = styled(Grid.Container)`
  padding-top: 0;
`;

export const SpellingOfText = styled.pre`
  margin: 0;
  display: inline;
  font-size: 16px;
`;

export const YoutubeWrapper = styled.section`
  padding: 20px 0;

  ${media.phone`
    padding: 20px 0 0 0;
  `}

  > div {
    position: relative;
    height: 0;
    overflow: hidden;
    max-width: 100%;
    padding-bottom: 56.25%;
    > iframe {
      border-radius: 3px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
`;
