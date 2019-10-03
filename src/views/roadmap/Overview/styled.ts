import styled, { media } from "@styled";

export const OverviewWrapper = styled.div`
  margin-top: 72px;
  border-bottom: solid 1px #d5dce3;
`;

export const OverviewHeader = styled.header`
  text-align: center;
  padding-bottom: 72px;

  h2,
  h4 {
    text-align: center;
  }

  p {
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.63;
    letter-spacing: normal;
    text-align: center;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  ${media.phone`
    padding-bottom: 32px;
  `}
`;
