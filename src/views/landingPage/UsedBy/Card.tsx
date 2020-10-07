import React, { FunctionComponent } from "react";
import { Adopter } from "@typings/landingPage";
import styled from "@styled";
import { injectIntl, IntlInterface, FormattedMessage } from "@common/i18n";
import { linkEffect } from "@styled/mixins";
import Link from "@components/shared/Link";

interface CardProps {
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

const ImgHeight = "60px";
const StyledSection = styled.section<CardProps>`
  border-radius: 8px;
  box-shadow: 0 2px 26px 0 rgba(11, 116, 222, 0.49);
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;

  > div > a {
    display: inline-flex;
    > img {
      height: ${ImgHeight};
      max-width: 240px;
      margin: 21px ${props => (props.isMobile ? "20px" : "27px")};
      max-height: ${ImgHeight};
    }
  }

  &:hover {
    > a > img {
      cursor: pointer;
    }
  }
`;

const LogoHeader = styled.div`
  border-bottom: solid 1px #d7d7d7;
`;

const StyledCompanyName = styled.h3<CardProps>`
  padding: 17px ${props => (props.isMobile ? "20px 24px" : "24px 31px")};
  margin: 0;
`;

const StyledContent = styled.p<CardProps>`
  margin: 0;
  padding: 0px ${p => (p.isMobile ? "20px" : "27px")} 30px;
`;

const marginLeftFn = (isMobile?: boolean): string =>
  isMobile ? "-22px" : "-16px";

export const StyledAdoptersItemExtLink = styled(Link.External)<CardProps>`
  &&&&& {
    ${linkEffect}
    padding: 0 27px 27px;
    margin-top: auto;
    margin-left: ${p => marginLeftFn(p.isMobile)};
    display: block;
  }
`;

export const StyledAdoptersItemIntLink = styled(Link.Internal)<CardProps>`
  &&&&& {
    ${linkEffect}
    display: block;
    margin-left: ${p => marginLeftFn(p.isMobile)};
    margin-top: auto;
    padding: 0 27px 27px;
  }
`;
