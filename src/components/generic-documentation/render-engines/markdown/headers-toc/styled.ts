import styled, { css, media } from "@styled";
import { customScrollBar } from "@styled/mixins";

const navNode = (multiple: number) => css`
  svg {
    left: ${`${5 + multiple * 12}px`} !important;
  }

  a {
    padding-left: ${`${12 + multiple * 16}px`};
  }
`;

interface HeadersNavigationsWrapperProps {
  showMobileNav?: boolean;
}

export const HeadersNavigationsWrapper = styled.div<
  HeadersNavigationsWrapperProps
>`
  position: relative;
  max-height: calc(100vh - 32px);
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  margin: 16px 0;
  background: #fff;

  ${customScrollBar({
    thumbBorderRadius: "4px",
    trackBorderRadius: "4px",
  })}

  ${media.phone`
    margin: 0;
    max-height: 100vh;
    background: transparent;
    height: 100%;
    top: 0;
    display: block;
    height: 100vh;
    position: fixed;
    padding: 0;
    top: 0px;
    width: 15rem;
    opacity: 1;
    pointer-events: auto;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    transition: transform 350ms cubic-bezier(0.4, 0, 0.2, 1) 0s;

    ${media.phone`
      &:before {
        content: "";
        top: 0;
        left: 4px;
        position: absolute;
        background: #fff;
        width: 100%;
        height: 100%;
        z-index: -1;
        border-left: 1px solid rgb(229, 229, 229);
      }
    `};
  `}

  ${media.phone<HeadersNavigationsWrapperProps>`
    transform: ${props =>
      props.showMobileNav
        ? `translateX(calc(-15rem))`
        : `translateX(calc(1rem))`};
  `};
`;

export const StyledHeadersNavigation = styled.div`
  &&& {
    ${media.phone`
      &:before {
        left: 15px;
      }
    `};

    ul {
      margin: 0;
    }

    .dc-markdown__toc-list-item {
      width: 100%;
      max-width: 100%;
      position: relative;
      margin: 0;

      a {
        width: 100%;
        font-size: 12px;
        padding: 4px 24px;
        margin-left: 4px;
        color: #485766;
        font-weight: normal;
        display: block;
        position: relative;
        border-left: 1px solid rgb(229, 229, 229);

        ${media.phone`
          border-left: none;

          &:after {
            content: "";
            top: 0;
            left: 0px;
            position: absolute;
            background: #fff;
            width: 100%;
            height: 100%;
            z-index: -1;
            border-left: 1px solid rgb(229, 229, 229);
          }
        `};

        &:before {
          content: "";
          position: absolute;
          width: 7px;
          height: 7px;
          background: rgb(229, 229, 229);
          border-radius: 100%;
          transform: translateY(-50%);
          top: 50%;
          left: -4px;
          display: none;
          z-index: 2;
        }

        &:hover {
          color: rgba(11, 116, 222, 1);

          &:before {
            display: block;
          }
        }

        &.active {
          color: #0b74de;
          font-weight: bold;

          &:before {
            display: block;
            background: rgba(11, 116, 222, 1);
          }
        }
      }

      ul {
        display: none;
      }
    }

    .dc-markdown__toc-list-item--active {
      > a {
        color: rgba(11, 116, 222, 1);
      }
    }

    .dc-markdown__toc-list-item--level-1 {
      ${navNode(0)}
      > a {
        font-size: 14px;
        padding-top: 6px;
        padding-bottom: 6px;
      }
    }

    .dc-markdown__toc-list-item--level-2 {
      ${navNode(1)}
    }

    .dc-markdown__toc-list-item--level-3 {
      ${navNode(2)}
    }

    .dc-markdown__toc-list-item--level-4 {
      ${navNode(3)}
    }

    .dc-markdown__toc-list-item--level-5 {
      ${navNode(4)}
    }

    .dc-markdown__toc-list-item--level-6 {
      ${navNode(5)}
    }

    .dc-markdown__toc-list-item--level-doc-title {
      ${navNode(0)}
      > a {
        font-size: 14px;
        padding-top: 6px;
        padding-bottom: 6px;
      }

      .dc-markdown__toc-list-item--level-1 {
        ${navNode(1)}
        > a {
          font-size: 12px;
          padding-top: 4px;
          padding-bottom: 4px;
        }
      }

      .dc-markdown__toc-list-item--level-2 {
        ${navNode(2)}
      }

      .dc-markdown__toc-list-item--level-3 {
        ${navNode(3)}
      }

      .dc-markdown__toc-list-item--level-4 {
        ${navNode(4)}
      }

      .dc-markdown__toc-list-item--level-5 {
        ${navNode(5)}
      }

      .dc-markdown__toc-list-item--level-6 {
        ${navNode(6)}
      }
    }

    .dc-markdown__toc-list-item--level-doc-type {
      ${navNode(0)}
      > a {
        font-size: 14px;
        padding-top: 6px;
        padding-bottom: 6px;

        &:before {
          display: block;
        }
      }

      .dc-markdown__toc-list-item--level-doc-title {
        ${navNode(1)}
        > a {
          font-size: 12px;
          padding-top: 4px;
          padding-bottom: 4px;
        }
      }

      .dc-markdown__toc-list-item--level-1 {
        ${navNode(2)}
      }

      .dc-markdown__toc-list-item--level-2 {
        ${navNode(3)}
      }

      .dc-markdown__toc-list-item--level-3 {
        ${navNode(4)}
      }

      .dc-markdown__toc-list-item--level-4 {
        ${navNode(5)}
      }

      .dc-markdown__toc-list-item--level-5 {
        ${navNode(6)}
      }

      .dc-markdown__toc-list-item--level-6 {
        ${navNode(7)}
      }
    }

    .dc-markdown__toc-list-item--show,
    .dc-markdown__toc-list-item--show > ul {
      display: block !important;
    }

    .dc-markdown__toc-list-item--has-children > a:before {
      display: block;
    }
  }
`;
