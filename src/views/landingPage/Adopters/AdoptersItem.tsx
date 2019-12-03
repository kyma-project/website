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
}) => {
  const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  const BlogPostLink = !url
    ? null
    : url.startsWith("http")
    ? StyledAdoptersItemExtLink
    : StyledAdoptersItemIntLink;

  // special case of styling for SAP icon
  const isSapUrl = websiteUrl.toLowerCase().includes("sap.com");

  return (
    <StyledAdoptersItem onDragStart={handleOnDragStart} isSap={isSapUrl}>
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
