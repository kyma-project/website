import React from "react";
import CookieBanner from "react-cookie-banner";
import styled from "styled-components";
import { translate } from "react-i18next";

const StyledCookieBanner = styled(CookieBanner)`
  position: fixed;
  text-align: center;
  background: #1ea393;
  width: 100%;
  height: auto;
  z-index: 10000;
  bottom: 0px;
  padding: 20px 15px;

  > .button-close {
    border: 2px solid #fff;
    color: #fff;
    font-weight: 500;
    font-size: 16px;
    background: transparent;
    border-radius: 25px;
    line-height: 1em;
    padding: 10px 15px;
    display: inline-block;
    margin-left: 15px;
    position: static;
    cursor: pointer;
    transition: all ease-out 0.2s;

    &:hover,
    &:focus,
    &:active {
      background: #fff;
      color: #1ea393;
    }

    @media (max-width: 730px) {
      display: block;
      margin: 0 auto;
      margin-top: 10px;
    }
  }

  > .cookie-message {
    line-height: 1em;
    color: #fff;
    > a {
      margin-left: 10px;
      color: #fff;
    }
  }
`;

const CookieMessageBanner = ({ t }) => {
  const tPrefix = "cookieBanner";
  const getTranslation = key => {
    return t(`${tPrefix}.${key}`);
  };

  return (
    <StyledCookieBanner
      disableStyle={true}
      dismissOnScroll={false}
      message={getTranslation("message")}
      link={
        <a
          href={getTranslation("link")}
          target="_blank"
          rel="noopener noreferrer"
        >
          {getTranslation("readPrivacyStatement")}
        </a>
      }
      buttonMessage={getTranslation("close")}
    />
  );
};

export default translate("UI")(CookieMessageBanner);
