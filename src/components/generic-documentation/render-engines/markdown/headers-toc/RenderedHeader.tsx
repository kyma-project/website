import React from "react";
import { plugins } from "@kyma-project/dc-markdown-render-engine";

export type Header = plugins.Header;
export type ActiveAnchors = plugins.ActiveAnchors;

const CLASS_NAME_PREFIX = "dc-markdown";

const sumNumberOfHeaders = (headers: Header[]): number => {
  let sum: number = headers.length;
  for (const header of headers) {
    sum += sumNumberOfHeaders(header.children || []);
  }
  return sum;
};

const createElementClass = (element: string) =>
  element ? `${CLASS_NAME_PREFIX}__${element}` : "";
const createModifierClass = (modifier: string, element?: string) =>
  modifier
    ? `${CLASS_NAME_PREFIX}${element ? `__${element}` : ""}--${modifier}`
    : "";

interface HeaderItemProps {
  header: Header;
  className?: string;
  activeAnchors?: ActiveAnchors;
}

const HeaderItem: React.FunctionComponent<HeaderItemProps> = ({
  header,
  className,
  activeAnchors,
}) => {
  const showNode =
    activeAnchors && (activeAnchors as any)[header.level] === header.id;

  return (
    <li
      className={`${createElementClass(
        `${className}-list-item`,
      )} ${createModifierClass(
        `level-${header.level}`,
        `${className}-list-item`,
      )} ${
        header.children
          ? createModifierClass(`has-children`, `${className}-list-item`)
          : ``
      } ${
        showNode ? createModifierClass(`active`, `${className}-list-item`) : ``
      }`}
    >
      <a href={`#${header.id}`}>{header.title}</a>
      {header.children && (
        <RenderedHeader
          headers={header.children}
          className={className ? className : ""}
          activeAnchors={activeAnchors}
          showNode={showNode}
        />
      )}
    </li>
  );
};

export interface RenderedHeaderProps {
  headers?: Header[];
  className?: string;
  activeAnchors?: ActiveAnchors;
  showNode?: boolean;
}

export const RenderedHeader: React.FunctionComponent<RenderedHeaderProps> = ({
  headers,
  activeAnchors,
  showNode = false,
}) => {
  const context = plugins.useHeadersContext();
  if (!context) {
    return null;
  }

  const { headers: h, getActiveAnchors, className } = context;
  if (!headers) {
    headers = h;
  }
  const aa = getActiveAnchors();
  if (aa) {
    activeAnchors = aa;
  }

  const anchorsList = headers.map(header => (
    <HeaderItem
      header={header}
      className={className}
      key={`${className}-list-item-${header.id}`}
      activeAnchors={activeAnchors}
    />
  ));

  return (
    <ul
      className={
        showNode ? createElementClass(`${className}-list-item--show`) : ""
      }
    >
      {anchorsList}
    </ul>
  );
};
