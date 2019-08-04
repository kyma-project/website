import React from "react";
import Helmet from "react-helmet";

interface TwitterProps {
  cardType?: string;
  username?: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
}

export const Twitter: React.FunctionComponent<TwitterProps> = ({
  cardType = "summary",
  username = "kymaproject",
  title,
  description,
  image,
  imageAlt = "",
}) => (
  <Helmet>
    <meta name="twitter:card" content={cardType} />
    <meta name="twitter:creator" content={username} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    <meta
      name="twitter:image:alt"
      content={imageAlt ? imageAlt : description}
    />
  </Helmet>
);
