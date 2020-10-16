import React, { FunctionComponent } from "react";
import { Adopter } from "@typings/landingPage";
import { injectIntl, IntlInterface, FormattedMessage } from "@common/i18n";
import {
  StyledAdoptersItemExtLink,
  StyledAdoptersItemIntLink,
  StyledSection,
  LogoHeader,
  StyledCompanyName,
  StyledContent,
} from "./styled";
import Link from "@components/shared/Link";

export interface CardProps {
  isMobile?: boolean;
}

const CardRaw: FunctionComponent<Adopter & IntlInterface & CardProps> = ({
  logo,
  url,
  company,
  websiteUrl,
  content,
  isMobile,
  formatMessage,
}) => {
  const BlogPostLink: React.FunctionComponent<
    | React.ComponentProps<typeof StyledAdoptersItemExtLink>
    | React.ComponentProps<typeof StyledAdoptersItemIntLink>
  > | null = !url
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
    <StyledSection isMobile={isMobile}>
      <LogoHeader>
        <Link.External
          to={websiteUrl}
          ariaLabel={companyWebsiteLinkAria}
          noFollow={true}
        >
          <img src={logo} alt={companyLogoAlt} height={60} />
        </Link.External>
      </LogoHeader>
      <StyledCompanyName isMobile={isMobile}>{company}</StyledCompanyName>
      <StyledContent isMobile={isMobile}>{content}</StyledContent>
      {BlogPostLink && (
        <BlogPostLink
          to={url}
          ariaLabel={companyCaseStudyLinkAria}
          isMobile={isMobile}
        >
          <FormattedMessage id="landingPage.usedBy.readMoreLink" />
        </BlogPostLink>
      )}
    </StyledSection>
  );
};

export const Card = injectIntl("landingPage.usedBy.accessibility")(CardRaw);
