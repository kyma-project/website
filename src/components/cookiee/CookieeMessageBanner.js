import React from "react";
import CookieBanner from "react-cookie-banner";
import styled from "styled-components";

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

    &:hover, &:focus, &:active {
      background: #fff;
      color: #1ea393;
    }

    @media (max-width: 730px){
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

const CookieMessageBanner = () => (
  <StyledCookieBanner
    disableStyle={true}
    dismissOnScroll={false}
    message="We use cookies for the best online experience."
    link={
      <a
        href="https://www.sap.com/corporate/en/legal/privacy.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read our Privacy Statement
      </a>
    }
    buttonMessage="Close"
  />
);

export default CookieMessageBanner;
