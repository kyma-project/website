import React from "react";
import SiteMetadata from "./SiteMetadata";
import {
  extractBlogMetadata,
  extractDocsMetadata,
  extractCommunityMetadata,
  extractRoadmapMetadata,
} from "./extractor";

const blogPath = /^\/blog/;
const docsPath = /^\/docs/;
const roadmapPath = /^\/roadmap/;
const communityPath = /^\/community/;
const notFoundPath = /^\/404/;

function extractMetadata(uri: string, pageContext: any) {
  if (blogPath.test(uri)) {
    return extractBlogMetadata(uri, pageContext);
  }
  if (docsPath.test(uri)) {
    return extractDocsMetadata(pageContext);
  }
  if (communityPath.test(uri)) {
    return extractCommunityMetadata(pageContext);
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

export const SiteMetadataExtractor: React.FunctionComponent<any> = props => {
  const {
    uri,
    location: { href },
    pageContext,
  } = props;
  const metadata = extractMetadata(uri, pageContext);

  return <SiteMetadata pageUrl={href} {...metadata} />;
};
