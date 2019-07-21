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

import { Facebook } from "./Facebook";
import { Twitter } from "./Twitter";
import { StructureData } from "./StructureData";

import { RootContext } from "../services/index";

export interface BlogPostMetadata {
  author?: string;
  datePublish: string;
  dateModified?: string;
  headline: string;
  inLanguage?: string;
  image?: string;
  slug: string;
}

interface SiteMetadataProps {
  pageTitle?: string;
  pageDescription?: string;
  siteMetadata: any;
  blogPostMetadata?: BlogPostMetadata;
}

export const SiteMetadata: React.FunctionComponent<
  SiteMetadataProps & IntlInterface
> = ({
  pageTitle = "",
  pageDescription = "",
  siteMetadata,
  formatMessage,
  blogPostMetadata,
}) => {
  const { language } = useContext(RootContext);

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

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: language,
        }}
        title={title}
      >
        <meta name="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content={description} />
        <meta name="copyright" content={copyright} />
        <meta name="keywords" content={keywords} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={withPrefix("/apple-touch-icon.png")}
        />
        <link
          rel="mask-icon"
          color="#2872dd"
          href={withPrefix("/safari-pinned-tab.svg")}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={withPrefix("/favicon-32x32.png")}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={withPrefix("/favicon-16x16.png")}
        />
      </Helmet>
      <Facebook
        url={""}
        title={title}
        description={description}
        image={image}
        type={blogPostMetadata ? "article" : "website"}
      />
      <Twitter
        title={title}
        description={description}
        image={image}
        username={twitterUsername}
      />
      <StructureData
        host={host}
        image={image}
        description={description}
        blogPostMetadata={blogPostMetadata}
      />
    </>
  );
};

export default injectIntl("siteMetadata")(SiteMetadata);
