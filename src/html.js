import React from "react";
import PropTypes from "prop-types";
import { withPrefix } from "gatsby";

const HTML = ({
  htmlAttributes,
  headComponents,
  bodyAttributes,
  preBodyComponents,
  body,
  postBodyComponents,
}) => {
  const host = process.env.GATSBY_APP_ORIGIN || "";
  const metadataImagePath = `${host}${withPrefix("/logo.png")}`;

  return (
    <html {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta
          name="google-site-verification"
          content="qHt6OkQ1MXU5a4ZLlkLLPRB35ZOu_upyScm2O9Jf8PY"
        />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:image" content={metadataImagePath} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content={metadataImagePath} />
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
        <link
          rel="stylesheet"
          type="text/css"
          href={withPrefix("/global.css")}
        />
        {headComponents}
      </head>
      <body {...bodyAttributes}>
        {preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        {postBodyComponents}
      </body>
    </html>
  );
};

export default HTML;

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
