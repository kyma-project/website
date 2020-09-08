import styled, { media } from "@common/styled";

export const ImageWrapper = styled.div`
  display: flex;
  margin-bottom: 90px;
  height: 100%;
  max-height: 226px;

  img {
    height: 226px;
    margin: 0 auto;

    ${media.phone`
      margin: 0 0;
    `};
  }

  ${media.phone`
      margin-bottom: 32px;
  `};
`;

export const FeatureWrapper = styled.div`
  margin-bottom: 64px;
`;
