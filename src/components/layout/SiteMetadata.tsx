import React, { useContext } from "react";
import Helmet from "react-helmet";
import { withPrefix } from "gatsby";

import { globalHistory } from "@reach/router";
import { injectIntl, IntlInterface } from "@common/i18n";
import { getActualYear } from "@common/utils";
import { socialMedia } from "@config";
import {
  GOOGLE_CUSTOM_SEARCH_ENGINE_URL,
  ORGANIZATION_NAME,
} from "@common/constants";

import LayoutService from "@components/layout/service";

export interface BlogPostMetadata {
  author?: string;
  datePublish: string;
  dateModified?: string;
  headline: string;
  inLanguage?: string;
  image?: string;
  slug: string;
}

interface MetadataProps {
  pageTitle?: string;
  pageDescription?: string;
  siteMetadata: any;
  formatMessage: any;
  blogPostMetadata?: BlogPostMetadata;
}

const SiteMetadata: React.FunctionComponent<MetadataProps & IntlInterface> = ({
  pageTitle = "",
  pageDescription = "",
  siteMetadata,
  formatMessage,
  blogPostMetadata,
}) => {
  const {
    docsMetadata: { language },
  } = useContext(LayoutService);

  const host =
    process.env.GATSBY_SITE_URL || `127.0.0.1:${globalHistory.location.port}`;
  const image = `${host}${withPrefix("/logo.png")}`;

  let title = `${formatMessage({ id: "title" })} - ${formatMessage({
    id: "shortDescription",
  })}`;
  title = pageTitle ? `${pageTitle} | ${title}` : title;

  const description = pageDescription
    ? pageDescription
    : formatMessage({ id: "description" });
  const copyright = formatMessage(
    { id: "copyright" },
    {
      actualYear: getActualYear(),
    },
  );
  const keywords = formatMessage({ id: "keywords" });
  const twitterUsername = siteMetadata.twitterUsername;
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
    <Helmet
      htmlAttributes={{
        lang: language,
      }}
      title={title}
      meta={[
        {
          httpEquiv: "x-ua-compatible",
          content: "ie=edge",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, shrink-to-fit=no",
        },
        {
          name: "msapplication-TileColor",
          content: "#2b5797",
        },
        {
          name: "theme-color",
          content: "#ffffff",
        },
        {
          name: "description",
          content: description,
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: description,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:creator",
          content: twitterUsername,
        },
        {
          name: "twitter:title",
          content: title,
        },
        {
          name: "twitter:description",
          content: description,
        },
        {
          name: "twitter:image",
          content: image,
        },
        {
          name: "og:image",
          content: image,
        },
        {
          name: "copyright",
          content: copyright,
        },
        {
          name: "keywords",
          content: keywords,
        },
      ]}
      link={[
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: withPrefix("/apple-touch-icon.png"),
        },
        {
          rel: "mask-icon",
          href: withPrefix("/safari-pinned-tab.svg"),
          color: "#2872dd",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: withPrefix("/favicon-32x32.png"),
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: withPrefix("/favicon-16x16.png"),
        },
      ]}
    >
      <script type="application/ld+json">
        {JSON.stringify(structureData)}
      </script>
    </Helmet>
  );
};

export default injectIntl("siteMetadata")(SiteMetadata);
