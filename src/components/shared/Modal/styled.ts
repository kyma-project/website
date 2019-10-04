import styled, { media } from "@styled";
import ReactModal from "react-modal";

import Button from "@components/shared/Button";

export const Wrapper = styled.div`
  margin-top: 52px;
`;

export const StyledModal = styled(ReactModal)`
  > div {
    padding: 96px 0;
  }

  ${media.phone`
    > div {
      padding: 0;
    }
  `};
`;

export const ContentWrapper = styled.div`
  border-radius: 8px;

  ${media.phone`
    border-radius: 0;
  `};
`;

export const ModalHeaderWrapper = styled.header`
  background: #2068df;
  color: #fff;
  position: relative;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  > div {
    padding: 48px 68px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-image: linear-gradient(
      244deg,
      rgba(0, 232, 51, 0.5),
      rgba(60, 144, 228, 0)
    );
  }

  ${media.phone`
    border-radius: 0;

    > div {
      padding: 72px 44px 24px;
      border-radius: 0;
    }
  `};

  ${media.smallPhone`
    border-radius: 0;

    > div {
      padding: 72px 24px 24px;
      border-radius: 0;
    }
  `};
`;

export const ModalHeaderLinks = styled.ul`
  margin: 28px 0 0 0;
  display: flex;
`;

export const ModalHeaderLink = styled.li`
  margin-bottom: 0;
  margin-right: 16px;
`;

export const ModalHeaderLinkButton = styled(Button.Default)`
  &&& {
    font-size: 14px;
    line-height: 32px;
    border-radius: 18px;
    border: solid 2px #ffffff;
    background-color: #ffffff;
    color: #0b74de;

    &:active,
    &:focus,
    &:hover {
      color: #fff;
      background-color: rgba(255, 255, 255, 0);
    }

    ${media.smallPhone`
      line-height: 18px;
      padding: 6px 12px;
      border-radius: 28px;
    `};

    > svg {
      width: 1em;
    }
  }
`;

export const ModalContentWrapper = styled.div`
  padding: 32px 68px 46px;
  background: #fff;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  ${media.phone`
    padding: 24px 44px 24px;
    border-radius: 0;
  `};

  ${media.smallPhone`
    padding: 24px 24px;
    border-radius: 0;
  `};
`;

export const CloseButton = styled.button`
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: normal;
  border: 0;
  padding: 0;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;

  position: fixed;
  top: 30px;
  right: 30px;
  z-index: 310;
  font-size: 28px;
  color: #fff;
  cursor: pointer;

  &:active,
  &:focus,
  &:hover {
    outline: none;
  }
`;
