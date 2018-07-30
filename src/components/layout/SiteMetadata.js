import React from "react";
import { Helmet } from "react-helmet";
import "../../config/i18n";
import { translate } from "react-i18next";
import { withPrefix } from "gatsby";
import Sprites from "./Sprites";

const SiteMetadataComponent = ({ pageId = "", pageName = "", t }) => {
  const title = t("metadata.title");
  const description = t("metadata.description");

  let pageTitle;
  if (pageId) {
    const pageTitleKey = `navigation.${pageId}`;
    pageTitle = t(pageTitleKey);
  } else {
    pageTitle = pageName;
  }

  const fullSiteTitle = (pageTitle ? `${pageTitle} - ` : "") + title;

  return (
    <>
      <Helmet defer={false}>
        <title>{fullSiteTitle}</title>
        <meta name="description" content={description} />
        <style />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={withPrefix("/apple-touch-icon.png")}
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
        <link rel="manifest" href={withPrefix("/site.webmanifest")} />
        <link
          rel="mask-icon"
          href={withPrefix("/safari-pinned-tab.svg")}
          color="#2872dd"
        />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="stylesheet"
          type="text/css"
          href={withPrefix("/global.css")}
        />
      </Helmet>
      <Sprites />
    </>
  );
};

const SiteMetadata = translate("UI")(
  SiteMetadataComponent
);
export default SiteMetadata;
