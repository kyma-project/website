import React from "react";

import H from "@components/shared/H";
import Link from "@components/shared/Link";

import { tokenize } from "@common/utils";

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  headingPrefix?: string;
}

export const Heading: React.FunctionComponent<HeadingProps> = ({
  level,
  headingPrefix = "",
  children,
}) => {
  const newLevel = level + 2 >= 6 ? 6 : level + 2;
  const headingTokenized = tokenize((children as any[])[0].props
    .value as string);

  const id = (headingPrefix
    ? `${headingPrefix}-${headingTokenized}`
    : headingTokenized
  ).replace(/[^a-zA-Z0-9]/g, "-");

  return (
    <Link.Hash to={id} chainIcon={true}>
      <H as={`h${newLevel}`} id={id} data-scrollspy-node-type="header">
        {children}
      </H>
    </Link.Hash>
  );
};
