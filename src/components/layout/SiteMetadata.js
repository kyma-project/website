import React from "react";
import { Helmet } from "react-helmet";
import "../../config/i18n";
import { translate } from "react-i18next";
import Sprites from "./Sprites";

const SiteMetadataComponent = ({ pageId = "", pageName = "", t }) => {
  const title = `${t("metadata.title")} - ${t("metadata.shortDescription")}`;
  const description = t("metadata.description");

  let pageTitle;
  if (pageId) {
    const pageTitleKey = `navigation.${pageId}`;
    pageTitle = t(pageTitleKey);
  } else {
    pageTitle = pageName;
  }

  const fullSiteTitle = (pageTitle ? `${pageTitle} | ` : "") + title;

  return (
    <>
      <Helmet defaultTitle={title}>
        <title>{fullSiteTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={fullSiteTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={fullSiteTitle} />>
        <meta name="twitter:description" content={description} />
      </Helmet>
      <Sprites />
    </>
  );
};

const SiteMetadata = translate("UI")(SiteMetadataComponent);
export default SiteMetadata;
