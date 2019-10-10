import styled, { media } from "@styled";

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
