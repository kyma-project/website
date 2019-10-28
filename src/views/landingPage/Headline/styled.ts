import styled, { media } from "@styled";

export const HeadlineWrapper = styled.h2`
  font-size: 40px;
  font-weight: 600;
  line-height: 1.2;
  margin-top: 70px;

  br {
    display: none;
  }

  ${media.phone`
    font-size: 35px;

    br:first-child {
      display: inline;
    }
  `};

  ${media.smallPhone`
    font-size: 30px;
  `};
`;
