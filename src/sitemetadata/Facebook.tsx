import React from "react";
import Helmet from "react-helmet";
import { withPrefix } from "gatsby";

interface FacebookProps {
  siteName?: string;
  locale?: string;
  url: string;
  type?: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
}

export const Facebook: React.FunctionComponent<FacebookProps> = ({
  siteName = "https://5d94582db30e860007b272ff--kyma-project.netlify.com",
  locale = "en_US",
  url,
  type = "website",
  title,
  description,
  image,
  imageAlt = "",
}) => (
  <Helmet>
    <meta property="og:site_name" content={siteName} />
    <meta property="og:locale" content={locale} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content={type} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta
      property="og:image"
      content={
        "https://5d94582db30e860007b272ff--kyma-project.netlify.com/facebookLogo.png"
      }
    />
    <meta property="og:image:alt" content={imageAlt ? imageAlt : description} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </Helmet>
);
