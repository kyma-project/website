import styled from "@styled";

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

export const ModalHeaderMetaType = styled.li``;

export const ModalHeaderMetaLicense = styled.li`
  margin-left: auto;
  order: 2;
`;

export const ModalHeaderTitle = styled.h3`
  margin: 32px 0 28px;
  font-size: 24px;
  width: 100%;
`;

export const ModalHeaderTitleVersion = styled.span`
  margin-left: 16px;
`;

export const ModalHeaderDescription = styled.p`
  margin: 16px 0 0;
  font-size: 16px;
  width: 100%;
`;
