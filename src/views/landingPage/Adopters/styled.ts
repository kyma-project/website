import { Adopter } from "./../../../types/landingPage";
import styled, { media } from "@styled";
import { linkEffect } from "@styled/mixins";

import Grid from "@styled/Grid";
import Link from "@components/shared/Link";

import Bottom from "@static/img/bottom-long.svg";

export const AdoptersWrapper = styled.div`
  position: relative;
  background: url(${Bottom}) no-repeat;
  background-size: cover;
  background-position: top;
  margin-bottom: -200px;

  min-height: 860px;
  z-index: 1;
  justify-content: center;
  flex-direction: column;
  display: flex;
  text-align: center;

  header {
    margin-bottom: 32px;

    h2 {
      margin-bottom: 16px;
    }

    p {
      font-size: 16px;
      font-weight: 500;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.63;
      letter-spacing: normal;
      text-align: center;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  @media (max-width: 1100px) {
    & {
      background-size: cover;
    }
  }
`;

export const AdoptersGalleryWrapper = styled.div`
  &&&&& {
    margin: 0;
    display: flex;

    ${Grid.Container} {
      padding: 0;
    }

    ${Grid.Row} {
      justify-content: space-around;
      align-items: center;
      flex-flow: row nowrap;
    }

    ${Grid.Unit} {
      margin: 0;
    }

    li {
      margin: 0;
    }

    .carousel-buttons-nav {
      padding: 0;
      margin: 0;
    }

    button.carousel-button {
      border: none;
      transition: all 0.3s;

      &:hover {
        background: #fff;
        box-shadow: 0 1px 26px 0 rgba(137, 165, 199, 0.42);

        > svg {
          color: #0077e1;
        }
      }

      > svg {
        margin-right: 0;
        transition: all 0.3s;
      }

      ${media.smallPhone`
        padding: 0 8px;
        line-height: 32px;

        > svg {
          width: 14px;
        }
      `}
    }

    .carousel-button-left {
      svg {
        right: 2px;

        ${media.smallPhone`
          right: 1px;
        `}
      }
    }

    .carousel-button-right {
      svg {
        left: 2px;

        ${media.smallPhone`
          left: 1px;
        `}
      }
    }
  }
`;

export const AliceCarouselWrapper = styled.div`
  position: relative;
  z-index: 1;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 42px;
    height: 100%;
    z-index: 2;
    background: linear-gradient(
      to right,
      rgba(235, 240, 246, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 42px;
    height: 100%;
    z-index: 2;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(243, 243, 243, 1) 100%
    );
  }
`;

interface ItemProps {
  cssProperties?: Adopter["cssProperties"];
}

const ImgHeight = "60px";
export const StyledAdoptersItem = styled.div`
  margin: 0 32px;
  text-align: center;
  > a {
    margin-bottom: 16px;
    display: block;
    height: 100%;

    > img {
      width: 100%;
      height: ${ImgHeight};
      max-width: 240px;
      max-height: ${ImgHeight};
      ${(props: ItemProps) => props.cssProperties};
    }
  }

  &:hover {
    > a > img {
      cursor: pointer;
    }
  }
`;

export const StyledAdoptersItemContent = styled.div`
  font-style: italic;
  margin-bottom: 24px;
  font-size: 14px;
`;

export const StyledAdoptersItemExtLink = styled(Link.External)`
  &&&&& {
    ${linkEffect}
    display: inline-block;
  }
`;

export const StyledAdoptersItemIntLink = styled(Link.Internal)`
  &&&&& {
    ${linkEffect}
    display: inline-block;
  }
`;

export const AddYourCompanyWrapper = styled.div`
  margin-top: 32px;

  button {
    font-size: 16px;
  }
`;
