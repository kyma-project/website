import React from "react";

import H from "@components/shared/H";
import Link from "@components/shared/Link";

import { toKebabCase } from "@common/utils/toKebabCase";
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
  if (!children) {
    return null;
  }

  let heading = (children as any[]).find(
    child => child.key && child.key.startsWith("text"),
  );
  if (!heading) {
    return null;
  }

  heading = heading.props && heading.props.value;
  if (!heading) {
    return null;
  }

  heading = headingPrefix ? `${headingPrefix}-${heading}` : heading;
  if (headings.has(heading)) {
    if (/[1-9]$/.test(heading)) {
      heading = `${heading}-${Number(heading[heading.length - 1]) + 1}`;
    } else {
      heading = `${heading}-1`;
    }
  }
  heading = removeMarkdownSyntax(heading);
  headings.add(heading);
  const id = toKebabCase(heading);

  const onClick = (e: any) => {
    e.preventDefault();
    const hashValue = id.startsWith("#") ? id : `#${id}`;
    window.history.pushState(null, "", hashValue);
  };

  return (
    <Link.Hash to={id} chainIcon={true} onClick={onClick}>
      <H as={`h${level}` as Headers} id={id}>
        {children}
      </H>
    </Link.Hash>
  );
};
