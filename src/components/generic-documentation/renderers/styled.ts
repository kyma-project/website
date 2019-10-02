import styled, { css } from "styled-components";
import { customScrollBar } from "@styled/mixins";

import H from "@components/shared/H";

export const tabsStyling = css`
  .dc-markdown__tabs {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    font-weight: normal;
    margin: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(151, 151, 151, 0.26);
    border-image: initial;
    border-radius: 4px;
    margin-bottom: 16px;

    .dc-markdown__text {
      font-size: 16px;
    }
  }

  .dc-markdown__tabs-header {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid rgba(151, 151, 151, 0.26);
    display: flex;
    justify-items: flex-start;
    flex-flow: row nowrap;
  }

  .dc-markdown__tabs-content {
    font-size: 16px;
    color: rgb(81, 85, 89);
    line-height: 1.57;
    margin: 16px;
  }

  .dc-markdown__tab {
    display: flex;
    align-items: center;
    margin: 0 16px;
    border: none;
    position: relative;
    color: #32363b;
    font-size: 16px;
    outline: none;
    transition: 0.2s color linear;
    cursor: pointer;
    &:first-letter {
      text-transform: uppercase;
    }

    &:after {
      content: "";
      bottom: 0;
      display: block;
      position: absolute;
      height: 0px;
      width: 100%;
      border-radius: 2px;
      background-color: #0b74de;
    }

    &:hover {
      color: #0a6ed1;
      cursor: pointer;
      &:after {
        content: "";
        bottom: 0;
        display: block;
        position: absolute;
        height: 3px;
        width: 100%;
        border-radius: 2px;
        background-color: #0b74de;
      }
    }

    .dc-markdown__tab-label {
      padding: 12px 0;
    }
  }

  .dc-markdown__tab--active {
    color: #0a6ed1;

    &:after {
      height: 3px;
    }
  }
`;

interface GroupHeaderProps {
  marginTop?: boolean;
}

export const GroupHeader = styled(H)<GroupHeaderProps>`
  &&&&& {
    box-sizing: border-box;
    font-size: 36px;
    font-weight: 600;
    margin: 0;
    margin-top: ${props => (props.marginTop ? `24px` : `0`)};
    padding-top: 16px;
  }
`;

export const DocumentHeader = styled(H)`
  &&&&& {
    box-sizing: border-box;
    font-size: 32px;
    color: rgb(0, 115, 230);
    font-weight: 300;
    padding-top: 16px;
    margin: 0 0 16px 0;
  }
`;

interface StyledMarkdownProps {
  hideTitleHeader?: number;
  groupName?: string;
}

