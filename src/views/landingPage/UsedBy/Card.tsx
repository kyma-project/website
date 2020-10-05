import React, { FunctionComponent } from "react";
import { Adopter } from "@typings/landingPage";
import styled from "@styled";
import { injectIntl, IntlInterface, FormattedMessage } from "@common/i18n";
import { linkEffect } from "@styled/mixins";
import Link from "@components/shared/Link";

const CardRaw: FunctionComponent<Adopter & IntlInterface> = ({
  logo,
  url,
  company,
  websiteUrl,
  content,
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
    <StyledSection>
      <LogoHeader>
        <Link.External
          to={websiteUrl}
          ariaLabel={companyWebsiteLinkAria}
          noFollow={true}
        >
          <img src={logo} alt={companyLogoAlt} height={60} />
        </Link.External>
      </LogoHeader>
      <StyledCompanyName>{company}</StyledCompanyName>
      <StyledContent>{content}</StyledContent>
      {BlogPostLink && (
        <BlogPostLink to={url} ariaLabel={companyCaseStudyLinkAria}>
          <FormattedMessage id="landingPage.usedBy.readMoreLink" />
        </BlogPostLink>
      )}
    </StyledSection>
  );
};

export const Card = injectIntl("landingPage.usedBy.accessibility")(CardRaw);

const ImgHeight = "60px";
const StyledSection = styled.section`
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
      margin: 21px 27px;
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

const StyledCompanyName = styled.h3`
  padding: 17px 27px 31px;
  margin: 0;
`;

const StyledContent = styled.p`
  margin: 0;
  padding: 0px 27px 30px;
`;

export const StyledAdoptersItemExtLink = styled(Link.External)`
  &&&&& {
    ${linkEffect}
    padding: 0 27px 27px;
    margin-top: auto;
    margin-left: -16px;
    display: block;
  }
`;

export const StyledAdoptersItemIntLink = styled(Link.Internal)`
  &&&&& {
    ${linkEffect}
    display: block;
    margin-left: -16px;
    margin-top: auto;
    padding: 0 27px 27px;
  }
`;
