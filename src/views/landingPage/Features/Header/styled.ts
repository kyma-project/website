import styled, { media } from "@styled";

export const HeaderWrapper = styled.div`
  margin-bottom: 75px;

  h2,
  > div {
    text-align: center;
  }

  > div {
    max-width: 567px;
    margin: 0 auto;
  }
`;

export const SpellingOfText = styled.pre`
  margin: 0;
  display: inline;
  font-size: 16px;
`;
