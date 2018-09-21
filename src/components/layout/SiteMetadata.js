import React from "react";
import { Helmet } from "react-helmet";

import ui from "../../locales/en/UI.json";
import Sprites from "./Sprites";

const SiteMetadata = ({ pageId = "", pageName = "" }) => {
  const title = `${ui.metadata.title} - ${ui.metadata.shortDescription}`;
  const description = ui.metadata.description;

  let pageTitle;
  if (pageId) {
    pageTitle = ui.navigation[pageId];
  } else {
    pageTitle = pageName;
  }

  const fullSiteTitle = (pageTitle ? `${pageTitle} | ` : "") + title;

  const twitterUsername = ui.socialMedia.twitter.username;

  return (
    <>
      <Helmet
        title={pageTitle}
        defaultTitle={title}
        titleTemplate={`%s | ${title}`}
      >
        <meta name="description" content={description} />
        <meta property="og:title" content={fullSiteTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={fullSiteTitle} />>
        <meta name="twitter:description" content={description} />
        <meta name="twitter:site" content={twitterUsername} />
      </Helmet>
      <Sprites />
    </>
  );
};

export default SiteMetadata;
