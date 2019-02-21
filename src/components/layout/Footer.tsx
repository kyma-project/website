import React from "react";

import Button from "@components/shared/Button";
import Link from "@components/shared/Link";

import Logo from "./assets/LogoFooter";
import Icon from "@components/shared/Icon";

import { FormattedMessage, getTranslation } from "@common/i18n";
import { LINKS } from "@common/constants";
import { getActualYear, resolveSocialMedia } from "@common/utils";

import {
  FooterWrapper,
  FooterLogo,
  FooterSocialMediaList,
  FooterSocialMediaItem,
  FooterSocialMediaLink,
  FooterCopyright,
} from "./styled";

const gt = getTranslation("layout.footer");

const Footer: React.FunctionComponent = () => {
  const socialMedia = [
    resolveSocialMedia("twitter"),
    resolveSocialMedia("github"),
    resolveSocialMedia("slack"),
    resolveSocialMedia("linkedIn"),
    resolveSocialMedia("youTube"),
    resolveSocialMedia("stackOverflow"),
  ];

  return (
    <FooterWrapper>
      <FooterLogo>
        <Logo />
      </FooterLogo>
      <FooterSocialMediaList>
        {socialMedia.map(media => (
          <FooterSocialMediaItem key={media.name}>
            <FooterSocialMediaLink to={media.url}>
              <Icon iconName={media.icon} />
              {media.name}
            </FooterSocialMediaLink>
          </FooterSocialMediaItem>
        ))}
      </FooterSocialMediaList>
      <FooterCopyright>
        <FormattedMessage
          id={gt("copyright")}
          values={{
            actualYear: getActualYear(),
            copyrightLink: (
              <Link.External to={LINKS.SAP_PRIVACY_LINK} externalIcon>
                <FormattedMessage id={gt("privacyStatement")} />
              </Link.External>
            ),
          }}
        />
      </FooterCopyright>
    </FooterWrapper>
  );
};

export default Footer;
