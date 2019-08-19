import React, { useContext } from "react";
import { navigate } from "gatsby";

import H from "@components/shared/H";
import Link from "@components/shared/Link";
import Icon from "@components/shared/Icon";

import { TabContext } from "../../../services/TabState.service";

import { toKebabCase } from "@common/utils/toKebabCase";
import { scrollIntoViewOfAnchor } from "@common/utils/scrollIntoViewOfAnchor";
import { removeMarkdownSyntax } from "../../../external";

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  headings: Set<string>;
  headingPrefix?: string;
}
type Headers = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export const Heading: React.FunctionComponent<HeadingProps> = ({
  level,
  headings,
  headingPrefix = "",
  children,
}) => {
  const tabData = useContext(TabContext);
  const tabDataExists = tabData && Object.keys(tabData).length;

  if (!children) {
    return null;
  }

  let heading = (children as any[])
    .filter(
      child =>
        child.key &&
        (child.key.startsWith("text") || child.key.startsWith("inlineCode")),
    )
    .map(child => child.props && child.props.value)
    .join(" ");
  if (!heading) {
    return null;
  }

  if (!heading) {
    return null;
  }

  heading =
    headingPrefix && !tabDataExists ? `${headingPrefix}-${heading}` : heading;
  if (headings.has(heading)) {
    if (/[1-9]$/.test(heading)) {
      heading = `${heading}-${Number(heading[heading.length - 1]) + 1}`;
    } else {
      heading = `${heading}-1`;
    }
  }
  heading = removeMarkdownSyntax(heading);
  headings.add(heading);
  heading = toKebabCase(heading) || "";
  if (!heading) {
    return null;
  }

  if (tabDataExists && tabData.group) {
    heading = `${toKebabCase(tabData.group)}--${toKebabCase(
      tabData.label,
    )}--${heading}`;
    heading = headingPrefix
      ? `${toKebabCase(headingPrefix)}--${heading}`
      : heading;
  }

  const onClick = (e: any) => {
    e.preventDefault();
    const hashValue = heading.startsWith("#") ? heading : `#${heading}`;

    if (!tabDataExists) {
      return;
    }

    scrollIntoViewOfAnchor(hashValue);
    window.history.pushState(null, "", hashValue);
  };

  return (
    <H
      as={`h${level}` as Headers}
      id={heading}
      className={`header-with-anchor--level-${level}`}
    >
      {children}
      <Link.Hash to={heading} onClick={onClick}>
        <Icon iconName="anchor" iconPrefix="fas" />
      </Link.Hash>
    </H>
  );
};
