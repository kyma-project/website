import styled, { media } from "@styled";
import { customScrollBar } from "@styled/mixins";

import Button from "@components/shared/Button";

export const AlgoliaWrapper = styled.div`
  display: inline-block;
  box-shadow: none;

  > button {
    margin-left: 6px;
    padding: 0 12px;
    border: none;
    color: transparent;

    > svg {
      margin-right: 0;
    }

    > span {
      display: none;
    }

    ${media.largeTablet`
      &:first-child {
        display: none;
        color: transparent;
      }
    `}

    > form {
      .algolia-autocomplete {
        margin: 0 !important;

        .ds-dropdown-menu {
          margin-top: 16px;
          box-shadow: 0 1px 26px 0 rgba(137, 165, 199, 0.42);
          max-width: 543px;
          min-width: 543px;
          right: -10px !important;
          z-index: 202 !important;

          &:before {
            right: 60px !important;
          }
        }

        [class^="ds-dataset-"] {
          margin: 0;
          padding: 0;
          border: 0;
          border-radius: 10px;
        }

        .ds-suggestions {
          margin-top: 0;
          max-height: 75vh;
          overflow-y: auto;

          ${customScrollBar({
            thumbBorderRadius: "6px",
            trackBorderRadius: "6px",
          })}
        }

        .algolia-docsearch-suggestion {
          padding: 0;
        }

        .algolia-docsearch-suggestion__main {
          padding: 16px 0 0 0 !important;
        }

        .algolia-docsearch-suggestion--wrapper {
          padding: 0;

          &:hover {
            background-color: rgba(11, 116, 222, 0.07);
          }
        }

        .algolia-docsearch-suggestion--content {
          padding: 12px;
          padding-right: 26px;
          width: 70%;
          max-width: 70%;

          &:hover {
            background-color: transparent;
          }

          &:before {
            width: 0;
          }

          ${media.phone`
            padding-left: 26px;
          `}
        }

        .ds-suggestion.ds-cursor
          .algolia-docsearch-suggestion:not(.suggestion-layout-simple)
          .algolia-docsearch-suggestion--content {
          background-color: transparent !important;
        }

        .ds-suggestion.ds-cursor .algolia-docsearch-suggestion--wrapper {
          background-color: rgba(11, 116, 222, 0.07);
        }

        .algolia-docsearch-suggestion--title {
          line-height: normal;
          font-size: 14px;
          font-weight: 700;
          color: #485766;
        }

        .algolia-docsearch-suggestion--text {
          line-height: normal;
          font-size: 12px;

          .algolia-docsearch-suggestion--highlight {
            background-color: transparent;
            box-shadow: none;
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
          text-align: center;
        }

        .algolia-docsearch-suggestion
          .algolia-docsearch-suggestion--no-results
          .algolia-docsearch-suggestion--text:after {
          content: "😔";
        }

        .algolia-docsearch-suggestion--subcategory-column {
          width: 30%;
          color: #485766;
          font-size: 12px;
          font-weight: normal;
          line-height: normal;
          padding: 12px;
          padding-left: 26px;

          ${media.phone`
            opacity: 1;
          `}

          &:before {
            width: 0;
          }

          &:after {
            display: none;
          }
        }

        .algolia-docsearch-suggestion--highlight {
          color: #0b74de !important;
          font-weight: 700;
          background-color: transparent;
          box-shadow: none !important;
        }

        .algolia-docsearch-suggestion--category-header {
          margin-top: 0;
          padding: 0;
          font-size: 13px;
          font-weight: 700;
          line-height: normal;
          padding: 6px 0;
          margin: 0 26px;
          color: #485766;
          border-bottom: 1px solid #7f98b1;
        }

        .algolia-docsearch-footer {
          width: 100%;
          height: 45px;
          margin-top: 0;
          padding: 0;
          margin: 0;
        }

        .algolia-docsearch-footer--logo {
          width: 100px;
          height: 100%;
          margin-left: auto;
          margin-right: 12px;
        }

        ${media.largeTablet`
          .ds-dropdown-menu {
            left: auto !important;
            right: -5.5rem !important;
            min-width: 543px !important;

            &:before {
              right: 147px !important;
            }
          }
        `}

        ${media.phone`
          .ds-dropdown-menu {
            right: -6.75rem !important;
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

interface InputWrapperProps {
  active?: boolean;
}

export const InputWrapper = styled(Button.Light)`
  &&& {
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease-in-out;

    ${media.largeTablet`
      position: relative;
    `}

    > svg:last-child {
      position: absolute;
      top: 50%;
      right: 16px;
      font-size: 16px;
      transform: translateY(-50%);
      color: transparent;
      display: ${(props: InputWrapperProps) =>
        props.active ? "block" : "none"};

      ${media.largeTablet`
        display: none;
      `}
    }

    > div {
      position: absolute;
      top: 50%;
      right: 32px;
      font-size: 16px;
      color: transparent;
      transform: translateY(-48%);
      display: ${(props: InputWrapperProps) =>
        props.active ? "block" : "none"};
      cursor: help;

      ${media.largeTablet`
        right: 16px;
      `}

      /* Tooltip */
      > div {
        top: 90%;
        width: 210px;
        text-align: left;
        padding: 16px;
        font-size: 12px;
        line-height: 1rem;
        right: 0;
        transform: translateX(30px);

        &:after {
          right: 40px;
        }
      }
    }

    &:hover {
      color: #0b74de;
      background-color: #fff;
    }

    ${(props: InputWrapperProps) =>
      props.active
        ? `
      color: #0b74de;
      background-color: #fff;

      > svg:last-child, > div {
        color: #0b74de;
      }
    `
        : ``}

    > form {
      display: inline-block;
      margin: 0;
      padding: 0;
      top: 0;
      line-height: 46px;

      border-radius: 25px;
      transition: all 0.3s ease-in-out;

      > span {
        margin: 0 12px;
        font-size: 18px;

        > svg {
          color: ${(props: InputWrapperProps) =>
            props.active ? "#0077e1" : "#fff"};
        }
      }

      input {
        border: 0;
        font-size: 14px;
        font-weight: 500;
        width: ${(props: InputWrapperProps) => (props.active ? "15rem" : "0")};
        background: transparent;
        transition: all 0.3s ease-in-out;
        outline: none;
        color: #0077e1;
        padding: ${(props: InputWrapperProps) =>
          props.active ? "0 42px 0 8px" : "0"};

        ${media.smallPhone`
          width: ${(props: InputWrapperProps) => (props.active ? "30vw" : "0")};
        `}
      }
    }
  }
`;

export const TooltipContent = styled.div`
  > ul {
    margin: 6px 0 0 0;
    list-style: none;

    > li {
      position: relative;
      padding-left: 12px;

      &:last-child {
        margin-bottom: 0;
      }

      &:before {
        content: "•";
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 1em;
        height: 100%;
        color: #fff;
      }
    }
  }
`;
