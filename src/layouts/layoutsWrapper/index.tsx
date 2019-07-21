import React from "react";
import { DefaultLayout, DocumentationLayout } from "../";
import { SiteMetadataExtractor } from "../../sitemetadata";

const horizontalHeaderBgPaths = [""];

export const LayoutsWrapper: React.FunctionComponent<any> = ({
  children,
  ...otherProps
}) => {
  const { path } = otherProps as any;
  let layout: React.ReactNode = (
    <DefaultLayout horizontalHeaderBg={path !== "/"}>{children}</DefaultLayout>
  );

  const documentationLayoutPaths = [/\/docs/, /\/community/];
  if (documentationLayoutPaths.some(rx => rx.test(path))) {
    layout = <DocumentationLayout>{children}</DocumentationLayout>;
  }

  return (
    <>
      <SiteMetadataExtractor {...otherProps} />
      {layout}
    </>
  );
};
