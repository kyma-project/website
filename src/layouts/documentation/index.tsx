import React from "react";
import { DefaultLayout } from "../default";

export const DocumentationLayout: React.FunctionComponent = ({ children }) => (
  <DefaultLayout inDocsLayout={true}>{children}</DefaultLayout>
);
