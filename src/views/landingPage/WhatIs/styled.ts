import styled, { media } from "@styled";
import Grid from "@styled/Grid";

export const ParagraphWrapper = styled.section`
  padding: 20px 0;
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
  & iframe {
    width: 100%;
    border-radius: 5px;
  }
`;
