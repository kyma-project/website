import styled, { media, css } from "@styled";
import { customScrollBar } from "@styled/mixins";

interface NavigationWrapperProps {
  showMobileNav?: boolean;
}

export const NavigationWrapper = styled.div<NavigationWrapperProps>`
  margin-top: 16px;
  position: relative;
  background: #fff;

  @media (max-width: 1216px) {
    margin-left: 16px;
  }

  ${media.tablet`
    margin: 0;
    max-height: 100vh;
    height: 100%;
    top: 0;
    display: block;
    height: 100vh;
    position: fixed;
    padding: 9px 0 0 0;
    top: 0px;
    width: 15rem;
    max-width: 70vw;
    z-index: 10;
    opacity: 1;
    pointer-events: auto;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    transition: transform 350ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
    border-right: 1px solid rgb(229, 229, 229);
  `}

  ${media.tablet<NavigationWrapperProps>`
    transform: ${props =>
      props.showMobileNav ? `translateX(0)` : `translateX(-16rem)`};
  `};
`;

export const NavigationListWrapper = styled.div`
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(100vh - 74px);
  margin: 16px 0;
  padding-right: 2px;
  background: #fff;

  ${customScrollBar({
    thumbBorderRadius: "4px",
    trackBorderRadius: "4px",
  })}

  ${media.tablet`
    max-height: calc(100vh - 52px);
    margin: 16px 0 0 0;
    padding-right: 0;
  `}
`;

export const NavigationList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

interface NavigationListItemProps {
  active: boolean;
}

export const NavigationListItem = styled.li`
  margin-bottom: 9px;
  ${media.tablet`
    padding: 0 8px;
  `};

  > a {
    display: block;
    position: relative;
    width: 100%;
    padding: 9px 16px;
    font-size: 14px;
    color: #485766;
    font-weight: 500;
    background-color: #fff;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;

    ${(props: NavigationListItemProps) =>
      props.active
        ? css`
            color: #0b74de;
            background-color: rgba(11, 116, 222, 0.12);
          `
        : ""}

    &:hover {
      ${(props: NavigationListItemProps) =>
        props.active
          ? css`
              background-color: rgba(11, 116, 222, 0.26);
            `
          : css`
              background-color: rgba(11, 116, 222, 0.12);
            `}
      color: #0b74de;
    }

    > svg {
      position: absolute;
      left: 16px;
      top: 50%;
      height: 38px;
      margin-right: 6px;
      transform: translate(0, -50%);
    }
  }
`;

export const NavigationListItemName = styled.div`
  display: inline-block;
  line-height: 14px;
  position: relative;

  > span {
    display: inline-block;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    vertical-align: middle;
  }
`;

export const NavigationGroupName = styled.div`
  margin: 16px 0;
  font-size: 12px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  color: rgba(72, 87, 102, 0.6);
  text-transform: uppercase;

  ${media.tablet`
    margin: 16px 8px;
  `};
`;

export const VersionSwitcherWrapper = styled.div`
  display: block;
  margin-bottom: 16px;
`;
