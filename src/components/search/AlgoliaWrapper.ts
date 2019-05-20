import styled, { media } from "@styled";
import { customScrollBar } from "@styled/mixins";

interface Props {
  focused?: boolean;
}

const AlgoliaWrapper = styled.li`
  display: inline-block;
  margin-left: 6px;

  > div {
    > form {
      display: inline-block;
      margin: 0;
      padding: 0;
      top: 0;
      line-height: 46px;

      border-radius: 25px;
      transition: all 0.3s ease-in-out;
      background-color: ${(props: Props) =>
        props.focused ? "#fff" : "rgba(255, 255, 255, 0.1)"};

      &:active,
      &:focus {
        background-color: #fff;
      }

      > span {
        margin: 0 12px;
        font-size: 18px;

        > svg {
          color: ${(props: Props) => (props.focused ? "#0077e1" : "#fff")};
        }
      }

      input {
        border: 0;
        font-size: 14px;
        font-weight: 500;
        width: 0;
        background: transparent;
        transition: all 0.3s ease-in-out;
        color: #fff;
        width: 5rem;
        padding: 0;
        padding-right: 16px;

        &:active,
        &:focus {
          outline: none;
          color: #0077e1;
          width: 7rem;
        }
      }

      .algolia-autocomplete {
        margin: 0;

        .ds-dropdown-menu {
          margin-top: 16px;
          box-shadow: 0 1px 9px 0 rgba(0, 0, 0, 0.1);

          &:before {
            right: 50px !important;
          }
        }

        [class^="ds-dataset-"] {
          margin: 0;
          padding: 0;
          border: 0;
          max-height: 75vh;
          overflow-y: auto;

          ${customScrollBar({
            thumbBorderRadius: "6px",
            trackBorderRadius: "6px",
          })}
        }

        .ds-dropdown-menu .ds-suggestions {
          margin-top: 0;
        }

        .algolia-docsearch-suggestion {
          padding: 0;
        }

        .algolia-docsearch-suggestion--wrapper {
          padding: 0;
        }

        .algolia-docsearch-suggestion--content {
          padding: 12px;
        }

        .algolia-docsearch-suggestion--title {
          line-height: normal;
          font-size: 14px;
          font-weight: 600;
        }

        .algolia-docsearch-suggestion--text {
          line-height: normal;
          font-size: 12px;

          .algolia-docsearch-suggestion--highlight {
            background-color: #fff;
          }
        }

        .algolia-docsearch-suggestion
          .algolia-docsearch-suggestion--no-results {
          max-width: 100%;
          width: 100%;
          padding: 16px 0;
        }

        .algolia-docsearch-suggestion
          .algolia-docsearch-suggestion--no-results
          .algolia-docsearch-suggestion--text {
          font-size: 14px;
        }

        .algolia-docsearch-suggestion
          .algolia-docsearch-suggestion--no-results
          .algolia-docsearch-suggestion--text:after {
          content: "😔";
        }

        .algolia-docsearch-suggestion--subcategory-column {
          color: #000;
          font-size: 12px;
          font-weight: normal;
          line-height: normal;
          padding: 12px;

          &:before {
            background: "#000";
          }

          &:after {
            display: none;
          }
        }

        .algolia-docsearch-suggestion--highlight {
          background-color: rgba(22, 99, 222, 0.15);
          color: rgba(22, 99, 222, 1);
        }

        .algolia-docsearch-suggestion--category-header {
          margin-top: 0;
          padding: 0;
          font-size: 13px;
          font-weight: 600;
          line-height: normal;
          padding: 12px;
        }

        .algolia-docsearch-footer {
          width: 100%;
          height: 30px;
          margin-top: 0;
          border-top: 1px solid #ddd;
        }

        .algolia-docsearch-footer--logo {
          width: 100px;
          height: 100%;
          margin-left: auto;
          margin-right: 12px;
        }

        ${media.desktop`
          .ds-dropdown-menu {
            max-width: 600px;
            min-width: 600px;
          }

          .algolia-docsearch-suggestion
          .algolia-docsearch-suggestion--subcategory-column {
            width: 30%;
          }

          .algolia-docsearch-suggestion--content {
            width: 70%;
            max-width: 70%;
          }
        `}

        ${media.tablet`
          .ds-dropdown-menu {
            position: fixed !important;
            top: calc(48px + 80px) !important;
            left: auto !important;
            right: 0.75rem !important;
            min-width: 600px !important;

            &:before {
              right: 147px !important;
            }
          }
        `}

        ${media.phone`
          .ds-dropdown-menu {
            left: 0.75rem !important;
            right: 0.75rem !important;
            min-width: calc(100vw - 1.5rem) !important;
          }
        `}

        ${media.smallPhone`
          .algolia-docsearch-suggestion
          .algolia-docsearch-suggestion--subcategory-column {
            width: 100%;
          }

          .algolia-docsearch-suggestion--content {
            width: 100%;
            max-width: 100%;
          }
        `}
      }
    }
  }
`;

export default AlgoliaWrapper;
