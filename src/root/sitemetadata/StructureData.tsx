import React from "react";
import Helmet from "react-helmet";

import {
  GOOGLE_CUSTOM_SEARCH_ENGINE_URL,
  ORGANIZATION_NAME,
} from "@common/constants";
import { socialMedia } from "@config";

export interface BlogPostMetadata {
  author?: string;
  datePublish: string;
  dateModified?: string;
  headline: string;
  inLanguage?: string;
  image?: string;
  slug: string;
}

interface StructureDataProps {
  host: string;
  description: string;
  image: string;
  blogPostMetadata?: BlogPostMetadata;
}

export const StructureData: React.FunctionComponent<StructureDataProps> = ({
  host,
  description,
  image,
  blogPostMetadata,
}) => {
  const imageType = (url: string) => ({
    "@type": "ImageObject",
    url,
  });

  const contactPoint = (url: string) => ({
    "@type": "ContactPoint",
    contactType: "customer support",
    url,
  });

  const organizationType = (name: string, logoURL: string) => ({
    "@context": "http://schema.org",
    "@type": "Organization",
    name,
    logo: imageType(logoURL),
    contactPoint: contactPoint(socialMedia.slack.url),
  });

  const organizationSchema = {
    ...organizationType(ORGANIZATION_NAME, image),
    url: host,
    description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${GOOGLE_CUSTOM_SEARCH_ENGINE_URL}&q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const authorType = (name: string) => ({
    "@type": "Person",
    name,
  });

  const blogpostSchema = (metadata: BlogPostMetadata) => ({
    "@context": "http://schema.org",
    "@type": "Article",
    author: metadata.author
      ? authorType(metadata.author)
      : organizationType(ORGANIZATION_NAME, image),
    publisher: organizationType(ORGANIZATION_NAME, image),
    datePublished: metadata.datePublish,
    dateModified: metadata.dateModified
      ? metadata.dateModified
      : metadata.datePublish,
    headline: metadata.headline,
    image: imageType(metadata.image ? metadata.image : image),
    inLanguage: metadata.inLanguage ? metadata.inLanguage : "en",
    mainEntityOfPage: `${host}${metadata.slug}`,
    description,
  });

  const structureData = blogPostMetadata
    ? blogpostSchema(blogPostMetadata)
    : organizationSchema;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structureData)}
      </script>
    </Helmet>
  );
};
