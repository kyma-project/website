import React, { FunctionComponent } from "react";
import { Adopter } from "@typings/landingPage";
import styled from "@styled";
import { injectIntl, IntlInterface, FormattedMessage } from "@common/i18n";

import Link from "@components/shared/Link";
import H from "@components/shared/H";

const CardRaw: FunctionComponent<Adopter & IntlInterface> = ({
  logo,
  url,
  company,
  websiteUrl,
  content,
  cssProperties,
  formatMessage,
}) => {
  const BlogPostLink: any = !url
    ? null
    : url.startsWith("http")
    ? Link.External
    : Link.Internal;

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
    </StyledSection>
  );
};

export const Card = injectIntl("landingPage.adopters.accessibility")(CardRaw);

const ImgHeight = "60px";
const StyledSection = styled.section`
  border-radius: 8px;
  box-shadow: 0 2px 26px 0 rgba(11, 116, 222, 0.49);
  background-color: white;
  height: 100%;

  > div > a {
    display: inline-flex;
    > img {
      /* width: 100%; */
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

  /* space */
  /* width: 568px; */
  /* height: 420px; */
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
  padding-left: 27px;
`;
