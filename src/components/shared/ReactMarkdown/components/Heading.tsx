import React from "react";

import H from "@components/shared/H";
import Link from "@components/shared/Link";

import { toKebabCase } from "@common/utils";

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  headingPrefix?: string;
  tabData?: {
    group: string;
    tab: string;
  };
}
type Headers = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export const Heading: React.FunctionComponent<HeadingProps> = ({
  level,
  headingPrefix = "",
  children,
  tabData,
}) => {
  const formatString = (arg: string) =>
    toKebabCase(arg)
      .replace(/[^a-zA-Z0-9]/g, "-")
      .replace(/--+/g, "-")
      .replace(/-+$/g, "");

  const newLevel = level + 2 >= 6 ? 6 : level + 2;
  if (!children) {
    return null;
  }
  const headingTokenized = toKebabCase(
    (children as any[])[0].props.value as string,
  );

  let id;

  if (tabData && Object.keys(tabData).length) {
    const tabString = `${formatString(tabData.group)}--${formatString(
      tabData.tab,
    )}--${formatString(headingTokenized)}`;
    id = headingPrefix ? `${headingPrefix}--${tabString}` : tabString;
  } else {
    id = (headingPrefix
      ? `${headingPrefix}-${headingTokenized}`
      : headingTokenized
    ).replace(/[^a-zA-Z0-9]/g, "-");
  }

  return (
    <Link.Hash to={id} anchorIcon={true}>
      <H
        as={`h${newLevel}` as Headers}
        id={id}
        data-scrollspy-node-type="header"
      >
        {children}
      </H>
    </Link.Hash>
  );
};
