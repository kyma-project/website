import styled, { media } from "@styled";
import { linkEffect } from "@styled/mixins";

import Link from "@components/shared/Link";

import Bottom from "@static/img/bottom-long.svg";

export const AdoptersWrapper = styled.div`
  position: relative;
  background: url(${Bottom}) no-repeat;
  background-size: cover;
  background-position: top;
  margin-bottom: -240px;

  min-height: 900px;
  z-index: 1;
  justify-content: center;
  flex-direction: column;
  display: flex;
  text-align: center;

  @media (max-width: 1100px) {
    & {
      background-size: cover;
    }
  }
`;

export const AdoptersContent = styled.div`
  &&&&& {
    margin: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-flow: row nowrap;

    > div {
      padding: 0 16px;
    }

    > button > svg {
      width: 1em;
    }

    ${media.tablet`
      flex-flow: row wrap;
    `};
  }
`;

export const StyledAdoptersItem = styled.div`
  margin: 0 24px;
  text-align: center;

  > img {
    width: 100%;
    height: 60px;
    max-width: 240px;
    max-height: 60px;
    margin-bottom: 16px;
    /* filter: grayscale(100%); */
    transition-duration: 300ms;
  }

  &:hover {
    > img {
      filter: none;
    }
  }
`;

export const StyledAdoptersItemContent = styled.div`
  margin-bottom: 24px;
`;

export const StyledAdoptersItemLink = styled(Link.External)`
  ${linkEffect}
`;
