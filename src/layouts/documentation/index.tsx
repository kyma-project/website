import React from "react";

import { DocsPageContext, SpecificationType } from "@typings/docs";

import { DefaultLayout } from "../default";

async function loadSwagger(): Promise<void> {
  // @ts-ignore
  return import("swagger-ui-dist").then(() => null);
}

export const DocumentationLayout: React.FunctionComponent<any> = ({
  children,
  ...pageContext
}) => {
  const { specifications } = pageContext as DocsPageContext;
  if (
    specifications &&
    specifications.length &&
    specifications.some(
      specification => specification.type === SpecificationType.OPEN_API,
    )
  ) {
    loadSwagger();
  }

  return (
    <DefaultLayout {...pageContext} inDocsLayout={true}>
      {children}
    </DefaultLayout>
  );
};
