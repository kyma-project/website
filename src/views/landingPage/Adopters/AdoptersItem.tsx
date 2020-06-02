import React from "react";

import Link from "@components/shared/Link";

import { injectIntl, IntlInterface, FormattedMessage } from "@common/i18n";

import { Adopter } from "@typings/landingPage";

import {
  StyledAdoptersItem,
  StyledAdoptersItemContent,
  StyledAdoptersItemExtLink,
  StyledAdoptersItemIntLink,
} from "./styled";

const AdoptersItem: React.FunctionComponent<Adopter & IntlInterface> = ({
  websiteUrl,
  company,
  url = "",
  logo,
  content,
  cssProperties,
  formatMessage,
}) => {
  const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  const BlogPostLink: any = !url
    ? null
    : url.startsWith("http")
    ? StyledAdoptersItemExtLink
    : StyledAdoptersItemIntLink;

  const companyLogoAlt = formatMessage(
    { id: "companyLogo" },
    {
      company,
    },
  );
  const companyWebsiteLinkAria = formatMessage(
    { id: "linkToCompanyWebsite" },
    {
      company,
    },
  );
  const companyCaseStudyLinkAria = formatMessage(
    { id: "linkToCompanyCaseStudy" },
    {
      company,
    },
  );

  return (
    <StyledAdoptersItem
      onDragStart={handleOnDragStart}
      cssProperties={cssProperties}
    >
      <Link.External
        to={websiteUrl}
        ariaLabel={companyWebsiteLinkAria}
        noFollow={true}
      >
        <img src={logo} alt={companyLogoAlt} />
      </Link.External>
      <StyledAdoptersItemContent>{content}</StyledAdoptersItemContent>
      {BlogPostLink && (
        <BlogPostLink to={url} ariaLabel={companyCaseStudyLinkAria}>
          <FormattedMessage id="landingPage.adopters.readMoreLink" />
        </BlogPostLink>
      )}
    </StyledAdoptersItem>
  );
};

export default injectIntl("landingPage.adopters.accessibility")(AdoptersItem);
