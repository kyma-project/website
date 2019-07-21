import styled, { css } from "styled-components";
import { customScrollBar } from "@styled/mixins";

export const tabsStyling = css`
  .cms__tabs {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    font-family: "72";
    font-weight: normal;
    margin: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(151, 151, 151, 0.26);
    border-image: initial;
    border-radius: 3px;

    .cms__text {
      font-size: 14px;
    }
  }

  .cms__tabs-header {
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

  .cms__tabs-content {
    font-size: 14px;
    color: rgb(81, 85, 89);
    line-height: 1.57;
    margin: 20px;
  }

  .cms__tab {
    display: flex;
    align-items: center;
    margin: 0 16px;
    border: none;
    position: relative;
    color: #32363b;
    font-size: 14px;
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

    .cms__tab-label {
      padding: 16px 0;
    }
  }

  .cms__tab--active {
    color: #0a6ed1;

    &:after {
      height: 3px;
    }
  }
`;

export const Header = styled.h2`
  &&&&& {
    box-sizing: border-box;
    width: 100%;
    font-size: 20px;
    font-weight: bold;
    margin: 0px 0px 26px;
  }
`;

export const StyledMarkdown = styled.div`
  width: 100%;

  &&& {
    box-sizing: border-box;
    text-align: left;
    font-family: "72";
    font-weight: normal;
    margin: 0px 0px 16px;
    padding: 16px;

    &:last-child {
      margin-bottom: 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: "72";
      color: #32363a;
      font-weight: bold;
      margin: 0;
    }
    h1 {
      margin-bottom: 26px;

      .cms__text {
        font-size: 22px !important;
      }
    }
    h2 {
      margin-bottom: 16px;

      .cms__text {
        font-size: 16px !important;
      }
    }
    h3 {
      margin-bottom: 8px;

      .cms__text {
        font-size: 14px !important;
      }
    }
    a {
      font-family: "72";
      color: #0b74de;
      text-decoration: none;

      > .cms__text {
        color: #0b74de !important;
      }
    }
    a:hover {
      color: #0b74de;
      text-decoration: underline;
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
      width: 100%;
      margin: 30px 0;
      display: block;
      overflow: auto;
    }
    thead {
      background-color: rgba(243, 244, 245, 0.45);
    }
    th,
    td {
      font-weight: normal;
      text-align: left;
      color: #32363a;
      border: none;
      outline: none;
    }
    th {
      padding: 14px 20px;
      opacity: 0.6;
      text-transform: uppercase;
      line-height: 1.18;

      .cms__text {
        font-size: 11px;
      }
    }
    tr {
      border-bottom: 1px solid rgba(56, 70, 84, 0.25);
    }
    tr:last-child {
      border: none;
    }
    td {
      line-height: 1.29;
      text-align: left;
      padding: 15px 20px;
      color: #32363a;
      font-weight: normal;
      white-space: pre-wrap;
      white-space: -moz-pre-wrap;
      white-space: -o-pre-wrap;
      word-wrap: break-word;

      .cms__text {
        font-size: 14px;
      }
    }
    img {
      max-width: 100%;
    }
    ul,
    ol {
      padding-left: 32px;
    }
    ul:last-child,
    ol:last-child,
    p:last-child {
      margin-bottom: 12px;
    }
    blockquote p:last-child {
      margin-bottom: 0;
    }
    ul {
      list-style-type: disc;
      list-style-position: outside;
    }
    ol {
      list-style-type: decimal;
      list-style-position: outside;
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
      margin-top: 0;
      margin-bottom: 12px;
    }

    .cms__text {
      font-family: "72";
      font-size: 16px;
      color: rgb(81, 85, 89);
      line-height: 1.57;
    }

    .cms__code-wrapper {
      position: relative;
      margin: 0 0 16px 0;
    }

    .cms__code-pre-wrapper {
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

    .cms__blockquote {
      margin-left: 0;
      margin-right: 0;
      padding: 16px;
    }

    .cms__blockquote--note {
      border-left: 3px solid rgb(0, 115, 230);
    }

    .cms__blockquote--tip {
      border-left: 3px solid rgb(73, 199, 160);
    }

    .cms__blockquote--caution {
      border-left: 3px solid rgb(221, 0, 0);
    }

    .cms__blockquote-content {
      display: inline-block;
      > p {
        margin-bottom: 5px;
      }
      > ul > li {
        margin-bottom: 3px;
      }
    }

    .cms__strong {
      font-weight: 700;

      .cms__text {
        font-weight: 700 !important;
      }
    }
  }
`;

export const StyledAsyncApi = styled.div`
  &&&&& {
    > div > div {
      padding: 16px;
      border-width: 1px;
      border-style: solid;
      border-color: rgba(151, 151, 151, 0.26);
      border-image: initial;
      border-radius: 4px;
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export const StyledOData = styled.div``;
