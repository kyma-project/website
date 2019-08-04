import React from "react";

import Link from "@components/shared/Link";

import { FormattedMessage, getTranslation } from "@common/i18n";

import { Text } from "./styled";

const gt = getTranslation("layout.banner");

interface SlideContentProps {
  text: string;
  url: string;
  openInNewTab?: boolean;
}

const SlideContent: React.FunctionComponent<SlideContentProps> = ({
  text,
  url,
  openInNewTab = true,
}) => {
  if (!text) {
    console.error("Provide valid text for banner!");
    return null;
  }

  const linkTranslation = <FormattedMessage id={gt("readMoreLink")} />;

  const link = openInNewTab ? (
    <Link.External to={url}>{linkTranslation}</Link.External>
  ) : (
    <Link.Internal to={url}>{linkTranslation}</Link.Internal>
  );

  return (
    <Text>
      {text}
      {url && link}
    </Text>
  );
};

export default SlideContent;
