import styled, { media } from "@styled";

interface HProps {
  center?: boolean;
}

export default styled.h1`
  text-align: ${(props: HProps) => (props.center ? "center" : "left")};

  &&& {
    &.header-with-anchor--level-1 {
      display: flex;
      align-items: center;
      margin: 80px 0 16px 0;

      > img {
        margin-bottom: 0;
      }

      > span {
        margin-left: 16px;
      }

      &:hover > a {
        visibility: visible;
      }

      > a {
        margin-left: 12px;
        visibility: hidden;

        ${media.phone`
          display: none;
        `};

        > svg {
          width: 0.6em;
          vertical-align: -0.175em;
        }
      }
    }

    &.header-with-anchor--level-2,
    &.header-with-anchor--level-3,
    &.header-with-anchor--level-4,
    &.header-with-anchor--level-5,
    &.header-with-anchor--level-6 {
      &:hover > a {
        visibility: visible;
      }

      > a {
        margin-left: 12px;
        visibility: hidden;

        ${media.phone`
          display: none;
        `};

        &:hover {
          visibility: visible;
        }

        > svg {
          width: 0.825em;
          vertical-align: -0.2em;
        }
      }
    }

    &.header-with-anchor--level-3 {
      > a > svg {
        width: 0.7em;
        vertical-align: -0.225em;
      }
    }

    &.header-with-anchor--level-4 {
      > a > svg {
        width: 0.6em;
        vertical-align: -0.275em;
      }
    }
  }
`;
