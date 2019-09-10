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
    return null;
  }

  const linkTranslation = <FormattedMessage id={gt("readMoreLink")} />;
  const createLink = (to: string) =>
    to.startsWith("http") ? (
      <Link.External to={to}>{linkTranslation}</Link.External>
    ) : (
      <Link.Internal to={to}>{linkTranslation}</Link.Internal>
    );

  return (
    <Text>
      {text}
      {url ? createLink(url) : null}
    </Text>
  );
};

export default SlideContent;
