import React from "react";

import Link from "@components/shared/Link";

import { FormattedMessage } from "@common/i18n";

import { Adopter } from "@typings/landingPage";

import {
  StyledAdoptersItem,
  StyledAdoptersItemContent,
  StyledAdoptersItemExtLink,
  StyledAdoptersItemIntLink,
} from "./styled";

export const AdoptersItem: React.FunctionComponent<Adopter> = ({
  websiteUrl,
  url = "",
  logo,
  content,
  cssProperties,
}) => {
  const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  const BlogPostLink: any = !url
    ? null
    : url.startsWith("http")
    ? StyledAdoptersItemExtLink
    : StyledAdoptersItemIntLink;

  return (
    <StyledAdoptersItem
      onDragStart={handleOnDragStart}
      cssProperties={cssProperties}
    >
      <Link.External to={websiteUrl}>
        <img src={logo} />
      </Link.External>
      <StyledAdoptersItemContent>{content}</StyledAdoptersItemContent>
      {BlogPostLink && (
        <BlogPostLink to={url}>
          <FormattedMessage id="landingPage.adopters.readMoreLink" />
        </BlogPostLink>
      )}
    </StyledAdoptersItem>
  );
};
