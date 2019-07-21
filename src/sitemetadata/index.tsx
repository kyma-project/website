import React from "react";
import SiteMetadata from "./SiteMetadata";
import { extractBlogMetadata } from "./extractor";

const blogPath = /^\/blog/;
const docsPath = /^\/docs/;
const roadmapPath = /^\/roadmap/;
const communityPath = /^\/community/;

function extractMetadata(uri: string, data: any, pageContext: any) {
  if (blogPath.test(uri)) {
    return extractBlogMetadata(uri, data);
  }
}

export const SiteMetadataExtractor: React.FunctionComponent<any> = ({
  ...otherProps
}) => {
  const {
    uri,
    location: { href },
    data,
    pageContext,
  } = otherProps;
  const metadata = extractMetadata(uri, data, pageContext);

  return <SiteMetadata pageUrl={href} {...metadata} />;
};
