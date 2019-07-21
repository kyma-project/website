import styled, { media } from "@styled";

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
  border-radius: 4px;
  background-color: rgb(255, 255, 255);

  ul {
    margin: 0;
  }

  &&& {
    .cms__toc-list-item {
      width: 100%;
      max-width: 100%;
      position: relative;

      a {
        width: 100%;
        font-size: 13px;
        padding: 4px 24px;
        color: #32363a;
        font-weight: normal;

        &.active {
          color: #0b74de;
          font-weight: bold;
          border-left: 2px solid #0b74de;
        }
      }

      ul {
        display: none;
      }
    }

    .cms__toc-list-item--level-1 {
      span {
        left: 17px !important;
      }

      a {
        padding-left: 36px;
      }
    }

    .cms__toc-list-item--level-2 {
      span {
        left: 29px !important;
      }

      a {
        padding-left: 48px;
      }
    }

    .cms__toc-list-item--level-3 {
      span {
        left: 41px !important;
      }

      a {
        padding-left: 60px;
      }
    }

    .cms__toc-list-item--level-4 {
      span {
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

// interface CollapseArrowProps {
//   open: boolean;
//   root: boolean;
// }

// export const CollapseArrow = styled(Icon)`
//   &&&&& {
//     display: block;
//     position: absolute;
//     width: 18px;
//     ${({ root = false }: CollapseArrowProps) =>
//       root ? `margin-left: 5px;` : ''}
//     top: 1px;
//     text-align: center;
//     cursor: pointer;
//     color: #0b74de;
//     &:before {
//       font-size: 0.65rem;
//       line-height: 1;
//       transition: 0.3s ease;
//       ${({ open = false }: CollapseArrowProps) =>
//         open && 'transform: rotate(90deg);'};
//     }
//   }
// `;
