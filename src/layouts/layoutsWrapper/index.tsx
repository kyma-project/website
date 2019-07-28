import React from "react";
import { DefaultLayout, DocumentationLayout } from "../";
import { SiteMetadataExtractor } from "../../sitemetadata";

export const LayoutsWrapper: React.FunctionComponent<any> = ({
  children,
  ...otherProps
}) => {
  const {
    path,
    pageContext: { defaultHeaderBg },
  } = otherProps as any;
  let layout: React.ReactNode = (
    <DefaultLayout horizontalHeaderBg={!defaultHeaderBg}>
      {children}
    </DefaultLayout>
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
