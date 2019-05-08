import styled, { media } from "@styled";

import Modal from "@components/shared/Modal";
import Button from "@components/shared/Button";

export const Wrapper = styled.div`
  margin-top: 52px;
`;

export const StyledModal = styled(Modal)`
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
    padding: 72px 68px 32px;
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
      padding: 62px 44px 24px;
      border-radius: 0;
    }
  `};
`;

export const ModalHeaderIcon = styled.div`
  position: absolute;
  top: 0;
  left: 68px;
  background: #fff;
  width: 80px;
  height: 80px;
  border-radius: 100%;
  padding: 12px;
  transform: translate(0, -50%);
  box-shadow: 0 2px 26px 0 rgba(11, 116, 222, 0.2);

  ${media.phone`
    display: none;
  `};
`;

export const ModalHeaderMeta = styled.ul`
  width: 100%;
  display: flex;
  padding-bottom: 16px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: solid 1px #ffffff;
  margin: 0;

  > li {
    margin-bottom: 0;
  }
`;

export const ModalHeaderMetaCapability = styled.li``;

export const ModalHeaderMetaTicketNumber = styled.li`
  margin-left: auto;
  order: 2;
`;

export const ModalHeaderDueDate = styled.div`
  margin-top: 16px;
  font-size: 16px;

  > svg {
    margin-right: 8px;
  }

  a {
    color: #fff;
  }
`;

export const ModalHeaderTitle = styled.h3`
  margin: 32px 0 28px;
  font-size: 24px;
  width: 100%;
`;

export const ModalHeaderLinks = styled.ul`
  margin: 0;
  display: flex;
`;

export const ModalHeaderLink = styled.li`
  margin-bottom: 0;
  margin-right: 16px;
`;

export const ModalHeaderLinkButton = styled(Button.Default)`
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
`;
