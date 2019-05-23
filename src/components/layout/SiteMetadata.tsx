import React from "react";
import Helmet from "react-helmet";
import { withPrefix } from "gatsby";

import { injectIntl, IntlInterface } from "@common/i18n";
import { getActualYear } from "@common/utils";

interface MetadataProps {
  pageTitle?: string;
  pageDescription?: string;
  siteMetadata: any;
  docSearchLanguage?: string;
  docSearchVersion?: string;
}

const SiteMetadata: React.FunctionComponent<MetadataProps & IntlInterface> = ({
  pageTitle = "",
  pageDescription = "",
  siteMetadata,
  formatMessage,
  docSearchLanguage,
  docSearchVersion,
}) => {
  const host = process.env.GATSBY_SITE_URL || "";
  const logoPath = `${host}${withPrefix("/favicon-32x32.png")}`;
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
  const docSearchMeta = pageTitle.includes("Docs")
    ? [
        {
          name: "docsearch:language",
          content: docSearchLanguage ? docSearchLanguage : "en",
        },
        {
          name: "docsearch:version",
          content: docSearchVersion ? docSearchVersion : "latest",
        },
      ]
    : [];

  return (
    <Helmet
      htmlAttributes={{
        lang: "en",
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
        ...docSearchMeta,
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
    />
  );
};

export default injectIntl("siteMetadata")(SiteMetadata);
