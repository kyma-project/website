import styled, { media } from "@common/styled";

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  img {
    ${media.phone`
      max-height: 400px;
    `};
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const PersonaWrapper = styled.div`
  ul {
    list-style-type: disc;
  }
`;