export const StyledMarkdown = styled.div<StyledMarkdownProps>`
  &&& {
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    box-sizing: border-box;
    text-align: left;
    font-weight: normal;
    padding: 24px 0 40px 0;
    border-bottom: 1px solid rgb(229, 229, 229);
    padding-top: ${props => (props.groupName ? "0" : "24px")};

    /* &:first-child {
      padding-top: ${props => (props.hideTitleHeader ? "8px" : "0")};
    } */

    &:first-of-type {
      padding-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
      border-bottom: 0;
      padding-bottom: 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: #32363a;
      font-weight: 600;
      margin: 0;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-bottom: -8px;
    }
    h1 {
      .dc-markdown__text {
        font-size: 28px !important;
      }
    }
    h2 {
      padding-top: 16px;
      font-size: 22px;
      
      .dc-markdown__text {
        font-size: 22px !important;
      }
    }
    h3 {
      padding-top: 16px;

      .dc-markdown__text {
        font-size: 20px !important;
      }
    }
    h4 {
      padding-top: 16px;

      .dc-markdown__text {
        font-size: 18px !important;
      }
    }
    a {
      color: #0b74de;

      .dc-markdown__text {
        color: #0b74de !important;
      }
    }
    a:hover {
      color: #0b74de;
    }
    code {
      width: 100%;
      white-space: pre-wrap;
      white-space: -moz-pre-wrap;
      white-space: -o-pre-wrap;
      word-wrap: break-word;
    }
    .internal {
      display: none !important;
    }
    table {
      border-collapse: collapse;
      margin: 16px 0;
      display: block;
      width: 100%;
      overflow: auto;

      ${customScrollBar({
        thumbBorderRadius: "0 0 4px 4px",
        trackBorderRadius: "0 0 4px 4px",
      })}
    }
    thead {
      background-color: rgba(243, 244, 245, 0.45);
    }
    th,
    td {
      padding: 8px 13px;
      display: table-cell;
      vertical-align: middle;
      border: 1px solid rgb(223, 226, 229);

      &:first-child {
        padding-left: 13px;
      }
      &:last-child {
        padding-right: 13px;
      }
    }
    tr {
      &:nth-child(2n) {
        background-color: rgb(246, 248, 250);
      }
    }
    tr:last-child {
      border: none;
    }
    img {
      max-width: 100%;
    }
    ul:last-child,
    ol:last-child,
    p:last-child {
      margin-bottom: 12px;
    }
    ul {
      list-style-type: disc;
      list-style-position: outside;
      margin-top: 16px;
      margin-bottom: 16px;
    }
    ol {
      list-style-type: decimal;
      list-style-position: outside;
      margin-top: 16px;
      margin-bottom: 16px;
    }
    ul ul,
    ol ul {
      list-style-type: circle;
      list-style-position: outside;
    }
    ol ol,
    ul ol {
      list-style-type: lower-latin;
      list-style-position: outside;
    }
    pre {
      margin: 0;
    }
    p {
      margin: 12px 0;
    }

    .dc-markdown__text {
      font-size: 16px;
      color: rgb(81, 85, 89);
      line-height: 1.57;
      font-weight: 500;
    }

    .dc-markdown__code-wrapper {
      position: relative;
      margin: 8px 0;
    }

    .dc-markdown__inline-code {
      font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier,
        monospace;
      font-size: 85%;
      background-color: rgba(27, 31, 35, 0.05);
      padding: 0.2em 0.4em;
      margin: 0px;
      border-radius: 3px;
    }

    .dc-markdown__code-pre-wrapper {
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
        monospace !important;
      background: rgb(250, 250, 250);
      border: 1px solid rgb(229, 229, 229);
      border-radius: 5px;
      padding-bottom: 16px;
      white-space: nowrap;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;

      ${customScrollBar({
        thumbBorderRadius: "0 0 4px 4px",
        trackBorderRadius: "0 0 4px 4px",
      })}

      > pre {
        padding: 16px 16px 0 16px;
        margin-bottom: 0 !important;

        > code {
          word-break: normal;
          white-space: pre;
          overflow-wrap: normal;

          > div span:last-child {
            padding-right: 16px;
          }
        }
      }
    }

    ${tabsStyling}

    .dc-markdown__blockquote {
      margin-left: 0;
      margin-right: 0;
      padding: 16px;
      margin: 8px 0;
      font-size: 14px;

      .dc-markdown__text {
        font-size: 14px;
      }

      p {
        margin: 3px 0;
      }
    }

    .dc-markdown__blockquote--note {
      border-left: 3px solid rgb(0, 115, 230);
      background: rgba(0, 115, 230, 0.08);
    }

    .dc-markdown__blockquote--tip {
      border-left: 3px solid rgb(73, 199, 160);
      background: rgba(73, 199, 160, 0.08);
    }

    .dc-markdown__blockquote--caution {
      border-left: 3px solid rgb(221, 0, 0);
      background: rgba(221, 0, 0, 0.08);
    }

    .dc-markdown__blockquote-content {
      display: inline-block;
      > p {
        margin-bottom: 5px;
      }
      > ul > li {
        margin-bottom: 3px;
      }
    }

    .dc-markdown__image {
      margin: 16px 0;
    }

    .dc-markdown__strong {
      font-weight: 700;

      .dc-markdown__text {
        font-weight: 700 !important;
      }
    }

    .dc-markdown__list-item {
      .dc-markdown__tabs {
        margin-top: 16px;
      }
    }
  }
`;
