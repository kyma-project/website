import React from "react";

import H from "@components/shared/H";
import Link from "@components/shared/Link";

import { tokenize } from "@common/utils";

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
}) => {
  if (!children) {
    return null;
  }

  let heading = (children as any[])[0].props.value as string;
  heading = headingPrefix ? `${headingPrefix}-${heading}` : heading;
  // if (headings.has(heading)) {
  //   if (/[1-9]$/.test(heading)) {
  //     heading = `${heading}-${Number(heading[heading.length - 1]) + 1}`;
  //   } else {
  //     heading = `${heading}-1`;
  //   }
  // }
  // headings.add(heading);
  heading = tokenize(heading);

  return (
    <Link.Hash to={heading} chainIcon={true}>
      <H as={`h${level}` as Headers} id={heading}>
        {children}
      </H>
    </Link.Hash>
  );
};
