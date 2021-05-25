import styled, { media } from "@styled";

export const HeadlineWrapper = styled.p`
  ${media.phone`
    margin-top: 80px;
    line-height: 1.4;
    font-size: 28px;
  `};

  margin-top: 180px;
  margin-bottom: 39px;

  font-size: 32px;
  font-weight: 400;
  line-height: 1.5;
`;

export const FormattedBrand = styled.span`
  font-weight: 700;
`;

export const IconWrapper = styled.div`
  margin-top: 135px;
  margin-bottom: 55px;
  text-align: center;

  ${media.phone`
    margin-top: 90px;
  `};
`;

export const ButtonWrapper = styled.div`
  button {
    :hover {
      background-color: #0472e6;
    }
    color: #0472e6;
    border-color: #0472e6;
  }

  ${media.phone`
    text-align: center;
  `};
`;

export const SpellingOfText = styled.span`
  font-family: monospace;
  font-size: 32px;
`;
