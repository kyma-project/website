import React from "react";
import SiteMetadata from "./SiteMetadata";
import {
  extractBlogMetadata,
  extractDocsMetadata,
  extractRoadmapMetadata,
} from "./extractor";

const blogPath = /^\/blog/;
const docsPath = /^\/docs/;
const roadmapPath = /^\/roadmap/;
const communityPath = /^\/community/;
const notFoundPath = /^\/404/;

function extractMetadata(uri: string, data: any, pageContext: any) {
  if (blogPath.test(uri)) {
    return extractBlogMetadata(uri, data);
  }
  if (docsPath.test(uri)) {
    return extractDocsMetadata(uri, pageContext);
  }
  if (roadmapPath.test(uri)) {
    return extractRoadmapMetadata();
  }
  if (notFoundPath.test(uri)) {
    return {
      pageTitle: "404",
    };
  }
  return {};
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
