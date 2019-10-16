import React from "react";

import Button from "@components/shared/Button";
import Link from "@components/shared/Link";

import Logo from "./assets/LogoFirst";
import Icon from "@components/shared/Icon";

import { FormattedMessage, getTranslation } from "@common/i18n";
import config from "@config";
import { getActualYear, resolveSocialMedia } from "@common/utils";

import NetlifyImage from "@static/img/netlify.svg";

import {
  FooterWrapper,
  FooterLogo,
  FooterSocialMediaList,
  FooterSocialMediaItem,
  FooterSocialMediaLink,
  FooterCopyright,
  NetlifyIcon,
} from "./styled";

const gt = getTranslation("layout.footer");

const Footer: React.FunctionComponent = () => {
  const socialMedia = [
    resolveSocialMedia("twitter"),
    resolveSocialMedia("github"),
    resolveSocialMedia("slack"),
    resolveSocialMedia("linkedIn"),
    resolveSocialMedia("youTube"),
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
              <Link.External
                to={config.links.SAP_PRIVACY_LINK}
                externalIcon={true}
              >
                <FormattedMessage id={gt("privacyStatement")} />
              </Link.External>
            ),
          }}
        />
      </FooterCopyright>
      <NetlifyIcon>
        <a href="https://www.netlify.com" target="_blank">
          <img src={NetlifyImage} alt="deploys by Netlify" />
        </a>
      </NetlifyIcon>
    </FooterWrapper>
  );
};

export default Footer;
