import styled, { media, css } from "@styled";

import CookiesBanner from "react-cookie-banner/lib";

import Link from "@components/shared/Link";
import Paragraph from "@components/shared/Paragraph";

import { linkEffect } from "@styled/mixins";

import Header from "@static/img/header.svg";
import HorizontalHeader from "@static/img/blog-header.svg";
import Footer from "@static/img/footer.svg";

/* Layout */
export const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

export const Content = styled.main`
  flex: 1;
`;

/* Header */
interface HeaderWrapperProps {
  horizontalBg?: boolean;
}

export const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: ${(props: HeaderWrapperProps) =>
    props.horizontalBg ? "3vw" : ""};

  &:before {
    content: " ";
    background: url(${(props: HeaderWrapperProps) =>
        props.horizontalBg ? HorizontalHeader : Header})
      no-repeat;
    background-size: ${(props: HeaderWrapperProps) =>
      props.horizontalBg ? "" : "100% 35vw"};
    min-height: 35vw;
    display: block;
    width: 100%;
    position: absolute;
    z-index: -1;
  }

  @media (max-width: 1000px) {
    &:before {
      top: ${(props: HeaderWrapperProps) => css`
        ${props.horizontalBg ? "-12vw" : "0"};
        background-size: cover;
        background-position: center center;
      `};
    }
  }
  @media (max-width: 750px) {
    &:before {
      top: ${(props: HeaderWrapperProps) =>
        props.horizontalBg ? "-7vw" : "0"};
    }
  }
  @media (max-width: 575px) {
    &:before {
      top: ${(props: HeaderWrapperProps) =>
        props.horizontalBg ? "-5vw" : "0"};
    }
  }
  @media (max-width: 376px) {
    &:before {
      min-height: ${(props: HeaderWrapperProps) =>
        props.horizontalBg ? "43vw" : "68vw"};
    }
  }
  @media (min-width: 1400px) {
    ${(props: HeaderWrapperProps) =>
      !props.horizontalBg
        ? `
      &:before {
        background-size: 100% 500px;
        min-height: 500px;
      }
    `
        : `
      &:before {
        top: -5vw;
        min-height: 35vw;
      }
    `}
  }

  @media (min-width: 2000px) {
    ${(props: HeaderWrapperProps) =>
      props.horizontalBg
        ? `
      &:before {
        top: -7vw;
        min-height: 35vw;
      }
    `
        : ""}
  }

  @media (min-width: 2700px) {
    ${(props: HeaderWrapperProps) =>
      props.horizontalBg
        ? `
      &:before {
        top: -9vw;
        min-height: 35vw;
      }
    `
        : ""}
  }
`;

interface HeaderLogoProps {
  horizontalBg?: boolean;
}

export const HeaderLogo = styled.h1`
  width: "173px";
  max-height: 61px;
  margin-bottom: 0;
  display: inline-block;

  > svg {
    max-height: 101px;
    width: 173px;
    max-height: 61px;
    fill: ${(props: HeaderLogoProps) =>
      props.horizontalBg ? "#fff" : "#0b74de"};

    ${media.phone`
      width: 140px;
    `};
  }
`;

/* Navigation */
export const NavigationWrapper = styled.nav`
  display: inline-block;
  width: auto;
  float: right;
  margin-top: 0;
  position: relative;

  ${media.tablet`
    position: absolute;
    right: 30px;
  `}
`;

interface NavigationListProps {
  visible?: boolean;
}

export const NavigationList = styled.ul`
  list-style: none;
  padding-left: 0;
  width: 100%;
  margin: 0;
  transition: all 0.2s ease-in-out;
  position: relative;

  ${media.tablet`
    position: fixed;
    top: 0;
    left: ${(props: NavigationListProps) => (props.visible ? 0 : "100vw")};
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background: #235dbe;
    z-index: 9999;
  `};
`;

interface NavigationItemProps {
  visible?: boolean;
}

export const NavigationItem = styled.li`
  display: ${({ visible = true }: NavigationItemProps) =>
    visible ? "inline-block" : "none"};

  ${media.tablet`
    display: ${({ visible = true }: NavigationItemProps) =>
      visible ? "block" : "none"};

    &:first-child {
      position: absolute;
      top: 32px;
      right: 32px;

      svg {
        margin-right: 0;
      }
    }

    :nth-child(n+2):nth-last-child(n+4) {
      a {
        display: block;
        width: 100%;
      }

      text-align: center;
      border-radius: 25px;
      font-size: 18px;
      font-weight: 500;
      padding: 0 18px;
      line-height: 46px;
      background-color: transparent;
      -webkit-transition: background-color ease-out 0.2s;
      transition: background-color ease-out 0.2s;
      -webkit-text-decoration: none;
      text-decoration: none;
      cursor: pointer;
      border: 2px solid #fff;
      color: #fff;
      width: calc(100% - 60px);
      margin-left: 30px;

      &:nth-child(2) {
        margin-top: 96px;
      }

      &:hover {
        background-color: rgba(255,255,255,0.1);
      }
    }
  `};
