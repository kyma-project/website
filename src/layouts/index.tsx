import React from "react";

import { DefaultLayout } from "./default";
import { LandingPageLayout } from "./landingPage";
import { NotFoundLayout } from "./404";
import { DocumentationLayout } from "./documentation";
import { BlogLayout } from "./blog";
import { RoadmapLayout } from "./roadmap";
import { CommunityLayout } from "./community";

import { ModalWrapper } from "../modals";
import { SiteMetadataExtractor } from "../sitemetadata";

type LayoutRegex = Array<[RegExp, React.ElementType<any>]>;
const layoutRegex: LayoutRegex = [
  [/^\/$/, LandingPageLayout],
  [/^\/404/, NotFoundLayout],
  [/^\/docs/, DocumentationLayout],
  [/^\/blog/, BlogLayout],
  [/^\/roadmap/, RoadmapLayout],
  [/^\/community/, CommunityLayout],
];

export function getProperLayout(path: string): React.ElementType<any> {
  for (const [regex, Component] of layoutRegex) {
    if (regex.test(path)) {
      return Component;
    }
  }
  return DefaultLayout;
}

export const LayoutWrapper: React.FunctionComponent<any> = ({
  children,
  ...otherProps
}) => {
  const { path, pageContext } = otherProps as any;
  const Layout = getProperLayout(path);
  const Modal = ModalWrapper(path, pageContext);

  if (typeof window !== "undefined") {
    if (Modal) {
      window.__GATSBY_IN_MODAL_PAGE = true;
    } else {
      window.__GATSBY_IN_MODAL_PAGE = false;
    }
  }

  return (
    <>
      <SiteMetadataExtractor {...otherProps} />
      <Layout {...pageContext}>{children}</Layout>
      {Modal}
    </>
  );
};
