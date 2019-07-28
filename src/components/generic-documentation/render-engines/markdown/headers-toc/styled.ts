import styled, { css, media } from "@styled";
import { customScrollBar } from "@styled/mixins";
import Icon from "@components/shared/Icon";

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
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(100vh - 32px);
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
    bottom: 0px;
    display: block;
    height: 100vh;
    position: fixed;
    padding: 9px 0 0 0;
    top: 0px;
    width: 15rem;
    z-index: 10;
    opacity: 1;
    pointer-events: auto;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    transition: transform 350ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
    box-shadow: rgba(46, 41, 51, 0.08) 0px 4px 16px, rgba(71, 63, 79, 0.16) 0px 8px 24px;
  `}

  ${media.phone<HeadersNavigationsWrapperProps>`
    transform: ${props =>
      props.showMobileNav
        ? `translateX(calc(100vw - 15rem))`
        : `translateX(calc(100vw + 1rem))`};
  `};
`;

export const StyledHeadersNavigation = styled.div`
  ${media.phone`
    padding-left: 12px;

    &:before {
      left: 15px;
    }
  `};

  ul {
    margin: 0;
  }

  &&& {
    .cms__toc-list-item {
      width: 100%;
      max-width: 100%;
      position: relative;
      margin: 0;

      a {
        width: 100%;
        font-size: 12px;
        padding: 4px 24px;
        margin-left: 4px;
        color: #32363a;
        font-weight: normal;
        display: block;
        position: relative;
        border-left: 1px solid rgb(229, 229, 229);

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

    .cms__toc-list-item--level-1 {
      ${navNode(0)}
    }

    .cms__toc-list-item--level-2 {
      ${navNode(1)}
    }

    .cms__toc-list-item--level-3 {
      ${navNode(2)}
    }

    .cms__toc-list-item--level-4 {
      ${navNode(3)}
    }

    .cms__toc-list-item--level-4 {
      ${navNode(4)}
    }

    .cms__toc-list-item--level-4 {
      ${navNode(5)}
    }

    .cms__toc-list-item--level-doc-title {
      ${navNode(0)}

      .cms__toc-list-item--level-1 {
        ${navNode(1)}
      }

      .cms__toc-list-item--level-2 {
        ${navNode(2)}
      }

      .cms__toc-list-item--level-3 {
        ${navNode(3)}
      }

      .cms__toc-list-item--level-4 {
        ${navNode(4)}
      }

      .cms__toc-list-item--level-4 {
        ${navNode(5)}
      }

      .cms__toc-list-item--level-4 {
        ${navNode(6)}
      }
    }

    .cms__toc-list-item--level-doc-type {
      ${navNode(0)}

      .cms__toc-list-item--level-doc-title {
        ${navNode(1)}
      }

      .cms__toc-list-item--level-1 {
        ${navNode(2)}
      }

      .cms__toc-list-item--level-2 {
        ${navNode(3)}
      }

      .cms__toc-list-item--level-3 {
        ${navNode(4)}
      }

      .cms__toc-list-item--level-4 {
        ${navNode(5)}
      }

      .cms__toc-list-item--level-4 {
        ${navNode(6)}
      }

      .cms__toc-list-item--level-4 {
        ${navNode(7)}
      }
    }

    .cms__toc-list-item--show,
    .cms__toc-list-item--show > ul {
      display: block !important;
    }
  }
`;

interface CollapseArrowProps {
  open: boolean;
  root: boolean;
}

export const CollapseArrow = styled(Icon)<CollapseArrowProps>`
  &&&&& {
    display: block;
    position: absolute;
    width: 12px;
    font-size: 0.75rem;
    margin-top: 6px;
    ${({ root = false }) => (root ? `margin-left: 5px;` : "")}
    top: 1px;
    text-align: center;
    cursor: pointer;
    color: #0b74de;
    line-height: 1;
    transition: 0.3s ease;
    ${({ open = false }) => open && "transform: rotate(90deg);"};
  }
`;