`;

export const NavigationIntLink = styled(Link.Internal)`
  color: #fff !important;
  font-size: 18px;
  box-shadow: none;

  ${linkEffect}

  ${media.tablet`
    &:after, &:before {
      content: "";
    }
  `};
`;

export const NavigationExtLink = styled(Link.External)`
  box-shadow: none;

  > button {
    margin-left: 6px;
    padding: 0 12px;
    border: none;

    > svg {
      margin-right: 0;
    }

    > span {
      display: none;
    }
  }

  ${media.tablet`
    > button {
      width: calc(100% - 60px);
      margin-left: 30px;
      border-radius: 25px;
      border: 2px solid #fff;

      > svg {
        margin-right: 16px;
      }

      > span {
        display: inline-block;
      }
    }
  `};
`;

export const NavigationMobileButton = styled.div`
  display: none;

  button {
    > svg {
      margin-right: 0;
    }
  }

  ${media.tablet`
    display: inline-block;
    margin-left: 16px;
  `};
`;

/* Footer */
export const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 50;
  background: url(${Footer}) no-repeat;
  background-size: 100% 100%;
  min-height: 340px;
  margin-top: 72px;
  padding-top: 24px;
`;

export const FooterLogo = styled.div`
  display: block;
  margin: 0 auto 16px;

  > svg {
    width: 79px;
    max-height: 101px;
    fill: #ffffff;
  }

  ${media.phone`
    height: 71px;
    max-height: 71px;
    margin-bottom: 15px;
  `};
`;

export const FooterSocialMediaList = styled.ul`
  text-align: center;
  list-style: none;
  margin: 0;
`;

export const FooterSocialMediaItem = styled.li`
  text-align: center;
  display: inline-block;
`;

export const FooterSocialMediaLink = styled(Link.External)`
  color: ${props => props.theme.colors.link.secondary};
  font-size: ${props => props.theme.fontSize.sm};

  > svg {
    margin-right: 6px;
  }

  ${linkEffect}
`;

export const FooterCopyright = styled(Paragraph)`
  color: ${props => props.theme.colors.link.secondary};
  text-align: center;
  font-size: ${props => props.theme.fontSize.xs};
  margin-bottom: 12px;

  a {
    color: #fff;
    border-bottom: 1px solid ${props => props.theme.colors.link.secondary};

    &:hover,
    &:focus,
    &:active {
      color: ${props => props.theme.colors.link.secondary};
    }
  }
`;

export const NetlifyIcon = styled.div`
  text-align: center;

  img {
    margin-bottom: 0;
  }
`;

/* Cookies Banner */
export const StyledCookieBanner = styled(CookiesBanner)`
  position: fixed;
  text-align: center;
  background: #1ea393;
  width: 100%;
  height: auto;
  z-index: 9999;
  bottom: 0px;
  padding: 12px;
  font-size: 14px;

  > .button-close {
    border: 2px solid #fff;
    color: #fff;
    font-weight: 500;
    font-size: 14px;
    background: transparent;
    border-radius: 25px;
    line-height: 1em;
    padding: 6px 12px;
    display: inline-block;
    margin-left: 12px;
    position: static;
    cursor: pointer;
    transition: all ease-out 0.2s;

    &:hover,
    &:focus,
    &:active {
      background: #fff;
      color: #1ea393;
    }

    ${media.phone`
      display: block;
      margin: 0 auto;
      margin-top: 10px;
    `};
  }

  > .cookie-message {
    line-height: 1em;
    color: #fff;

    > a {
      margin-left: 6px;
      color: #fff;

      ${media.smallPhone`
        display: inline-block;
      `};
    }
  }
`;

export const ReadPrivacyStatementLink = styled(Link.External)`
  border-bottom: 1px solid ${props => props.theme.colors.border.secondary};
`;

/* Back to top */
interface BackToTopIconProps {
  visibleIcon: boolean;
}

export const BackToTopIcon = styled.div`
  position: fixed;
  bottom: 32px;
  right: 32px;
  color: #fff;
  z-index: 8888;

  width: 62px;
  height: 62px;
  border-radius: 100%;
  box-shadow: 0 1px 26px 0 rgba(137, 165, 199, 0.42);
  background: #fff;

  transition: visibility 0.2s linear, opacity 0.2s linear;
  opacity: ${(props: BackToTopIconProps) => (props.visibleIcon ? "1" : "0")};
  visibility: ${props => (props.visibleIcon ? "visible" : "hidden")};

  &:hover {
    cursor: pointer;
  }

  ${media.phone`
    width: 52px;
    height: 52px;
  `};

  > svg {
    color: #0b74de;
    font-size: 32px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);

    ${media.phone`
      font-size: 28px;
    `};
  }
`;
