import styled, { media } from "@styled";
import Icon from "@components/shared/Icon";

export const HeadersNavigationsWrapper = styled.div`
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 100vh;

  ${media.phone`
    display: none;
  `}
`;

export const StyledHeadersNavigation = styled.div`
  margin-top: 16px;

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
        color: #32363a;
        font-weight: normal;
        display: block;

        &.active {
          color: #0b74de;
          font-weight: bold;
        }
      }

      ul {
        display: none;
      }
    }

    .cms__toc-list-item--level-1 {
      svg {
        left: 17px !important;
      }

      a {
        padding-left: 36px;
      }
    }

    .cms__toc-list-item--level-2 {
      svg {
        left: 29px !important;
      }

      a {
        padding-left: 48px;
      }
    }

    .cms__toc-list-item--level-3 {
      svg {
        left: 41px !important;
      }

      a {
        padding-left: 60px;
      }
    }

    .cms__toc-list-item--level-4 {
      svg {
        left: 53px !important;
      }

      a {
        padding-left: 72px;
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
