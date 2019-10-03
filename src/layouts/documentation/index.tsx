import React from "react";
import { DefaultLayout } from "../default";

export const DocumentationLayout: React.FunctionComponent<any> = ({
  children,
  ...pageContext
}) => (
  <DefaultLayout {...pageContext} inDocsLayout={true}>
    {children}
  </DefaultLayout>
);
